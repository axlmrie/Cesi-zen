import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { apiFetch } from '@/lib/api-client';
import { authClient } from '@/lib/auth-client';
import {
  fallbackDiagnosticItems,
  fallbackResultMessages,
  palette,
  type DiagnosticItem,
  type ResultMessages,
} from '@/constants/cesizen';

export default function DiagnosticScreen() {
  const { data: session } = authClient.useSession();
  const [items, setItems] = useState<DiagnosticItem[]>(fallbackDiagnosticItems);
  const [resultMessages, setResultMessages] = useState<ResultMessages>(fallbackResultMessages);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    apiFetch<{ items: DiagnosticItem[]; resultMessages: ResultMessages }>('/api/mobile/diagnostic')
      .then((data) => {
        if (!isMounted) {
          return;
        }
        setItems(data.items.length > 0 ? data.items : fallbackDiagnosticItems);
        setResultMessages(data.resultMessages ?? fallbackResultMessages);
      })
      .catch(() => {
        if (isMounted) {
          setItems(fallbackDiagnosticItems);
          setResultMessages(fallbackResultMessages);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const totalScore = useMemo(
    () =>
      items
        .filter((item) => selectedIds.includes(item.id))
        .reduce((sum, item) => sum + item.points, 0),
    [items, selectedIds],
  );

  const risk = useMemo(() => {
    if (totalScore >= 300) {
      return {
        ...resultMessages.eleve,
        color: palette.destructive,
        backgroundColor: palette.destructiveSoft,
        icon: 'warning' as const,
      };
    }

    if (totalScore >= 150) {
      return {
        ...resultMessages.modere,
        color: palette.amber,
        backgroundColor: palette.amberSoft,
        icon: 'error-outline' as const,
      };
    }

    return {
      ...resultMessages.faible,
      color: palette.brand,
      backgroundColor: palette.brandSoft,
      icon: 'check-circle' as const,
    };
  }, [resultMessages, totalScore]);

  const toggleItem = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id],
    );
  };

  const saveDiagnostic = async () => {
    if (!session) {
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      await apiFetch('/api/mobile/diagnostic', {
        method: 'POST',
        body: JSON.stringify({ score: totalScore, selectedEventIds: selectedIds }),
      });
      setSaveMessage('Résultat enregistré dans votre espace.');
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : 'Impossible de sauvegarder le résultat.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {!isFinished ? (
          <>
            <View style={styles.header}>
              <View style={styles.iconBadge}>
                <MaterialIcons name="assignment" size={30} color={palette.brand} />
              </View>
              <Text style={styles.title}>Diagnostic de stress</Text>
              <Text style={styles.subtitle}>
                Cochez les événements vécus ces 12 derniers mois pour estimer votre score.
              </Text>
            </View>

            {isLoading ? (
              <View style={styles.loadingInline}>
                <ActivityIndicator color={palette.brand} />
                <Text style={styles.mutedText}>Chargement du questionnaire...</Text>
              </View>
            ) : null}

            <View style={styles.itemList}>
              {items.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <Pressable
                    key={item.id}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: isSelected }}
                    onPress={() => toggleItem(item.id)}
                    style={[styles.itemCard, isSelected ? styles.itemCardSelected : undefined]}>
                    <View style={[styles.checkbox, isSelected ? styles.checkboxSelected : undefined]}>
                      {isSelected ? <MaterialIcons name="check" size={16} color="#ffffff" /> : null}
                    </View>
                    <Text style={styles.itemLabel}>{item.label}</Text>
                    <Text style={styles.points}>{item.points} pts</Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.stickyBar}>
              <View>
                <Text style={styles.scoreLabel}>Score actuel</Text>
                <Text style={styles.score}>{totalScore} pts</Text>
              </View>
              <Pressable accessibilityRole="button" onPress={() => setIsFinished(true)} style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Terminer</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View style={styles.resultCard}>
            <View style={[styles.resultIcon, { backgroundColor: risk.backgroundColor }]}>
              <MaterialIcons name={risk.icon} size={44} color={risk.color} />
            </View>
            <Text style={styles.resultScore}>{totalScore} points</Text>
            <Text style={[styles.resultLabel, { color: risk.color }]}>{risk.label}</Text>
            <Text style={styles.resultDescription}>{risk.desc}</Text>

            {session ? (
              <Pressable
                accessibilityRole="button"
                disabled={isSaving}
                onPress={saveDiagnostic}
                style={[styles.primaryButtonFull, isSaving ? styles.buttonDisabled : undefined]}>
                {isSaving ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <>
                    <MaterialIcons name="save" size={20} color="#ffffff" />
                    <Text style={styles.primaryButtonText}>Enregistrer dans mon profil</Text>
                  </>
                )}
              </Pressable>
            ) : (
              <View style={styles.authSaveBox}>
                <Text style={styles.authSaveText}>
                  Créez un compte ou connectez-vous pour sauvegarder ce diagnostic.
                </Text>
                <View style={styles.authActions}>
                  <Link href="/auth/inscription" asChild>
                    <Pressable accessibilityRole="link" style={styles.primaryButtonSmall}>
                      <Text style={styles.primaryButtonText}>Créer un compte</Text>
                    </Pressable>
                  </Link>
                  <Link href="/auth/connexion" asChild>
                    <Pressable accessibilityRole="link" style={styles.secondaryButtonSmall}>
                      <Text style={styles.secondaryButtonText}>Connexion</Text>
                    </Pressable>
                  </Link>
                </View>
              </View>
            )}

            {saveMessage ? <Text style={styles.saveMessage}>{saveMessage}</Text> : null}

            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setSelectedIds([]);
                setIsFinished(false);
                setSaveMessage('');
              }}
              style={styles.resetButton}>
              <MaterialIcons name="refresh" size={18} color={palette.muted} />
              <Text style={styles.resetText}>Recommencer le test</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    gap: 18,
    padding: 20,
    paddingBottom: 36,
  },
  header: {
    alignItems: 'center',
    gap: 10,
    paddingTop: 8,
  },
  iconBadge: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: palette.brandSoft,
  },
  title: {
    color: palette.foreground,
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    maxWidth: 520,
    color: palette.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  loadingInline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  mutedText: {
    color: palette.muted,
    fontSize: 14,
    fontWeight: '700',
  },
  itemList: {
    gap: 10,
  },
  itemCard: {
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 18,
    backgroundColor: palette.card,
    padding: 14,
  },
  itemCardSelected: {
    borderColor: palette.brand,
    backgroundColor: palette.brandSoft,
  },
  checkbox: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: palette.border,
    borderRadius: 9,
    backgroundColor: palette.card,
  },
  checkboxSelected: {
    borderColor: palette.brand,
    backgroundColor: palette.brand,
  },
  itemLabel: {
    flex: 1,
    minWidth: 0,
    color: palette.foreground,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '700',
  },
  points: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '800',
  },
  stickyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 20,
    backgroundColor: palette.card,
    padding: 16,
  },
  scoreLabel: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  score: {
    color: palette.brand,
    fontSize: 24,
    fontWeight: '900',
  },
  primaryButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: palette.brand,
    paddingHorizontal: 22,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
  },
  resultCard: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 26,
    backgroundColor: palette.card,
    padding: 24,
  },
  resultIcon: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  resultScore: {
    color: palette.foreground,
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
  },
  resultLabel: {
    fontSize: 21,
    fontWeight: '900',
    textAlign: 'center',
  },
  resultDescription: {
    color: palette.foreground,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
  },
  primaryButtonFull: {
    minHeight: 52,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    backgroundColor: palette.brand,
    paddingHorizontal: 18,
  },
  buttonDisabled: {
    opacity: 0.75,
  },
  authSaveBox: {
    width: '100%',
    gap: 12,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 18,
    backgroundColor: palette.background,
    padding: 14,
  },
  authSaveText: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  authActions: {
    gap: 10,
  },
  primaryButtonSmall: {
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: palette.brand,
    paddingHorizontal: 14,
  },
  secondaryButtonSmall: {
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 14,
    backgroundColor: palette.card,
    paddingHorizontal: 14,
  },
  secondaryButtonText: {
    color: palette.brand,
    fontSize: 15,
    fontWeight: '900',
  },
  saveMessage: {
    color: palette.brand,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '800',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  resetText: {
    color: palette.muted,
    fontSize: 14,
    fontWeight: '800',
  },
});

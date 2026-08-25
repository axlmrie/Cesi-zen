import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthRequired, LoadingState } from '@/components/auth-required';
import { palette, type EmotionGroup, type JournalEntry } from '@/constants/cesizen';
import { apiFetch } from '@/lib/api-client';
import { authClient } from '@/lib/auth-client';

export default function JournalScreen() {
  const { data: session, isPending } = authClient.useSession();
  const [emotions, setEmotions] = useState<EmotionGroup[]>([]);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [selectedEmotionId, setSelectedEmotionId] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!session) {
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    apiFetch<{ emotions: EmotionGroup[]; entries: JournalEntry[] }>('/api/mobile/journal')
      .then((data) => {
        if (!isMounted) {
          return;
        }

        const nextEmotions = data.emotions.filter((group) => group.emotionsN2.length > 0);
        setEmotions(nextEmotions);
        setEntries(data.entries);
        setSelectedGroupId(nextEmotions[0]?.id ?? '');
        setSelectedEmotionId(nextEmotions[0]?.emotionsN2[0]?.id ?? '');
      })
      .catch((error) => {
        if (isMounted) {
          setMessage(error instanceof Error ? error.message : 'Impossible de charger le journal.');
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
  }, [session]);

  const selectedGroup = useMemo(
    () => emotions.find((emotion) => emotion.id === selectedGroupId) ?? emotions[0],
    [emotions, selectedGroupId],
  );

  const saveEntry = async () => {
    if (!selectedEmotionId) {
      setMessage('Sélectionnez une émotion avant de sauvegarder.');
      return;
    }

    setIsSaving(true);
    setMessage('');

    try {
      const data = await apiFetch<{ entry: JournalEntry }>('/api/mobile/journal', {
        method: 'POST',
        body: JSON.stringify({ emotionN2Id: selectedEmotionId, notePersonnelle: note }),
      });
      setEntries((current) => [data.entry, ...current]);
      setNote('');
      setMessage('Entrée ajoutée à votre journal.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Impossible d'enregistrer l'entrée.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredContent}>
          <LoadingState label="Vérification de la session..." />
        </View>
      </SafeAreaView>
    );
  }

  if (!session) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredContent}>
          <AuthRequired
            title="Journal réservé aux utilisateurs connectés"
            description="Votre journal contient des données personnelles. Connectez-vous pour créer et consulter vos entrées en toute confidentialité."
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconBadge}>
            <MaterialIcons name="menu-book" size={30} color={palette.brand} />
          </View>
          <Text style={styles.title}>Mon journal</Text>
          <Text style={styles.subtitle}>
            Identifiez vos émotions et ajoutez une note personnelle quand vous en ressentez le besoin.
          </Text>
        </View>

        {isLoading ? (
          <View style={styles.loadingInline}>
            <ActivityIndicator color={palette.brand} />
            <Text style={styles.mutedText}>Chargement de votre journal...</Text>
          </View>
        ) : null}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Comment vous sentez-vous ?</Text>

          {!isLoading && emotions.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialIcons name="sentiment-dissatisfied" size={28} color={palette.muted} />
              <Text style={styles.emptyText}>
                {"Aucune émotion n'est configurée en base de données. Lancez le seed ou ajoutez des émotions depuis l'administration."}
              </Text>
            </View>
          ) : (
            <>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.groupList}>
                {emotions.map((group) => {
                  const isSelected = group.id === selectedGroupId;
                  return (
                    <Pressable
                      key={group.id}
                      accessibilityRole="button"
                      onPress={() => {
                        setSelectedGroupId(group.id);
                        setSelectedEmotionId(group.emotionsN2[0]?.id ?? '');
                      }}
                      style={[styles.groupPill, isSelected ? styles.groupPillSelected : undefined]}>
                      <Text style={[styles.groupPillText, isSelected ? styles.groupPillTextSelected : undefined]}>
                        {group.libelle}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>

              <View style={styles.emotionGrid}>
                {selectedGroup?.emotionsN2.map((emotion) => {
                  const isSelected = emotion.id === selectedEmotionId;
                  return (
                    <Pressable
                      key={emotion.id}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: isSelected }}
                      onPress={() => setSelectedEmotionId(emotion.id)}
                      style={[styles.emotionChip, isSelected ? styles.emotionChipSelected : undefined]}>
                      <Text style={[styles.emotionChipText, isSelected ? styles.emotionChipTextSelected : undefined]}>
                        {emotion.libelle}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </>
          )}

          <View style={styles.noteBox}>
            <Text style={styles.label}>Note personnelle</Text>
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Ce qui a déclenché cette émotion, ce dont vous avez besoin..."
              placeholderTextColor="#94a3b8"
              multiline
              textAlignVertical="top"
              style={styles.textArea}
            />
          </View>

          <Pressable
            accessibilityRole="button"
            disabled={isSaving || emotions.length === 0}
            onPress={saveEntry}
            style={[styles.primaryButton, isSaving || emotions.length === 0 ? styles.buttonDisabled : undefined]}>
            {isSaving ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <MaterialIcons name="save" size={20} color="#ffffff" />
                <Text style={styles.primaryButtonText}>Ajouter au journal</Text>
              </>
            )}
          </Pressable>

          {message ? <Text style={styles.messageText}>{message}</Text> : null}
        </View>

        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Historique récent</Text>

          {entries.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialIcons name="history" size={28} color={palette.muted} />
              <Text style={styles.emptyText}>Aucune entrée enregistrée pour le moment.</Text>
            </View>
          ) : (
            entries.map((entry) => (
              <View key={entry.id} style={styles.entryCard}>
                <View style={styles.entryIcon}>
                  <MaterialIcons name="favorite-border" size={20} color={palette.brand} />
                </View>
                <View style={styles.entryText}>
                  <Text style={styles.entryTitle}>
                    {entry.emotionN2.emotionN1?.libelle
                      ? `${entry.emotionN2.emotionN1.libelle} · ${entry.emotionN2.libelle}`
                      : entry.emotionN2.libelle}
                  </Text>
                  <Text style={styles.entryDate}>
                    {new Date(entry.dateEnregistrement).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Text>
                  {entry.notePersonnelle ? <Text style={styles.entryNote}>{entry.notePersonnelle}</Text> : null}
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
  card: {
    gap: 16,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 24,
    backgroundColor: palette.card,
    padding: 18,
  },
  cardTitle: {
    color: palette.foreground,
    fontSize: 20,
    fontWeight: '900',
  },
  groupList: {
    gap: 8,
    paddingRight: 2,
  },
  groupPill: {
    minHeight: 42,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 999,
    backgroundColor: palette.background,
    paddingHorizontal: 16,
  },
  groupPillSelected: {
    borderColor: palette.brand,
    backgroundColor: palette.brand,
  },
  groupPillText: {
    color: palette.muted,
    fontSize: 14,
    fontWeight: '900',
  },
  groupPillTextSelected: {
    color: '#ffffff',
  },
  emotionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  emotionChip: {
    minHeight: 42,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 14,
    backgroundColor: palette.background,
    paddingHorizontal: 14,
  },
  emotionChipSelected: {
    borderColor: palette.zen,
    backgroundColor: palette.zenSoft,
  },
  emotionChipText: {
    color: palette.muted,
    fontSize: 14,
    fontWeight: '800',
  },
  emotionChipTextSelected: {
    color: palette.zen,
  },
  noteBox: {
    gap: 8,
  },
  label: {
    color: palette.foreground,
    fontSize: 14,
    fontWeight: '800',
  },
  textArea: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 16,
    backgroundColor: palette.background,
    color: palette.foreground,
    fontSize: 15,
    lineHeight: 22,
    padding: 14,
  },
  primaryButton: {
    minHeight: 52,
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
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
  messageText: {
    color: palette.brand,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '800',
  },
  historySection: {
    gap: 12,
  },
  sectionTitle: {
    color: palette.foreground,
    fontSize: 22,
    fontWeight: '900',
  },
  emptyState: {
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 18,
    backgroundColor: palette.card,
    padding: 20,
  },
  emptyText: {
    color: palette.muted,
    fontSize: 14,
    textAlign: 'center',
  },
  entryCard: {
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 18,
    backgroundColor: palette.card,
    padding: 14,
  },
  entryIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: palette.brandSoft,
  },
  entryText: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  entryTitle: {
    color: palette.foreground,
    fontSize: 15,
    fontWeight: '900',
  },
  entryDate: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  entryNote: {
    color: palette.foreground,
    fontSize: 14,
    lineHeight: 20,
  },
});

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthRequired, LoadingState } from '@/components/auth-required';
import { palette } from '@/constants/cesizen';
import { apiFetch } from '@/lib/api-client';
import { authClient } from '@/lib/auth-client';

type DashboardSummary = {
  stats: {
    diagnosticsCount: number;
    journalEntriesCount: number;
    latestStressScore: number | null;
    latestStressLevel: string | null;
  };
};

export default function ProfileScreen() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  useEffect(() => {
    if (!session) {
      return;
    }

    let isMounted = true;
    setIsLoadingSummary(true);

    apiFetch<DashboardSummary>('/api/mobile/dashboard')
      .then((data) => {
        if (isMounted) {
          setSummary(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSummary(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingSummary(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [session]);

  const signOut = async () => {
    setIsSigningOut(true);
    await authClient.signOut();
    setIsSigningOut(false);
    router.replace('/');
  };

  const deleteAccount = async () => {
    setIsDeletingAccount(true);

    try {
      await apiFetch('/api/mobile/profile', { method: 'DELETE' });
      await authClient.signOut().catch(() => undefined);
      router.replace('/');
    } catch (error) {
      Alert.alert(
        'Suppression impossible',
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue pendant la suppression RGPD.',
      );
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Supprimer mes données',
      'Cette action anonymise votre compte, supprime votre journal, vos diagnostics et ferme vos sessions. Elle est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            void deleteAccount();
          },
        },
      ],
    );
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
            title="Espace personnel"
            description="Connectez-vous pour consulter votre profil, votre historique et vos outils personnels."
          />
        </View>
      </SafeAreaView>
    );
  }

  const firstName = session.user.name?.split(' ')[0] ?? 'Utilisateur';
  const initials = session.user.name
    ?.split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials || 'U'}</Text>
          </View>
          <Text style={styles.title}>Bonjour {firstName}</Text>
          <Text style={styles.email}>{session.user.email}</Text>
          <View style={styles.statusBadge}>
            <MaterialIcons name="verified-user" size={16} color={palette.brand} />
            <Text style={styles.statusText}>Utilisateur connecté</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <MaterialIcons name="assignment" size={24} color={palette.brand} />
            <Text style={styles.statValue}>
              {isLoadingSummary ? '...' : (summary?.stats.latestStressScore ?? '—')}
            </Text>
            <Text style={styles.statLabel}>Dernier score stress</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="menu-book" size={24} color={palette.zen} />
            <Text style={styles.statValue}>
              {isLoadingSummary ? '...' : (summary?.stats.journalEntriesCount ?? 0)}
            </Text>
            <Text style={styles.statLabel}>Entrées journal</Text>
          </View>
        </View>

        <View style={styles.quickSection}>
          <Text style={styles.sectionTitle}>Outils rapides</Text>
          <QuickLink href="/diagnostic" icon="assignment" title="Refaire le diagnostic" />
          <QuickLink href="/journal" icon="menu-book" title="Ajouter une émotion" />
          <QuickLink href="/respiration" icon="air" title="Lancer une respiration" />
        </View>

        <View style={styles.rgpdCard}>
          <MaterialIcons name="privacy-tip" size={26} color={palette.brand} />
          <View style={styles.rgpdText}>
            <Text style={styles.rgpdTitle}>Données personnelles</Text>
            <Text style={styles.rgpdDescription}>
              Votre journal et vos diagnostics sont associés à votre compte et protégés par votre session.
            </Text>
          </View>
        </View>

        <View style={styles.deleteCard}>
          <View style={styles.deleteHeader}>
            <View style={styles.deleteIcon}>
              <MaterialIcons name="delete-outline" size={24} color={palette.destructive} />
            </View>
            <View style={styles.deleteText}>
              <Text style={styles.deleteTitle}>Suppression RGPD</Text>
              <Text style={styles.deleteDescription}>
                Supprimez vos données de santé, votre journal et vos diagnostics. Le compte est
                anonymisé puis désactivé.
              </Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            disabled={isDeletingAccount}
            onPress={confirmDeleteAccount}
            style={[styles.deleteButton, isDeletingAccount ? styles.buttonDisabled : undefined]}>
            {isDeletingAccount ? (
              <ActivityIndicator color={palette.destructive} />
            ) : (
              <>
                <MaterialIcons name="privacy-tip" size={20} color={palette.destructive} />
                <Text style={styles.deleteButtonText}>Supprimer mes données</Text>
              </>
            )}
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          disabled={isSigningOut}
          onPress={signOut}
          style={[styles.signOutButton, isSigningOut ? styles.buttonDisabled : undefined]}>
          {isSigningOut ? (
            <ActivityIndicator color={palette.destructive} />
          ) : (
            <>
              <MaterialIcons name="logout" size={20} color={palette.destructive} />
              <Text style={styles.signOutText}>Déconnexion</Text>
            </>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickLink({
  href,
  icon,
  title,
}: {
  href: '/diagnostic' | '/journal' | '/respiration';
  icon: 'assignment' | 'menu-book' | 'air';
  title: string;
}) {
  return (
    <Link href={href} asChild>
      <Pressable accessibilityRole="link" style={styles.quickLink}>
        <View style={styles.quickIcon}>
          <MaterialIcons name={icon} size={22} color={palette.brand} />
        </View>
        <Text style={styles.quickText}>{title}</Text>
        <MaterialIcons name="chevron-right" size={22} color={palette.muted} />
      </Pressable>
    </Link>
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
  profileCard: {
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 26,
    backgroundColor: palette.card,
    padding: 24,
  },
  avatar: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
    backgroundColor: palette.brand,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
  },
  title: {
    color: palette.foreground,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  email: {
    color: palette.muted,
    fontSize: 14,
    textAlign: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    backgroundColor: palette.brandSoft,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  statusText: {
    color: palette.brand,
    fontSize: 13,
    fontWeight: '900',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    gap: 8,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 20,
    backgroundColor: palette.card,
    padding: 16,
  },
  statValue: {
    color: palette.foreground,
    fontSize: 26,
    fontWeight: '900',
  },
  statLabel: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  quickSection: {
    gap: 12,
  },
  sectionTitle: {
    color: palette.foreground,
    fontSize: 22,
    fontWeight: '900',
  },
  quickLink: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 18,
    backgroundColor: palette.card,
    padding: 14,
  },
  quickIcon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: palette.brandSoft,
  },
  quickText: {
    flex: 1,
    color: palette.foreground,
    fontSize: 15,
    fontWeight: '900',
  },
  rgpdCard: {
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 20,
    backgroundColor: palette.brandSoft,
    padding: 16,
  },
  rgpdText: {
    flex: 1,
    gap: 4,
  },
  rgpdTitle: {
    color: palette.foreground,
    fontSize: 16,
    fontWeight: '900',
  },
  rgpdDescription: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  deleteCard: {
    gap: 14,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 20,
    backgroundColor: '#fff7f7',
    padding: 16,
  },
  deleteHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  deleteIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: palette.destructiveSoft,
  },
  deleteText: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  deleteTitle: {
    color: palette.foreground,
    fontSize: 16,
    fontWeight: '900',
  },
  deleteDescription: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  deleteButton: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 16,
    backgroundColor: palette.destructiveSoft,
  },
  deleteButtonText: {
    color: palette.destructive,
    fontSize: 15,
    fontWeight: '900',
  },
  signOutButton: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 16,
    backgroundColor: palette.destructiveSoft,
  },
  signOutText: {
    color: palette.destructive,
    fontSize: 16,
    fontWeight: '900',
  },
  buttonDisabled: {
    opacity: 0.75,
  },
});

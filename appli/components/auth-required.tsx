import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { palette } from '@/constants/cesizen';

export function LoadingState({ label = 'Chargement...' }: { label?: string }) {
  return (
    <View style={styles.stateCard}>
      <ActivityIndicator color={palette.brand} />
      <Text style={styles.stateText}>{label}</Text>
    </View>
  );
}

export function AuthRequired({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View style={styles.stateCard}>
      <View style={styles.iconBadge}>
        <MaterialIcons name="lock-outline" size={26} color={palette.brand} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.actions}>
        <Link href="/auth/connexion" asChild>
          <Pressable accessibilityRole="link" style={styles.primaryButton}>
            <MaterialIcons name="login" size={20} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Se connecter</Text>
          </Pressable>
        </Link>
        <Link href="/auth/inscription" asChild>
          <Pressable accessibilityRole="link" style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Créer un compte</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stateCard: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 24,
    backgroundColor: palette.card,
    padding: 24,
  },
  iconBadge: {
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: palette.brandSoft,
  },
  title: {
    color: palette.foreground,
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
  description: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  stateText: {
    color: palette.muted,
    fontSize: 15,
    fontWeight: '700',
  },
  actions: {
    width: '100%',
    gap: 10,
    marginTop: 4,
  },
  primaryButton: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    backgroundColor: palette.brand,
    paddingHorizontal: 18,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 16,
    backgroundColor: palette.background,
    paddingHorizontal: 18,
  },
  secondaryButtonText: {
    color: palette.brand,
    fontSize: 16,
    fontWeight: '800',
  },
});

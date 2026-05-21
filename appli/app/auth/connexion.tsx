import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { authClient } from '@/lib/auth-client';

const palette = {
  background: '#fdfcf8',
  card: '#ffffff',
  foreground: '#09090b',
  muted: '#475569',
  border: '#dbe5df',
  brand: '#225c40',
  brandDark: '#123a27',
  brandSoft: '#e6f2ea',
  destructive: '#b91c1c',
  destructiveSoft: '#fee2e2',
  zen: '#d98324',
};

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (!email.trim() || !password) {
      setErrorMessage('Renseignez votre e-mail et votre mot de passe.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const { error } = await authClient.signIn.email({
      email: email.trim(),
      password,
      rememberMe: true,
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Identifiants incorrects. Veuillez réessayer.');
      return;
    }

    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.logoBadge}>
                <MaterialIcons name="favorite" size={30} color={palette.brand} />
              </View>
              <Text style={styles.title}>Bon retour</Text>
              <Text style={styles.subtitle}>
                Connectez-vous pour accéder à votre espace de suivi CESIZen.
              </Text>
            </View>

            {errorMessage ? (
              <View style={styles.errorBox}>
                <MaterialIcons name="error-outline" size={20} color={palette.destructive} />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            <View style={styles.form}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Adresse e-mail</Text>
                <View style={styles.inputWrapper}>
                  <MaterialIcons name="mail-outline" size={20} color={palette.muted} />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="prenom.nom@exemple.fr"
                    placeholderTextColor="#94a3b8"
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    editable={!isLoading}
                    style={styles.input}
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Mot de passe</Text>
                <View style={styles.inputWrapper}>
                  <MaterialIcons name="lock-outline" size={20} color={palette.muted} />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Votre mot de passe"
                    placeholderTextColor="#94a3b8"
                    autoCapitalize="none"
                    autoComplete="password"
                    secureTextEntry
                    editable={!isLoading}
                    style={styles.input}
                  />
                </View>
              </View>

              <Pressable
                accessibilityRole="button"
                disabled={isLoading}
                onPress={handleSubmit}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && !isLoading ? styles.buttonPressed : undefined,
                  isLoading ? styles.buttonDisabled : undefined,
                ]}>
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <>
                    <MaterialIcons name="login" size={20} color="#ffffff" />
                    <Text style={styles.primaryButtonText}>Se connecter</Text>
                  </>
                )}
              </Pressable>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>{"Vous n'avez pas encore de compte ? "}</Text>
              <Link href="/auth/inscription" asChild>
                <Pressable accessibilityRole="link">
                  <Text style={styles.footerLink}>Créer un compte</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    gap: 24,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 28,
    backgroundColor: palette.card,
    padding: 24,
    elevation: 4,
  },
  header: {
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: palette.brandSoft,
  },
  title: {
    color: palette.foreground,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
    textAlign: 'center',
  },
  subtitle: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 16,
    backgroundColor: palette.destructiveSoft,
    padding: 14,
  },
  errorText: {
    flex: 1,
    color: palette.destructive,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  form: {
    gap: 18,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    color: palette.foreground,
    fontSize: 14,
    fontWeight: '700',
  },
  inputWrapper: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 16,
    backgroundColor: palette.background,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    minWidth: 0,
    color: palette.foreground,
    fontSize: 16,
    lineHeight: 22,
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
  buttonPressed: {
    backgroundColor: palette.brandDark,
    transform: [{ scale: 0.99 }],
  },
  buttonDisabled: {
    opacity: 0.75,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  footerLink: {
    color: palette.brand,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '800',
  },
});

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
  zenSoft: '#fff4e5',
};

type SignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpForm>({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
  });
  const [hasAcceptedPrivacy, setHasAcceptedPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = (field: keyof SignUpForm) => (value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async () => {
    const age = Number.parseInt(formData.age, 10);

    setErrorMessage('');

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setErrorMessage('Renseignez vos informations personnelles.');
      return;
    }

    if (!Number.isFinite(age) || age < 13) {
      setErrorMessage('Vous devez avoir au moins 13 ans pour utiliser CESIZen.');
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    if (!hasAcceptedPrivacy) {
      setErrorMessage('Vous devez accepter la politique de protection des données.');
      return;
    }

    type SignUpPayload = Parameters<typeof authClient.signUp.email>[0] & {
      firstName: string;
      lastName: string;
      age: number;
    };

    const payload: SignUpPayload = {
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email.trim(),
      password: formData.password,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      age,
    };

    setIsLoading(true);

    const { error } = await authClient.signUp.email(payload);

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message || "Une erreur est survenue lors de l'inscription.");
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
                <MaterialIcons name="favorite" size={28} color={palette.brand} />
              </View>
              <Text style={styles.title}>Rejoindre CESIZen</Text>
              <Text style={styles.subtitle}>
                Créez votre compte pour suivre votre stress et votre bien-être.
              </Text>
            </View>

            {errorMessage ? (
              <View style={styles.errorBox}>
                <MaterialIcons name="error-outline" size={20} color={palette.destructive} />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            <View style={styles.form}>
              <View style={styles.inlineFields}>
                <View style={styles.inlineField}>
                  <Text style={styles.label}>Prénom</Text>
                  <View style={styles.inputWrapper}>
                    <MaterialIcons name="person-outline" size={20} color={palette.muted} />
                    <TextInput
                      value={formData.firstName}
                      onChangeText={updateField('firstName')}
                      placeholder="Jean"
                      placeholderTextColor="#94a3b8"
                      autoComplete="given-name"
                      editable={!isLoading}
                      style={styles.input}
                    />
                  </View>
                </View>

                <View style={styles.inlineField}>
                  <Text style={styles.label}>Nom</Text>
                  <View style={styles.inputWrapper}>
                    <MaterialIcons name="badge" size={20} color={palette.muted} />
                    <TextInput
                      value={formData.lastName}
                      onChangeText={updateField('lastName')}
                      placeholder="Dupont"
                      placeholderTextColor="#94a3b8"
                      autoComplete="family-name"
                      editable={!isLoading}
                      style={styles.input}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Adresse e-mail</Text>
                <View style={styles.inputWrapper}>
                  <MaterialIcons name="mail-outline" size={20} color={palette.muted} />
                  <TextInput
                    value={formData.email}
                    onChangeText={updateField('email')}
                    placeholder="jean.dupont@exemple.fr"
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
                <Text style={styles.label}>Âge</Text>
                <View style={styles.inputWrapper}>
                  <MaterialIcons name="cake" size={20} color={palette.muted} />
                  <TextInput
                    value={formData.age}
                    onChangeText={updateField('age')}
                    placeholder="25"
                    placeholderTextColor="#94a3b8"
                    keyboardType="number-pad"
                    editable={!isLoading}
                    style={styles.input}
                  />
                </View>
              </View>

              <View style={styles.inlineFields}>
                <View style={styles.inlineField}>
                  <Text style={styles.label}>Mot de passe</Text>
                  <View style={styles.inputWrapper}>
                    <MaterialIcons name="lock-outline" size={20} color={palette.muted} />
                    <TextInput
                      value={formData.password}
                      onChangeText={updateField('password')}
                      placeholder="8 caractères minimum"
                      placeholderTextColor="#94a3b8"
                      autoCapitalize="none"
                      autoComplete="new-password"
                      secureTextEntry
                      editable={!isLoading}
                      style={styles.input}
                    />
                  </View>
                </View>

                <View style={styles.inlineField}>
                  <Text style={styles.label}>Confirmation</Text>
                  <View style={styles.inputWrapper}>
                    <MaterialIcons name="verified-user" size={20} color={palette.muted} />
                    <TextInput
                      value={formData.confirmPassword}
                      onChangeText={updateField('confirmPassword')}
                      placeholder="Confirmer"
                      placeholderTextColor="#94a3b8"
                      autoCapitalize="none"
                      autoComplete="new-password"
                      secureTextEntry
                      editable={!isLoading}
                      style={styles.input}
                    />
                  </View>
                </View>
              </View>

              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: hasAcceptedPrivacy }}
                disabled={isLoading}
                onPress={() => setHasAcceptedPrivacy((current) => !current)}
                style={({ pressed }) => [
                  styles.privacyBox,
                  pressed && !isLoading ? styles.privacyBoxPressed : undefined,
                ]}>
                <View style={[styles.checkbox, hasAcceptedPrivacy ? styles.checkboxChecked : undefined]}>
                  {hasAcceptedPrivacy ? (
                    <MaterialIcons name="check" size={16} color="#ffffff" />
                  ) : null}
                </View>
                <Text style={styles.privacyText}>
                  {"J'accepte la politique de protection des données personnelles et de santé."}
                </Text>
              </Pressable>

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
                    <MaterialIcons name="person-add-alt-1" size={20} color="#ffffff" />
                    <Text style={styles.primaryButtonText}>Créer mon compte</Text>
                  </>
                )}
              </Pressable>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Déjà un compte ? </Text>
              <Link href="/auth/connexion" asChild>
                <Pressable accessibilityRole="link">
                  <Text style={styles.footerLink}>Se connecter</Text>
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
    maxWidth: 560,
    alignSelf: 'center',
    gap: 22,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 28,
    backgroundColor: palette.card,
    padding: 22,
    elevation: 4,
  },
  header: {
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: palette.brandSoft,
  },
  title: {
    color: palette.foreground,
    fontSize: 29,
    fontWeight: '800',
    lineHeight: 35,
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
    gap: 16,
  },
  inlineFields: {
    gap: 16,
  },
  inlineField: {
    flex: 1,
    gap: 8,
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
  privacyBox: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 16,
    backgroundColor: palette.zenSoft,
    padding: 14,
  },
  privacyBoxPressed: {
    borderColor: palette.zen,
  },
  checkbox: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: palette.brand,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  checkboxChecked: {
    backgroundColor: palette.brand,
  },
  privacyText: {
    flex: 1,
    color: palette.foreground,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
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

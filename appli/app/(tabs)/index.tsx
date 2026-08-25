import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette } from '@/constants/cesizen';
import { authClient } from '@/lib/auth-client';

type IconName = ComponentProps<typeof MaterialIcons>['name'];
type AppHref =
  | '/auth/connexion'
  | '/auth/inscription'
  | '/diagnostic'
  | '/informations'
  | '/journal'
  | '/profil'
  | '/respiration';

type ModuleCard = {
  title: string;
  description: string;
  href: AppHref;
  icon: IconName;
  access: string;
  color: string;
  backgroundColor: string;
};

const modules: ModuleCard[] = [
  {
    title: 'Informations',
    description: 'Des contenus de prévention publiés depuis le back-office CESIZen.',
    href: '/informations',
    icon: 'article',
    access: 'Public',
    color: palette.foreground,
    backgroundColor: '#eef2f7',
  },
  {
    title: 'Diagnostic de stress',
    description: 'Un questionnaire inspiré de Holmes et Rahe pour situer votre charge mentale.',
    href: '/diagnostic',
    icon: 'assignment',
    access: 'Public, sauvegarde connectée',
    color: palette.brand,
    backgroundColor: palette.brandSoft,
  },
  {
    title: 'Respiration guidée',
    description: 'Des cycles animés pour respirer, ralentir et retrouver un rythme stable.',
    href: '/respiration',
    icon: 'air',
    access: 'Public',
    color: palette.blue,
    backgroundColor: palette.blueSoft,
  },
  {
    title: 'Journal émotionnel',
    description: 'Un espace personnel pour choisir une émotion et noter ce qui compte.',
    href: '/journal',
    icon: 'menu-book',
    access: 'Connecté',
    color: palette.zen,
    backgroundColor: palette.zenSoft,
  },
];

const daySteps = [
  { title: 'Respirer', detail: '1 minute pour vous poser', icon: 'air' as IconName },
  { title: 'Évaluer', detail: 'Un point rapide sur le stress', icon: 'assignment' as IconName },
  { title: 'Noter', detail: 'Une émotion dans le journal', icon: 'edit-note' as IconName },
];

export default function HomeScreen() {
  const { data: session } = authClient.useSession();
  const firstName = session?.user.name?.split(' ')[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroTopRow}>
            <View style={styles.logoBadge}>
              <MaterialIcons name="favorite" size={30} color={palette.brand} />
            </View>
            <View style={styles.sessionPill}>
              <MaterialIcons
                name={session ? 'verified-user' : 'lock-open'}
                size={16}
                color={session ? palette.brand : palette.muted}
              />
              <Text style={styles.sessionPillText}>{session ? 'Connecté' : 'Mode visiteur'}</Text>
            </View>
          </View>

          <Text style={styles.kicker}>CESIZen mobile</Text>
          <Text style={styles.title}>
            {session
              ? `Bonjour ${firstName ?? 'à vous'}, prenez soin de votre équilibre`
              : 'Votre compagnon pour mieux comprendre votre stress'}
          </Text>
          <Text style={styles.subtitle}>
            Des outils courts, lisibles et pensés mobile pour respirer, évaluer votre stress et
            suivre vos émotions.
          </Text>

          <View style={styles.heroActions}>
            <Link href={session ? '/journal' : '/auth/inscription'} asChild>
              <Pressable accessibilityRole="link" style={styles.primaryButton}>
                <MaterialIcons
                  name={session ? 'menu-book' : 'person-add-alt-1'}
                  size={20}
                  color="#ffffff"
                />
                <Text style={styles.primaryButtonText}>
                  {session ? 'Ouvrir mon journal' : 'Créer mon compte'}
                </Text>
              </Pressable>
            </Link>
            <Link href={session ? '/profil' : '/auth/connexion'} asChild>
              <Pressable accessibilityRole="link" style={styles.secondaryButton}>
                <MaterialIcons
                  name={session ? 'person' : 'login'}
                  size={20}
                  color={palette.brand}
                />
                <Text style={styles.secondaryButtonText}>
                  {session ? 'Mon profil' : 'Se connecter'}
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>4</Text>
            <Text style={styles.metricLabel}>outils</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>3</Text>
            <Text style={styles.metricLabel}>accès publics</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>RGPD</Text>
            <Text style={styles.metricLabel}>profil</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Votre parcours du jour</Text>
          <Text style={styles.sectionDescription}>
            Trois gestes simples pour faire le point sans transformer l’app en corvée.
          </Text>
        </View>

        <View style={styles.stepList}>
          {daySteps.map((step, index) => (
            <View key={step.title} style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepIcon}>
                <MaterialIcons name={step.icon} size={21} color={palette.brand} />
              </View>
              <View style={styles.stepText}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDetail}>{step.detail}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Modules CESIZen</Text>
          <Text style={styles.sectionDescription}>
            Les fonctionnalités principales restent rapides à atteindre depuis la navigation basse.
          </Text>
        </View>

        <View style={styles.moduleList}>
          {modules.map((module) => (
            <Link key={module.title} href={module.href} asChild>
              <Pressable accessibilityRole="link" style={styles.moduleCard}>
                <View style={[styles.moduleIcon, { backgroundColor: module.backgroundColor }]}>
                  <MaterialIcons name={module.icon} size={25} color={module.color} />
                </View>
                <View style={styles.moduleText}>
                  <View style={styles.moduleTitleRow}>
                    <Text style={styles.moduleTitle}>{module.title}</Text>
                    <View style={styles.accessPill}>
                      <Text style={styles.accessPillText}>{module.access}</Text>
                    </View>
                  </View>
                  <Text style={styles.moduleDescription}>{module.description}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={23} color={palette.muted} />
              </Pressable>
            </Link>
          ))}
        </View>

        <View style={styles.infoBand}>
          <View style={styles.infoIcon}>
            <MaterialIcons name="privacy-tip" size={25} color={palette.brand} />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Confidentialité intégrée</Text>
            <Text style={styles.infoDescription}>
              Le diagnostic et la respiration sont accessibles en visiteur. Le journal, l’historique
              et la suppression RGPD demandent une session connectée.
            </Text>
          </View>
        </View>

        {!session ? (
          <View style={styles.signupBand}>
            <Text style={styles.signupTitle}>Pourquoi créer un compte ?</Text>
            <Text style={styles.signupDescription}>
              Pour sauvegarder vos diagnostics, tenir votre journal émotionnel et gérer vos données
              personnelles depuis le profil.
            </Text>
            <Link href="/auth/inscription" asChild>
              <Pressable accessibilityRole="link" style={styles.signupButton}>
                <Text style={styles.signupButtonText}>Commencer</Text>
                <MaterialIcons name="arrow-forward" size={18} color="#ffffff" />
              </Pressable>
            </Link>
          </View>
        ) : null}
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
    gap: 22,
    padding: 20,
    paddingBottom: 36,
  },
  hero: {
    gap: 14,
    borderRadius: 30,
    backgroundColor: palette.brandSoft,
    padding: 22,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  logoBadge: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: palette.card,
  },
  sessionPill: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 999,
    backgroundColor: palette.card,
    paddingHorizontal: 12,
  },
  sessionPillText: {
    color: palette.foreground,
    fontSize: 12,
    fontWeight: '900',
  },
  kicker: {
    color: palette.brand,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: palette.brandDark,
    fontSize: 33,
    fontWeight: '900',
    lineHeight: 39,
  },
  subtitle: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  heroActions: {
    gap: 11,
    marginTop: 4,
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
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 16,
    backgroundColor: palette.card,
    paddingHorizontal: 18,
  },
  secondaryButtonText: {
    color: palette.brand,
    fontSize: 16,
    fontWeight: '900',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metricBox: {
    minHeight: 76,
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 18,
    backgroundColor: palette.card,
    paddingHorizontal: 12,
  },
  metricValue: {
    color: palette.foreground,
    fontSize: 21,
    fontWeight: '900',
    textAlign: 'center',
  },
  metricLabel: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  sectionHeader: {
    gap: 6,
  },
  sectionTitle: {
    color: palette.foreground,
    fontSize: 22,
    fontWeight: '900',
  },
  sectionDescription: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  stepList: {
    gap: 10,
  },
  stepItem: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 18,
    backgroundColor: palette.card,
    padding: 13,
  },
  stepNumber: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: palette.foreground,
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
  stepIcon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: palette.brandSoft,
  },
  stepText: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  stepTitle: {
    color: palette.foreground,
    fontSize: 15,
    fontWeight: '900',
  },
  stepDetail: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  moduleList: {
    gap: 12,
  },
  moduleCard: {
    minHeight: 104,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 20,
    backgroundColor: palette.card,
    padding: 15,
  },
  moduleIcon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  moduleText: {
    flex: 1,
    minWidth: 0,
    gap: 5,
  },
  moduleTitleRow: {
    gap: 6,
  },
  moduleTitle: {
    color: palette.foreground,
    fontSize: 16,
    fontWeight: '900',
  },
  moduleDescription: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  accessPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: palette.background,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  accessPillText: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '900',
  },
  infoBand: {
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 20,
    backgroundColor: palette.card,
    padding: 16,
  },
  infoIcon: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: palette.brandSoft,
  },
  infoText: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  infoTitle: {
    color: palette.foreground,
    fontSize: 16,
    fontWeight: '900',
  },
  infoDescription: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  signupBand: {
    gap: 10,
    borderRadius: 22,
    backgroundColor: palette.foreground,
    padding: 18,
  },
  signupTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
  },
  signupDescription: {
    color: '#dbe5df',
    fontSize: 14,
    lineHeight: 20,
  },
  signupButton: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 15,
    backgroundColor: palette.brand,
    paddingHorizontal: 16,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
  },
});

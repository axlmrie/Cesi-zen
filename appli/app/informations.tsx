import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette } from '@/constants/cesizen';
import { apiFetch } from '@/lib/api-client';

type InfoPage = {
  id: string;
  titre: string;
  slug: string;
  contenu: string;
  dateMaj: string;
};

export default function InformationsScreen() {
  const [pages, setPages] = useState<InfoPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    apiFetch<{ pages: InfoPage[] }>('/api/mobile/informations')
      .then((data) => {
        if (isMounted) {
          setPages(data.pages);
          setErrorMessage('');
        }
      })
      .catch((error) => {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error ? error.message : 'Impossible de charger les informations.',
          );
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconBadge}>
            <MaterialIcons name="article" size={30} color={palette.brand} />
          </View>
          <Text style={styles.title}>Informations santé mentale</Text>
          <Text style={styles.subtitle}>
            Des contenus de prévention accessibles aux visiteurs comme aux utilisateurs connectés.
          </Text>
        </View>

        {isLoading ? (
          <View style={styles.stateCard}>
            <ActivityIndicator color={palette.brand} />
            <Text style={styles.stateText}>Chargement des contenus...</Text>
          </View>
        ) : null}

        {!isLoading && errorMessage ? (
          <View style={styles.stateCard}>
            <MaterialIcons name="error-outline" size={28} color={palette.destructive} />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {!isLoading && !errorMessage && pages.length === 0 ? (
          <View style={styles.stateCard}>
            <MaterialIcons name="article" size={28} color={palette.muted} />
            <Text style={styles.stateText}>
              Aucun contenu publié pour le moment. Les pages créées par l’administration
              apparaîtront ici.
            </Text>
          </View>
        ) : null}

        {pages.map((page) => (
          <View key={page.id} style={styles.pageCard}>
            <Text style={styles.pageTitle}>{page.titre}</Text>
            <Text style={styles.pageDate}>
              Mis à jour le{' '}
              {new Date(page.dateMaj).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
            <Text style={styles.pageContent}>{page.contenu}</Text>
          </View>
        ))}
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
    gap: 16,
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
    fontSize: 29,
    fontWeight: '900',
    lineHeight: 35,
    textAlign: 'center',
  },
  subtitle: {
    maxWidth: 520,
    color: palette.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  stateCard: {
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 20,
    backgroundColor: palette.card,
    padding: 18,
  },
  stateText: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  errorText: {
    color: palette.destructive,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '800',
  },
  pageCard: {
    gap: 8,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 20,
    backgroundColor: palette.card,
    padding: 18,
  },
  pageTitle: {
    color: palette.foreground,
    fontSize: 20,
    fontWeight: '900',
  },
  pageDate: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: '800',
  },
  pageContent: {
    color: palette.foreground,
    fontSize: 15,
    lineHeight: 23,
  },
});

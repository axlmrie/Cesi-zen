import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { apiFetch } from '@/lib/api-client';
import { authClient } from '@/lib/auth-client';
import { fallbackExercises, palette, type BreathingExercise } from '@/constants/cesizen';

type Phase = 'Prêt' | 'Inspirer' | 'Retenir' | 'Expirer';

export default function RespirationScreen() {
  const { data: session } = authClient.useSession();
  const [exercises, setExercises] = useState<BreathingExercise[]>(fallbackExercises);
  const [selectedId, setSelectedId] = useState(fallbackExercises[0].id);
  const [durationInMinutes, setDurationInMinutes] = useState(3);
  const [timeLeft, setTimeLeft] = useState(180);
  const [phase, setPhase] = useState<Phase>('Prêt');
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const breathScale = useRef(new Animated.Value(0.86)).current;
  const breathOpacity = useRef(new Animated.Value(0.62)).current;
  const haloScale = useRef(new Animated.Value(1)).current;
  const haloOpacity = useRef(new Animated.Value(0.18)).current;

  const selectedExercise = useMemo(
    () => exercises.find((exercise) => exercise.id === selectedId) ?? exercises[0],
    [exercises, selectedId],
  );

  useEffect(() => {
    let isMounted = true;

    apiFetch<{ exercices: BreathingExercise[] }>('/api/mobile/respiration')
      .then(({ exercices }) => {
        if (!isMounted || exercices.length === 0) {
          return;
        }
        setExercises(exercices);
        setSelectedId(exercices[0].id);
      })
      .catch(() => {
        if (isMounted) {
          setExercises(fallbackExercises);
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

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      setPhase('Prêt');
    }
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (!isActive || !selectedExercise) {
      if (!isFinished) {
        setPhase('Prêt');
      }
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    const runCycle = () => {
      setPhase('Inspirer');
      timer = setTimeout(() => {
        if (selectedExercise.retenueSec > 0) {
          setPhase('Retenir');
          timer = setTimeout(() => {
            setPhase('Expirer');
            timer = setTimeout(runCycle, selectedExercise.expirationSec * 1000);
          }, selectedExercise.retenueSec * 1000);
          return;
        }

        setPhase('Expirer');
        timer = setTimeout(runCycle, selectedExercise.expirationSec * 1000);
      }, selectedExercise.inspirationSec * 1000);
    };

    runCycle();

    return () => clearTimeout(timer);
  }, [isActive, isFinished, selectedExercise]);

  useEffect(() => {
    const phaseDuration =
      phase === 'Inspirer'
        ? selectedExercise.inspirationSec * 1000
        : phase === 'Retenir'
          ? Math.max(selectedExercise.retenueSec * 1000, 650)
          : phase === 'Expirer'
            ? selectedExercise.expirationSec * 1000
            : 450;

    const targetScale =
      phase === 'Inspirer' || phase === 'Retenir' ? 1.24 : phase === 'Expirer' ? 0.62 : 0.86;
    const targetOpacity =
      phase === 'Inspirer' ? 0.9 : phase === 'Retenir' ? 0.78 : phase === 'Expirer' ? 0.45 : 0.62;

    Animated.parallel([
      Animated.timing(breathScale, {
        toValue: targetScale,
        duration: phaseDuration,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(breathOpacity, {
        toValue: targetOpacity,
        duration: phaseDuration,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(haloScale, {
        toValue: targetScale + 0.18,
        duration: phaseDuration,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(haloOpacity, {
        toValue: isActive ? 0.22 : 0.12,
        duration: phaseDuration,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [breathOpacity, breathScale, haloOpacity, haloScale, isActive, phase, selectedExercise]);

  const resetTime = (minutes: number) => {
    setDurationInMinutes(minutes);
    setTimeLeft(minutes * 60);
    setIsFinished(false);
    setPhase('Prêt');
  };

  const toggleExercise = () => {
    if (!isActive && isFinished) {
      resetTime(durationInMinutes);
    }
    setIsActive((current) => !current);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconBadge}>
            <MaterialIcons name="air" size={30} color={palette.brand} />
          </View>
          <Text style={styles.title}>Respiration guidée</Text>
          <Text style={styles.subtitle}>
            {"Synchronisez votre souffle avec l'animation. Ce module est accessible même sans compte."}
          </Text>
        </View>

        {!session ? (
          <View style={styles.publicNotice}>
            <MaterialIcons name="info-outline" size={20} color={palette.brand} />
            <Text style={styles.publicNoticeText}>
              Connectez-vous pour retrouver tous vos outils de suivi au même endroit.
            </Text>
            <Link href="/auth/connexion" asChild>
              <Pressable accessibilityRole="link">
                <Text style={styles.noticeLink}>Connexion</Text>
              </Pressable>
            </Link>
          </View>
        ) : null}

        <View style={styles.card}>
          {isLoading ? (
            <View style={styles.loadingInline}>
              <ActivityIndicator color={palette.brand} />
              <Text style={styles.mutedText}>Chargement des exercices...</Text>
            </View>
          ) : null}

          <View style={styles.exerciseList}>
            {exercises.map((exercise) => {
              const isSelected = exercise.id === selectedId;
              return (
                <Pressable
                  key={exercise.id}
                  accessibilityRole="button"
                  disabled={isActive}
                  onPress={() => {
                    setSelectedId(exercise.id);
                    resetTime(durationInMinutes);
                  }}
                  style={[styles.exercisePill, isSelected ? styles.exercisePillSelected : undefined]}>
                  <Text style={[styles.exercisePillText, isSelected ? styles.exercisePillTextSelected : undefined]}>
                    {exercise.titre}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.durationRow}>
            {[1, 3, 5].map((minutes) => (
              <Pressable
                key={minutes}
                accessibilityRole="button"
                disabled={isActive}
                onPress={() => resetTime(minutes)}
                style={[
                  styles.durationButton,
                  durationInMinutes === minutes ? styles.durationButtonSelected : undefined,
                ]}>
                <Text
                  style={[
                    styles.durationButtonText,
                    durationInMinutes === minutes ? styles.durationButtonTextSelected : undefined,
                  ]}>
                  {minutes} min
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.breathArea}>
            <Animated.View
              style={[
                styles.breathHalo,
                {
                  opacity: haloOpacity,
                  transform: [{ scale: haloScale }],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.breathCircle,
                {
                  opacity: breathOpacity,
                  transform: [{ scale: breathScale }],
                },
              ]}
            >
              <View style={styles.breathCore} />
            </Animated.View>
            <View style={styles.phaseContent}>
              <Text style={styles.phase}>{isFinished ? 'Terminé' : phase}</Text>
              <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
              <Text style={styles.phaseHint}>
                {phase === 'Inspirer'
                  ? 'Le cercle grandit, inspirez lentement'
                  : phase === 'Retenir'
                    ? 'Gardez l’air quelques secondes'
                    : phase === 'Expirer'
                      ? 'Le cercle se referme, expirez doucement'
                      : 'Installez-vous confortablement'}
              </Text>
            </View>
          </View>

          <View style={styles.exerciseMeta}>
            <Text style={styles.metaText}>
              Inspiration {selectedExercise.inspirationSec}s
              {selectedExercise.retenueSec > 0 ? ` · Retenue ${selectedExercise.retenueSec}s` : ''}
              {' · '}
              Expiration {selectedExercise.expirationSec}s
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={toggleExercise}
            style={[styles.primaryButton, isActive ? styles.stopButton : undefined]}>
            <MaterialIcons name={isActive ? 'stop' : 'play-arrow'} size={24} color="#ffffff" />
            <Text style={styles.primaryButtonText}>
              {isActive ? 'Arrêter' : isFinished ? 'Refaire une séance' : 'Commencer'}
            </Text>
          </Pressable>
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
  publicNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 18,
    backgroundColor: palette.card,
    padding: 14,
  },
  publicNoticeText: {
    flex: 1,
    color: palette.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  noticeLink: {
    color: palette.brand,
    fontSize: 13,
    fontWeight: '900',
  },
  card: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    gap: 20,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 26,
    backgroundColor: palette.card,
    padding: 20,
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
  exerciseList: {
    gap: 10,
  },
  exercisePill: {
    minHeight: 46,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 15,
    backgroundColor: palette.background,
    paddingHorizontal: 14,
  },
  exercisePillSelected: {
    borderColor: palette.brand,
    backgroundColor: palette.brandSoft,
  },
  exercisePillText: {
    color: palette.muted,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
  exercisePillTextSelected: {
    color: palette.brand,
  },
  durationRow: {
    flexDirection: 'row',
    gap: 8,
    borderRadius: 16,
    backgroundColor: palette.background,
    padding: 5,
  },
  durationButton: {
    minHeight: 42,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  durationButtonSelected: {
    backgroundColor: palette.card,
  },
  durationButtonText: {
    color: palette.muted,
    fontSize: 14,
    fontWeight: '800',
  },
  durationButtonTextSelected: {
    color: palette.foreground,
  },
  breathArea: {
    height: 290,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathHalo: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderWidth: 2,
    borderColor: '#6fb493',
    borderRadius: 105,
    backgroundColor: '#d7f0e2',
  },
  breathCircle: {
    position: 'absolute',
    width: 185,
    height: 185,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#77b69a',
    borderRadius: 93,
    backgroundColor: '#d9efe3',
  },
  breathCore: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#ffffff',
    opacity: 0.78,
  },
  phaseContent: {
    alignItems: 'center',
    gap: 8,
    maxWidth: 220,
  },
  phase: {
    color: palette.brand,
    fontSize: 24,
    fontWeight: '900',
  },
  timer: {
    color: palette.foreground,
    fontSize: 38,
    fontWeight: '900',
  },
  phaseHint: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '700',
  },
  exerciseMeta: {
    alignItems: 'center',
  },
  metaText: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
  primaryButton: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 17,
    backgroundColor: palette.brand,
  },
  stopButton: {
    backgroundColor: palette.destructive,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
});

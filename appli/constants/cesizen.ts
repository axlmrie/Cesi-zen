export const palette = {
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
  blue: '#2563eb',
  blueSoft: '#eaf2ff',
  amber: '#b45309',
  amberSoft: '#fef3c7',
};

export type BreathingExercise = {
  id: string;
  titre: string;
  inspirationSec: number;
  retenueSec: number;
  expirationSec: number;
};

export const fallbackExercises: BreathingExercise[] = [
  {
    id: 'coherence-5-5',
    titre: 'Cohérence cardiaque 5-5',
    inspirationSec: 5,
    retenueSec: 0,
    expirationSec: 5,
  },
  {
    id: 'carre-4-4-4',
    titre: 'Respiration carrée',
    inspirationSec: 4,
    retenueSec: 4,
    expirationSec: 4,
  },
];

export type DiagnosticItem = {
  id: string;
  label: string;
  points: number;
};

export type ResultMessage = {
  label: string;
  desc: string;
};

export type ResultMessages = {
  faible: ResultMessage;
  modere: ResultMessage;
  eleve: ResultMessage;
};

export const fallbackDiagnosticItems: DiagnosticItem[] = [
  { id: 'fallback-1', label: 'Décès du conjoint', points: 100 },
  { id: 'fallback-2', label: 'Divorce', points: 73 },
  { id: 'fallback-3', label: 'Séparation conjugale', points: 65 },
  { id: 'fallback-4', label: "Décès d'un proche parent", points: 63 },
  { id: 'fallback-5', label: 'Maladie ou accident personnel', points: 53 },
  { id: 'fallback-6', label: 'Mariage', points: 50 },
  { id: 'fallback-7', label: 'Licenciement professionnel', points: 47 },
  { id: 'fallback-8', label: 'Retraite', points: 45 },
  { id: 'fallback-9', label: 'Grossesse', points: 40 },
  { id: 'fallback-10', label: 'Changement de situation financière', points: 38 },
  { id: 'fallback-11', label: "Mort d'un ami proche", points: 37 },
  { id: 'fallback-12', label: 'Déménagement', points: 20 },
];

export const fallbackResultMessages: ResultMessages = {
  faible: {
    label: 'Risque faible',
    desc: 'Votre niveau de stress actuel est considéré comme gérable par votre organisme.',
  },
  modere: {
    label: 'Risque modéré',
    desc: 'Votre niveau de changement de vie suggère une vulnérabilité face au stress.',
  },
  eleve: {
    label: 'Risque élevé',
    desc: "Votre score indique un niveau de stress important. Prenez le temps de demander de l'aide si besoin.",
  },
};

export type EmotionLevel2 = {
  id: string;
  libelle: string;
};

export type EmotionGroup = {
  id: string;
  libelle: string;
  emotionsN2: EmotionLevel2[];
};

export type JournalEntry = {
  id: string;
  notePersonnelle: string | null;
  dateEnregistrement: string;
  emotionN2: {
    libelle: string;
    emotionN1?: {
      libelle: string;
    } | null;
  };
};

export const fallbackEmotionGroups: EmotionGroup[] = [
  {
    id: 'fallback-joie',
    libelle: 'Joie',
    emotionsN2: [
      { id: 'fallback-apaise', libelle: 'Apaisé' },
      { id: 'fallback-confiant', libelle: 'Confiant' },
      { id: 'fallback-reconnaissant', libelle: 'Reconnaissant' },
    ],
  },
  {
    id: 'fallback-peur',
    libelle: 'Peur',
    emotionsN2: [
      { id: 'fallback-anxieux', libelle: 'Anxieux' },
      { id: 'fallback-inquiet', libelle: 'Inquiet' },
      { id: 'fallback-stresse', libelle: 'Stressé' },
    ],
  },
  {
    id: 'fallback-tristesse',
    libelle: 'Tristesse',
    emotionsN2: [
      { id: 'fallback-fatigue', libelle: 'Fatigué' },
      { id: 'fallback-decu', libelle: 'Déçu' },
      { id: 'fallback-seul', libelle: 'Seul' },
    ],
  },
];

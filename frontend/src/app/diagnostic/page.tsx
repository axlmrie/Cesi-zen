import { db } from "@/server/db";

import { DiagnosticClient } from "./_components/DiagnosticClient";

const fallbackItems = [
  { id: "fallback-1", label: "Deces du conjoint", points: 100 },
  { id: "fallback-2", label: "Divorce", points: 73 },
  { id: "fallback-3", label: "Separation conjugale", points: 65 },
  { id: "fallback-4", label: "Peine de prison", points: 63 },
  { id: "fallback-5", label: "Deces d'un proche parent", points: 63 },
  { id: "fallback-6", label: "Maladie ou accident personnel", points: 53 },
  { id: "fallback-7", label: "Mariage", points: 50 },
  { id: "fallback-8", label: "Licenciement professionnel", points: 47 },
  { id: "fallback-9", label: "Retraite", points: 45 },
  { id: "fallback-10", label: "Grossesse", points: 40 },
  { id: "fallback-11", label: "Difficultes sexuelles", points: 39 },
  {
    id: "fallback-12",
    label: "Changement de situation financiere",
    points: 38,
  },
  { id: "fallback-13", label: "Mort d'un ami proche", points: 37 },
  {
    id: "fallback-14",
    label: "Changement de responsabilites au travail",
    points: 29,
  },
  { id: "fallback-15", label: "Demenagement", points: 20 },
];

const resultFallbacks = {
  faible: {
    slug: "resultat-stress-faible",
    label: "Risque faible",
    desc: "Votre niveau de stress actuel est considere comme gerable par votre organisme.",
  },
  modere: {
    slug: "resultat-stress-modere",
    label: "Risque modere",
    desc: "Prudence : votre niveau de changement de vie suggere une vulnerabilite face au stress.",
  },
  eleve: {
    slug: "resultat-stress-eleve",
    label: "Risque eleve",
    desc: "Attention : votre score indique un niveau de stress important. Prenez le temps de demander de l'aide si besoin.",
  },
};

export default async function DiagnosticPage() {
  const [events, resultPages] = await Promise.all([
    db.evenementStress.findMany({
      where: { isActif: true },
      orderBy: [{ points: "desc" }, { description: "asc" }],
    }),
    db.pageInfo.findMany({
      where: {
        isPublie: true,
        slug: {
          in: Object.values(resultFallbacks).map((result) => result.slug),
        },
      },
    }),
  ]);

  const items =
    events.length > 0
      ? events.map((event) => ({
          id: event.id,
          label: event.description,
          points: event.points,
        }))
      : fallbackItems;

  const findResultPage = (slug: string) =>
    resultPages.find((page) => page.slug === slug);

  const resultMessages = {
    faible: {
      label:
        findResultPage(resultFallbacks.faible.slug)?.titre ??
        resultFallbacks.faible.label,
      desc:
        findResultPage(resultFallbacks.faible.slug)?.contenu ??
        resultFallbacks.faible.desc,
    },
    modere: {
      label:
        findResultPage(resultFallbacks.modere.slug)?.titre ??
        resultFallbacks.modere.label,
      desc:
        findResultPage(resultFallbacks.modere.slug)?.contenu ??
        resultFallbacks.modere.desc,
    },
    eleve: {
      label:
        findResultPage(resultFallbacks.eleve.slug)?.titre ??
        resultFallbacks.eleve.label,
      desc:
        findResultPage(resultFallbacks.eleve.slug)?.contenu ??
        resultFallbacks.eleve.desc,
    },
  };

  return <DiagnosticClient items={items} resultMessages={resultMessages} />;
}

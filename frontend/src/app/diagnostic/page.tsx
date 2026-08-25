import { db } from "@/server/db";
import { webFallbackDiagnosticItems } from "@/lib/diagnostic";

import { DiagnosticClient } from "./_components/DiagnosticClient";

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
      : webFallbackDiagnosticItems;

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

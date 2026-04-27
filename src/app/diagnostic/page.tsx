"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RGPDModal } from "@/components/RGPDModal";
import { CheckCircle2, AlertTriangle, RefreshCw, Loader2, Save } from "lucide-react";
import { authClient } from "@/server/better-auth/client"; // Pour vérifier la session
import { saveDiagnosticScore } from "./actions"; // L'action serveur qu'on vient de créer

const HOLMES_RAHE_ITEMS = [
  { id: "1", label: "Décès du conjoint", points: 100, cat: "Famille" },
  { id: "2", label: "Divorce", points: 73, cat: "Famille" },
  { id: "3", label: "Séparation conjugale", points: 65, cat: "Famille" },
  { id: "4", label: "Peine de prison", points: 63, cat: "Personnel" },
  { id: "5", label: "Décès d'un proche parent", points: 63, cat: "Famille" },
  { id: "6", label: "Maladie ou accident personnel", points: 53, cat: "Santé" },
  { id: "7", label: "Mariage", points: 50, cat: "Famille" },
  { id: "8", label: "Licenciement professionnel", points: 47, cat: "Travail" },
  { id: "9", label: "Retraite", points: 45, cat: "Travail" },
  { id: "10", label: "Grossesse", points: 40, cat: "Famille" },
  { id: "11", label: "Difficultés sexuelles", points: 39, cat: "Personnel" },
  { id: "12", label: "Changement de situation financière", points: 38, cat: "Personnel" },
  { id: "13", label: "Mort d'un ami proche", points: 37, cat: "Social" },
  { id: "14", label: "Changement de responsabilités au travail", points: 29, cat: "Travail" },
  { id: "15", label: "Déménagement", points: 20, cat: "Vie" },
];

export default function DiagnosticPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession(); // Récupère l'utilisateur
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // État de chargement

  const totalScore = HOLMES_RAHE_ITEMS
    .filter(item => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + item.points, 0);

  const toggleItem = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const getRiskLevel = () => {
    if (totalScore >= 300) return { label: "Risque élevé", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", desc: "Attention : vous présentez un risque de 80% de développer un trouble de santé lié au stress." };
    if (totalScore >= 150) return { label: "Risque modéré", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", desc: "Prudence : votre niveau de changement de vie suggère une vulnérabilité de 50% face au stress." };
    return { label: "Risque faible", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", desc: "Votre niveau de stress actuel est considéré comme gérable par votre organisme." };
  };

  const risk = getRiskLevel();

  // LA FONCTION DU BOUTON
  const handleSaveScore = async () => {
    // Si pas connecté, on l'envoie vers l'inscription
    if (!session) {
      router.push("/auth/inscription");
      return;
    }

    // Si connecté, on lance la sauvegarde
    setIsSaving(true);
    try {
      const result = await saveDiagnosticScore(totalScore);
      if (result.success) {
        // Redirection vers le dashboard après sauvegarde réussie
        router.push("/dashboard");
        router.refresh();
      } else {
        alert("Une erreur est survenue lors de la sauvegarde.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-20">
      <RGPDModal />
      
      <main className="max-w-3xl mx-auto px-6 pt-12">
        {!isFinished ? (
          /* ... (Le code de la liste des items reste strictement identique) ... */
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <header className="mb-10 text-center">
              <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Évaluez votre niveau de stress</h1>
              <p className="text-muted-foreground">Cochez les événements survenus dans votre vie ces 12 derniers mois.</p>
            </header>

            <div className="space-y-3">
              {HOLMES_RAHE_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                    selectedIds.includes(item.id) ? "border-brand bg-brand/5 ring-1 ring-brand" : "border-border bg-card hover:border-brand/30"
                  }`}
                >
                  <span className="text-left font-medium text-foreground">{item.label}</span>
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${selectedIds.includes(item.id) ? "bg-brand border-brand" : "border-border"}`}>
                    {selectedIds.includes(item.id) && <CheckCircle2 className="h-4 w-4 text-white" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="sticky bottom-6 mt-10 p-4 bg-background/80 backdrop-blur-md border border-border rounded-3xl flex items-center justify-between shadow-xl">
               <div className="px-2">
                 <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Score actuel</p>
                 <p className="text-2xl font-bold text-brand">{totalScore} <span className="text-sm font-normal text-muted-foreground">pts</span></p>
               </div>
               <button onClick={() => setIsFinished(true)} className="bg-brand text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-dark transition-all">
                 Terminer l'analyse
               </button>
            </div>
          </div>
        ) : (
          <div className="animate-in zoom-in-95 duration-500 text-center">
            <div className={`inline-flex p-4 rounded-3xl mb-6 ${risk.bg}`}>
              <AlertTriangle className={`h-12 w-12 ${risk.color}`} />
            </div>
            
            <h2 className="font-heading text-4xl font-bold text-foreground mb-2">{totalScore} Points</h2>
            <p className={`text-xl font-bold mb-6 ${risk.color}`}>{risk.label}</p>
            
            <div className={`p-6 rounded-3xl border-2 mb-10 ${risk.bg} ${risk.border}`}>
              <p className="text-foreground leading-relaxed">{risk.desc}</p>
            </div>

            <div className="grid gap-4">
               {/* LE BOUTON MIS À JOUR */}
               <button 
                onClick={handleSaveScore}
                disabled={isSaving}
                className="flex items-center justify-center gap-2 bg-brand text-white w-full py-4 rounded-2xl font-bold shadow-lg hover:shadow-brand/20 transition-all disabled:opacity-70"
               >
                 {isSaving ? (
                   <><Loader2 className="h-5 w-5 animate-spin" /> Sauvegarde...</>
                 ) : session ? (
                   <><Save className="h-5 w-5" /> Enregistrer dans mon profil</>
                 ) : (
                   "Créer un compte pour sauvegarder"
                 )}
               </button>

               <button 
                onClick={() => {setSelectedIds([]); setIsFinished(false);}}
                className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground py-2"
               >
                 <RefreshCw className="h-4 w-4" /> Recommencer le test
               </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
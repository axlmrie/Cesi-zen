"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";
import { updateUserProfile } from "../actions";

export function TabInfos({ session }: { session: any }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // On extrait le prénom/nom depuis le nom complet (si firstName direct n'est pas dispo dans le cache)
  const nameParts = session?.user?.name?.split(" ") || ["", ""];
  
  const [formData, setFormData] = useState({
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" ") || "",
    age: "", // L'âge n'est pas dans le useSession par défaut, l'utilisateur devra le remettre
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const result = await updateUserProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: parseInt(formData.age) || 0,
    });

    if (result.success) {
      setMessage({ type: "success", text: "Profil mis à jour avec succès !" });
      router.refresh(); // Force la navbar à se mettre à jour
    } else {
      setMessage({ type: "error", text: result.error || "Une erreur est survenue." });
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-foreground">Informations du compte</h2>
      
      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-2 text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message.type === "success" && <CheckCircle2 className="h-5 w-5" />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Prénom</label>
            <input required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-brand" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Nom</label>
            <input required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-brand" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Âge</label>
          <input type="number" required value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-brand" />
        </div>

        <button type="submit" disabled={isLoading} className="bg-brand text-white px-6 py-2.5 rounded-xl font-bold hover:bg-brand-dark transition-all mt-4 w-full sm:w-auto">
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Enregistrer les modifications"}
        </button>
      </form>
    </div>
  );
}
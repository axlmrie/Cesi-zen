"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";
import { updateUserProfile } from "../actions";

type ProfileSession = {
  user: {
    name?: string | null;
  };
};

function parseAge(value: string) {
  const age = Number.parseInt(value, 10);
  return Number.isFinite(age) ? age : 0;
}

export function TabInfos({ session }: { session: ProfileSession }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // On extrait le prénom/nom depuis le nom complet (si firstName direct n'est pas dispo dans le cache)
  const nameParts = (session.user.name ?? "").split(" ");

  const [formData, setFormData] = useState({
    firstName: nameParts[0] ?? "",
    lastName: nameParts.slice(1).join(" "),
    age: "", // L'âge n'est pas dans le useSession par défaut, l'utilisateur devra le remettre
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const result = await updateUserProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: parseAge(formData.age),
    });

    if (result.success) {
      setMessage({ type: "success", text: "Profil mis à jour avec succès !" });
      router.refresh(); // Force la navbar à se mettre à jour
    } else {
      setMessage({
        type: "error",
        text: result.error ?? "Une erreur est survenue.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="animate-in slide-in-from-right-4 space-y-6 duration-300">
      <h2 className="text-foreground text-xl font-bold text-balance">
        Informations du compte
      </h2>

      {message && (
        <div
          className={`flex items-start gap-2 rounded-xl p-4 text-sm ${message.type === "success" ? "border border-green-200 bg-green-50 text-green-700" : "border border-red-200 bg-red-50 text-red-700"}`}
        >
          {message.type === "success" && <CheckCircle2 className="h-5 w-5" />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-foreground text-sm font-semibold">
              Prénom
            </label>
            <input
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="border-border bg-background focus:ring-brand h-11 w-full rounded-xl border px-4 focus:ring-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-foreground text-sm font-semibold">Nom</label>
            <input
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="border-border bg-background focus:ring-brand h-11 w-full rounded-xl border px-4 focus:ring-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-foreground text-sm font-semibold">Âge</label>
          <input
            type="number"
            required
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="border-border bg-background focus:ring-brand h-11 w-full rounded-xl border px-4 focus:ring-2"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-brand hover:bg-brand-dark mt-4 w-full rounded-xl px-6 py-2.5 font-bold text-white transition-all sm:w-auto"
        >
          {isLoading ? (
            <Loader2 className="mx-auto h-5 w-5 animate-spin" />
          ) : (
            "Enregistrer les modifications"
          )}
        </button>
      </form>
    </div>
  );
}

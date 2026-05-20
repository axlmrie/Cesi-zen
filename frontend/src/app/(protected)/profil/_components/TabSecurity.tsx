"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { changeUserPassword } from "../actions";

export function TabSecurity() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validation locale
    if (passwords.new !== passwords.confirm) {
      setMessage({
        type: "error",
        text: "Les nouveaux mots de passe ne correspondent pas.",
      });
      return;
    }

    if (passwords.new.length < 8) {
      setMessage({
        type: "error",
        text: "Le nouveau mot de passe doit faire au moins 8 caractères.",
      });
      return;
    }

    setIsLoading(true);
    const result = await changeUserPassword({
      currentPassword: passwords.current,
      newPassword: passwords.new,
    });

    if (result.success) {
      setMessage({
        type: "success",
        text: "Mot de passe mis à jour avec succès !",
      });
      setPasswords({ current: "", new: "", confirm: "" }); // Reset le formulaire
    } else {
      setMessage({
        type: "error",
        text: "L'ancien mot de passe est incorrect.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="animate-in slide-in-from-right-4 space-y-6 duration-300">
      <div className="mb-2 flex items-center gap-3">
        <div className="bg-brand/10 shrink-0 rounded-lg p-2">
          <ShieldCheck className="text-brand h-6 w-6" />
        </div>
        <h2 className="text-foreground text-xl font-bold text-balance">
          Sécurité du compte
        </h2>
      </div>

      <p className="text-muted-foreground text-sm">
        Il est recommandé d'utiliser un mot de passe unique que vous n'utilisez
        pas sur d'autres sites.
      </p>

      {message && (
        <div
          className={`animate-in fade-in flex items-center gap-3 rounded-xl p-4 text-sm duration-300 ${
            message.type === "success"
              ? "border border-green-200 bg-green-50 text-green-700"
              : "border border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0" />
          )}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div className="space-y-2">
          <label className="text-foreground text-sm font-semibold">
            Mot de passe actuel
          </label>
          <input
            type="password"
            required
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            placeholder="••••••••"
            className="border-border bg-background focus:ring-brand h-11 w-full rounded-xl border px-4 transition-all outline-none focus:ring-2"
          />
        </div>

        <div className="bg-border my-2 h-[1px]" />

        <div className="space-y-2">
          <label className="text-foreground text-sm font-semibold">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            required
            value={passwords.new}
            onChange={(e) =>
              setPasswords({ ...passwords, new: e.target.value })
            }
            placeholder="Minimum 8 caractères"
            className="border-border bg-background focus:ring-brand h-11 w-full rounded-xl border px-4 transition-all outline-none focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label className="text-foreground text-sm font-semibold">
            Confirmer le nouveau mot de passe
          </label>
          <input
            type="password"
            required
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
            placeholder="••••••••"
            className="border-border bg-background focus:ring-brand h-11 w-full rounded-xl border px-4 transition-all outline-none focus:ring-2"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-brand hover:bg-brand-dark mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-white shadow-md transition-all disabled:opacity-70 sm:w-auto"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Mettre à jour le mot de passe"
          )}
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { changeUserPassword } from "../actions";

export function TabSecurity() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validation locale
    if (passwords.new !== passwords.confirm) {
      setMessage({ type: "error", text: "Les nouveaux mots de passe ne correspondent pas." });
      return;
    }

    if (passwords.new.length < 8) {
      setMessage({ type: "error", text: "Le nouveau mot de passe doit faire au moins 8 caractères." });
      return;
    }

    setIsLoading(true);
    const result = await changeUserPassword({
      currentPassword: passwords.current,
      newPassword: passwords.new
    });

    if (result.success) {
      setMessage({ type: "success", text: "Mot de passe mis à jour avec succès !" });
      setPasswords({ current: "", new: "", confirm: "" }); // Reset le formulaire
    } else {
      setMessage({ type: "error", text: "L'ancien mot de passe est incorrect." });
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-brand/10 rounded-lg">
          <ShieldCheck className="h-6 w-6 text-brand" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Sécurité du compte</h2>
      </div>

      <p className="text-sm text-muted-foreground">
        Il est recommandé d'utiliser un mot de passe unique que vous n'utilisez pas sur d'autres sites.
      </p>

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm animate-in fade-in duration-300 ${
          message.type === "success" 
            ? "bg-green-50 text-green-700 border border-green-200" 
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {message.type === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Mot de passe actuel</label>
          <input 
            type="password" 
            required
            value={passwords.current}
            onChange={(e) => setPasswords({...passwords, current: e.target.value})}
            placeholder="••••••••" 
            className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-brand outline-none transition-all" 
          />
        </div>

        <div className="h-[1px] bg-border my-2" />

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Nouveau mot de passe</label>
          <input 
            type="password" 
            required
            value={passwords.new}
            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
            placeholder="Minimum 8 caractères" 
            className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-brand outline-none transition-all" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Confirmer le nouveau mot de passe</label>
          <input 
            type="password" 
            required
            value={passwords.confirm}
            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
            placeholder="••••••••" 
            className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-brand outline-none transition-all" 
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading} 
          className="bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark transition-all mt-4 w-full sm:w-auto flex items-center justify-center gap-2 shadow-md disabled:opacity-70"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Mettre à jour le mot de passe"}
        </button>
      </form>
    </div>
  );
}
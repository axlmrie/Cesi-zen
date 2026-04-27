"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HeartPulse, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { authClient } from "@/server/better-auth/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  const router = useRouter();
  
  // États du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation locale
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (parseInt(formData.age) < 13) {
      setError("Vous devez avoir au moins 13 ans pour utiliser CESIZen.");
      return;
    }

    // --- LA CORRECTION EST ICI ---
    // On crée un type strict qui fusionne les champs de base de Better Auth avec tes champs personnalisés.
    type SignUpPayload = Parameters<typeof authClient.signUp.email>[0] & {
      firstName: string;
      lastName: string;
      age: number;
    };

    // On prépare notre objet en respectant scrupuleusement le type créé
    const payload: SignUpPayload = {
      email: formData.email,
      password: formData.password,
      name: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: parseInt(formData.age),
    };

    await authClient.signUp.email(
      payload, // Plus aucun `as any` !
      {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          setIsLoading(false);
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setIsLoading(false);
          setError(ctx.error.message || "Une erreur est survenue lors de l'inscription.");
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-xl bg-card border border-border rounded-3xl shadow-xl p-8 sm:p-10 animate-in fade-in zoom-in-95 duration-500">
        
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-12 w-12 bg-brand/10 text-brand flex items-center justify-center rounded-2xl mb-4">
            <HeartPulse className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Rejoindre CESIZen</h1>
          <p className="text-muted-foreground mt-2">Commencez votre voyage vers une meilleure santé mentale.</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input id="firstName" placeholder="Jean" required value={formData.firstName} onChange={handleChange} className="rounded-xl focus-visible:ring-brand" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input id="lastName" placeholder="Dupont" required value={formData.lastName} onChange={handleChange} className="rounded-xl focus-visible:ring-brand" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input id="email" type="email" placeholder="jean.dupont@exemple.fr" required value={formData.email} onChange={handleChange} className="rounded-xl focus-visible:ring-brand" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Âge</Label>
              <Input id="age" type="number" placeholder="25" required value={formData.age} onChange={handleChange} className="rounded-xl focus-visible:ring-brand" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" required value={formData.password} onChange={handleChange} className="rounded-xl focus-visible:ring-brand" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmation</Label>
              <Input id="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="rounded-xl focus-visible:ring-brand" />
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground text-center px-4">
            En cliquant sur s'inscrire, vous acceptez nos <Link href="/rgpd" className="underline hover:text-brand">conditions d'utilisation</Link> et notre politique de protection des données de santé.
          </p>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 text-base font-bold rounded-xl bg-brand hover:bg-brand-dark text-white transition-all shadow-md focus-visible:ring-4 focus-visible:ring-brand"
          >
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Créer mon compte"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <Link href="/auth/connexion" className="font-bold text-foreground hover:text-brand transition-colors">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HeartPulse, Loader2, AlertCircle } from "lucide-react";
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
          setError(
            ctx.error.message ||
              "Une erreur est survenue lors de l'inscription.",
          );
        },
      },
    );
  };

  return (
    <div className="bg-background flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center px-4 py-8 sm:py-12">
      <div className="animate-in border-border bg-card fade-in zoom-in-95 w-full max-w-xl rounded-3xl border p-6 shadow-xl duration-500 sm:p-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="bg-brand/10 text-brand mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
            <HeartPulse className="h-6 w-6" />
          </div>
          <h1 className="font-heading text-foreground text-2xl font-bold sm:text-3xl">
            Rejoindre CESIZen
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Commencez votre voyage vers une meilleure santé mentale.
          </p>
        </div>

        {error && (
          <div className="text-destructive bg-destructive/10 border-destructive/20 mb-6 flex items-center gap-2 rounded-xl border p-4 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                placeholder="Jean"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="focus-visible:ring-brand rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                placeholder="Dupont"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="focus-visible:ring-brand rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="jean.dupont@exemple.fr"
                required
                value={formData.email}
                onChange={handleChange}
                className="focus-visible:ring-brand rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Âge</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                required
                value={formData.age}
                onChange={handleChange}
                className="focus-visible:ring-brand rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="focus-visible:ring-brand rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmation</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="focus-visible:ring-brand rounded-xl"
              />
            </div>
          </div>

          <p className="text-muted-foreground px-0 text-center text-[11px] sm:px-4">
            En cliquant sur s'inscrire, vous acceptez nos{" "}
            <Link href="/rgpd" className="hover:text-brand underline">
              conditions d'utilisation
            </Link>{" "}
            et notre politique de protection des données de santé.
          </p>

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-brand hover:bg-brand-dark focus-visible:ring-brand h-12 w-full rounded-xl text-base font-bold text-white shadow-md transition-all focus-visible:ring-4"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              "Créer mon compte"
            )}
          </Button>
        </form>

        <div className="text-muted-foreground mt-8 text-center text-sm">
          Déjà un compte ?{" "}
          <Link
            href="/auth/connexion"
            className="text-foreground hover:text-brand font-bold transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}

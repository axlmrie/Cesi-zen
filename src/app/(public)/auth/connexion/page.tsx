"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HeartPulse, Loader2, AlertCircle } from "lucide-react";
import { authClient } from "@/server/better-auth/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          // Redirection vers le tableau de bord une fois connecté
          setIsLoading(false);
          router.push("/dashboard");
          router.refresh(); // Force le rafraîchissement pour mettre à jour la Navbar (si elle dépend du statut de connexion)
        },
        onError: (ctx) => {
          setIsLoading(false);
          // Better Auth renvoie des messages d'erreur, on peut les traduire ou les afficher
          setErrorMessage(
            ctx.error.message || "Identifiants incorrects. Veuillez réessayer.",
          );
        },
      },
    );
  };

  return (
    <div className="bg-background flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center px-4 py-8 sm:py-12">
      {/* Conteneur principal (La Carte) */}
      <div className="animate-in border-border bg-card fade-in zoom-in-95 w-full max-w-md rounded-3xl border p-6 shadow-xl duration-500 sm:p-10">
        {/* En-tête */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="bg-brand/10 text-brand mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
            <HeartPulse className="h-8 w-8" />
          </div>
          <h1 className="font-heading text-foreground text-2xl font-bold sm:text-3xl">
            Bon retour
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Connectez-vous pour accéder à votre espace de suivi CESIZen.
          </p>
        </div>

        {/* Affichage des erreurs éventuelles */}
        {errorMessage && (
          <div className="text-destructive bg-destructive/10 border-destructive/20 mb-6 flex items-center gap-2 rounded-xl border p-4 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-semibold">
              Adresse e-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="prenom.nom@exemple.fr"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="border-border bg-background focus-visible:ring-brand h-12 rounded-xl px-4"
            />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label
                htmlFor="password"
                className="text-foreground font-semibold"
              >
                Mot de passe
              </Label>
              {/* Lien Mot de passe oublié (Optionnel pour l'instant) */}
              <Link
                href="/auth/mot-de-passe-oublie"
                className="text-brand hover:text-brand-dark text-xs font-semibold transition-colors"
                tabIndex={-1}
              >
                Oublié ?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="border-border bg-background focus-visible:ring-brand h-12 rounded-xl px-4"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-brand hover:bg-brand-dark focus-visible:ring-brand h-12 w-full rounded-xl text-base font-bold text-white shadow-md transition-all focus-visible:ring-4 focus-visible:ring-offset-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Connexion en cours...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>
        </form>

        <div className="text-muted-foreground mt-8 text-center text-sm">
          Vous n'avez pas encore de compte ?{" "}
          <Link
            href="/auth/inscription"
            className="text-foreground hover:text-brand font-bold transition-colors focus-visible:underline focus-visible:outline-none"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
}

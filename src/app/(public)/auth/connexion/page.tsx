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
          setErrorMessage(ctx.error.message || "Identifiants incorrects. Veuillez réessayer.");
        },
      }
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center bg-background px-4 py-12">
      
      {/* Conteneur principal (La Carte) */}
      <div className="w-full max-w-md bg-card border border-border rounded-3xl shadow-xl p-8 sm:p-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* En-tête */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-14 w-14 bg-brand/10 text-brand flex items-center justify-center rounded-2xl mb-4">
            <HeartPulse className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Bon retour
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Connectez-vous pour accéder à votre espace de suivi CESIZen.
          </p>
        </div>

        {/* Affichage des erreurs éventuelles */}
        {errorMessage && (
          <div className="mb-6 flex items-center gap-2 p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl">
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
              className="h-12 rounded-xl border-border bg-background px-4 focus-visible:ring-brand"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-foreground font-semibold">
                Mot de passe
              </Label>
              {/* Lien Mot de passe oublié (Optionnel pour l'instant) */}
              <Link 
                href="/auth/mot-de-passe-oublie" 
                className="text-xs font-semibold text-brand hover:text-brand-dark transition-colors"
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
              className="h-12 rounded-xl border-border bg-background px-4 focus-visible:ring-brand"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 text-base font-bold rounded-xl bg-brand hover:bg-brand-dark text-white transition-all shadow-md focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-offset-2"
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

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Vous n'avez pas encore de compte ?{" "}
          <Link 
            href="/auth/inscription" 
            className="font-bold text-foreground hover:text-brand transition-colors focus-visible:outline-none focus-visible:underline"
          >
            Créer un compte
          </Link>
        </div>

      </div>
    </div>
  );
}
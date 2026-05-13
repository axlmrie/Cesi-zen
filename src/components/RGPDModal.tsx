"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Lock } from "lucide-react";

export function RGPDModal() {
  const [isOpen, setIsOpen] = useState(false);

  // On vérifie si l'utilisateur a déjà donné son consentement
  useEffect(() => {
    const consent = localStorage.getItem("cesizen-rgpd-consent");
    if (!consent) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cesizen-rgpd-consent", "true");
    setIsOpen(false);
  };

  const handleDecline = () => {
    // Dans le cas de CESIZen, on peut restreindre l'accès ou juste fermer
    localStorage.setItem("cesizen-rgpd-consent", "false");
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="bg-background/80 animate-in fade-in fixed inset-0 z-[100] flex items-end justify-center p-3 backdrop-blur-sm duration-300 sm:items-center sm:p-4">
      <div className="border-border bg-card max-h-[calc(100dvh-1.5rem)] w-full max-w-lg overflow-y-auto rounded-3xl border shadow-2xl">
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-brand/10 rounded-2xl p-3">
              <ShieldCheck className="text-brand h-6 w-6" />
            </div>
            <h2 className="font-heading text-foreground text-xl font-bold">
              Respect de votre vie privée
            </h2>
          </div>

          <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
            <p>
              Conformément au <strong>RGPD</strong>, CESIZen vous informe que
              nous collectons des données relatives à votre bien-être (scores de
              stress, émotions) uniquement pour votre suivi personnel.
            </p>

            <div className="bg-muted/50 flex items-start gap-3 rounded-xl p-4">
              <Lock className="text-brand mt-0.5 h-5 w-5 shrink-0" />
              <ul className="space-y-1">
                <li>
                  • Vos données sont <strong>cryptées</strong> et strictement
                  confidentielles.
                </li>
                <li>• Aucun partage à des fins commerciales.</li>
                <li>
                  • Droit de suppression à tout moment depuis votre profil.
                </li>
              </ul>
            </div>

            <p className="text-xs italic">
              En cliquant sur "Accepter", vous consentez au traitement de vos
              données de santé dans le cadre de l'application.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAccept}
              className="bg-brand hover:bg-brand-dark shadow-brand/20 flex-1 rounded-xl px-6 py-3 font-bold text-white shadow-lg transition-all"
            >
              Accepter et continuer
            </button>
            <button
              onClick={handleDecline}
              className="bg-secondary text-secondary-foreground hover:bg-border flex-1 rounded-xl px-6 py-3 font-bold transition-all"
            >
              Personnaliser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

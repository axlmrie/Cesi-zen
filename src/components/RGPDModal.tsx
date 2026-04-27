"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Lock, X } from "lucide-react";

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-brand/10 rounded-2xl">
              <ShieldCheck className="h-6 w-6 text-brand" />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Respect de votre vie privée
            </h2>
          </div>

          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Conformément au <strong>RGPD</strong>, CESIZen vous informe que nous collectons des données relatives à votre bien-être (scores de stress, émotions) uniquement pour votre suivi personnel.
            </p>
            
            <div className="flex gap-3 items-start bg-muted/50 p-4 rounded-xl">
              <Lock className="h-5 w-5 text-brand shrink-0 mt-0.5" />
              <ul className="space-y-1">
                <li>• Vos données sont <strong>cryptées</strong> et strictement confidentielles.</li>
                <li>• Aucun partage à des fins commerciales.</li>
                <li>• Droit de suppression à tout moment depuis votre profil.</li>
              </ul>
            </div>

            <p className="text-xs italic">
              En cliquant sur "Accepter", vous consentez au traitement de vos données de santé dans le cadre de l'application.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 bg-brand text-white py-3 px-6 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
            >
              Accepter et continuer
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 bg-secondary text-secondary-foreground py-3 px-6 rounded-xl font-bold hover:bg-border transition-all"
            >
              Personnaliser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isActif" BOOLEAN NOT NULL DEFAULT true,
    "dateConsentement" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_info" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateMaj" TIMESTAMP(3) NOT NULL,
    "isPublie" BOOLEAN NOT NULL DEFAULT false,
    "auteurId" TEXT NOT NULL,

    CONSTRAINT "page_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ordreAffichage" INTEGER NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evenement_stress" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "isActif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "evenement_stress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resultat_diagnostic" (
    "id" TEXT NOT NULL,
    "dateEvaluation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scoreTotal" INTEGER NOT NULL,
    "niveauStress" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,

    CONSTRAINT "resultat_diagnostic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reponse_diagnostic" (
    "resultatId" TEXT NOT NULL,
    "evenementId" TEXT NOT NULL,

    CONSTRAINT "reponse_diagnostic_pkey" PRIMARY KEY ("resultatId","evenementId")
);

-- CreateTable
CREATE TABLE "emotion_niveau_1" (
    "id" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "emotion_niveau_1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emotion_niveau_2" (
    "id" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "emotionN1Id" TEXT NOT NULL,

    CONSTRAINT "emotion_niveau_2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journal_emotion" (
    "id" TEXT NOT NULL,
    "notePersonnelle" TEXT,
    "dateEnregistrement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "utilisateurId" TEXT NOT NULL,
    "emotionN2Id" TEXT NOT NULL,

    CONSTRAINT "journal_emotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercice_respiration" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "inspirationSec" INTEGER NOT NULL,
    "expirationSec" INTEGER NOT NULL,
    "retenueSec" INTEGER NOT NULL,
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "createurId" TEXT,

    CONSTRAINT "exercice_respiration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "page_info_slug_key" ON "page_info"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "emotion_niveau_1_libelle_key" ON "emotion_niveau_1"("libelle");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_info" ADD CONSTRAINT "page_info_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resultat_diagnostic" ADD CONSTRAINT "resultat_diagnostic_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reponse_diagnostic" ADD CONSTRAINT "reponse_diagnostic_resultatId_fkey" FOREIGN KEY ("resultatId") REFERENCES "resultat_diagnostic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reponse_diagnostic" ADD CONSTRAINT "reponse_diagnostic_evenementId_fkey" FOREIGN KEY ("evenementId") REFERENCES "evenement_stress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emotion_niveau_2" ADD CONSTRAINT "emotion_niveau_2_emotionN1Id_fkey" FOREIGN KEY ("emotionN1Id") REFERENCES "emotion_niveau_1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_emotion" ADD CONSTRAINT "journal_emotion_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_emotion" ADD CONSTRAINT "journal_emotion_emotionN2Id_fkey" FOREIGN KEY ("emotionN2Id") REFERENCES "emotion_niveau_2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

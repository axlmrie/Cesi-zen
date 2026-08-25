-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` BOOLEAN NOT NULL,
    `image` TEXT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `age` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `isActif` BOOLEAN NOT NULL DEFAULT true,
    `dateConsentement` DATETIME(3) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` TEXT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `session_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account` (
    `id` VARCHAR(191) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `providerId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `accessToken` TEXT NULL,
    `refreshToken` TEXT NULL,
    `idToken` TEXT NULL,
    `accessTokenExpiresAt` DATETIME(3) NULL,
    `refreshTokenExpiresAt` DATETIME(3) NULL,
    `scope` TEXT NULL,
    `password` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification` (
    `id` VARCHAR(191) NOT NULL,
    `identifier` VARCHAR(191) NOT NULL,
    `value` TEXT NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `page_info` (
    `id` VARCHAR(191) NOT NULL,
    `titre` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `contenu` TEXT NOT NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateMaj` DATETIME(3) NOT NULL,
    `isPublie` BOOLEAN NOT NULL DEFAULT false,
    `auteurId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `page_info_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `ordreAffichage` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evenement_stress` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL,
    `isActif` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resultat_diagnostic` (
    `id` VARCHAR(191) NOT NULL,
    `dateEvaluation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `scoreTotal` INTEGER NOT NULL,
    `niveauStress` VARCHAR(191) NOT NULL,
    `utilisateurId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reponse_diagnostic` (
    `resultatId` VARCHAR(191) NOT NULL,
    `evenementId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`resultatId`, `evenementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emotion_niveau_1` (
    `id` VARCHAR(191) NOT NULL,
    `libelle` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `emotion_niveau_1_libelle_key`(`libelle`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emotion_niveau_2` (
    `id` VARCHAR(191) NOT NULL,
    `libelle` VARCHAR(191) NOT NULL,
    `emotionN1Id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `journal_emotion` (
    `id` VARCHAR(191) NOT NULL,
    `notePersonnelle` TEXT NULL,
    `dateEnregistrement` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `utilisateurId` VARCHAR(191) NOT NULL,
    `emotionN2Id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exercice_respiration` (
    `id` VARCHAR(191) NOT NULL,
    `titre` VARCHAR(191) NOT NULL,
    `inspirationSec` INTEGER NOT NULL,
    `expirationSec` INTEGER NOT NULL,
    `retenueSec` INTEGER NOT NULL,
    `isCustom` BOOLEAN NOT NULL DEFAULT false,
    `createurId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `page_info` ADD CONSTRAINT `page_info_auteurId_fkey` FOREIGN KEY (`auteurId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultat_diagnostic` ADD CONSTRAINT `resultat_diagnostic_utilisateurId_fkey` FOREIGN KEY (`utilisateurId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reponse_diagnostic` ADD CONSTRAINT `reponse_diagnostic_resultatId_fkey` FOREIGN KEY (`resultatId`) REFERENCES `resultat_diagnostic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reponse_diagnostic` ADD CONSTRAINT `reponse_diagnostic_evenementId_fkey` FOREIGN KEY (`evenementId`) REFERENCES `evenement_stress`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `emotion_niveau_2` ADD CONSTRAINT `emotion_niveau_2_emotionN1Id_fkey` FOREIGN KEY (`emotionN1Id`) REFERENCES `emotion_niveau_1`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `journal_emotion` ADD CONSTRAINT `journal_emotion_utilisateurId_fkey` FOREIGN KEY (`utilisateurId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `journal_emotion` ADD CONSTRAINT `journal_emotion_emotionN2Id_fkey` FOREIGN KEY (`emotionN2Id`) REFERENCES `emotion_niveau_2`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

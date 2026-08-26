-- CreateTable
CREATE TABLE `support_ticket` (
    `id` VARCHAR(191) NOT NULL,
    `glpiTicketId` INTEGER NOT NULL,
    `category` ENUM('ACCOUNT', 'TECHNICAL', 'USAGE', 'PRIVACY', 'OTHER') NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `statusCode` INTEGER NOT NULL DEFAULT 1,
    `lastSyncedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `utilisateurId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `support_ticket_glpiTicketId_key`(`glpiTicketId`),
    INDEX `support_ticket_utilisateurId_createdAt_idx`(`utilisateurId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `support_ticket` ADD CONSTRAINT `support_ticket_utilisateurId_fkey` FOREIGN KEY (`utilisateurId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `dislikes` on the `Sauce` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Sauce` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Sauce` DROP COLUMN `dislikes`,
    DROP COLUMN `likes`,
    MODIFY `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Likes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `sauceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dislikes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `sauceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_sauceId_fkey` FOREIGN KEY (`sauceId`) REFERENCES `Sauce`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dislikes` ADD CONSTRAINT `Dislikes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dislikes` ADD CONSTRAINT `Dislikes_sauceId_fkey` FOREIGN KEY (`sauceId`) REFERENCES `Sauce`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

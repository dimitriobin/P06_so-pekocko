/*
  Warnings:

  - You are about to drop the column `testId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_testId_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `testId`;

-- DropTable
DROP TABLE `Test`;
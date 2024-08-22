/*
  Warnings:

  - You are about to drop the column `content` on the `Interaction` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Interaction` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Lead` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leadStatus` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Lead` DROP FOREIGN KEY `Lead_customerId_fkey`;

-- AlterTable
ALTER TABLE `Interaction` DROP COLUMN `content`,
    DROP COLUMN `date`,
    ADD COLUMN `details` VARCHAR(191) NULL,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Lead` DROP COLUMN `customerId`,
    DROP COLUMN `status`,
    ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `leadStatus` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `companyName` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_CustomerToLead` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CustomerToLead_AB_unique`(`A`, `B`),
    INDEX `_CustomerToLead_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Lead_email_key` ON `Lead`(`email`);

-- AddForeignKey
ALTER TABLE `_CustomerToLead` ADD CONSTRAINT `_CustomerToLead_A_fkey` FOREIGN KEY (`A`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CustomerToLead` ADD CONSTRAINT `_CustomerToLead_B_fkey` FOREIGN KEY (`B`) REFERENCES `Lead`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the `_CustomerToLead` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `companyName` on table `Lead` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Lead` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `_CustomerToLead` DROP FOREIGN KEY `_CustomerToLead_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CustomerToLead` DROP FOREIGN KEY `_CustomerToLead_B_fkey`;

-- DropIndex
DROP INDEX `Lead_email_key` ON `Lead`;

-- AlterTable
ALTER TABLE `Lead` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `customerId` INTEGER NULL,
    MODIFY `companyName` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_CustomerToLead`;

-- AddForeignKey
ALTER TABLE `Lead` ADD CONSTRAINT `Lead_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

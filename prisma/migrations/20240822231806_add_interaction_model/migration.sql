/*
  Warnings:

  - You are about to drop the column `details` on the `Interaction` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Interaction` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Interaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Interaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Interaction` DROP COLUMN `details`,
    DROP COLUMN `timestamp`,
    ADD COLUMN `customerId` INTEGER NOT NULL,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Interaction` ADD CONSTRAINT `Interaction_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

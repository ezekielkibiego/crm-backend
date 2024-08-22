/*
  Warnings:

  - Added the required column `companyName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `companyName` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL;

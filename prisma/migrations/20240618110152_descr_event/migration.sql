/*
  Warnings:

  - Added the required column `description` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `description` TEXT NOT NULL;

/*
  Warnings:

  - Made the column `coverImage` on table `comic` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `comic` MODIFY `slug` LONGTEXT NOT NULL,
    MODIFY `coverImage` TEXT NOT NULL;

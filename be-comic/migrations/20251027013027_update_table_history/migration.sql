/*
  Warnings:

  - You are about to drop the column `chapterId` on the `history` table. All the data in the column will be lost.
  - Added the required column `chapter` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history` DROP COLUMN `chapterId`,
    ADD COLUMN `chapter` INTEGER NOT NULL;

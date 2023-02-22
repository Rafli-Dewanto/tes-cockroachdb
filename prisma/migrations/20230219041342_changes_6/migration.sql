/*
  Warnings:

  - Added the required column `post` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "post" STRING NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" STRING NOT NULL;

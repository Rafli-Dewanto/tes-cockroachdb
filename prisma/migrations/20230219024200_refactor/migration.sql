/*
  Warnings:

  - You are about to drop the column `uuid` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "uuid";
ALTER TABLE "Product" ADD COLUMN     "auto_id" INT4 NOT NULL DEFAULT unique_rowid();

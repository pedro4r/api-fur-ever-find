/*
  Warnings:

  - You are about to drop the column `companyId` on the `pets` table. All the data in the column will be lost.
  - Added the required column `company_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "companyId",
ADD COLUMN     "company_id" TEXT NOT NULL;

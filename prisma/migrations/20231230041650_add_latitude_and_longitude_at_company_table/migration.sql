/*
  Warnings:

  - Added the required column `latitude` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `created_at` on the `Addresses` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Addresses" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "created_at";

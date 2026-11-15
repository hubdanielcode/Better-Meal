/*
  Warnings:

  - You are about to drop the column `stripe_subscription_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripe_subscription_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_stripe_subscription_id_key";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "stripe_subscription_id" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripe_subscription_id";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_stripe_subscription_id_key" ON "Profile"("stripe_subscription_id");

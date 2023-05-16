/*
  Warnings:

  - Added the required column `bookId` to the `Diffusion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diffusion" ADD COLUMN     "bookId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "ISBN" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coverImg" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Diffusion" ADD CONSTRAINT "Diffusion_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

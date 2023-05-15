-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "diffusionId" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_diffusionId_fkey" FOREIGN KEY ("diffusionId") REFERENCES "Diffusion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

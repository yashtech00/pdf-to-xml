-- CreateTable
CREATE TABLE "Conversion" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "xmlResult" TEXT,

    CONSTRAINT "Conversion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conversion" ADD CONSTRAINT "Conversion_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

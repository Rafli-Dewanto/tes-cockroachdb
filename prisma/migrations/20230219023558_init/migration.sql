-- CreateTable
CREATE TABLE "Product" (
    "id" STRING NOT NULL,
    "uuid" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "price" INT4 NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

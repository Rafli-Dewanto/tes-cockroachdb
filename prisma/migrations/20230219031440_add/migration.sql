-- CreateTable
CREATE TABLE "Post" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "title" STRING NOT NULL,
    "authorId" INT4 NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

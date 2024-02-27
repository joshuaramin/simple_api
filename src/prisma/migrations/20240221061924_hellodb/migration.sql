-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'customer');

-- CreateTable
CREATE TABLE "Product" (
    "productID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descriptions" TEXT,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "brand" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productID")
);

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

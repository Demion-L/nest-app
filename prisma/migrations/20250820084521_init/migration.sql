-- CreateTable
CREATE TABLE "public"."flowers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "color" VARCHAR(50),
    "price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flowers_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "minTemp" DOUBLE PRECISION DEFAULT 18,
ADD COLUMN     "maxTemp" DOUBLE PRECISION DEFAULT 24,
ADD COLUMN     "minHumidity" DOUBLE PRECISION DEFAULT 30,
ADD COLUMN     "maxHumidity" DOUBLE PRECISION DEFAULT 70,
ADD COLUMN     "alertDelay" INTEGER DEFAULT 15;

-- CreateTable
CREATE TABLE "room_subscriptions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "room_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "room_subscriptions_userId_idx" ON "room_subscriptions"("userId");

-- CreateIndex
CREATE INDEX "room_subscriptions_roomId_idx" ON "room_subscriptions"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "room_subscriptions_userId_roomId_key" ON "room_subscriptions"("userId", "roomId");

-- AddForeignKey
ALTER TABLE "room_subscriptions" ADD CONSTRAINT "room_subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_subscriptions" ADD CONSTRAINT "room_subscriptions_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "alerts" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "sensorType" "SensorType" NOT NULL,
    "thresholdType" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "threshold" DOUBLE PRECISION NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recipientCount" INTEGER NOT NULL,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "alerts_roomId_sensorType_sentAt_idx" ON "alerts"("roomId", "sensorType", "sentAt" DESC);

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

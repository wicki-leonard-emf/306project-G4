import { prisma } from '../models/index.js';

/**
 * POST /api/sensors/readings
 * Ingère une nouvelle lecture depuis un Raspberry Pi
 * Headers requis: X-API-Key
 * Body: { serialNumber: string, value: number }
 */
export const ingestReading = async (req, res) => {
  try {
    const { serialNumber, value } = req.body;

    // Trouver le capteur par serialNumber
    const sensor = await prisma.sensor.findUnique({
      where: { serialNumber }
    });

    if (!sensor) {
      return res.status(404).json({
        error: `Capteur ${serialNumber} non trouvé`,
        code: 'SENSOR_NOT_FOUND'
      });
    }

    // Valider plages réalistes selon le type de capteur
    if (sensor.type === 'TEMPERATURE') {
      if (value < -50 || value > 100) {
        return res.status(400).json({
          error: 'Température hors limites réalistes (-50 à +100°C)',
          code: 'VALUE_OUT_OF_RANGE'
        });
      }
    } else if (sensor.type === 'HUMIDITY') {
      if (value < 0 || value > 100) {
        return res.status(400).json({
          error: 'Humidité hors limites (0 à 100%)',
          code: 'VALUE_OUT_OF_RANGE'
        });
      }
    }

    // Créer la lecture
    const reading = await prisma.sensorReading.create({
      data: {
        sensorId: sensor.id,
        value
      }
    });

    res.status(201).json({
      success: true,
      reading: {
        id: reading.id,
        timestamp: reading.timestamp
      }
    });
  } catch (error) {
    console.error('Erreur ingestReading:', error);
    res.status(500).json({ error: 'Erreur lors de l\'ingestion de la lecture' });
  }
};

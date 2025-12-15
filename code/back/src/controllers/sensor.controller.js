import { prisma } from '../models/index.js';

/**
 * POST /api/sensors
 * Crée un nouveau capteur
 * Body: { roomId: string, type: 'TEMPERATURE' | 'HUMIDITY', serialNumber: string }
 */
export const createSensor = async (req, res) => {
  try {
    const { roomId, type, serialNumber } = req.body;

    // Valider les champs requis
    if (!roomId || typeof roomId !== 'string') {
      return res.status(400).json({
        error: 'roomId requis (string)',
        code: 'VALIDATION_ERROR'
      });
    }

    if (!type || !['TEMPERATURE', 'HUMIDITY'].includes(type)) {
      return res.status(400).json({
        error: 'type requis (TEMPERATURE ou HUMIDITY)',
        code: 'VALIDATION_ERROR'
      });
    }

    if (!serialNumber || typeof serialNumber !== 'string') {
      return res.status(400).json({
        error: 'serialNumber requis (string)',
        code: 'VALIDATION_ERROR'
      });
    }

    // Vérifier que la salle existe
    const room = await prisma.room.findUnique({
      where: { id: roomId }
    });

    if (!room) {
      return res.status(404).json({
        error: `Salle ${roomId} non trouvée`,
        code: 'ROOM_NOT_FOUND'
      });
    }

    // Vérifier que le serialNumber n'existe pas déjà
    const existingSensor = await prisma.sensor.findUnique({
      where: { serialNumber }
    });

    if (existingSensor) {
      return res.status(409).json({
        error: `Un capteur avec le serialNumber ${serialNumber} existe déjà`,
        code: 'SENSOR_ALREADY_EXISTS'
      });
    }

    // Créer le capteur
    const sensor = await prisma.sensor.create({
      data: {
        roomId,
        type,
        serialNumber
      }
    });

    res.status(201).json({
      success: true,
      sensor: {
        id: sensor.id,
        roomId: sensor.roomId,
        type: sensor.type,
        serialNumber: sensor.serialNumber,
        createdAt: sensor.createdAt
      }
    });
  } catch (error) {
    console.error('Erreur createSensor:', error);
    res.status(500).json({ error: 'Erreur lors de la création du capteur' });
  }
};

/**
 * GET /api/sensors
 * Récupère tous les capteurs
 */
export const getSensors = async (req, res) => {
  try {
    const sensors = await prisma.sensor.findMany({
      include: {
        room: true,
        readings: {
          take: 1,
          orderBy: {
            timestamp: 'desc'
          }
        }
      }
    });

    const formattedSensors = sensors.map(sensor => ({
      id: sensor.id,
      roomId: sensor.roomId,
      roomName: sensor.room.name,
      type: sensor.type,
      serialNumber: sensor.serialNumber,
      lastReading: sensor.readings.length > 0 ? {
        value: sensor.readings[0].value,
        timestamp: sensor.readings[0].timestamp
      } : null,
      createdAt: sensor.createdAt
    }));

    res.json({
      success: true,
      sensors: formattedSensors
    });
  } catch (error) {
    console.error('Erreur getSensors:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des capteurs' });
  }
};

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

import { prisma } from '../models/index.js';

/**
 * GET /api/rooms
 * Récupère toutes les salles avec leurs dernières valeurs de capteurs
 */
export const getRooms = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        sensors: {
          include: {
            readings: {
              take: 1,
              orderBy: {
                timestamp: 'desc'
              }
            }
          }
        }
      }
    });

    // Formatter la réponse
    const formattedRooms = rooms.map(room => {
      let currentTemp = null;
      let currentHumidity = null;
      let lastUpdate = null;

      room.sensors.forEach(sensor => {
        if (sensor.readings.length > 0) {
          const reading = sensor.readings[0];
          if (sensor.type === 'TEMPERATURE') {
            currentTemp = reading.value;
            lastUpdate = reading.timestamp;
          } else if (sensor.type === 'HUMIDITY') {
            currentHumidity = reading.value;
            if (!lastUpdate || reading.timestamp > lastUpdate) {
              lastUpdate = reading.timestamp;
            }
          }
        }
      });

      return {
        id: room.id,
        name: room.name,
        description: room.description,
        currentTemp,
        currentHumidity,
        lastUpdate
      };
    });

    res.json(formattedRooms);
  } catch (error) {
    console.error('Erreur getRooms:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des salles' });
  }
};

/**
 * GET /api/rooms/:id
 * Récupère les détails d'une salle avec tous ses capteurs
 */
export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await prisma.room.findUnique({
      where: { id },
      include: {
        sensors: {
          include: {
            readings: {
              take: 1,
              orderBy: {
                timestamp: 'desc'
              }
            }
          }
        }
      }
    });

    if (!room) {
      return res.status(404).json({
        error: 'Salle non trouvée',
        code: 'ROOM_NOT_FOUND'
      });
    }

    // Formatter la réponse
    const formattedRoom = {
      id: room.id,
      name: room.name,
      description: room.description,
      sensors: room.sensors.map(sensor => ({
        id: sensor.id,
        type: sensor.type,
        serialNumber: sensor.serialNumber,
        currentValue: sensor.readings.length > 0 ? sensor.readings[0].value : null,
        lastUpdate: sensor.readings.length > 0 ? sensor.readings[0].timestamp : null
      }))
    };

    res.json(formattedRoom);
  } catch (error) {
    console.error('Erreur getRoomById:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la salle' });
  }
};

/**
 * POST /api/rooms/:roomId/readings
 * Ingère les lectures de tous les capteurs d'une salle
 * Format: { readings: [{ serialNumber: string, value: number }, ...] }
 */
export const ingestRoomReadings = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { readings } = req.body;

    // Valider que readings est un tableau
    if (!Array.isArray(readings) || readings.length === 0) {
      return res.status(400).json({
        error: 'readings doit être un tableau non-vide',
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

    // Traiter chaque lecture
    const createdReadings = [];
    const errors = [];

    for (const reading of readings) {
      try {
        const { serialNumber, value } = reading;

        // Valider les champs
        if (!serialNumber || typeof serialNumber !== 'string') {
          errors.push({
            serialNumber,
            error: 'serialNumber requis (string)'
          });
          continue;
        }

        if (value === undefined || typeof value !== 'number' || isNaN(value)) {
          errors.push({
            serialNumber,
            error: 'value requis (number)'
          });
          continue;
        }

        // Trouver le capteur par serialNumber
        const sensor = await prisma.sensor.findUnique({
          where: { serialNumber }
        });

        if (!sensor) {
          errors.push({
            serialNumber,
            error: `Capteur ${serialNumber} non trouvé`
          });
          continue;
        }

        // Vérifier que le capteur appartient à cette salle
        if (sensor.roomId !== roomId) {
          errors.push({
            serialNumber,
            error: `Capteur ${serialNumber} n'appartient pas à cette salle`
          });
          continue;
        }

        // Valider plages réalistes selon le type de capteur
        if (sensor.type === 'TEMPERATURE') {
          if (value < -50 || value > 100) {
            errors.push({
              serialNumber,
              error: 'Température hors limites réalistes (-50 à +100°C)'
            });
            continue;
          }
        } else if (sensor.type === 'HUMIDITY') {
          if (value < 0 || value > 100) {
            errors.push({
              serialNumber,
              error: 'Humidité hors limites (0 à 100%)'
            });
            continue;
          }
        }

        // Créer la lecture
        const sensorReading = await prisma.sensorReading.create({
          data: {
            sensorId: sensor.id,
            value
          }
        });

        createdReadings.push({
          serialNumber,
          sensorId: sensor.id,
          value,
          timestamp: sensorReading.timestamp
        });
      } catch (error) {
        errors.push({
          serialNumber: reading.serialNumber,
          error: error.message
        });
      }
    }

    // Répondre avec résumé
    res.status(201).json({
      success: createdReadings.length > 0,
      roomId,
      created: createdReadings.length,
      failed: errors.length,
      readings: createdReadings,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error('Erreur ingestRoomReadings:', error);
    res.status(500).json({ error: 'Erreur lors de l\'ingestion des lectures' });
  }
};

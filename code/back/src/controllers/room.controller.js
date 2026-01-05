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
 * POST /api/rooms
 * Crée une nouvelle salle avec ses capteurs
 * Format: { name: string, description?: string, sensors: [{ serialNumber: string, type: 'TEMPERATURE' | 'HUMIDITY' }, ...] }
 */
export const createRoom = async (req, res) => {
  try {
    const { name, description, sensors } = req.body;

    // Valider les champs requis
    if (!name || typeof name !== 'string') {
      return res.status(400).json({
        error: 'name requis (string)',
        code: 'VALIDATION_ERROR'
      });
    }

    if (!Array.isArray(sensors) || sensors.length === 0) {
      return res.status(400).json({
        error: 'sensors doit être un tableau non-vide',
        code: 'VALIDATION_ERROR'
      });
    }

    // Valider que la salle n'existe pas déjà
    const existingRoom = await prisma.room.findUnique({
      where: { name }
    });

    if (existingRoom) {
      return res.status(409).json({
        error: `Une salle avec le nom "${name}" existe déjà`,
        code: 'ROOM_ALREADY_EXISTS'
      });
    }

    // Valider les capteurs
    const validSensorTypes = ['TEMPERATURE', 'HUMIDITY'];
    const errors = [];

    for (const sensor of sensors) {
      if (!sensor.serialNumber || typeof sensor.serialNumber !== 'string') {
        errors.push({
          index: sensors.indexOf(sensor),
          error: 'serialNumber requis (string)'
        });
      }

      if (!sensor.type || !validSensorTypes.includes(sensor.type)) {
        errors.push({
          index: sensors.indexOf(sensor),
          serialNumber: sensor.serialNumber,
          error: `type requis et doit être l'un de: ${validSensorTypes.join(', ')}`
        });
      }

      // Vérifier que le serialNumber n'existe pas déjà
      const existingSensor = await prisma.sensor.findUnique({
        where: { serialNumber: sensor.serialNumber }
      });

      if (existingSensor) {
        errors.push({
          index: sensors.indexOf(sensor),
          serialNumber: sensor.serialNumber,
          error: 'Ce numéro de série existe déjà'
        });
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Erreurs de validation dans les capteurs',
        code: 'VALIDATION_ERROR',
        details: errors
      });
    }

    // Créer la salle et les capteurs en une transaction
    const room = await prisma.room.create({
      data: {
        name,
        description: description || null,
        sensors: {
          create: sensors.map(sensor => ({
            type: sensor.type,
            serialNumber: sensor.serialNumber
          }))
        }
      },
      include: {
        sensors: true
      }
    });

    res.status(201).json({
      success: true,
      room: {
        id: room.id,
        name: room.name,
        description: room.description,
        sensors: room.sensors.map(sensor => ({
          id: sensor.id,
          serialNumber: sensor.serialNumber,
          type: sensor.type
        })),
        createdAt: room.createdAt
      }
    });
  } catch (error) {
    console.error('Erreur createRoom:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la salle' });
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

/**
 * PUT /api/rooms/:id
 * Met à jour le nom et/ou la description d'une salle
 * Format: { name?: string, description?: string }
 */
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Valider qu'au moins un champ est fourni
    if (name === undefined && description === undefined) {
      return res.status(400).json({
        error: 'Au moins un champ (name ou description) doit être fourni',
        code: 'VALIDATION_ERROR'
      });
    }

    // Valider le type de name si fourni
    if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
      return res.status(400).json({
        error: 'name doit être une chaîne non-vide',
        code: 'VALIDATION_ERROR'
      });
    }

    // Valider le type de description si fourni
    if (description !== undefined && description !== null && typeof description !== 'string') {
      return res.status(400).json({
        error: 'description doit être une chaîne ou null',
        code: 'VALIDATION_ERROR'
      });
    }

    // Vérifier que la salle existe
    const existingRoom = await prisma.room.findUnique({
      where: { id }
    });

    if (!existingRoom) {
      return res.status(404).json({
        error: 'Salle non trouvée',
        code: 'ROOM_NOT_FOUND'
      });
    }

    // Si name est modifié, vérifier qu'il n'entre pas en conflit avec une autre salle
    if (name && name !== existingRoom.name) {
      const conflictingRoom = await prisma.room.findUnique({
        where: { name: name.trim() }
      });

      if (conflictingRoom) {
        return res.status(409).json({
          error: `Une salle avec le nom "${name.trim()}" existe déjà`,
          code: 'ROOM_ALREADY_EXISTS'
        });
      }
    }

    // Construire l'objet de mise à jour
    const updateData = {};
    if (name !== undefined) {
      updateData.name = name.trim();
    }
    if (description !== undefined) {
      updateData.description = description === null ? null : description.trim();
    }

    // Mettre à jour la salle
    const updatedRoom = await prisma.room.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      room: {
        id: updatedRoom.id,
        name: updatedRoom.name,
        description: updatedRoom.description,
        updatedAt: updatedRoom.updatedAt
      }
    });
  } catch (error) {
    console.error('Erreur updateRoom:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la salle' });
  }
};

/**
 * GET /api/rooms/:roomId/history?period=4h
 * Récupère l'historique des données d'une salle
 * Paramètres query: period (4h, 1d, 1w, 1m)
 */
export const getRoomHistory = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { period = '4h' } = req.query;

    // Vérifier que la salle existe
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: { sensors: true }
    });

    if (!room) {
      return res.status(404).json({
        error: 'Salle non trouvée',
        code: 'ROOM_NOT_FOUND'
      });
    }

    // Calculer la date de début selon la période
    const now = new Date();
    let startDate = new Date();
    let intervalMinutes;

    switch (period) {
      case '4h':
        startDate.setHours(now.getHours() - 4);
        intervalMinutes = 5; // Un point toutes les 5 minutes
        break;
      case '1d':
        startDate.setDate(now.getDate() - 1);
        intervalMinutes = 30; // Un point toutes les 30 minutes
        break;
      case '1w':
        startDate.setDate(now.getDate() - 7);
        intervalMinutes = 180; // Un point toutes les 3 heures
        break;
      case '1m':
        startDate.setMonth(now.getMonth() - 1);
        intervalMinutes = 720; // Un point toutes les 12 heures
        break;
      default:
        startDate.setHours(now.getHours() - 4);
        intervalMinutes = 5;
    }

    // Récupérer les capteurs de température et humidité
    const tempSensor = room.sensors.find(s => s.type === 'TEMPERATURE');
    const humiditySensor = room.sensors.find(s => s.type === 'HUMIDITY');

    // Récupérer les readings depuis startDate
    const [tempReadings, humidityReadings] = await Promise.all([
      tempSensor ? prisma.reading.findMany({
        where: {
          sensorId: tempSensor.id,
          timestamp: { gte: startDate }
        },
        orderBy: { timestamp: 'asc' }
      }) : [],
      humiditySensor ? prisma.reading.findMany({
        where: {
          sensorId: humiditySensor.id,
          timestamp: { gte: startDate }
        },
        orderBy: { timestamp: 'asc' }
      }) : []
    ]);

    // Regrouper les données par intervalles
    const groupedData = [];
    const intervalMs = intervalMinutes * 60 * 1000;
    let currentTime = startDate.getTime();

    while (currentTime <= now.getTime()) {
      const nextTime = currentTime + intervalMs;

      // Trouver les readings dans cet intervalle
      const tempInInterval = tempReadings.filter(r => {
        const t = r.timestamp.getTime();
        return t >= currentTime && t < nextTime;
      });

      const humidityInInterval = humidityReadings.filter(r => {
        const t = r.timestamp.getTime();
        return t >= currentTime && t < nextTime;
      });

      // Calculer la moyenne pour cet intervalle
      const avgTemp = tempInInterval.length > 0
        ? tempInInterval.reduce((sum, r) => sum + r.value, 0) / tempInInterval.length
        : null;

      const avgHumidity = humidityInInterval.length > 0
        ? humidityInInterval.reduce((sum, r) => sum + r.value, 0) / humidityInInterval.length
        : null;

      if (avgTemp !== null || avgHumidity !== null) {
        groupedData.push({
          timestamp: new Date(currentTime),
          temperature: avgTemp !== null ? Math.round(avgTemp * 10) / 10 : null,
          humidity: avgHumidity !== null ? Math.round(avgHumidity) : null
        });
      }

      currentTime = nextTime;
    }

    res.json({
      roomId,
      period,
      data: groupedData
    });
  } catch (error) {
    console.error('Erreur getRoomHistory:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'historique' });
  }
};

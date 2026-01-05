import { PrismaClient, SensorType } from '@prisma/client';
import { customAlphabet } from 'nanoid';

const prisma = new PrismaClient();

// Generate short IDs
const alphabet = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const generateId = customAlphabet(alphabet, 6);

function getId() {
  return generateId();
}

async function main() {
  console.log('🌱 Démarrage du seed...');

  // Nettoyer les données existantes
  console.log('🧹 Nettoyage des données existantes...');
  await prisma.sensorReading.deleteMany();
  await prisma.sensor.deleteMany();
  await prisma.room.deleteMany();

  // Créer une salle
  console.log('🏛️ Création de la salle C114...');
  const room = await prisma.room.create({
    data: {
      id: getId(),
      name: 'C114',
      description: 'Salle de classe informatique - Bâtiment C'
    }
  });
  console.log(`✅ Salle créée: ${room.name}`);

  // Créer les capteurs
  console.log('📊 Création des capteurs...');

  const tempSensor = await prisma.sensor.create({
    data: {
      id: getId(),
      roomId: room.id,
      type: SensorType.TEMPERATURE,
      serialNumber: 'PHIDGET-TEMP-001'
    }
  });
  console.log(`✅ Capteur température créé: ${tempSensor.serialNumber}`);

  const humidityySensor = await prisma.sensor.create({
    data: {
      id: getId(),
      roomId: room.id,
      type: SensorType.HUMIDITY,
      serialNumber: 'PHIDGET-HUM-001'
    }
  });
  console.log(`✅ Capteur humidité créé: ${humidityySensor.serialNumber}`);

  // Créer des lectures initiales
  console.log('📈 Création des lectures initiales...');

  const tempReading = await prisma.sensorReading.create({
    data: {
      id: getId(),
      sensorId: tempSensor.id,
      value: 22.5
    }
  });
  console.log(`✅ Lecture température: ${tempReading.value}°C`);

  const humidityReading = await prisma.sensorReading.create({
    data: {
      id: getId(),
      sensorId: humidityySensor.id,
      value: 45.0
    }
  });
  console.log(`✅ Lecture humidité: ${humidityReading.value}%`);

  console.log('✨ Seed terminé avec succès!');
  console.log(`
📋 Résumé:
  - 1 Salle: ${room.name}
  - 2 Capteurs: ${tempSensor.serialNumber}, ${humidityySensor.serialNumber}
  - 2 Lectures initiales
  `);
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

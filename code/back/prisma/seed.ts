import { PrismaClient, SensorType, UserRole } from '@prisma/client';
import { customAlphabet } from 'nanoid';
import bcrypt from 'bcryptjs';

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
  await prisma.roomSubscription.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();

  // Créer les utilisateurs
  console.log('👥 Création des utilisateurs...');
  const users = [];
  const userData = [
    { email: 'admin@school.ch', role: UserRole.ADMIN },
    { email: 'teacher1@school.ch', role: UserRole.ENSEIGNANT },
    { email: 'teacher2@school.ch', role: UserRole.ENSEIGNANT },
    { email: 'student1@school.ch', role: UserRole.ELEVE },
    { email: 'student2@school.ch', role: UserRole.ELEVE },
    { email: 'student3@school.ch', role: UserRole.ELEVE },
  ];

  for (const data of userData) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        id: getId(),
        email: data.email,
        password: hashedPassword,
        role: data.role
      }
    });
    users.push(user);
    console.log(`✅ Utilisateur créé: ${user.email} (${user.role})`);
  }

  // Créer les salles
  const rooms = [];
  const roomData = [
    { name: '001', description: 'Salle 001' },
    { name: '002', description: 'Salle 002' },
    { name: '003', description: 'Salle 003' }
  ];

  console.log('🏛️ Création des salles...');
  for (const data of roomData) {
    const room = await prisma.room.create({
      data: {
        id: getId(),
        name: data.name,
        description: data.description
      }
    });
    rooms.push(room);
    console.log(`✅ Salle créée: ${room.name}`);
  }

  // Créer les capteurs et lectures pour chaque salle
  console.log('📊 Création des capteurs et lectures...');
  let totalSensors = 0;
  let totalReadings = 0;

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const sensorNumber = String(i + 1).padStart(3, '0'); // 001, 002, 003

    const tempSensor = await prisma.sensor.create({
      data: {
        id: getId(),
        roomId: room.id,
        type: SensorType.TEMPERATURE,
        serialNumber: `PHIDGET-TEMP-${sensorNumber}`
      }
    });
    totalSensors++;

    const humiditySensor = await prisma.sensor.create({
      data: {
        id: getId(),
        roomId: room.id,
        type: SensorType.HUMIDITY,
        serialNumber: `PHIDGET-HUM-${sensorNumber}`
      }
    });
    totalSensors++;

    // Créer des lectures initiales avec des valeurs différentes pour chaque salle
    const tempValue = 20 + Math.random() * 5; // Entre 20 et 25°C
    const humidityValue = 40 + Math.random() * 20; // Entre 40 et 60%

    await prisma.sensorReading.create({
      data: {
        id: getId(),
        sensorId: tempSensor.id,
        value: tempValue
      }
    });
    totalReadings++;

    await prisma.sensorReading.create({
      data: {
        id: getId(),
        sensorId: humiditySensor.id,
        value: humidityValue
      }
    });
    totalReadings++;

    console.log(`✅ Capteurs et lectures créés pour ${room.name}`);
  }

  console.log('✨ Seed terminé avec succès!');
  console.log(`
📋 Résumé:
  - ${rooms.length} Salles: ${rooms.map(r => r.name).join(', ')}
  - ${totalSensors} Capteurs
  - ${totalReadings} Lectures initiales
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

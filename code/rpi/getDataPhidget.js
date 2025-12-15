import * as phidget22 from 'phidget22';
import dotenv from 'dotenv';

dotenv.config();

// --- CONFIGURATION ---
const API_KEY = process.env.RPI_API_KEY;
const SERVER_URL = process.env.SERVER_URL || 'https://sensorhub-three.vercel.app/api/sensors';
const PHIDGET_HOST = process.env.PHIDGET_HOST || 'localhost';
const PHIDGET_PORT = Number(process.env.PHIDGET_PORT || 5661);
const TEMP_SENSOR_ID = process.env.TEMP_SENSOR_ID;
const HUMIDITY_SENSOR_ID = process.env.HUMIDITY_SENSOR_ID;
const READ_INTERVAL = process.env.READ_INTERVAL || 10000;

// Vérifier que les variables d'environnement sont définies
if (!API_KEY || !TEMP_SENSOR_ID || !HUMIDITY_SENSOR_ID) {
	console.error('❌ Erreur: RPI_API_KEY, TEMP_SENSOR_ID et HUMIDITY_SENSOR_ID doivent être définis dans .env');
	process.exit(1);
}

// --- CONNEXION PHIDGET ---
const conn = new phidget22.NetworkConnection(PHIDGET_PORT, PHIDGET_HOST);

async function connectToPhidgetServer() {
	let connected = false;
	while (!connected) {
		try {
			console.log("Connexion au serveur Phidget...");
			await conn.connect();
			console.log("✅ Connecté au serveur Phidget.");
			connected = true;
		} catch (err) {
			console.error("⚠️ Échec de connexion. Nouvelle tentative dans 5s...");
			await new Promise(resolve => setTimeout(resolve, 5000));
		}
	}
}

await connectToPhidgetServer();

// --- INITIALISATION CAPTEURS ---
const HUB_PORT = Number(process.env.HUB_PORT || 3);

const humiditySensor0 = new phidget22.HumiditySensor();
const temperatureSensor0 = new phidget22.TemperatureSensor();

// Humidity/Temperature share the same VINT port; channel 0 = humidity, 1 = temp.
humiditySensor0.setHubPort(HUB_PORT);
humiditySensor0.setChannel(0);

temperatureSensor0.setHubPort(HUB_PORT);
temperatureSensor0.setChannel(0);

humiditySensor0.onAttach = async () => {
	try {
		const minInterval = await humiditySensor0.getMinDataInterval();
		await humiditySensor0.setDataInterval(Math.max(minInterval, 500));
		console.log(`Humidité attachée (port ${HUB_PORT}), intervalle ${await humiditySensor0.getDataInterval()}ms`);
	} catch (err) {
		console.error('Erreur configuration capteur humidité:', err);
	}
};

temperatureSensor0.onAttach = async () => {
	try {
		const minInterval = await temperatureSensor0.getMinDataInterval();
		await temperatureSensor0.setDataInterval(Math.max(minInterval, 500));
		console.log(`Température attachée (port ${HUB_PORT}), intervalle ${await temperatureSensor0.getDataInterval()}ms`);
	} catch (err) {
		console.error('Erreur configuration capteur température:', err);
	}
};

console.log('Ouverture des capteurs...');
try {
	await Promise.all([
		humiditySensor0.open(5000),
		temperatureSensor0.open(5000),
	]);
	console.log('✅ Capteurs prêts.');
} catch (err) {
	console.error(`❌ Erreur: Impossible de trouver les capteurs (Port ${HUB_PORT}).`, err);
	process.exit(1);
}

// --- ENVOI DES DONNÉES ---
const sendTemperature = async (temperature) => {
	try {
		const response = await fetch(SERVER_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-API-Key': API_KEY
			},
			body: JSON.stringify({
				serialNumber: TEMP_SENSOR_ID,
				value: temperature
			})
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`HTTP ${response.status} - ${errorText}`);
		}

		const result = await response.json();
		console.log(`[${new Date().toLocaleTimeString()}] ✅ Température envoyée: ${temperature}°C`);
	} catch (err) {
		console.error(`[${new Date().toLocaleTimeString()}] ❌ Erreur envoi température:`, err.message);
	}
};

const sendHumidity = async (humidity) => {
	try {
		const response = await fetch(SERVER_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-API-Key': API_KEY
			},
			body: JSON.stringify({
				serialNumber: HUMIDITY_SENSOR_ID,
				value: humidity
			})
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`HTTP ${response.status} - ${errorText}`);
		}

		const result = await response.json();
		console.log(`[${new Date().toLocaleTimeString()}] ✅ Humidité envoyée: ${humidity}%`);
	} catch (err) {
		console.error(`[${new Date().toLocaleTimeString()}] ❌ Erreur envoi humidité:`, err.message);
	}
};

// --- LECTURE ---
const readSensors = async () => {
	try {
		const humidity = await humiditySensor0.getHumidity();
		const temperature = await temperatureSensor0.getTemperature();

		console.log(`Lecture: ${temperature}°C, ${humidity}%`);

		// Envoyer les deux données séparément
		await sendTemperature(temperature);
		await sendHumidity(humidity);
	} catch (err) {
		console.error('Erreur lecture capteurs:', err);
	}
};

// Démarrage de la boucle
readSensors();
setInterval(readSensors, READ_INTERVAL);
# 🧪 Guide de Test - SensorHub API

## Configuration de l'API Key

Le script de test utilise la **même API Key que le Raspberry Pi** pour envoyer les données de capteurs.

### Clé API configurée

- **Variable d'environnement:** `RPI_API_KEY`
- **Valeur défaut:** `sensorhub-rpi-api-key-2025`
- **Fichier:** `.env`

### Endpoints utilisant l'API Key

Ces endpoints requièrent le header `X-API-Key`:

```bash
# 1. Envoyer une seule lecture
curl -X POST http://localhost:3000/api/sensors/readings \
  -H "X-API-Key: sensorhub-rpi-api-key-2025" \
  -H "Content-Type: application/json" \
  -d '{"serialNumber": "PHIDGET-TEMP-001", "value": 22.5}'

# 2. Envoyer plusieurs lectures pour une salle
curl -X POST http://localhost:3000/api/rooms/[ROOM_ID]/readings \
  -H "X-API-Key: sensorhub-rpi-api-key-2025" \
  -H "Content-Type: application/json" \
  -d '{
    "readings": [
      {"serialNumber": "PHIDGET-TEMP-001", "value": 23.5},
      {"serialNumber": "PHIDGET-HUM-001", "value": 48.2}
    ]
  }'
```

---

## Exécution des tests

### 1. Démarrer le serveur backend

```bash
cd code/back
npm install
npm run dev
```

### 2. Exécuter les tests

```bash
node test-endpoints.js
```

### Avec une API Key personnalisée

```bash
RPI_API_KEY="ma-clé-custom" node test-endpoints.js
```

### Avec un serveur distant

```bash
BASE_URL=https://sensorhub-three.vercel.app node test-endpoints.js
```

---

## Que teste le script ?

### ✅ Tests positifs

- **Rooms:** Créer, lister, récupérer détails
- **Sensors:** Créer, lister
- **Readings:** Envoyer une lecture, envoyer plusieurs lectures
- **Auth:** Login, logout, utilisateur actuel
- **Users:** Lister, récupérer, modifier, supprimer (admin)

### ⚠️ Tests d'erreur

- Connexion invalide (401/400)
- API Key manquante (401)
- Ressource invalide (404)

---

## Nettoyage automatique

À la fin des tests, toutes les données créées sont **automatiquement supprimées**:

```
============================================================
CLEANUP: Removing test data
============================================================

ℹ Deleted room: [room-id]
ℹ Deleted sensor: [sensor-id]

Cleanup completed: 2 resources deleted
```

---

## Résumé des résultats

Le script affiche un rapport coloré:

```
[36m╔════════════════════════════════════════════════════════╗[0m
[36m║        SensorHub API - Complete Endpoint Test Suite     ║[0m
[36m╚════════════════════════════════════════════════════════╝[0m

Test Results:

  ✓ Create Room
  ✓ Get Rooms
  ✓ Get Room by ID
  ✓ Get Sensors
  ✓ Create Sensor
  ✓ Post Single Reading
  ✓ Post Batch Readings
  ✓ Login
  ✓ Get Current User
  ✓ Get Users (Admin)
  ✓ Get User by ID (Admin)
  ✓ Update User (Admin)
  ✓ Logout
  ✓ Invalid Login (Error)
  ✓ Missing API Key (Error)
  ✓ Invalid Room ID (Error)

Summary:
  Passed: 16
  Failed: 0
  Total: 16

Pass Rate: 100%
```

---

## Dépannage

### Erreur: "Cannot find module"
- Assure-toi d'être dans le répertoire `code/back`
- Vérifie que Node.js 18+ est installé

### Erreur: "ECONNREFUSED"
- Le serveur backend n'est pas en cours d'exécution
- Exécute `npm run dev` dans un autre terminal

### Erreur: "DATABASE_URL"
- Vérifie le fichier `.env` et la configuration PostgreSQL
- Assure-toi que la base de données est accessible

### Erreur: "Clé API invalide"
- Vérifie que `RPI_API_KEY` est correctement défini dans `.env`
- Utilise la même clé pour le test et le Raspberry Pi

---

## Configuration du Raspberry Pi

Pour utiliser la même clé API sur le Raspberry Pi:

```env
# code/rpi/.env
RPI_API_KEY="sensorhub-rpi-api-key-2025"
SERVER_URL="http://localhost:3000/api/sensors/readings"
TEMP_SENSOR_ID="PHIDGET-TEMP-001"
HUMIDITY_SENSOR_ID="PHIDGET-HUM-001"
READ_INTERVAL="10000"
```

Puis démarre le script:

```bash
cd code/rpi
node getDataPhidget.js
```

---

**Dernière mise à jour:** 6 Janvier 2026

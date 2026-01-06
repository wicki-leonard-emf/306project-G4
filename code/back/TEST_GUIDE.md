# Guide de Test des Endpoints API

Ce guide te montre comment tester tous les endpoints de l'API SensorHub.

## Prérequis

- Le serveur backend doit être en cours d'exécution : `npm run dev`
- Pour tester avec l'outil Node.js : `node test-endpoints.js`
- Pour tester manuellement : utiliser `curl` ou Postman

---

## 1️⃣ Tests avec le script Node.js

### Démarrer le serveur

```bash
cd code/back
npm install
npm run dev
```

### Exécuter les tests

```bash
node test-endpoints.js
```

### Avec un serveur distant

```bash
BASE_URL=https://sensorhub-three.vercel.app node test-endpoints.js
```

### Avec une clé API personnalisée

```bash
API_KEY=ma-cle-api-secrète node test-endpoints.js
```

---

## 2️⃣ Tests manuels avec cURL

### Authentification

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@school.ch",
    "password": "password123"
  }' \
  -c cookies.txt
```

#### Récupérer l'utilisateur actuel
```bash
curl http://localhost:3000/api/auth/me \
  -b cookies.txt
```

#### Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt
```

---

### Salles (Rooms)

#### Créer une salle avec capteurs
```bash
curl -X POST http://localhost:3000/api/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Salle C114",
    "description": "Salle de classe informatique",
    "sensors": [
      {"serialNumber": "PHIDGET-TEMP-001", "type": "TEMPERATURE"},
      {"serialNumber": "PHIDGET-HUM-001", "type": "HUMIDITY"}
    ]
  }'
```

#### Lister toutes les salles
```bash
curl http://localhost:3000/api/rooms
```

#### Récupérer les détails d'une salle
```bash
curl http://localhost:3000/api/rooms/[ROOM_ID]
```

---

### Capteurs (Sensors)

#### Lister tous les capteurs
```bash
curl http://localhost:3000/api/sensors
```

#### Créer un nouveau capteur
```bash
curl -X POST http://localhost:3000/api/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": "[ROOM_ID]",
    "type": "TEMPERATURE",
    "serialNumber": "PHIDGET-TEMP-002"
  }'
```

---

### Lectures (Readings)

#### Envoyer une seule lecture
```bash
curl -X POST http://localhost:3000/api/sensors/readings \
  -H "Content-Type: application/json" \
  -H "X-API-Key: test-api-key" \
  -d '{
    "serialNumber": "PHIDGET-TEMP-001",
    "value": 22.5
  }'
```

#### Envoyer plusieurs lectures pour une salle
```bash
curl -X POST http://localhost:3000/api/rooms/[ROOM_ID]/readings \
  -H "Content-Type: application/json" \
  -H "X-API-Key: test-api-key" \
  -d '{
    "readings": [
      {"serialNumber": "PHIDGET-TEMP-001", "value": 23.5},
      {"serialNumber": "PHIDGET-HUM-001", "value": 48.2}
    ]
  }'
```

---

### Utilisateurs (Users) - Admin uniquement

#### Lister tous les utilisateurs
```bash
curl http://localhost:3000/api/users \
  -b cookies.txt
```

#### Récupérer un utilisateur
```bash
curl http://localhost:3000/api/users/[USER_ID] \
  -b cookies.txt
```

#### Modifier le rôle d'un utilisateur
```bash
curl -X PUT http://localhost:3000/api/users/[USER_ID] \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "role": "ENSEIGNANT"
  }'
```

#### Supprimer un utilisateur
```bash
curl -X DELETE http://localhost:3000/api/users/[USER_ID] \
  -b cookies.txt
```

---

## 3️⃣ Variables d'environnement

Crée un fichier `.env` dans `code/back/` :

```env
# Base de données
DATABASE_URL=postgresql://user:password@localhost:5432/sensorhub

# Session
SESSION_SECRET=your-secret-key-here

# API
PORT=3000
API_KEY=test-api-key
```

---

## 4️⃣ Codes d'erreur courants

| Code | Sens | Solution |
|------|------|----------|
| `400` | Validation échouée | Vérifier les paramètres |
| `401` | Non authentifié | Se connecter d'abord |
| `403` | Permission insuffisante | Utiliser un compte admin |
| `404` | Ressource non trouvée | Vérifier l'ID |
| `409` | Ressource existe déjà | Utiliser un nouveau serial number |
| `500` | Erreur serveur | Vérifier les logs du serveur |

---

## 5️⃣ Exemple de flux complet

```bash
# 1. Créer une salle
ROOM=$(curl -s -X POST http://localhost:3000/api/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TestRoom",
    "sensors": [
      {"serialNumber": "TEST-TEMP", "type": "TEMPERATURE"}
    ]
  }')

ROOM_ID=$(echo $ROOM | jq -r '.room.id')
echo "Room ID: $ROOM_ID"

# 2. Envoyer une lecture
curl -X POST http://localhost:3000/api/sensors/readings \
  -H "Content-Type: application/json" \
  -H "X-API-Key: test-api-key" \
  -d '{
    "serialNumber": "TEST-TEMP",
    "value": 21.5
  }'

# 3. Récupérer les données
curl http://localhost:3000/api/rooms/$ROOM_ID
```

---

## 6️⃣ Fichier Postman

Utilise `Postman_Collection.json` (s'il existe) pour importer tous les endpoints préfigurés.

---

**Dernière mise à jour:** 6 Janvier 2026

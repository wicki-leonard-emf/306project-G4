# Documentation API - Classroom Monitor

**Base URL:** `https://sensorhub-three.vercel.app`

---

## Table des Matières
1. [Authentification](#authentification)
2. [Utilisateurs (Users)](#utilisateurs-users)
3. [Salles (Rooms)](#salles-rooms)
4. [Capteurs (Sensors)](#capteurs-sensors)
5. [Lectures (Readings)](#lectures-readings)
6. [Codes d'Erreur](#codes-derreur)

---

## Authentification

### POST /api/auth/login
**Authentifie un utilisateur et crée une session**

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "user@school.ch",
  "password": "password123"
}
```

**Paramètres:**
- `email` (string, requis) - Email de l'utilisateur
- `password` (string, requis) - Mot de passe

**Réponse (200):**
```json
{
  "user": {
    "id": "user-001",
    "email": "user@school.ch",
    "role": "ADMIN"
  }
}
```

**Erreurs:**
- `400` - Email ou mot de passe invalide
- `401` - Utilisateur non trouvé

---

### POST /api/auth/logout
**Déconnecte l'utilisateur actuel**

**Authentification:** Session (requis)

**Réponse (200):**
```json
{
  "message": "Déconnecté avec succès"
}
```

---

### GET /api/auth/me
**Récupère les informations de l'utilisateur actuel**

**Authentification:** Session (requis)

**Réponse (200):**
```json
{
  "user": {
    "id": "user-001",
    "email": "user@school.ch",
    "role": "ADMIN"
  }
}
```

**Erreurs:**
- `401` - Non authentifié

---

## Utilisateurs (Users)

### GET /api/users
**Récupère la liste de tous les utilisateurs**

**Authentification:** Session requise + Rôle ADMIN

**Réponse (200):**
```json
[
  {
    "id": "user-001",
    "email": "admin@school.ch",
    "role": "ADMIN",
    "createdAt": "2025-12-09T09:00:00.000Z"
  },
  {
    "id": "user-002",
    "email": "teacher@school.ch",
    "role": "ENSEIGNANT",
    "createdAt": "2025-12-09T09:30:00.000Z"
  },
  {
    "id": "user-003",
    "email": "student@school.ch",
    "role": "ELEVE",
    "createdAt": "2025-12-09T10:00:00.000Z"
  }
]
```

**Erreurs:**
- `401` - Non authentifié
- `403` - Permissions insuffisantes (non-admin)

**Exemple cURL:**
```bash
curl https://sensorhub-three.vercel.app/api/users \
  -H "Cookie: connect.sid=..." \
```

---

### GET /api/users/:id
**Récupère les informations d'un utilisateur spécifique**

**Authentification:** Session requise + Rôle ADMIN

**Paramètres:**
- `id` (string) - ID de l'utilisateur

**Réponse (200):**
```json
{
  "id": "user-002",
  "email": "teacher@school.ch",
  "role": "ENSEIGNANT",
  "createdAt": "2025-12-09T09:30:00.000Z"
}
```

**Erreurs:**
- `401` - Non authentifié
- `403` - Permissions insuffisantes (non-admin)
- `404` - Utilisateur non trouvé

---

### PUT /api/users/:id
**Modifie le rôle d'un utilisateur**

**Authentification:** Session requise + Rôle ADMIN

**Paramètres:**
- `id` (string) - ID de l'utilisateur

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "role": "ENSEIGNANT"
}
```

**Paramètres du body:**
- `role` (string, requis) - Nouveau rôle: `ADMIN`, `ENSEIGNANT`, ou `ELEVE`

**Réponse (200):**
```json
{
  "id": "user-002",
  "email": "teacher@school.ch",
  "role": "ENSEIGNANT",
  "createdAt": "2025-12-09T09:30:00.000Z"
}
```

**Erreurs:**
- `400` - Rôle invalide
- `401` - Non authentifié
- `403` - Permissions insuffisantes (non-admin)
- `404` - Utilisateur non trouvé

**Exemple cURL:**
```bash
curl -X PUT https://sensorhub-three.vercel.app/api/users/user-002 \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=..." \
  -d '{
    "role": "ADMIN"
  }'
```

---

### DELETE /api/users/:id
**Supprime un utilisateur**

**Authentification:** Session requise + Rôle ADMIN

**Paramètres:**
- `id` (string) - ID de l'utilisateur

**Réponse (200):**
```json
{
  "message": "User deleted successfully"
}
```

**Erreurs:**
- `401` - Non authentifié
- `403` - Permissions insuffisantes (non-admin)
- `404` - Utilisateur non trouvé

**Exemple cURL:**
```bash
curl -X DELETE https://sensorhub-three.vercel.app/api/users/user-002 \
  -H "Cookie: connect.sid=..." \
```

---

## Salles (Rooms)

### POST /api/rooms
**Crée une nouvelle salle avec ses capteurs**

**Authentification:** Non requis

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "C114",
  "description": "Salle de classe informatique - Bâtiment C",
  "sensors": [
    {
      "serialNumber": "PHIDGET-TEMP-001",
      "type": "TEMPERATURE"
    },
    {
      "serialNumber": "PHIDGET-HUM-001",
      "type": "HUMIDITY"
    }
  ]
}
```

**Paramètres:**
- `name` (string, requis) - Nom unique de la salle
- `description` (string, optionnel) - Description de la salle
- `sensors` (array, requis) - Tableau des capteurs avec:
  - `serialNumber` (string, requis) - Numéro de série unique du capteur
  - `type` (string, requis) - Type: `TEMPERATURE` ou `HUMIDITY`

**Réponse (201):**
```json
{
  "success": true,
  "room": {
    "id": "cmiyfqjr2000014j0nt7aopm3",
    "name": "C114",
    "description": "Salle de classe informatique - Bâtiment C",
    "sensors": [
      {
        "id": "sensor-001",
        "serialNumber": "PHIDGET-TEMP-001",
        "type": "TEMPERATURE"
      },
      {
        "id": "sensor-002",
        "serialNumber": "PHIDGET-HUM-001",
        "type": "HUMIDITY"
      }
    ],
    "createdAt": "2025-12-15T14:30:00.000Z"
  }
}
```

**Erreurs:**
- `400` - Validation échouée (paramètres manquants, capteurs invalides, etc.)
- `409` - Salle ou numéro de série de capteur déjà existant

**Exemple cURL:**
```bash
curl -X POST https://sensorhub-three.vercel.app/api/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "name": "C114",
    "description": "Salle de classe informatique",
    "sensors": [
      {"serialNumber": "PHIDGET-TEMP-001", "type": "TEMPERATURE"},
      {"serialNumber": "PHIDGET-HUM-001", "type": "HUMIDITY"}
    ]
  }'
```

---

### GET /api/rooms
**Récupère toutes les salles avec leurs dernières valeurs de capteurs**

**Authentification:** Non requis

**Réponse (200):**
```json
[
  {
    "id": "cmiyfqjr2000014j0nt7aopm3",
    "name": "C114",
    "description": "Salle de classe informatique - Bâtiment C",
    "currentTemp": 22.5,
    "currentHumidity": 45,
    "lastUpdate": "2025-12-09T10:26:16.075Z"
  }
]
```

**Exemple cURL:**
```bash
curl https://sensorhub-three.vercel.app/api/rooms
```

---

### GET /api/rooms/:id
**Récupère les détails d'une salle avec tous ses capteurs**

**Authentification:** Non requis

**Paramètres:**
- `id` (string) - ID de la salle

**Réponse (200):**
```json
{
  "id": "cmiyfqjr2000014j0nt7aopm3",
  "name": "C114",
  "description": "Salle de classe informatique - Bâtiment C",
  "sensors": [
    {
      "id": "sensor-001",
      "type": "TEMPERATURE",
      "serialNumber": "PHIDGET-TEMP-001",
      "currentValue": 22.5,
      "lastUpdate": "2025-12-09T10:26:16.075Z"
    },
    {
      "id": "sensor-002",
      "type": "HUMIDITY",
      "serialNumber": "PHIDGET-HUM-001",
      "currentValue": 45,
      "lastUpdate": "2025-12-09T10:26:16.075Z"
    }
  ]
}
```

**Exemple cURL:**
```bash
curl https://sensorhub-three.vercel.app/api/rooms/cmiyfqjr2000014j0nt7aopm3
```

---

### POST /api/rooms/:roomId/readings
**Envoie plusieurs lectures de capteurs pour une salle à la fois**

**Authentification:** X-API-Key (requis)

**Paramètres:**
- `roomId` (string) - ID de la salle

**Headers:**
```
X-API-Key: votre-cle-api
Content-Type: application/json
```

**Body:**
```json
{
  "readings": [
    {
      "serialNumber": "PHIDGET-TEMP-001",
      "value": 23.5
    },
    {
      "serialNumber": "PHIDGET-HUM-001",
      "value": 48.2
    }
  ]
}
```

**Réponse (201):**
```json
{
  "success": true,
  "roomId": "cmiyfqjr2000014j0nt7aopm3",
  "created": 2,
  "failed": 0,
  "readings": [
    {
      "serialNumber": "PHIDGET-TEMP-001",
      "sensorId": "sensor-001",
      "value": 23.5,
      "timestamp": "2025-12-15T14:30:00.000Z"
    },
    {
      "serialNumber": "PHIDGET-HUM-001",
      "sensorId": "sensor-002",
      "value": 48.2,
      "timestamp": "2025-12-15T14:30:00.000Z"
    }
  ]
}
```

**Exemple cURL:**
```bash
curl -X POST https://sensorhub-three.vercel.app/api/rooms/cmiyfqjr2000014j0nt7aopm3/readings \
  -H "X-API-Key: votre-cle-api" \
  -H "Content-Type: application/json" \
  -d '{
    "readings": [
      {"serialNumber": "PHIDGET-TEMP-001", "value": 23.5},
      {"serialNumber": "PHIDGET-HUM-001", "value": 48.2}
    ]
  }'
```

---

## Capteurs (Sensors)

### GET /api/sensors
**Récupère tous les capteurs avec leur dernière lecture**

**Authentification:** Non requis

**Réponse (200):**
```json
{
  "success": true,
  "sensors": [
    {
      "id": "sensor-001",
      "roomId": "cmiyfqjr2000014j0nt7aopm3",
      "roomName": "C114",
      "type": "TEMPERATURE",
      "serialNumber": "PHIDGET-TEMP-001",
      "lastReading": {
        "value": 22.5,
        "timestamp": "2025-12-09T10:26:16.075Z"
      },
      "createdAt": "2025-12-09T09:00:00.000Z"
    },
    {
      "id": "sensor-002",
      "roomId": "cmiyfqjr2000014j0nt7aopm3",
      "roomName": "C114",
      "type": "HUMIDITY",
      "serialNumber": "PHIDGET-HUM-001",
      "lastReading": {
        "value": 45,
        "timestamp": "2025-12-09T10:26:16.075Z"
      },
      "createdAt": "2025-12-09T09:00:00.000Z"
    }
  ]
}
```

**Exemple cURL:**
```bash
curl https://sensorhub-three.vercel.app/api/sensors
```

---

### POST /api/sensors
**Crée un nouveau capteur dans la base de données**

**Authentification:** Non requis

**Body:**
```json
{
  "roomId": "cmiyfqjr2000014j0nt7aopm3",
  "type": "TEMPERATURE",
  "serialNumber": "PHIDGET-TEMP-002"
}
```

**Paramètres:**
- `roomId` (string, requis) - ID de la salle
- `type` (string, requis) - Type de capteur: `TEMPERATURE` ou `HUMIDITY`
- `serialNumber` (string, requis) - Numéro de série unique du capteur Phidget

**Réponse (201):**
```json
{
  "success": true,
  "sensor": {
    "id": "sensor-003",
    "roomId": "cmiyfqjr2000014j0nt7aopm3",
    "type": "TEMPERATURE",
    "serialNumber": "PHIDGET-TEMP-002",
    "createdAt": "2025-12-15T14:30:00.000Z"
  }
}
```

**Erreurs:**
- `400` - Validation échouée (paramètres manquants ou invalides)
- `404` - Salle non trouvée
- `409` - Capteur avec ce serialNumber existe déjà

**Exemple cURL:**
```bash
curl -X POST https://sensorhub-three.vercel.app/api/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": "cmiyfqjr2000014j0nt7aopm3",
    "type": "TEMPERATURE",
    "serialNumber": "PHIDGET-TEMP-002"
  }'
```

---

## Lectures (Readings)

### POST /api/sensors/readings
**Envoie une seule lecture de capteur (température ou humidité)**

**Authentification:** X-API-Key (requis)

**Headers:**
```
X-API-Key: votre-cle-api
Content-Type: application/json
```

**Body:**
```json
{
  "serialNumber": "PHIDGET-TEMP-001",
  "value": 22.5
}
```

**Paramètres:**
- `serialNumber` (string, requis) - Numéro de série du capteur
- `value` (number, requis) - Valeur mesurée
  - Pour TEMPERATURE: -50 à +100°C
  - Pour HUMIDITY: 0 à 100%

**Réponse (201):**
```json
{
  "success": true,
  "reading": {
    "id": "reading-001",
    "timestamp": "2025-12-15T14:30:00.000Z"
  }
}
```

**Erreurs:**
- `400` - Validation échouée ou valeur hors limites
- `401` - Clé API manquante ou invalide
- `404` - Capteur non trouvé

**Exemple cURL - Température:**
```bash
curl -X POST https://sensorhub-three.vercel.app/api/sensors/readings \
  -H "X-API-Key: votre-cle-api" \
  -H "Content-Type: application/json" \
  -d '{
    "serialNumber": "PHIDGET-TEMP-001",
    "value": 22.5
  }'
```

**Exemple cURL - Humidité:**
```bash
curl -X POST https://sensorhub-three.vercel.app/api/sensors/readings \
  -H "X-API-Key: votre-cle-api" \
  -H "Content-Type: application/json" \
  -d '{
    "serialNumber": "PHIDGET-HUM-001",
    "value": 48.5
  }'
```

---

## Codes d'Erreur

| Code | Signification |
|------|---------------|
| `400` | Validation échouée - Paramètres manquants ou invalides |
| `401` | Non authentifié - Clé API manquante ou invalide |
| `404` | Non trouvé - Ressource (salle, capteur) n'existe pas |
| `409` | Conflit - Ressource existe déjà (ex: serial number dupliqué) |
| `500` | Erreur serveur interne |

**Exemple de réponse d'erreur:**
```json
{
  "error": "Température hors limites réalistes (-50 à +100°C)",
  "code": "VALUE_OUT_OF_RANGE"
}
```

---

## Configuration du Raspberry Pi

Pour envoyer des données depuis le Raspberry Pi, utilise le fichier `asdfasdf.js` avec les variables d'environnement:

```bash
# .env
RPI_API_KEY=votre-clé-api-secrète
TEMP_SENSOR_ID=PHIDGET-TEMP-001
HUMIDITY_SENSOR_ID=PHIDGET-HUM-001
SERVER_URL=https://sensorhub-three.vercel.app/api/sensors/readings
READ_INTERVAL=10000
```

Puis lance:
```bash
node asdfasdf.js
```

---

## Résumé des Endpoints

### Authentification
| Méthode | Endpoint | Authentification | Description |
|---------|----------|-----------------|-------------|
| POST | `/api/auth/login` | Non | Authentifier un utilisateur |
| POST | `/api/auth/logout` | Oui | Déconnecter l'utilisateur |
| GET | `/api/auth/me` | Oui | Récupérer l'utilisateur actuel |

### Utilisateurs (Admin uniquement)
| Méthode | Endpoint | Authentification | Description |
|---------|----------|-----------------|-------------|
| GET | `/api/users` | Oui (Admin) | Lister tous les utilisateurs |
| GET | `/api/users/:id` | Oui (Admin) | Détails d'un utilisateur |
| PUT | `/api/users/:id` | Oui (Admin) | Modifier le rôle d'un utilisateur |
| DELETE | `/api/users/:id` | Oui (Admin) | Supprimer un utilisateur |

### Salles & Capteurs
| Méthode | Endpoint | Authentification | Description |
|---------|----------|-----------------|-------------|
| POST | `/api/rooms` | Non | Créer une salle avec ses capteurs |
| GET | `/api/rooms` | Non | Lister toutes les salles |
| GET | `/api/rooms/:id` | Non | Détails d'une salle |
| POST | `/api/rooms/:roomId/readings` | Oui (API-Key) | Envoyer plusieurs lectures |
| GET | `/api/sensors` | Non | Lister tous les capteurs |
| POST | `/api/sensors` | Non | Créer un capteur |
| POST | `/api/sensors/readings` | Oui (API-Key) | Envoyer une lecture |

---

**Dernière mise à jour:** 16 Décembre 2025

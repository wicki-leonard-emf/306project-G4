# Backend v1 - Liste des tâches à accomplir

**État du projet:** Planification approuvée
**Version cible:** v1 (MVP)
**Architecture:** MVC (Node.js + Express + Prisma)
**Budget temps:** ~3-4h

---

## 🎯 Vue d'ensemble

Backend minimal pour valider l'architecture et la communication Raspberry Pi → Backend → Frontend.

### Scope v1
- ✅ Ingestion de données depuis 1 Raspberry Pi (2 capteurs: température + humidité)
- ✅ Affichage temps réel d'une salle
- ✅ API REST publique (pas d'authentification)
- ❌ Pas d'historique (juste valeurs actuelles)
- ❌ Pas d'alertes
- ❌ Pas de login

---

## Phase 1: Setup & Models (1h)

### ✅ 1.1 Setup projet (20min)
- [ ] Initialiser `package.json` avec `npm init -y`
- [ ] Installer dépendances production: `express`, `@prisma/client`, `cors`, `dotenv`
- [ ] Installer dépendances dev: `prisma`, `typescript`, `tsx`, `@types/express`, `@types/cors`, `@types/node`
- [ ] Créer `tsconfig.json`
- [ ] Créer `vercel.json`
- [ ] Créer `.gitignore` (node_modules, .env, .env.local)
- [ ] Créer `.env.example`

**Fichiers à créer:**
- `/dev/back/package.json`
- `/dev/back/tsconfig.json`
- `/dev/back/vercel.json`
- `/dev/back/.gitignore`
- `/dev/back/.env.example`

---

### ✅ 1.2 Database setup (40min)

#### Étape 1: Créer Neon PostgreSQL
- [ ] Créer compte sur https://console.neon.tech/
- [ ] Créer un nouveau projet
- [ ] Obtenir la `DATABASE_URL` (format: `postgresql://user:pass@host/dbname?sslmode=require`)
- [ ] Ajouter la DATABASE_URL dans `.env` local (ne pas committer)

#### Étape 2: Créer schema Prisma
- [ ] Créer `/dev/back/prisma/schema.prisma` avec 3 modèles:
  - **Room**: id, name (unique), description, createdAt, updatedAt
  - **Sensor**: id, roomId (FK), type (enum: TEMPERATURE|HUMIDITY), serialNumber (unique), createdAt, updatedAt
  - **SensorReading**: id, sensorId (FK), value (Float), timestamp, createdAt
- [ ] Configurer datasource `db` avec Neon PostgreSQL
- [ ] Configurer generator `client`

**Fichier à créer:**
- `/dev/back/prisma/schema.prisma`

#### Étape 3: Migrations Prisma
- [ ] Exécuter: `npx prisma migrate dev --name init`
- [ ] Vérifier que les tables sont créées dans Neon

#### Étape 4: Seed data
- [ ] Créer `/dev/back/prisma/seed.ts` avec:
  - 1 Room: "C114" (Salle de classe informatique - Bâtiment C)
  - 2 Sensors: "PHIDGET-TEMP-001" (TEMPERATURE) et "PHIDGET-HUM-001" (HUMIDITY)
- [ ] Configurer `"prisma"` → `"seed"` dans `package.json`
- [ ] Exécuter: `npx prisma db seed`
- [ ] Vérifier les données avec: `npx prisma studio`

**Fichier à créer:**
- `/dev/back/prisma/seed.ts`

---

### ✅ 1.3 Prisma Client
- [ ] Créer `/dev/back/src/models/index.ts`
- [ ] Exporter singleton PrismaClient:
  ```typescript
  import { PrismaClient } from '@prisma/client';

  const prisma = new PrismaClient();

  export default prisma;
  ```

**Fichier à créer:**
- `/dev/back/src/models/index.ts`

**Fichiers v1.2-v1.3 à créer:**
- `/dev/back/prisma/schema.prisma`
- `/dev/back/prisma/seed.ts`
- `/dev/back/src/models/index.ts`

---

## Phase 2: Controllers & Routes (1.5h)

### ✅ 2.1 Core infrastructure (30min)

#### Créer middleware
- [ ] `/dev/back/src/middleware/error.middleware.ts`
  - Exporter fonction `errorHandler(error, req, res, next)`
  - Gérer erreurs Prisma (P2002 = duplicate, P2025 = not found)
  - Logger erreurs, retourner JSON avec status approprié

- [ ] `/dev/back/src/middleware/cors.middleware.ts`
  - Exporter `corsOptions` avec `origin: process.env.FRONTEND_URL`

#### Créer Express app
- [ ] `/dev/back/src/index.ts` - Entry point
  - Importer Express
  - Configurer `app.use()` pour cors, json middleware, routes
  - Configurer global error handler
  - Écouter sur port 3000 (dev) ou serverless (production)

#### Créer router principal
- [ ] `/dev/back/src/routes/index.ts`
  - Créer express Router
  - Importer et monter room routes: `router.use('/rooms', roomRoutes)`
  - Importer et monter sensor routes: `router.use('/sensors', sensorRoutes)`
  - Exporter router

**Fichiers à créer:**
- `/dev/back/src/middleware/error.middleware.ts`
- `/dev/back/src/middleware/cors.middleware.ts`
- `/dev/back/src/routes/index.ts`
- `/dev/back/src/index.ts`

---

### ✅ 2.2 Room APIs (30min)

#### Créer controller
- [ ] `/dev/back/src/controllers/room.controller.ts`
  - Fonction `getRooms(req, res)`:
    - Query Prisma Room avec `include: { sensors: { include: { readings: { take: 1, orderBy: { timestamp: 'desc' } } } } }`
    - Mapper réponse pour construire `{ id, name, description, currentTemp, currentHumidity, lastUpdate }`
    - Retourner `res.json([...])`

  - Fonction `getRoomById(req, res)`:
    - Query Prisma Room par `req.params.id` avec même include
    - Retourner objet détaillé avec tous les capteurs

#### Créer routes
- [ ] `/dev/back/src/routes/room.routes.ts`
  - Route `GET /` → `getRooms()`
  - Route `GET /:id` → `getRoomById()`

**Fichiers à créer:**
- `/dev/back/src/controllers/room.controller.ts`
- `/dev/back/src/routes/room.routes.ts`

---

### ✅ 2.3 Sensor API (30min) - CRITIQUE

#### Créer middleware de validation
- [ ] `/dev/back/src/middleware/validate.middleware.ts`
  - Fonction `validateSensorReading(req, res, next)`:
    - Vérifier `req.body.serialNumber` (string)
    - Vérifier `req.body.value` (number)
    - Si temperature: vérifier -50 à +100
    - Si humidity: vérifier 0 à 100
    - Retourner 400 Bad Request si erreur, sinon `next()`

  - Fonction `authenticateRPi(req, res, next)`:
    - Extraire `req.headers['x-api-key']`
    - Comparer à `process.env.RPI_API_KEY`
    - Retourner 401 Unauthorized si ne match pas, sinon `next()`

#### Créer controller
- [ ] `/dev/back/src/controllers/sensor.controller.ts`
  - Fonction `ingestReading(req, res)`:
    - Extraire `serialNumber` et `value` du body
    - Trouver sensor par serialNumber avec Prisma
    - Si sensor not found: retourner 404
    - Créer SensorReading avec `prisma.sensorReading.create()`
    - Retourner `{ success: true, reading: { id, timestamp } }`

#### Créer routes
- [ ] `/dev/back/src/routes/sensor.routes.ts`
  - Route `POST /readings` avec middleware: `authenticateRPi`, `validateSensorReading`, puis `ingestReading()`

**Fichiers à créer:**
- `/dev/back/src/middleware/validate.middleware.ts`
- `/dev/back/src/controllers/sensor.controller.ts`
- `/dev/back/src/routes/sensor.routes.ts`

**Fichiers Phase 2 à créer:**
- `/dev/back/src/middleware/error.middleware.ts`
- `/dev/back/src/middleware/cors.middleware.ts`
- `/dev/back/src/middleware/validate.middleware.ts`
- `/dev/back/src/controllers/room.controller.ts`
- `/dev/back/src/controllers/sensor.controller.ts`
- `/dev/back/src/routes/index.ts`
- `/dev/back/src/routes/room.routes.ts`
- `/dev/back/src/routes/sensor.routes.ts`
- `/dev/back/src/index.ts`

---

## Phase 3: Test & Deploy (1h)

### ✅ 3.1 Test local (30min)
- [ ] Créer `/dev/back/tests/simulate-rpi.ts`
  - Script qui simule des lectures depuis un Raspberry Pi
  - Envoyer POST /api/sensors/readings toutes les 5 secondes
  - Température aléatoire 20-24°C
  - Humidité aléatoire 40-60%

- [ ] Lancer dev server: `npm run dev`
- [ ] Tester endpoints avec Postman/Thunder Client:
  - ✅ GET http://localhost:3000/api/rooms → Liste salles
  - ✅ GET http://localhost:3000/api/rooms/:id → Détails salle
  - ✅ POST http://localhost:3000/api/sensors/readings (avec X-API-Key) → Ingérer temp
  - ✅ Vérifier que GET /api/rooms/:id retourne la valeur mise à jour
  - ✅ POST /api/sensors/readings → Ingérer humidity
  - ✅ Vérifier que GET /api/rooms retourne les deux valeurs

- [ ] Vérifier données en base: `npx prisma studio`

**Fichier à créer:**
- `/dev/back/tests/simulate-rpi.ts`

### ✅ 3.2 Déploiement Vercel (30min)
- [ ] Générer RPI_API_KEY: `openssl rand -hex 32` → copier dans `.env.local`
- [ ] Installer Vercel CLI: `npm i -g vercel`
- [ ] Linker projet: `vercel link`
- [ ] Configurer env vars dans dashboard Vercel:
  - `DATABASE_URL` = connection string Neon
  - `RPI_API_KEY` = clé générée
  - `FRONTEND_URL` = URL future du frontend Next.js (ou `http://localhost:3000` pour dev)
  - `NODE_ENV` = "production"

- [ ] Déployer: `vercel --prod`
- [ ] Tester endpoints en production (récupérer URL depuis Vercel)
- [ ] Documenter URLs API dans `/dev/back/README.md`

**Fichiers à créer/mettre à jour:**
- `/dev/back/README.md` (documentation API endpoints)

---

## 📋 Résumé fichiers à créer (11 fichiers + configs)

### Configuration (5 fichiers)
1. ✅ `/dev/back/package.json`
2. ✅ `/dev/back/tsconfig.json`
3. ✅ `/dev/back/vercel.json`
4. ✅ `/dev/back/.gitignore`
5. ✅ `/dev/back/.env.example`

### Database (2 fichiers)
6. ✅ `/dev/back/prisma/schema.prisma`
7. ✅ `/dev/back/prisma/seed.ts`

### Models (1 fichier)
8. ✅ `/dev/back/src/models/index.ts`

### Middleware (3 fichiers)
9. ✅ `/dev/back/src/middleware/error.middleware.ts`
10. ✅ `/dev/back/src/middleware/cors.middleware.ts`
11. ✅ `/dev/back/src/middleware/validate.middleware.ts`

### Controllers (2 fichiers)
12. ✅ `/dev/back/src/controllers/room.controller.ts`
13. ✅ `/dev/back/src/controllers/sensor.controller.ts`

### Routes (3 fichiers)
14. ✅ `/dev/back/src/routes/index.ts`
15. ✅ `/dev/back/src/routes/room.routes.ts`
16. ✅ `/dev/back/src/routes/sensor.routes.ts`

### Entry Point (1 fichier)
17. ✅ `/dev/back/src/index.ts`

### Tests (1 fichier)
18. ✅ `/dev/back/tests/simulate-rpi.ts`

### Documentation (1 fichier)
19. ✅ `/dev/back/README.md`

---

## 🔑 Clés d'API à générer

```bash
# Générer RPI_API_KEY
openssl rand -hex 32

# Générer JWT_SECRET (pour v2)
openssl rand -base64 32
```

---

## 🚀 Ordre d'implémentation recommandé

1. Phase 1.1 - Setup projet
2. Phase 1.2 - Database + Seed
3. Phase 1.3 - Prisma Client
4. Phase 2.1 - Express app + middleware
5. Phase 2.2 - Room routes
6. Phase 2.3 - Sensor routes (CRITIQUE)
7. Phase 3.1 - Tests locaux
8. Phase 3.2 - Déploiement Vercel

---

## 📌 Notes importantes

- **Architecture MVC stricte**: Models (Prisma) / Controllers (logique) / Views (JSON responses)
- **Commentaires en français** pour cohérence avec documentation Swiss CFC
- **TypeScript strict** pour safety
- **Pas d'authentification utilisateur en v1** (ajouté en v2)
- **Pas d'alertes en v1** (ajouté en v2)
- **Pas d'historique en v1** (ajouté en v3)
- **API publique**: Aucune protection sauf X-API-Key pour RPi

---

## Evolution v1 → v2 → v3

### v2 (à planifier)
- [ ] Ajouter User model + authentification JWT
- [ ] Ajouter Alert model + vérification seuils
- [ ] Ajouter thresholds à Room (tempMin/Max, humidityMin/Max)
- [ ] POST /api/auth/login endpoint
- [ ] GET /api/auth/me endpoint
- [ ] GET /api/alerts endpoint
- [ ] POST /api/alerts/:id/acknowledge endpoint
- [ ] POST/DELETE /api/subscriptions endpoints

### v3 (à planifier)
- [ ] Ajouter GET /api/rooms/:id/history?days=7 endpoint
- [ ] Cleanup automatique (7 jours retention)
- [ ] Support 3 Raspberry Pi (au lieu de 1)
- [ ] Support 3 salles (au lieu de 1)

---

**Dernière mise à jour:** 2025-12-09
**Version:** v1 MVP
**Plan approuvé:** ✅

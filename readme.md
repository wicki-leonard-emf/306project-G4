# SensorHub – Système de monitoring environnemental

## 📌 Description du projet

**SensorHub** est un système automatisé de monitoring des conditions environnementales (température et humidité) développé dans le cadre du **module 306 : Réaliser un petit projet informatique** pour informaticiens CFC.

Le système collecte en temps réel les données de capteurs Phidget déployés dans les salles de classe de l'EMF, les stocke dans une base de données PostgreSQL, et offre une interface web responsive permettant de consulter les données, configurer des seuils d'alerte et recevoir des notifications par email.

### Objectifs principaux

- Surveiller en temps réel la température et l'humidité des salles de classe
- Détecter automatiquement les conditions anormales via des seuils configurables
- Notifier les utilisateurs abonnés par email en cas de dépassement de seuils
- Fournir un historique des mesures consultable via une interface web
- Gérer les utilisateurs avec différents rôles (Admin, Enseignant, Élève)

---

## 📁 Structure du repository

### **1. `/code`**

Contient l'intégralité du code source du projet organisé en trois composants :

- **`/back`** : Backend Express.js avec Prisma ORM
  - API REST pour l'ingestion des données capteurs
  - Gestion des utilisateurs et authentification
  - Système d'alertes et notifications email (Resend)
  - Base de données PostgreSQL (Neon)

- **`/front`** : Frontend React avec Vite
  - Tableau de bord temps réel
  - Visualisation graphique (Recharts)
  - Gestion des seuils et abonnements
  - Interface responsive (Radix UI)

- **`/rpi`** : Scripts Raspberry Pi
  - Lecture périodique des capteurs Phidget
  - Envoi des données vers l'API backend
  - Conteneurisation Docker

### **2. `/documentation`**

Documentation complète du projet :

- **`1_BusinessCase.md`** : Contexte, problématique et opportunité du projet
- **`2_CahierDesCharges.md`** : Exigences fonctionnelles et non fonctionnelles
- **`3_Documentation_Projet.md`** : Documentation technique complète (architecture, UML, tests)
- **`5_Modele_Analyses_UML.qea`** : Diagrammes UML (cas d'utilisation, séquence, classes)
- Journaux de travail et plannings

---

## 👥 Équipe de projet

Le projet SensorHub est réalisé par un groupe de **3 apprenants informaticiens CFC** :

- **Beer Gabriel** — Product Owner / Développement frontend / Tests UI
- **Wicki Léonard** — Développement backend / Base de données
- **Dubusc Cyril** — Intégration Raspberry Pi / Scripts capteurs

---

## 🛠️ Technologies et outils utilisés

### Backend

- **Runtime** : Node.js
- **Framework** : Express.js
- **ORM** : Prisma
- **Base de données** : PostgreSQL (Neon serverless)
- **Authentification** : Sessions / Cookies
- **Notifications** : Resend (email)

### Frontend

- **Framework** : React 18
- **Build tool** : Vite
- **UI Components** : Radix UI
- **Visualisation** : Recharts
- **Routing** : React Router
- **Styling** : CSS Modules

### IoT / Edge

- **Hardware** : Raspberry Pi + Capteurs Phidget (HUM1000_0)
- **Runtime** : Node.js
- **Conteneurisation** : Docker
- **Collecte** : Boucle persistante avec intervalles configurables

### DevOps

- **Hébergement** : Vercel (frontend + backend serverless)
- **Versioning** : Git / GitHub
- **Gestion de projet** : Kanban (GitHub Projects)
- **Tests API** : Postman
- **Documentation UML** : Enterprise Architect

---

## 🚀 Installation et exécution

### Prérequis

- Node.js 18+
- PostgreSQL (ou compte Neon)
- Compte Vercel (pour déploiement)
- Capteurs Phidget + Raspberry Pi (pour collecte IoT)

### Backend

```bash
cd code/back
npm install
cp .env.example .env
# Configurer DATABASE_URL, SESSION_SECRET, RESEND_API_KEY, etc.
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### Frontend

```bash
cd code/front
npm install
cp .env.example .env
# Configurer VITE_API_URL
npm run dev
```

### Raspberry Pi (collecte capteurs)

```bash
cd code/rpi
docker build -t sensorhub-rpi .
docker run -e API_URL=https://your-api.com -e API_KEY=your-key sensorhub-rpi
```

### Déploiement Vercel

```bash
# Depuis la racine du projet
vercel --prod
```

---

## 📄 Documentation

L'ensemble de la documentation complète est disponible dans le dossier `/documentation` :

- **Business Case** : Analyse de la situation initiale et opportunités
- **Cahier des charges** : Exigences, contraintes et périmètre
- **Documentation technique** : Architecture, diagrammes UML, choix technologiques
- **Protocole de tests** : Procédures et résultats des tests
- **Conclusions** : Auto-évaluation et retours d'expérience

### Points clés de l'architecture

- **Collecte IoT** : Raspberry Pi → Phidget → Node.js → API REST
- **Backend** : Express.js + Prisma → PostgreSQL (Neon)
- **Frontend** : React + Vite → Vercel CDN
- **Alertes** : Système de seuils par salle + abonnements utilisateurs + emails (Resend)

---

## 📊 Releases

Chaque semaine, une release est créée pour suivre l'avancement du projet.

Pour créer une nouvelle release :

```bash
git tag -a S1 -m "Release S1"
git push origin S1
```

---

## 📬 Contact

Pour toute question concernant le projet SensorHub, veuillez contacter :

- **Beer Gabriel** : [email]
- **Wicki Léonard** : [email]
- **Dubusc Cyril** : [email]

Ou le formateur responsable du module 306.

---

**SensorHub** – Monitoring environnemental intelligent pour l'EMF 🌡️💧

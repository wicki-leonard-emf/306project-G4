# SensorHub – Monitoring Climatique pour Salles de Classe

**TPI Module 306 – EMF** | Beer Gabriel, Wicki Léonard, Dubusc Cyril | Décembre 2025 – Janvier 2026

---

## 1. Situation de départ, objectif, devoir

L'École des Métiers de Fribourg (EMF) ne dispose d'aucun système centralisé pour surveiller les conditions environnementales (température, humidité) des salles de classe. Les interventions sont réactives (suite à des plaintes), entraînant détection tardive des problèmes et temps perdu pour l'intendance. Aucun historique n'existe pour analyser les tendances.

**Objectif** : Développer un système complet de monitoring automatisé avec surveillance temps réel et alertes automatiques lors de dépassements de seuils configurables.

**Livrables** : Application web responsive, système d'alertes email, infrastructure IoT (Raspberry Pi + capteurs Phidget), API REST, base PostgreSQL (historique 7j minimum), gestion utilisateurs avec authentification.

**Bénéfices** : Détection précoce, amélioration du confort, gain de temps intendance, base de données pour optimisations futures.

---

## 2. Représentation graphique

```
┌──────────────────────────────────────────────┐
│  UTILISATEURS (Web/Mobile)                   │
└───────────────────┬──────────────────────────┘
                    ▼
┌──────────────────────────────────────────────┐
│  FRONTEND (React + Vite)                     │
│  Dashboard | Graphiques | Config | Alertes  │
│  Hébergement: Vercel CDN                     │
└───────────────────┬──────────────────────────┘
                    │ HTTPS REST API
┌───────────────────▼──────────────────────────┐
│  BACKEND (Express.js + Prisma)               │
│  Routes API | Auth | Email Service (Resend) │
│  Hébergement: Vercel Serverless              │
└──────┬──────────────────────┬────────────────┘
       │                      │
┌──────▼───────┐    ┌─────────▼─────────┐
│ PostgreSQL   │    │  Email Alerts     │
│ (Neon Cloud) │    │  (Resend API)     │
└──────▲───────┘    └───────────────────┘
       │ POST /api/sensors/readings
┌──────┴───────────────────────────────────────┐
│  EDGE (Raspberry Pi + Docker)                │
│  Script Node.js | setInterval(5min)          │
│  Capteurs Phidget HUM1000_0                  │
└──────────────────────────────────────────────┘
```

**Flux** : Capteurs → RPi → API → DB → Frontend → Utilisateurs | Alertes : DB → Backend → Email

---

## 3. Solution, résultat

### 3.1 Voie suivie

**Méthodologie** : Agile/Kanban avec Definition of Done.

**Choix techniques** : Architecture 3-tiers (séparation responsabilités), Vercel Serverless (déploiement auto, scaling), PostgreSQL Neon (robuste, backups auto), Prisma ORM (migrations versionnées), React/Vite (composants réutilisables), RPi Docker (portabilité), Resend (emails transactionnels).

**Implémentation** : Backend (7 routes API, validation, middleware auth), Frontend (10+ composants React, dashboard responsive, graphiques Recharts), RPi (script dockerisé, collecte périodique, retry logic).

**Tests** : Plusieur tests – Taux réussite 100%.

### 3.2 Résultat

**Fonctionnalités** : Dashboard temps réel (indicateurs visuels), graphiques historiques (24h/7j/30j/custom), alertes email automatiques, gestion seuils par salle, authentification (3 rôles), abonnements alertes, historique illimité.

**Métriques** : Fiabilité alertes 100% (≥95% requis), historique illimité (7j requis), tests, API <200ms.

**Production** : Frontend vercel.app, Backend API vercel.app, DB Neon Cloud, RPi salle C114 EMF.

**Limitations** : Cold start Vercel ~2s, quotas gratuit Neon.

**Améliorations futures** : Tests auto (Jest/Cypress), notifications push, analytics avancées, app mobile, IA prédictive.

### 3.3 Conclusion personnelle

Ce projet a consolidé nos compétences CFC : coordination équipe 3 personnes, méthodologies Agiles, architecture 3-tiers, API REST Express.js, Prisma ORM, React hooks, IoT Phidget/RPi, déploiement serverless.

**Apprentissages clés** : Migrations versionnées (vs SQL brut), composants réutilisables, SDK Phidget, avantages/limites serverless.

**Points d'amélioration** : Tests automatisés CI/CD, monitoring santé système, caching (React Query/Redis), documentation API auto (Swagger).

**Bilan** : Projet complet démontrant nos capacités à mener un développement bout-en-bout (analyse → production). Base solide pour notre futur professionnel en tant que informaticien CFC.

---

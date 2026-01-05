# 📚 Documentation du Module Raspberry Pi (Client Capteur)

Ce dossier contient l'ensemble des scripts et du code source nécessaires pour transformer un Raspberry Pi en une station de collecte de données (Température et Humidité) utilisant un capteur **Phidget**.

## 🏗️ Architecture

Le système fonctionne selon l'architecture suivante :

1.  **Matériel** : Raspberry Pi connecté à un Hub Phidget VINT (HUB0001_0) et un capteur (HUM1000_0) qui permet de faire humidité et température.
2.  **Serveur Phidget** : Un service système (`phidget22networkserver`) expose les capteurs sur le réseau local (localhost).
3.  **Application Node.js** : Un script (`getDataPhidget.js`) se connecte au serveur Phidget, lit les valeurs et les envoie à l'API centrale.
4.  **Docker** : L'application est conteneurisée pour faciliter le déploiement et la gestion des dépendances.

## 📂 Description des Fichiers

### 1. `install.sh`

C'est le script d'installation automatisé. Il effectue les tâches suivantes :

- Mise à jour du système (apt update/upgrade).
- Installation des drivers et du serveur réseau Phidgets.
- Installation de Docker et du plugin Docker Compose.
- Configuration interactive (Nom de la salle, IDs des capteurs).
- Enregistrement automatique de la salle via l'API du serveur central.
- Génération du fichier de configuration `.env`.
- Création et démarrage du service systemd pour le lancement automatique au boot.

### 2. `getDataPhidget.js`

Le cœur logique de l'application client.

- **Technologies** : Node.js, librairie `phidget22`.
- **Fonctionnement** :
  - Se connecte au serveur Phidget local.
  - Initialise les capteurs sur le port spécifié (par défaut Port 3).
  - Lit les données à intervalle régulier (défini par `READ_INTERVAL`).
  - Envoie les données via une requête HTTP POST sécurisée (API Key) vers le serveur central (`SERVER_URL`).

### 3. `Dockerfile`

Définit l'image Docker de l'application.

- Base : `node:18-bookworm-slim` (légère et compatible ARM).
- Installe les dépendances (`npm install`).
- Copie le code source.

### 4. `docker-compose.yml`

Orchestre le conteneur.

- Utilise l'image construite ou pullée (`gabrielbeer15/phidget-client`).
- Injecte les variables d'environnement depuis le fichier `.env`.
- Utilise le mode réseau `host` pour accéder facilement au serveur Phidget local.

### 5. `.env` (Généré)

Ce fichier est créé par `install.sh` et contient les secrets et configurations spécifiques au Raspberry Pi :

- `RPI_API_KEY` : Clé d'authentification pour l'API.
- `SERVER_URL` : Endpoint de l'API.
- `TEMP_SENSOR_ID` / `HUMIDITY_SENSOR_ID` : Identifiants uniques des capteurs. -> PHIDGET-TEMP-XXX et PHIDGET-HUM-XXX
- `HUB_PORT` : Port physique sur le Hub Phidget.

## 🚀 Guide d'Installation Rapide

1.  **Transfert des fichiers** : Copiez tout le contenu de ce dossier `rpi/` sur le Raspberry Pi.
2.  **Exécution** :
    ```bash
    chmod +x install.sh
    ./install.sh
    ```
3.  **Configuration** : Répondez aux questions posées par le script (Nom de la salle, IDs des capteurs).

## 🛠️ Maintenance et Commandes Utiles

Une fois installé, le service tourne en arrière-plan.

**Voir les logs en temps réel :**

```bash
sudo docker compose logs -f
```

**Redémarrer le service manuellement :**

```bash
sudo systemctl restart phidget-docker
```

**Arrêter le service :**

```bash
sudo systemctl stop phidget-docker
```

**Modifier la configuration :**
Editez le fichier `.env` puis redémarrez le conteneur :

```bash
nano .env
sudo docker compose up -d --force-recreate
```

## Problème

| Problème                            | Cause Possible                                   | Solution                                                                                  |
| :---------------------------------- | :----------------------------------------------- | :---------------------------------------------------------------------------------------- |
| Connexion au Wi-Fi                  | Mauvais SSID donné                               | Renseigner le SSID correct                                                                |
| Configuration RPi longue            | Beaucoup de choses à faire                       | Créer un script qui fait tout                                                             |
| Création d'une nouvelle rpi+capteur | Si nouveau capteur créé, la DB ne le connaît pas | Faire en sorte que quand le script est lancé, il fasse la requête pour créer les capteurs |
| La date ne fonctionne pas           | Aucune idée                                      | Mis à part tout réinstaller, inconnue                                                     |

## Pourquoi ces choix techniques ?

### Choix du langage : JavaScript (Node.js)

Parmi les langages supportés par Phidgets (Python, C, Java, etc.), nous avons choisi **JavaScript (Node.js)** pour les raisons suivantes :

- **Cohérence de la stack** : Le reste du projet (Backend et Frontend) est également en JavaScript/TypeScript.
- **Simplicité** : La gestion asynchrone native de Node.js est idéale pour gérer les entrées/sorties des capteurs sans bloquer le processus.
- **Connaissances de l'équipe** : C'est l'un des langages que nous maîtrisons le mieux parmi ceux compatibles.

### Utilisation de `setInterval` au lieu de Cron

Pour la lecture périodique des capteurs, nous utilisons la fonction native `setInterval` plutôt qu'une tâche Cron système ou une librairie tierce :

- **Simplicité** : Pas besoin de configuration externe ou de dépendance supplémentaire.
- **Conteneurisation** : Dans un conteneur Docker, il est plus simple d'avoir un processus Node.js unique qui gère sa propre boucle de temps plutôt que de devoir installer et configurer un démon cron en plus.
- **Persistance** : L'application doit rester connectée en permanence au serveur Phidget pour recevoir les événements (attach/detach), donc un script qui tourne en continu est plus adapté qu'un script lancé ponctuellement par cron.
- Si la rpi crash, le script restart tout seul au boot
- Si le script crach, systemd le restart automatiquement

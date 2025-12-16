#!/bin/bash

echo "🚀 Démarrage de l'installation complète..."

# --- 1. INSTALLATION SUR L'HÔTE (RASPBERRY PI) ---

echo "🔄 Mise à jour du système..."
sudo apt update && sudo apt upgrade -y

echo "🔌 Installation des pilotes Phidgets sur le Raspberry Pi (Hôte)..."
# Nécessaire pour que le Pi reconnaisse les périphériques USB
curl -fsSL https://www.phidgets.com/downloads/setup_linux | sudo bash -
sudo apt install -y libphidget22 phidget22networkserver

echo "🌐 Activation du serveur réseau Phidget..."
sudo systemctl enable phidget22networkserver
sudo systemctl start phidget22networkserver

echo "🐳 Installation de Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    # Ajout de l'utilisateur au groupe docker
    sudo usermod -aG docker $USER
    sudo systemctl enable docker
    sudo systemctl start docker
    echo "✅ Docker installé."
else
    echo "✅ Docker est déjà installé."
fi

# Plugin docker compose (pour pouvoir utiliser 'docker compose')
if ! docker compose version >/dev/null 2>&1; then
    echo "🔧 Installation du plugin docker compose..."
    sudo apt install -y docker-compose-plugin
else
    echo "✅ Plugin docker compose déjà présent."
fi

# --- CONFIGURATION DES CAPTEURS ET DE LA SALLE ---
echo "📝 Configuration de la salle et des capteurs..."
read -p "🏫 Nom de la salle (ex: C114): " ROOM_NAME
read -p "📝 Description de la salle (optionnel): " ROOM_DESCRIPTION
read -p "🌡️ TEMP_SENSOR_ID (ex: PHIDGET-TEMP-001): " TEMP_ID
read -p "💧 HUMIDITY_SENSOR_ID (ex: PHIDGET-HUM-001): " HUM_ID

# Créer la salle et les capteurs dans la base de données
echo "🔄 Création de la salle et des capteurs dans la base de données..."
ROOM_RESPONSE=$(curl -s -X POST "https://sensorhub-three.vercel.app/api/rooms" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"${ROOM_NAME}\",
    \"description\": \"${ROOM_DESCRIPTION}\",
    \"sensors\": [
      {
        \"serialNumber\": \"${TEMP_ID:-PHIDGET-TEMP-XXX}\",
        \"type\": \"TEMPERATURE\"
      },
      {
        \"serialNumber\": \"${HUM_ID:-PHIDGET-HUM-XXX}\",
        \"type\": \"HUMIDITY\"
      }
    ]
  }")

# Vérifier si la création a réussi
if echo "$ROOM_RESPONSE" | grep -q "success"; then
  ROOM_ID=$(echo "$ROOM_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
  echo "✅ Salle créée avec succès ! ID: $ROOM_ID"
else
  echo "⚠️ Erreur lors de la création de la salle:"
  echo "$ROOM_RESPONSE"
  echo "Continuez l'installation manuellement si nécessaire."
fi

cat > .env <<EOF
# Clé API pour authentifier le Raspberry
RPI_API_KEY="leonardlegrandalpha"

# URL de l'API de réception des mesures
SERVER_URL="https://sensorhub-three.vercel.app/api/sensors/readings"

# Identifiants des capteurs (à adapter pour chaque RPi)
TEMP_SENSOR_ID="${TEMP_ID:-PHIDGET-TEMP-XXX}"
HUMIDITY_SENSOR_ID="${HUM_ID:-PHIDGET-HUM-XXX}"

# Configuration Phidget / lecture
HUB_PORT="3"
PHIDGET_HOST="localhost"
PHIDGET_PORT="5661"
READ_INTERVAL="10000"
EOF

echo "📄 Fichier .env généré."

echo "🧩 Génération docker-compose.yml..."
cat > docker-compose.yml <<'EOF'
services:
  phidget-client:
    image: gabrielbeer15/phidget-client:latest
    restart: unless-stopped
    env_file:
      - .env
    network_mode: host
EOF

# --- 2. DÉPLOIEMENT DE L'APPLICATION DOCKER ---

IMAGE_NAME="phidget-logger"
CONTAINER_NAME="phidget-logger-container"

echo "🏗️ Déploiement avec docker compose (image gabrielbeer15/phidget-client:latest)..."
# On utilise sudo docker ici car le changement de groupe ne prend effet qu'après déconnexion
sudo docker compose down || true
sudo docker compose pull
sudo docker compose up -d

echo "✅ TOUT EST PRÊT !"
echo "📜 Pour voir les logs : sudo docker compose logs -f"
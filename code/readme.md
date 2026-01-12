# 💻 SensorHub - Code Source

Code source du projet **SensorHub** développé dans le cadre du **module 306 – Réaliser un petit projet informatique**.

SensorHub est une application web de monitoring de salles de classe (température et humidité) avec interface de contrôle et alertes.

---

## 📁 Structure du projet

### **back/** - Backend (Express.js + Node.js)
- API REST pour la gestion des salles, capteurs et lectures
- Authentification JWT
- Base de données PostgreSQL avec Prisma ORM

### **front/** - Frontend (React + TypeScript + Vite)
- Interface utilisateur responsive
- Dashboard en temps réel
- Gestion des seuils de température et humidité

### **rpi/** - Raspberry Pi (Node.js)
- Script de lecture des capteurs Phidget
- Envoi des données au serveur
- Docker support

### **docs/** - 📚 Documentation complète
- **[docs/api/](./docs/api/)** - Documentation API et collection Postman
- **[docs/guides/](./docs/guides/)** - Guides pratiques (tests, JWT, tâches)
- **[docs/setup/](./docs/setup/)** - Guide d'installation (Raspberry Pi)

Consultez **[docs/README.md](./docs/README.md)** pour naviguer la documentation.

---

## 🚀 Démarrage rapide

### Backend
```bash
cd back
npm install
npm run dev
```

### Frontend
```bash
cd front
pnpm install
pnpm dev
```

### Raspberry Pi
```bash
cd rpi
docker-compose up
```

---

## 📖 Documentation

Pour accéder à la documentation complète, consultez **[docs/README.md](./docs/README.md)**

- 🔌 API endpoints → [docs/api/API_DOCUMENTATION.md](./docs/api/API_DOCUMENTATION.md)
- 🧪 Tests → [docs/guides/TESTING_README.md](./docs/guides/TESTING_README.md)
- 🔐 JWT Auth → [docs/guides/JWT_MIGRATION_GUIDE.md](./docs/guides/JWT_MIGRATION_GUIDE.md)
- ⚙️ Setup Raspberry Pi → [docs/setup/INSTALL_RASPBERRY.md](./docs/setup/INSTALL_RASPBERRY.md)

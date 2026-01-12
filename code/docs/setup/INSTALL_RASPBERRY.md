# Installation sur Raspberry Pi

Suivez ces étapes pour configurer votre Raspberry Pi afin qu'il exécute le script de capteurs Phidget automatiquement au démarrage.

## 1. Préparation du Raspberry Pi

Assurez-vous que votre Raspberry Pi est connecté à internet. Ouvrez un terminal sur le Pi.

### Mise à jour du système

```bash
sudo apt update
sudo apt upgrade -y
```

### Installation de Node.js

Si Node.js n'est pas encore installé :

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

Vérifiez l'installation :

```bash
node -v
npm -v
```

## 2. Installation des Pilotes Phidgets

Phidgets fournit un script d'installation pour Linux.

1. **Ajouter le dépôt Phidgets :**

   ```bash
   curl -fsSL https://www.phidgets.com/downloads/setup_linux | sudo bash -
   ```

2. **Installer les bibliothèques et le serveur réseau :**
   Le serveur réseau est **obligatoire** pour utiliser la librairie Node.js.

   ```bash
   sudo apt install -y libphidget22 phidget22networkserver
   ```

3. **Activer et démarrer le serveur réseau Phidget :**
   ```bash
   sudo systemctl enable phidget22networkserver
   sudo systemctl start phidget22networkserver
   ```

## 3. Installation du Projet

1. **Copier le script d'installation :**
   Copiez le fichier `deploy_bundle.sh` sur votre Raspberry Pi (par exemple dans `/home/pi`).
   Vous pouvez utiliser une clé USB ou `scp`.

2. **Exécuter le script :**
   Rendez le script exécutable et lancez-le. Il va créer le dossier `testPhidget` et tous les fichiers nécessaires.

   ```bash
   chmod +x deploy_bundle.sh
   ./deploy_bundle.sh
   ```

3. **Installer les dépendances du projet :**
   Allez dans le dossier créé et installez les paquets :

   ```bash
   cd /home/pi/testPhidget
   npm install
   ```

4. **Test manuel :**
   Lancez le script pour vérifier que tout fonctionne :
   ```bash
   node test.js
   ```
   Vous devriez voir "✅ Connecté au Serveur Réseau Phidget !" et les lectures de capteurs.
   Faites `Ctrl+C` pour arrêter.

## 4. Configuration du Service (Démarrage Automatique)

Pour que le script se lance tout seul au démarrage du Pi :

1. **Copier le fichier de service :**
   Le fichier a été créé par le script dans le dossier du projet.

   ```bash
   cd /home/pi/testPhidget
   sudo cp phidget-logger.service /etc/systemd/system/
   ```

2. **Recharger systemd :**

   ```bash
   sudo systemctl daemon-reload
   ```

3. **Activer le service au démarrage :**

   ```bash
   sudo systemctl enable phidget-logger.service
   ```

4. **Démarrer le service maintenant :**

   ```bash
   sudo systemctl start phidget-logger.service
   ```

5. **Vérifier le statut et les logs :**
   Pour voir si ça tourne :
   ```bash
   sudo systemctl status phidget-logger.service
   ```
   Pour voir les logs (les `console.log` de votre script) :
   ```bash
   journalctl -u phidget-logger.service -f
   ```

## Dépannage

- **Erreur de connexion ?** Vérifiez que le serveur Phidget tourne : `sudo systemctl status phidget22networkserver`.
- **Pas de capteurs ?** Vérifiez les branchements USB et que vous utilisez bien le Port 3 (ou modifiez `test.js`).

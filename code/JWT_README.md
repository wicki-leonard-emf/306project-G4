# 🔐 Authentification JWT - Résumé des Changements

## ✅ Ce qui a été fait

Votre projet utilise maintenant **JWT (JSON Web Tokens)** au lieu des sessions Express. Cela permet à l'utilisateur de **rester connecté même après avoir rafraîchi la page**.

## 📁 Nouveaux fichiers créés

### Frontend
1. **`src/services/authService.ts`**
   - Service pour gérer l'authentification (login, register, logout)
   - Stocke le token dans `localStorage`
   - Vérifie automatiquement si l'utilisateur est connecté

2. **`src/lib/fetchWithAuth.ts`**
   - Fonction utilitaire qui ajoute automatiquement le token JWT à toutes les requêtes API
   - Gère automatiquement l'expiration du token

3. **`code/JWT_MIGRATION_GUIDE.md`**
   - Documentation complète de la migration

## 🔄 Fichiers modifiés

### Backend
- `src/controllers/auth.controller.js` - Génère et retourne des tokens JWT
- `src/middleware/auth.middleware.js` - Vérifie les tokens JWT au lieu des sessions
- `.env` - Ajout de `JWT_SECRET` et `JWT_EXPIRES_IN`

### Frontend
- `src/AppRouter.tsx` - Vérifie le token au démarrage
- `src/components/Login.tsx` - Utilise le nouveau service d'authentification
- `src/components/Register.tsx` - Utilise le nouveau service d'authentification
- `src/App.tsx` - Utilise `fetchWithAuth()` pour tous les appels API

## 🚀 Comment ça marche maintenant

1. **Lors de la connexion** : Le serveur génère un token JWT et l'envoie au client
2. **Le client stocke** le token dans `localStorage`
3. **À chaque requête** : Le token est automatiquement envoyé dans le header `Authorization: Bearer <token>`
4. **Lors du rafraîchissement** : Le token est récupéré depuis `localStorage` et validé

## 🧪 Pour tester

1. Démarrez le backend : `cd code/back && npm start`
2. Démarrez le frontend : `cd code/front && pnpm dev`
3. Connectez-vous à l'application
4. **Rafraîchissez la page (F5)** → Vous restez connecté ! 🎉
5. Ouvrez les DevTools (F12) > Application > Local Storage
6. Vous verrez la clé `auth_token` avec votre token JWT

## ⚙️ Configuration

Dans `code/back/.env`, vous pouvez configurer :
```env
JWT_SECRET="votre-secret-tres-securise"  # À changer en production !
JWT_EXPIRES_IN="7d"                       # Durée de validité du token (7 jours par défaut)
```

## 🔒 Sécurité

⚠️ **IMPORTANT pour la production** : Changez `JWT_SECRET` avec une valeur aléatoire et sécurisée :
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📚 Pour plus d'infos

Consultez le fichier complet : [JWT_MIGRATION_GUIDE.md](./JWT_MIGRATION_GUIDE.md)

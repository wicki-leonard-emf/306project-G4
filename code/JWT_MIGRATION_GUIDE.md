# Authentification JWT - Guide de Migration

## 🎯 Changements Effectués

Le projet a été migré d'un système d'authentification basé sur les **sessions Express** vers un système basé sur les **tokens JWT (JSON Web Tokens)**. Cela permet la persistance de l'authentification lors du rafraîchissement de la page.

## 📦 Nouveaux Fichiers

### Backend
- Aucun nouveau fichier, modifications dans les fichiers existants

### Frontend
- `src/services/authService.ts` - Service centralisé pour la gestion de l'authentification
- `src/lib/fetchWithAuth.ts` - Wrapper pour les appels API avec authentification automatique

## 🔧 Modifications Backend

### 1. Installation de jsonwebtoken
```bash
npm install jsonwebtoken
```

### 2. Fichiers Modifiés

#### `src/controllers/auth.controller.js`
- Import de `jsonwebtoken`
- Génération de tokens JWT lors du login et register
- Suppression de la gestion des sessions
- Les routes retournent maintenant un objet `{ user, token }`

#### `src/middleware/auth.middleware.js`
- Vérification du token JWT depuis le header `Authorization: Bearer <token>`
- Gestion des erreurs de token (expiré, invalide)

#### `.env`
Ajout des variables d'environnement :
```env
JWT_SECRET="your-jwt-secret-change-in-production-use-strong-random-string"
JWT_EXPIRES_IN="7d"
```

## 🎨 Modifications Frontend

### 1. Service d'Authentification

Le nouveau service `authService` gère :
- ✅ Stockage du token dans `localStorage`
- ✅ Login et Register avec récupération du token
- ✅ Validation automatique du token
- ✅ Déconnexion avec suppression du token
- ✅ Récupération des informations de l'utilisateur courant

### 2. Wrapper Fetch

`fetchWithAuth()` ajoute automatiquement le header Authorization à toutes les requêtes API.

### 3. Composants Modifiés

- `AppRouter.tsx` - Vérification du token au chargement
- `Login.tsx` - Utilisation de authService
- `Register.tsx` - Utilisation de authService
- `App.tsx` - Remplacement de tous les `fetch()` par `fetchWithAuth()`

## 🚀 Comment Utiliser

### Backend

Le token JWT est automatiquement généré lors du login/register :

```javascript
// Login
POST /api/auth/login
Body: { email, password }
Response: { user: {...}, token: "eyJhbGc..." }

// Register
POST /api/auth/register
Body: { email, password }
Response: { user: {...}, token: "eyJhbGc..." }
```

### Frontend

#### Authentification
```typescript
import { authService } from './services/authService'

// Login
const { user, token } = await authService.login(email, password)

// Register
const { user, token } = await authService.register(email, password)

// Logout
await authService.logout()

// Vérifier si authentifié
const isAuth = authService.isAuthenticated()

// Récupérer l'utilisateur courant
const user = await authService.getCurrentUser()
```

#### Appels API
```typescript
import { fetchWithAuth } from './lib/fetchWithAuth'

// Le token est automatiquement ajouté
const response = await fetchWithAuth('/api/rooms', {
  method: 'GET'
})

// Pour un POST avec body
const response = await fetchWithAuth('/api/rooms', {
  method: 'POST',
  body: JSON.stringify({ name: 'Salle A' })
})
```

## 🔒 Sécurité

### Stockage du Token
Le token est stocké dans `localStorage`. Pour plus de sécurité en production, considérez :
- Utiliser `httpOnly` cookies (nécessite un changement d'architecture)
- Implémenter un système de refresh tokens
- Réduire la durée de vie du token (actuellement 7 jours)

### Variables d'Environnement
⚠️ **IMPORTANT** : Changez `JWT_SECRET` en production avec une valeur forte et aléatoire :
```bash
# Générer un secret fort
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📝 Migration des Anciens Utilisateurs

Les utilisateurs avec des sessions actives devront se reconnecter une fois après le déploiement de cette mise à jour.

## ✅ Avantages

1. **Persistance** - L'utilisateur reste connecté même après un rafraîchissement de la page
2. **Stateless** - Le serveur n'a plus besoin de gérer les sessions
3. **Scalabilité** - Fonctionne mieux avec plusieurs instances serveur
4. **Mobile-friendly** - Facilite l'intégration avec des applications mobiles

## 🧪 Tests

Pour tester l'implémentation :

1. Connectez-vous à l'application
2. Rafraîchissez la page (F5) - vous devriez rester connecté
3. Ouvrez les DevTools > Application > Local Storage
4. Vérifiez la présence de la clé `auth_token`
5. Fermez l'onglet et rouvrez l'application - vous devriez toujours être connecté

## 🔄 Rollback

Si vous devez revenir au système de sessions :

1. Restaurer les versions précédentes des fichiers modifiés
2. Désinstaller jsonwebtoken : `npm uninstall jsonwebtoken`
3. Redémarrer le serveur

## 📚 Ressources

- [JWT.io](https://jwt.io/) - Décodeur et documentation JWT
- [jsonwebtoken npm](https://www.npmjs.com/package/jsonwebtoken) - Documentation de la librairie

# Todo SensorHub - Module 306

## Documentation (3_Documentation_Projet.md)

### ✅ Fait

- [x] Doc pourquoi on a choisi Vercel et Neon et expliquer les avantages et inconvénients de chaque
- [x] Expliquer pourquoi Prisma
- [x] Respecter chapitres doc Word
- [x] Doc pourquoi on a choisi de faire du JS avec Node et pas genre un cron
- [x] Note un chapitre sur la gestion des écarts scope et ce qu'on a fait (section "Gestion des écarts scope")
- [x] Documenter seuils communs fixés par l'admin (section "Gestion des seuils et système d'abonnement")
- [x] Documenter abonnements utilisateurs aux notifications par salle (section "Abonnements (RoomSubscription)")
- [x] Documenter definition of done

### 🔴 À faire

- [ ] Faire diagramme Resend (diagramme de séquence pour les notifications email)
- [ ] Compléter protocole de tests avec dates réelles et résultats (tableau ligne 487)
- [ ] Rédiger auto-évaluation collective (section 7.2)
- [ ] Rédiger conclusion du module de Gabriel (section 7.3)
- [ ] Rédiger conclusion du module de Léonard (section 7.4)
- [ ] Rédiger conclusion du module de Cyril (section 7.5)

## Fonctionnalités système

### ✅ Implémenté

- [x] Seuil commun fixé par l'admin
- [x] Sur les pages des salles, chaque user peut s'abonner ou se désabonner aux notifications de cette salle

## Definition of Done (DoD)

Pour qu'une tâche soit considérée comme terminée, elle doit respecter les critères suivants :

### Critères de validation par le Product Owner

1. **Code fonctionnel** : Le code implémente correctement la fonctionnalité demandée
2. **Conformité avec le commit** : Les changements correspondent à ce qui est décrit dans le message de commit
3. **Conformité avec la Pull Request** : Le code répond aux exigences définies dans la description de la PR
4. **Tests effectués** : Des tests ont été réalisés pour valider le bon fonctionnement
5. **Documentation à jour** : Les changements sont documentés (commentaires code, documentation technique si nécessaire)
6. **Revue de code** : Le Product Owner a vérifié et approuvé le code
7. **Prêt pour le merge** : Si tous les critères sont validés, la PR peut être mergée

### Processus

- Le développeur crée une PR avec description claire
- Le Product Owner examine le code selon les critères ci-dessus
- Si validé : merge dans la branche principale
- Si modifications nécessaires : retour au développeur avec commentaires

# Module 306 : Réaliser un projet informatique

## Business case 📝

### Business case : Gestion des températures dans les classes avec alertes

**Réalisé par :**

- Beer Gabriel
- Wicki Léonard
- Dubusc Cyril
- Nom Prénom

---

## Contexte du projet

Dans plusieurs salles de classe, il est nécessaire de suivre la température et l'humidité afin d'assurer de bonnes conditions d'apprentissage. Actuellement, il n'existe pas de système centralisé permettant de surveiller ces paramètres en temps réel et d'alerter les personnes concernées en cas de dépassement des seuils acceptables.

Le projet vise à mettre en place une solution de monitoring utilisant des capteurs Phidget (température et humidité) avec une interface accessible depuis des appareils mobiles. Les publics visés sont l'intendance, les enseignants et la direction de l'établissement.

---

## Problématique / Opportunité

**Problématique :** Les conditions d'apprentissage dans les salles de classe peuvent être affectées par des températures ou des niveaux d'humidité inadaptés. Actuellement, la détection de ces situations problématiques se fait de manière réactive (plaintes, constats sur place), ce qui génère des interventions correctives tardives et du temps perdu pour l'intendance.

**Opportunité :** Grâce à un système de monitoring automatisé avec alertes, il devient possible d'anticiper et de réagir rapidement aux dépassements de seuils, améliorant ainsi le confort des apprenants et l'efficacité opérationnelle du personnel. La solution propose également une consultation rapide et intuitive des données via téléphone mobile ou tablette.

**Valeur ajoutée :**

- Réduction des interventions réactives
- Amélioration du confort en classe
- Gain de temps pour l'intendance
- Base pour un déploiement dans d'autres bâtiments

---

## Objectifs du projet

Les objectifs suivants respectent le cadre SMART (Spécifique, Mesurable, Atteignable, Réaliste, Temporel) :

### Objectifs fonctionnels

1. **Développer une application web mobile** accessible depuis un navigateur, affichant en temps réel la température et l'humidité de chaque salle équipée
2. **Mettre en place un système d'alertes automatisé** envoyant des notifications claires lorsque les seuils prédéfinis sont dépassés (avec indication de la salle concernée)
3. **Fournir un historique consultable** sur les 7 derniers jours minimum pour chaque salle
4. **Permettre la configuration des seuils** d'alerte par salle (valeurs hautes et basses) de manière simple

### Objectifs mesurables (KPI)

- **Ergonomie :** 90% des utilisateurs déclarent que le tableau de bord est "clair" ou "très clair"
- **Pertinence :** 95% des alertes envoyées sont pertinentes (peu de faux positifs)
- **Prise en main :** Temps de prise en main ≤ 10 minutes pour un nouvel utilisateur
- **Efficacité :** Temps médian pour identifier une salle problématique ≤ 30 secondes depuis le tableau de bord

### Objectifs business

- **Réduire de 30%** les interventions correctives réactives en 3 mois grâce aux alertes ciblées
- **Diminuer de 25%** les variations extrêmes de température/humidité relevées en classe sur 6 semaines
- **Limiter à 15 minutes par jour** le temps passé à la surveillance manuelle pour l'intendance

---

## Bénéfices attendus

Les principaux bénéfices attendus sont une meilleure qualité des conditions d’apprentissage grâce au suivi en temps réel de la température et de l’humidité, et une réduction des situations extrêmes grâce aux alertes ciblées. Les responsables gagne du temps en limitant la surveillance manuelle et les déplacements inutiles, tout en pouvant intervenir plus rapidement et de manière plus ciblée

---

## Analyse SWOT

### Forces

Suivi en temps réel, alertes automatiques, gain de temps pour les responsables.

### Faiblesses

Dépendance à la technologie, coûts initiaux d'installation, besoin de formation pour les utilisateurs.

### Opportunités

Amélioration des conditions d'apprentissage, potentiel d'extension à d'autres environnements.

### Menaces

Pannes techniques.

---

## Parties prenantes

| Partie prenante              | Rôle                                      | Intérêt                                                     |
|------------------------------|-------------------------------------------|-------------------------------------------------------------|
| Direction de l’établissement | Pilote du projet                          | Améliorer les conditions d’apprentissage et l’image de l’école |
| Concierge                    | Suivi des salles, interventions techniques| Gagner du temps, réduire les déplacements inutiles          |
| Enseignants                  | Utilisateurs du tableau de bord          | Avoir des classes confortables pour enseigner               |
| Élèves                       | Bénéficiaires indirects                   | Mieux apprendre dans un environnement agréable              |
| Équipe projet (étudiants)    | Conception et développement de la solution| Réussir le projet, acquérir de l’expérience                 |

## Risques principaux

### **Risques techniques**

- **Problèmes de connexion des capteurs Phidget** Atténuation : faire des tests techniques tôt dans le projet, vérifier la stabilité du réseau et préparer un plan B (répétition, test sur plusieurs salles).
- **Données incorrectes ou capteur mal calibré** Atténuation : vérification régulière, recalibrage, test de cohérence des valeurs dans l’application.
- **Panne ou défaillance d’un capteur** Atténuation :
  prévoir un capteur de remplacement, système qui signale les capteurs inactifs.

### **Risques humains**

- **Utilisateurs qui ne comprennent pas les alertes** Atténuation : messages d’alerte très simples, page d’aide claire, formation rapide (≤10 min).
- **Mauvaise utilisation ou oubli de l’outil** Atténuation :interface très simple, accès mobile direct, icônes visuelles pour attirer l’attention.

### **Risques organisationnels**

- **Seuils mal définis → trop d’alertes (faux positifs)** Atténuation : définir les seuils avec l’intendance, ajuster après 1–2 semaines d’usage.
- **Retards dans l’installation ou le déploiement** Atténuation : planning clair, validation du matériel au début, implication du supérieur professionnel.
- **Pas de responsable désigné pour réagir aux alertes** Atténuation : définir clairement qui reçoit les alertes et qui agit.

## Budget estimé

### **Ressources en temps (estimations)**

- Analyse du besoin : **3 heures**
- Conception (diagrammes, architecture simple) : **6 heures**
- Développement backend (récupération capteurs + API) : **18 heures**
- Développement frontend (tableau de bord + alertes) : **10 heures**
- Tests (techniques + utilisation) : **6 heures**
- Documentation (guide, web summary, journal de travail) : **En continu**

**Total estimé : 43 heures de travail**

### **Ressources matérielles**

- Capteurs Phidget (température + humidité) → déjà choisis
- Des ordinateurs pour développer
- Une connexion réseau stable dans les salles

### **Ressources en compétences**

- Développement web (HTML/CSS/JS + framework simple)
- Un peu de backend (connexion aux capteurs, API)
- Base de données (niveau simple)
- Test utilisateur
- Rédaction de documentation

## Critères de succès

### **Critères liés au produit**

- L’application affiche correctement la température et l’humidité par salle.
- Le tableau de bord est lisible sur téléphone, tablette, ordinateur.
- Les alertes se déclenchent lorsque les seuils sont dépassés.
- Les seuils peuvent être modifiés facilement par salle.
- L’historique (jour + semaine) est accessible et clair.

### **Critères liés à l’utilisateur**

- Les utilisateurs comprennent le tableau de bord en **moins de 10 minutes**.
- 90% des utilisateurs disent que l’interface est « claire » ou « très claire ».
- 95% des alertes envoyées sont pertinentes (pas de spam).

### **Critères liés au projet**

- Tous les livrables obligatoires sont remis :
  - Planification
  - Journal de travail
  - Documentation d’analyse
  - Documentation de réalisation
  - Web Summary
- Le projet est livré dans les délais définis.
- Le système est testé en conditions réelles dans au moins une salle.
- Le client (intendance / direction) valide officiellement la solution.

## Décision GO / NOGO

**Recommandation:** **GO**

**Justification:**

Le projet présente un excellent équilibre entre bénéfices concrets (réduction de 30% des interventions réactives, amélioration du confort en classe) et faisabilité technique démontrée (capteurs Phidget identifiés, technologies web accessibles, budget de 43 heures raisonnable). Les parties prenantes sont impliquées et motivées, avec un besoin réel exprimé par l'intendance et la direction.

Tous les risques identifiés (techniques, humains, organisationnels) disposent de stratégies d'atténuation claires, et le projet respecte parfaitement le cadre pédagogique du Module 306 avec tous les livrables obligatoires prévus. Le lancement est recommandé.

# Module 306 : Réaliser un projet informatique
## Cahier des charges 📋

**Cahier des charges :** Gestion des températures dans les classes avec alertes

**Réalisé par :**
- Beer Gabriel
- Wicki Léonard
- Dubusc Cyril

## Introduction

Ce projet vise à mettre en place un système de monitoring de la température et de l'humidité dans les salles de classe, accompagné d'un système d'alertes automatisées. Suite à l'analyse du Business Case qui a identifié un besoin réel de surveillance centralisée des conditions d'apprentissage, le projet a reçu une décision GO pour son lancement.

L'objectif principal est de développer une application web mobile accessible permettant aux responsables (intendance, enseignants, direction) de consulter en temps réel les données environnementales de chaque salle et de recevoir des alertes ciblées en cas de dépassement de seuils prédéfinis. La solution utilisera des capteurs Phidget pour la collecte des données et proposera une interface simple et intuitive adaptée aux utilisateurs non techniques.

## Contexte

Actuellement, la surveillance des conditions environnementales (température et humidité) dans les salles de classe se fait de manière réactive, souvent suite à des plaintes ou des constats sur place. Cette approche génère des interventions correctives tardives, du temps perdu pour l'intendance et peut affecter négativement les conditions d'apprentissage des élèves.

Le projet répond à une problématique concrète : l'absence de système centralisé permettant de détecter rapidement les situations problématiques et d'alerter les personnes concernées. Grâce à un monitoring automatisé avec des capteurs Phidget (température et humidité), il devient possible d'anticiper les problèmes, de réduire les déplacements inutiles et d'améliorer significativement le confort des utilisateurs finaux (élèves et enseignants). Cette solution offre également un potentiel de déploiement dans d'autres bâtiments ou établissements.

## Objectifs du projet

Le projet doit atteindre les objectifs SMART suivants :

### Objectifs fonctionnels
1. **Développer une application web responsive** accessible depuis navigateur (téléphone, tablette, ordinateur) affichant en temps réel la température et l'humidité de chaque salle équipée de capteurs Phidget
2. **Implémenter un système d'alertes automatisé** qui envoie des notifications claires aux utilisateurs concernés lorsque les seuils (température ou humidité) sont dépassés, avec indication précise de la salle problématique
3. **Fournir un historique consultable** des mesures sur une période minimum de 7 jours pour chaque salle
4. **Permettre la configuration des seuils d'alerte** (valeurs minimales et maximales) par salle de manière intuitive

### Objectifs de qualité (KPI mesurables)
- **Ergonomie :** 90% des utilisateurs doivent déclarer que l'interface est "claire" ou "très clair" après utilisation
- **Fiabilité :** 95% des alertes envoyées doivent être pertinentes (taux de faux positifs ≤ 5%)
- **Accessibilité :** Temps de prise en main ≤ 10 minutes pour un nouvel utilisateur sans formation technique
- **Performance :** Temps médian pour identifier une salle problématique ≤ 30 secondes depuis l'accès au tableau de bord

### Objectifs opérationnels
- **Réduire de 30%** les interventions correctives réactives dans les 3 mois suivant le déploiement
- **Diminuer de 25%** les variations extrêmes de température/humidité en classe sur une période de 6 semaines
- **Limiter à 15 minutes par jour maximum** le temps de surveillance manuelle pour l'intendance
- **Préparer le déploiement** dans au moins 3 autres bâtiments ou écoles au trimestre suivant la mise en service initiale

## Livrables
### Livrables du projet

Le projet doit produire les livrables suivants :

1. **Application web de monitoring**
   - Application responsive accessible depuis navigateur (mobile, tablette, ordinateur)
   - Tableau de bord affichant température et humidité par salle en temps réel
   - Système d'alertes automatisé avec notifications
   - Interface de configuration des seuils par salle
   - Historique consultable sur 7 jours minimum

2. **Guide utilisateur illustré**
   - Explications des principales fonctionnalités
   - Captures d'écran annotées de l'interface
   - Interprétation des alertes et actions à entreprendre
  
3. **Guide de démarrage rapide**
   - Procédure de mise en service
   - Accès à l'application
   - Configuration initiale des seuils

## Fonctionnalités

L'application doit proposer les fonctionnalités suivantes :

### Fonctionnalités principales

1. **Tableau de bord en temps réel**
   - Affichage de la température et de l'humidité pour chaque salle équipée
   - Indication visuelle de l'état de chaque salle : "normal" ou "à surveiller"
   - Interface responsive adaptée aux téléphones, tablettes et ordinateurs
   - Mise à jour automatique des données sans rechargement de page

2. **Système d'alertes**
   - Déclenchement automatique d'alertes lorsqu'un seuil (température ou humidité) est dépassé
   - Notification claire avec indication de la salle concernée et du paramètre problématique
   - Message compréhensible pour utilisateurs non techniques
   - Envoi aux personnes désignées (intendance, direction)

3. **Historique des mesures**
   - Consultation de l'historique des données sur les 7 derniers jours minimum
   - Affichage des données du jour en cours
   - Visualisation simple et claire des tendances par salle

4. **Configuration des seuils**
   - Paramétrage des valeurs minimales et maximales par salle
   - Interface intuitive de modification des seuils (température et humidité)
   - Sauvegarde et application immédiate des nouveaux seuils

5. **Page d'aide**
   - Explications courtes des principales consignes
   - Signification des alertes et actions recommandées
   - Guide d'utilisation rapide accessible depuis l'application

## Contraintes du projet

### Contraintes techniques

1. **Matériel imposé**
   - Utilisation obligatoire des capteurs de température Phidget (https://www.phidgets.com/?prodid=724)
   - Utilisation obligatoire des capteurs d'humidité Phidget (https://www.phidgets.com/?prodid=1179)

2. **Ergonomie et accessibilité**
   - Application accessible depuis un téléphone mobile moderne
   - Aucune installation technique complexe requise pour l'utilisateur final
   - Temps de prise en main ≤ 10 minutes pour un nouvel utilisateur

3. **Performance et fiabilité**
   - Les données doivent être affichées en temps réel (rafraîchissement régulier)
   - Le système doit garantir la pertinence des alertes (≥ 95%)
   - Disponibilité de l'application pendant les heures d'ouverture de l'établissement

### Contraintes humaines

1. **Public cible**
   - Les utilisateurs finaux ne sont pas des techniciens (intendance, enseignants, direction)
   - Les messages d'alerte doivent être compréhensibles et actionnables par des non-techniciens
   - Formation minimale requise (≤ 10 minutes)

2. **Équipe projet**
   - Équipe de 3 apprentis CFC en informatique
   - Compétences à acquérir durant le projet (développement web, capteurs, base de données)

### Contraintes temporelles

1. **Délais**
   - Respect du calendrier du Module 306 (cours jeudi/vendredi ou lundi/mardi selon planning)
   - Livraison de tous les livrables dans les délais définis
   - Budget temps estimé : 43 heures de travail

2. **Jalons obligatoires**
   - Planification validée par le supérieur professionnel avant démarrage
   - Journal de travail maintenu en continu
   - Tous les livrables obligatoires du Module 306 complétés

### Contraintes organisationnelles

1. **Documentation obligatoire**
   - Respect des modèles fournis pour la planification et le journal
   - Diagrammes UML créés dans Enterprise Architect
   - Documentation en français (contexte CFC suisse)

2. **Gestion des alertes**
   - Définition claire des responsables qui reçoivent et traitent les alertes
   - Seuils d'alerte définis en collaboration avec l'intendance
   - Possibilité d'ajustement des seuils après 1-2 semaines d'utilisation

## Périmètre du projet

###  Inclus dans le projet

**Fonctionnalités de l'application**
- Développement d'une application web responsive avec tableau de bord
- Affichage en temps réel de la température et de l'humidité par salle
- Système d'alertes automatisé avec notifications
- Historique consultable sur 7 jours minimum
- Interface de configuration des seuils par salle
- Page d'aide intégrée à l'application

**Intégration matérielle**
- Connexion aux capteurs Phidget de température et d'humidité
- Collecte et stockage des données des capteurs
- Test fonctionnel dans au moins une salle pilote

**Documentation utilisateur**
- Guide utilisateur illustré (2-4 pages)
- Guide de démarrage rapide (1 page)

**Documentation de gestion de projet (Module 306)**
- Planification du projet
- Journal de travail
- Documentation d'analyse avec diagrammes UML
- Documentation de réalisation (conception, implémentation, tests)
- Web Summary

###  Exclu du projet (hors périmètre)


**Fonctionnalités avancées**
- Graphiques avancés ou statistiques complexes
- Historique au-delà de 7 jours (non requis pour la version initiale)
- Système d'administration complexe avec gestion des utilisateurs et droits
- Application mobile native (iOS/Android) - seulement web responsive
- Intégration avec d'autres systèmes de l'école (ERP, etc.)

**Déploiement étendu**
- Déploiement généralisé dans tous les bâtiments (limité à une salle pilote)
- Support technique à long terme après la fin du projet

**Aspects organisationnels**
- Définition des procédures internes de réponse aux alertes (responsabilité du client)
- Gestion du budget d'achat du matériel
- Maintenance applicative après livraison du projet

## Analyse des risques

Matrice des risques identifiés pour le projet, basée sur l'analyse du Business Case :

| ID | Risque | Probabilité | Impact | Criticité | Plan d'atténuation |
|---|---|---|---|---|---|
| **R1** | **Problèmes de connexion des capteurs Phidget** | Moyenne | Élevé | **Élevée** | Tests techniques dès le début du projet, documentation technique Phidget consultée |
| **R2** | **Données incorrectes ou capteur mal calibré** | Moyenne | Moyen | **Moyenne** | Vérification régulière des valeurs, procédure de recalibrage définie, tests de cohérence dans l'application (détection valeurs aberrantes) |
| **R3** | **Panne ou défaillance d'un capteur** | Faible | Moyen | **Faible** | Prévoir un capteur de remplacement
| **R4** | **Utilisateurs ne comprennent pas les alertes** | Moyenne | Élevé | **Élevée** | Messages d'alerte très simples et explicites, page d'aide claire intégrée, formation rapide (≤10 min), tests utilisateurs avant déploiement |
| **R5** | **Trop d'alertes (faux positifs) - seuils mal définis** | Élevée | Élevé | **Élevée** | Définir les seuils avec l'intendance avant déploiement, phase d'ajustement prévue après 1-2 semaines d'usage, historique pour analyser les déclenchements |
| **R6** | **Pas de responsable désigné pour réagir aux alertes** | Moyenne | Élevé | **Élevée** | Définir clairement qui reçoit les alertes et qui agit avant le déploiement, documentation des procédures de réponse |
| **R7** | **Retards dans la réalisation (délais Module 306)** | Moyenne | Élevé | **Élevée** | Planning clair avec marges, validation du matériel au début, suivi hebdomadaire via journal de travail, priorisation des fonctionnalités essentielles |
| **R8** | **Absence d'un membre de l'équipe (3 personnes)** | Faible | Moyen | **Moyenne** | Répartition équilibrée des tâches, documentation partagée sur Git, transfert de connaissances régulier entre membres |
| **R9** | **Mauvaise compréhension des besoins du client** | Faible | Élevé | **Moyenne** | Validation régulière avec l'intendance/direction, livrables intermédiaires à valider, critères de succès clairs et mesurables |
| **R10** | **Perte de données ou fichiers non sauvegardés** | Faible | Élevé | **Moyenne** | Utilisation obligatoire de Git pour le code et la documentation, commits réguliers, sauvegarde automatique (OneDrive) |
| **R11** | **Difficultés techniques avec l'intégration des capteurs** | Élevée | Moyen | **Moyenne** | Tests précoces de la communication avec les capteurs, consultation documentation Phidget, prévoir du temps supplémentaire pour cette étape critique |
| **R12** | **Interface non adaptée aux utilisateurs non techniques** | Moyenne | Moyen | **Moyenne** | Tests utilisateurs durant le développement, design simple et intuitif, feedback régulier des utilisateurs cibles (intendance, enseignants) |

## Ressources nécessaires

Liste les ressources humaines (compétences), matérielles (outils, logiciels), et éventuellement financières nécessaires à la réalisation.
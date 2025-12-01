# Module 306 : Réaliser un projet informatique
## Cahier des charges 📋

**Cahier des charges :** Gestion des températures dans les classes avec alertes

**Réalisé par :**
- Beer Gabriel
- Wicki Léonard
- Dubusc Cyril
- Nom Prénom

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

Liste tous les livrables que le projet doit produire (prototype, documentation technique, rapport final, etc.), avec une brève description de chacun.

## Fonctionnalités

Décris ce que le produit ou service doit faire. Ce sont les fonctionnalités principales attendues par le client ou les utilisateurs.

## Contraintes du projet

Indique les contraintes techniques, humaines, temporelles, financières ou organisationnelles qui doivent être respectées.

## Périmètre du projet

Définis ce qui est inclus dans le projet et ce qui ne l'est pas (très utile pour éviter les dérives de périmètre).

## Analyse des risques

Faire une matrice des risques selon les risques détectés dans le business case. Exemple de matrice de risque :

| ID | Risque | Probabilité | Impact | Criticité | Plan d'atténuation |
|---|---|---|---|---|---|
| R1 | Retard dans la livraison du prototype | Moyenne | Élevé | Élevée | Ajouter des marges dans le planning, suivi hebdomadaire |
| R2 | Absence d'un membre clé de l'équipe | Faible | Moyen | Moyenne | Répartition des tâches, documentation partagée |
| R3 | Problème technique avec un outil ou logiciel | Élevée | Faible | Moyenne | Prévoir une solution alternative, test préalable |
| R4 | Mauvaise compréhension des besoins du client | Moyenne | Élevé | Élevée | Organiser des réunions régulières, valider les livrables intermédiaires |
| R5 | Difficulté à respecter les délais du sprint | Moyenne | Moyen | Moyenne | Révision du planning, priorisation des tâches dans le Kanban |
| R6 | Perte de données ou fichiers non sauvegardés | Faible | Élevé | Moyenne | Utiliser un système de sauvegarde automatique (cloud, Git, etc.) |

## Ressources nécessaires

Liste les ressources humaines (compétences), matérielles (outils, logiciels), et éventuellement financières nécessaires à la réalisation.
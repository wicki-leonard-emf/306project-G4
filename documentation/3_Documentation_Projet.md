Informaticien/-ne CFC
Travail pratique individuel 2025 (TPI)

Modèle de rapport v1.4
Nom du candidat : Leonard Wiki, Gabriel Beer, Cyril Dubusc
« Nom du projet »

# Sommaire

1. [Les grandes lignes du projet](#les-grandes-lignes-du-projet)  
   1.1 [Analyse de la situation initiale](#analyse-de-la-situation-initiale)  
   1.2 [Analyse de l’état désiré](#analyse-de-létat-désiré)  
   1.3 [Cahier des charges / exigences du système](#cahier-des-charges--exigences-du-système)  
   1.4 [Organisation du projet](#organisation-du-projet)

2. [Analyse préliminaire](#analyse-préliminaire)  
   2.1 [Objectifs du système](#objectifs-du-système)  
   2.2 [Variantes](#variantes)  
   2.3 [Rentabilité](#rentabilité)  
   2.4 [Analyse de risque](#analyse-de-risque)

3. [Analyse](#analyse)  
   3.1 [Cas d’utilisation](#cas-dutilisation)  
   3.2 [Diagrammes d’activités / de séquence](#diagrammes-dactivités--de-séquence)  
   3.3 [Maquettes](#maquettes)

4. [Concept](#concept)  
   4.1 [Architecture du système](#architecture-du-système)  
   4.2 [Diagramme Entité-Relation](#diagramme-entité-relation)  
   4.3 [Modèle relationnel de la base de données](#modèle-relationnel-de-la-base-de-données)  
   4.4 [Diagrammes de classes](#diagrammes-de-classes)  
   4.5 [Diagrammes de séquence des interactions](#diagrammes-de-séquence-des-interactions)  
   4.6 [Concept de tests](#concept-de-tests)

5. [Réalisation](#réalisation)

6. [Tests](#tests)  
   6.1 [Procédure de test](#procédure-de-test)  
   6.2 [Protocole de tests](#protocole-de-tests)

7. [Conclusion](#conclusion)  
   7.1 [Améliorations possibles](#améliorations-possibles)  
   7.2 [Auto-évaluation](#auto-évaluation)  
   7.3 [Conclusion du module de Gabriel](#conclusion-du-module-de-Gabriel)  
   7.4 [Conclusion du module de Léonard](#conclusion-du-module-de-Léonard)  
   7.5 [Conclusion du module de Cyril](#conclusion-du-module-de-Cyril)

8. [Bibliographie : liste des sources et références](#bibliographie--liste-des-sources-et-références)

9. [Glossaire](#glossaire)

# Les grandes lignes du projet

## Analyse de la situation initiale

### État actuel
Actuellement, les salles de classe de l'école EMF ne disposent pas d'un système centralisé de monitoring des conditions environnementales (température et humidité). Les variations de température et d'humidité affectent le confort des étudiants et l'efficacité pédagogique, mais il n'existe pas d'outil pour surveiller ou analyser ces paramètres en temps réel.

### Problème identifié
Sans système de monitoring, l'école ne peut pas :
- Détecter rapidement les variations anormales de température/humidité
- Analyser l'impact des conditions environnementales sur le confort des salles
- Optimiser le fonctionnement des systèmes de climatisation/ventilation
- Archiver et analyser les données historiques

### Opportunité du projet
Développer un système automatisé de monitoring des capteurs (sensorHub) permettra de :
- Surveiller en temps réel les conditions dans chaque salle de classe
- Générer des alertes en cas de dépassement de seuils
- Fournir une interface de gestion aux enseignants et administrateurs
- Collecter des données pour optimiser l'environnement scolaire

## Analyse de l'état désiré

### Système cible (sensorHub)
Le système sensorHub doit permettre :
- **Collecte de données** : Des capteurs Phidget (température et humidité) connectés à une Raspberry Pi envoient automatiquement les données à intervalles réguliers
- **Stockage centralisé** : Toutes les lectures sont stockées dans une base de données PostgreSQL avec timestamps et métadonnées
- **Consultation en temps réel** : Un tableau de bord web affiche les conditions actuelles de chaque salle avec visualisation des trends
- **Gestion des seuils** : Les administrateurs peuvent définir des seuils d'alerte pour chaque salle
- **Interface utilisateur** : Application React responsive pour desktop et mobile avec authentification par rôles (Admin, Enseignant, Élève)
- **API REST** : Backend Express.js exposant les endpoints pour consultation et gestion des données

### Architecture souhaitée
L'application est architecturée en trois composants :
1. **Frontend (React)** : Tableau de bord interactif, gestion des utilisateurs et des seuils
2. **Backend (Express.js + Prisma)** : API REST, gestion de base de données, authentification
3. **Raspberry Pi** : Script Node.js pour la lecture des capteurs Phidget et l'envoi des données

## Cahier des charges / exigences du système

### Analyse

Voici les différentes tâches exigées durant la phase d'analyse :

- …

### Conception

Voici les différentes tâches exigées durant la phase de conception

- …

### Réalisation

## Organisation du projet

### Méthodes de gestion de projet

### Participants

### Sauvegardes

# Analyse préliminaire

## Objectifs du système

### Analyse de l'état actuel

Résumé de l'état actuel avant projet

### Analyse de l'état désiré

Résumé de l'état désiré

### Objectifs

Reprends les objectifs SMART définis dans la phase de lancement, en les reformulant si nécessaire pour les adapter au cahier des charges

## Variantes

Quelles sont les différentes variantes avec explication et détails.

## Rentabilité

Analyse de rentabilité du projet avec description et détails

## Analyse de risque

Faire une matrice des risques selon les risques détectés dans le business case. Exemple de matrice de risque :

| ID  | Risque                                       | Probabilité | Impact | Criticité | Plan d'atténuation                                                      |
| --- | -------------------------------------------- | ----------- | ------ | --------- | ----------------------------------------------------------------------- |
| R1  | Retard dans la livraison du prototype        | Moyenne     | Élevé  | Élevée    | Ajouter des marges dans le planning, suivi hebdomadaire                 |
| R2  | Absence d'un membre clé de l'équipe          | Faible      | Moyen  | Moyenne   | Répartition des tâches, documentation partagée                          |
| R3  | Problème technique avec un outil ou logiciel | Élevée      | Faible | Moyenne   | Prévoir une solution alternative, test préalable                        |
| R4  | Mauvaise compréhension des besoins du client | Moyenne     | Élevé  | Élevée    | Organiser des réunions régulières, valider les livrables intermédiaires |
| R5  | Difficulté à respecter les délais du sprint  | Moyenne     | Moyen  | Moyenne   | Révision du planning, priorisation des tâches dans le Kanban            |
| R6  | Perte de données ou fichiers non sauvegardés | Faible      | Élevé  | Moyenne   | Utiliser un système de sauvegarde automatique (cloud, Git, etc.)        |

# Analyse

## Cas d'utilisation

### Acteurs

## Diagrammes d'activités / de séquence

## Maquettes

# Concept

## Architecture du système

## Diagramme Entité-Relation

## Modèle relationnel de la base de données

## Diagrammes de classes

## Diagrammes de séquence des interactions

## Concept de tests

### Protocole de tests

# Réalisation

# Tests

## Procédure de test

Maintenant que la réalisation est terminée, il faut compléter le protocole de tests créé précédemment. Celui-ci comporte des tests à effectuer sur l'application cliente mais également sur Postman.

## Protocole de tests

| Numéro de test  | Date            | Description | Résultat désirée |
| --------------- | --------------- | ----------- | ---------------- |
| F1              | 13.06.2025 - 8h | description | Resultat ?       |
| Résultat obt. ? |
| Succès          |
| Numéro de test  | Date            | Description | Résultat désirée |
| F2              | 13.06.2025 - 8h | description | resultat         |
| Résultat obt. ? |
| Succès          |

# Conclusion

## Améliorations possibles

## Auto-évaluation

## Conclusion du module de Gabriel

## Conclusion du module de Léonard

## Conclusion du module de Cyril

# Bibliographie : liste des sources et références

# Glossaire

|     |     |
| --- | --- |
|     |     |
|     |     |
|     |     |
|     |     |
|     |     |
|     |     |
|     |     |
|     |     |

export function DocumentationPage() {
  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="flex flex-col h-full">
        {/* Content */}
        <div className="flex-1 py-16 px-8">
          <div className="max-w-2xl mx-auto">
            {/* Introduction */}
            <div className="bg-white border border-[#E9EAEB] rounded-[10px] p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-gradient-to-br from-[#7F56D9] to-[#9E77ED] flex items-center justify-center">
                  <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-[#181d27]">
                  Bienvenue sur SensorHub
                </h2>
              </div>
              <p className="text-[#535862] leading-relaxed mb-4">
                SensorHub est une application de surveillance intelligente des températures dans les salles de classe.
                Elle vous permet de monitorer en temps réel les conditions thermiques de vos espaces, de recevoir des alertes
                personnalisées et de gérer efficacement votre infrastructure de capteurs.
              </p>
              <div className="bg-[#F9F5FF] border border-[#E9D7FE] rounded-lg p-4">
                <p className="text-sm text-[#6941C6]">
                  💡 <strong>Astuce :</strong> Ce guide vous accompagnera pas à pas dans la découverte de toutes les fonctionnalités.
                  Prenez le temps de le lire pour tirer le meilleur parti de SensorHub.
                </p>
              </div>
            </div>

            {/* Section 1: Connexion */}
            <div className="bg-white border border-[#E9EAEB] rounded-[10px] p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-[#F9F5FF] flex items-center justify-center">
                  <svg className="size-5 text-[#6941C6]" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M15.8333 8.33333V5.83333C15.8333 5.39131 15.6577 4.96738 15.3452 4.65482C15.0326 4.34226 14.6087 4.16667 14.1667 4.16667H5.83333C5.39131 4.16667 4.96738 4.34226 4.65482 4.65482C4.34226 4.96738 4.16667 5.39131 4.16667 5.83333V14.1667C4.16667 14.6087 4.34226 15.0326 4.65482 15.3452C4.96738 15.6577 5.39131 15.8333 5.83333 15.8333H14.1667C14.6087 15.8333 15.0326 15.6577 15.3452 15.3452C15.6577 15.0326 15.8333 14.6087 15.8333 14.1667V11.6667M12.5 10H17.5M17.5 10L15.8333 8.33333M17.5 10L15.8333 11.6667"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-[#181d27]">
                  1. Première connexion
                </h2>
              </div>

              <h3 className="font-semibold text-[#181d27] mb-2">Comment se connecter</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                Lors de votre première visite, vous accéderez à l'écran de connexion. Pour cette version de démonstration,
                utilisez les identifiants suivants :
              </p>
              <div className="bg-[#FAFAFA] border border-[#E9EAEB] rounded-lg p-4 mb-4 font-mono text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#717680]">Nom d'utilisateur :</span>
                  <span className="text-[#181d27] font-semibold">admin</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#717680]">Mot de passe :</span>
                  <span className="text-[#181d27] font-semibold">admin</span>
                </div>
              </div>
              <p className="text-[#535862] leading-relaxed">
                Cliquez sur le bouton "Se connecter" pour accéder au tableau de bord principal.
              </p>
            </div>

            {/* Section 2: Navigation */}
            <div className="bg-white border border-[#E9EAEB] rounded-[10px] p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-[#F9F5FF] flex items-center justify-center">
                  <svg className="size-5 text-[#6941C6]" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M2.5 7.5L10 2.5L17.5 7.5M2.5 7.5V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V7.5M2.5 7.5L10 12.5L17.5 7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-[#181d27]">
                  2. Navigation dans l'interface
                </h2>
              </div>

              <h3 className="font-semibold text-[#181d27] mb-2">La barre latérale (Sidebar)</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                La sidebar est votre point de navigation principal. Elle contient tous les menus de l'application :
              </p>
              <ul className="space-y-2 mb-4 ml-4">
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Dashboard</strong> - Vue d'ensemble de toutes vos salles</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Notifications</strong> - Alertes et événements système</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Paramètres</strong> - Configuration de votre compte et du système</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Utilisateurs</strong> - Gestion des accès et permissions</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Historique</strong> - Logs et événements détaillés</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Documentation</strong> - Ce guide d'utilisation</span>
                </li>
              </ul>

              <h3 className="font-semibold text-[#181d27] mb-2 mt-6">Réduire/Agrandir la sidebar</h3>
              <p className="text-[#535862] leading-relaxed">
                Cliquez sur l'icône en haut de la sidebar pour la réduire et gagner de l'espace d'affichage.
                Cliquez à nouveau pour l'agrandir.
              </p>
            </div>

            {/* Section 3: Dashboard */}
            <div className="bg-white border border-[#E9EAEB] rounded-[10px] p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-[#F9F5FF] flex items-center justify-center">
                  <svg className="size-5 text-[#6941C6]" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M2.5 3.33333H7.5V8.33333H2.5V3.33333Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5 3.33333H17.5V8.33333H12.5V3.33333Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5 11.6667H17.5V16.6667H12.5V11.6667Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.5 11.6667H7.5V16.6667H2.5V11.6667Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-[#181d27]">
                  3. Le tableau de bord principal
                </h2>
              </div>

              <h3 className="font-semibold text-[#181d27] mb-2">Comprendre les cartes de salle</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                Chaque salle de classe est représentée par une carte interactive contenant :
              </p>
              <ul className="space-y-3 mb-6 ml-4">
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <div>
                    <strong className="text-[#181d27]">Numéro de salle</strong> - Identifiant unique de la salle (ex: A35, C36)
                  </div>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <div>
                    <strong className="text-[#181d27]">Température actuelle</strong> - Affichée en gros caractères au centre de la carte
                  </div>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <div>
                    <strong className="text-[#181d27]">Tendance</strong> - Flèche indiquant si la température monte (rouge) ou descend (verte)
                  </div>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <div>
                    <strong className="text-[#181d27]">Pourcentage de variation</strong> - Changement par rapport à la période précédente
                  </div>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <div>
                    <strong className="text-[#181d27]">Mini-graphique</strong> - Évolution des températures sur les dernières heures
                  </div>
                </li>
              </ul>

              <h3 className="font-semibold text-[#181d27] mb-2">Barre de recherche</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                Utilisez la barre de recherche en haut à droite pour trouver rapidement une salle spécifique.
                Tapez le numéro de la salle (ex: "A35") et les résultats s'afficheront automatiquement.
              </p>

              <h3 className="font-semibold text-[#181d27] mb-2">Filtres rapides</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                Les boutons de filtre vous permettent de trier l'affichage :
              </p>
              <ul className="space-y-2 mb-4 ml-4">
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Toutes</strong> - Affiche toutes les salles</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Bâtiment A</strong> - Salles du bâtiment A uniquement</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Bâtiment C</strong> - Salles du bâtiment C uniquement</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Alertes</strong> - Uniquement les salles avec des alertes actives</span>
                </li>
              </ul>
            </div>

            {/* Section 4: Vue détaillée */}
            <div className="bg-white border border-[#E9EAEB] rounded-[10px] p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-[#F9F5FF] flex items-center justify-center">
                  <svg className="size-5 text-[#6941C6]" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.5 10C17.5 10 14.1667 15.8333 10 15.8333C5.83333 15.8333 2.5 10 2.5 10C2.5 10 5.83333 4.16667 10 4.16667C14.1667 4.16667 17.5 10 17.5 10Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-[#181d27]">
                  4. Vue détaillée d'une salle
                </h2>
              </div>

              <h3 className="font-semibold text-[#181d27] mb-2">Accéder à la vue détaillée</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                Cliquez sur n'importe quelle carte de salle pour ouvrir sa vue détaillée. Vous accéderez alors à un écran complet
                avec des informations avancées :
              </p>
              <ul className="space-y-3 mb-6 ml-4">
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <div>
                    <strong className="text-[#181d27]">Graphique détaillé</strong> - Historique complet des températures avec zoom
                  </div>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <div>
                    <strong className="text-[#181d27]">Statistiques avancées</strong> - Min/max, moyenne, écart-type
                  </div>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <div>
                    <strong className="text-[#181d27]">État du capteur</strong> - Statut de connexion et dernière mise à jour
                  </div>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <div>
                    <strong className="text-[#181d27]">Seuils configurés</strong> - Limites min/max définies pour cette salle
                  </div>
                </li>
              </ul>

              <h3 className="font-semibold text-[#181d27] mb-2">S'abonner aux alertes</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                Dans la vue détaillée, vous pouvez activer les notifications pour cette salle spécifique :
              </p>
              <ol className="space-y-2 mb-4 ml-4 list-decimal list-inside">
                <li className="text-[#535862]">Cliquez sur le bouton "S'abonner" en haut à droite</li>
                <li className="text-[#535862]">Choisissez les types d'alertes que vous souhaitez recevoir</li>
                <li className="text-[#535862]">Validez pour activer les notifications</li>
              </ol>

              <h3 className="font-semibold text-[#181d27] mb-2">Gérer les seuils individuels</h3>
              <p className="text-[#535862] leading-relaxed">
                Vous pouvez définir des seuils personnalisés pour chaque salle. Cliquez sur "Gérer les seuils"
                pour ouvrir la modale de configuration et ajuster les températures minimale et maximale acceptables.
              </p>
            </div>

            {/* Section 5: Gestion des salles */}
            <div className="bg-white border border-[#E9EAEB] rounded-[10px] p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-[#F9F5FF] flex items-center justify-center">
                  <svg className="size-5 text-[#6941C6]" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M10 4.16667V15.8333M4.16667 10H15.8333"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-[#181d27]">
                  5. Ajouter et gérer des salles
                </h2>
              </div>

              <h3 className="font-semibold text-[#181d27] mb-2">Ajouter une nouvelle salle</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                Pour ajouter une nouvelle salle au système :
              </p>
              <ol className="space-y-2 mb-6 ml-4 list-decimal list-inside">
                <li className="text-[#535862]">Cliquez sur le bouton "+ Ajouter une classe" en haut du dashboard</li>
                <li className="text-[#535862]">Entrez le numéro de la salle (ex: B12, D05)</li>
                <li className="text-[#535862]">Sélectionnez le bâtiment correspondant</li>
                <li className="text-[#535862]">Optionnel : Définissez des seuils personnalisés dès la création</li>
                <li className="text-[#535862]">Cliquez sur "Ajouter" pour valider</li>
              </ol>

              <h3 className="font-semibold text-[#181d27] mb-2">Seuils par défaut</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                Vous pouvez configurer des seuils globaux qui s'appliqueront à toutes les nouvelles salles :
              </p>
              <ol className="space-y-2 mb-4 ml-4 list-decimal list-inside">
                <li className="text-[#535862]">Cliquez sur le bouton "Seuils par défaut" en haut du dashboard</li>
                <li className="text-[#535862]">Définissez la température minimale acceptable (recommandé : 18-19°C)</li>
                <li className="text-[#535862]">Définissez la température maximale acceptable (recommandé : 24-26°C)</li>
                <li className="text-[#535862]">Sauvegardez vos modifications</li>
              </ol>

              <div className="bg-[#F9F5FF] border border-[#E9D7FE] rounded-lg p-4">
                <p className="text-sm text-[#6941C6]">
                  💡 <strong>Bon à savoir :</strong> Les seuils par défaut ne s'appliquent qu'aux nouvelles salles.
                  Les salles existantes conservent leurs paramètres actuels.
                </p>
              </div>
            </div>

            {/* Section 6: Notifications */}
            <div className="bg-white border border-[#E9EAEB] rounded-[10px] p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-[#F9F5FF] flex items-center justify-center">
                  <svg className="size-5 text-[#6941C6]" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52678 4.06881 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5789 18.2537 10.292 18.3304 10 18.3304C9.70802 18.3304 9.42115 18.2537 9.16814 18.1079C8.91513 17.9622 8.70484 17.7526 8.55835 17.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-[#181d27]">
                  6. Gérer les notifications
                </h2>
              </div>

              <h3 className="font-semibold text-[#181d27] mb-2">Consulter vos notifications</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                La page Notifications centralise toutes les alertes système. Chaque notification contient :
              </p>
              <ul className="space-y-2 mb-6 ml-4">
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Titre</strong> - Nature de l'événement</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Détails</strong> - Salle concernée et valeur de température</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Catégorie</strong> - Type d'événement (Alerte, Succès, Mise à jour, Info)</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Horodatage</strong> - Date et heure de l'événement</span>
                </li>
              </ul>

              <h3 className="font-semibold text-[#181d27] mb-2">Types de notifications</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="size-2 rounded-full bg-[#D92D20] mt-2" />
                  <div>
                    <p className="font-medium text-[#181d27]">Alertes critiques (Rouge)</p>
                    <p className="text-sm text-[#535862]">Températures hors limites nécessitant une action immédiate</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-2 rounded-full bg-[#F79009] mt-2" />
                  <div>
                    <p className="font-medium text-[#181d27]">Avertissements (Orange)</p>
                    <p className="text-sm text-[#535862]">Situations à surveiller, approche des seuils</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-2 rounded-full bg-[#039855] mt-2" />
                  <div>
                    <p className="font-medium text-[#181d27]">Succès (Vert)</p>
                    <p className="text-sm text-[#535862]">Opérations réussies, retour à la normale</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-2 rounded-full bg-[#6941C6] mt-2" />
                  <div>
                    <p className="font-medium text-[#181d27]">Informations (Violet)</p>
                    <p className="text-sm text-[#535862]">Mises à jour système, modifications de configuration</p>
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-[#181d27] mb-2">Actions disponibles</h3>
              <ul className="space-y-2 mb-4 ml-4">
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Marquer comme lu</strong> - Archiver une notification</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Voir la salle</strong> - Accès direct à la vue détaillée</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Marquer tout comme lu</strong> - Archiver toutes les notifications d'un coup</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Effacer tout</strong> - Supprimer l'historique des notifications</span>
                </li>
              </ul>
            </div>

            {/* Section 7: Paramètres */}
            <div className="bg-white border border-[#E9EAEB] rounded-[10px] p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-[#F9F5FF] flex items-center justify-center">
                  <svg className="size-5 text-[#6941C6]" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.1667 12.5C16.0557 12.7513 16.0226 13.0302 16.0717 13.3006C16.1209 13.571 16.2501 13.8203 16.4417 14.0167L16.4917 14.0667C16.6465 14.2213 16.7695 14.4049 16.8538 14.6071C16.938 14.8093 16.9818 15.0262 16.9818 15.2452C16.9818 15.4642 16.938 15.6811 16.8538 15.8833C16.7695 16.0855 16.6465 16.2691 16.4917 16.4238C16.337 16.5786 16.1534 16.7016 15.9512 16.7858C15.749 16.8701 15.5321 16.9139 15.3131 16.9139C15.0941 16.9139 14.8772 16.8701 14.675 16.7858C14.4728 16.7016 14.2892 16.5786 14.1345 16.4238L14.0845 16.3738C13.8881 16.1823 13.6388 16.053 13.3684 16.0039C13.098 15.9547 12.8191 15.9879 12.5678 16.0988C12.3214 16.2047 12.1141 16.3821 11.9729 16.6083C11.8318 16.8346 11.7635 17.0994 11.7767 17.3667V17.5C11.7767 17.9421 11.6011 18.3659 11.2885 18.6785C10.9759 18.9911 10.5521 19.1667 10.11 19.1667C9.66791 19.1667 9.24408 18.9911 8.9315 18.6785C8.61891 18.3659 8.44333 17.9421 8.44333 17.5V17.425C8.42548 17.1489 8.34464 16.8813 8.20788 16.6438C8.07112 16.4064 7.88233 16.2058 7.65667 16.0583C7.40529 15.9475 7.12643 15.9143 6.85604 15.9634C6.58565 16.0126 6.33632 16.1418 6.14 16.3333L6.09 16.3833C5.93533 16.5381 5.75172 16.6611 5.54952 16.7454C5.34732 16.8296 5.13042 16.8734 4.91143 16.8734C4.69243 16.8734 4.47554 16.8296 4.27333 16.7454C4.07113 16.6611 3.88753 16.5381 3.73286 16.3833C3.57805 16.2287 3.45504 16.0451 3.3708 15.8429C3.28657 15.6407 3.24274 15.4238 3.24274 15.2048C3.24274 14.9858 3.28657 14.7689 3.3708 14.5667C3.45504 14.3645 3.57805 14.1809 3.73286 14.0262L3.78286 13.9762C3.97439 13.7799 4.1036 13.5306 4.15276 13.2602C4.20192 12.9898 4.16874 12.7109 4.05786 12.4595C3.95199 12.2132 3.77459 12.0059 3.54835 11.8647C3.32211 11.7236 3.05734 11.6553 2.79 11.6685H2.66667C2.22464 11.6685 1.80081 11.4929 1.48822 11.1803C1.17563 10.8677 1 10.4439 1 10.0018C1 9.55977 1.17563 9.13594 1.48822 8.82335C1.80081 8.51076 2.22464 8.33519 2.66667 8.33519H2.74167C3.01774 8.31733 3.28532 8.23649 3.52275 8.09973C3.76018 7.96297 3.96078 7.77418 4.10833 7.54852C4.21921 7.29714 4.25239 7.01828 4.20323 6.74789C4.15407 6.4775 4.02486 6.22817 3.83333 6.03185V5.98185C3.67852 5.82718 3.55551 5.64357 3.47128 5.44137C3.38704 5.23917 3.34321 5.02228 3.34321 4.80328C3.34321 4.58428 3.38704 4.36739 3.47128 4.16519C3.55551 3.96299 3.67852 3.77938 3.83333 3.62471C3.988 3.4699 4.17161 3.34689 4.37381 3.26266C4.57601 3.17842 4.7929 3.13459 5.0119 3.13459C5.2309 3.13459 5.44779 3.17842 5.64999 3.26266C5.85219 3.34689 6.0358 3.4699 6.19047 3.62471L6.24047 3.67471C6.43679 3.86624 6.68612 3.99545 6.95651 4.04461C7.2269 4.09377 7.50576 4.06059 7.75714 3.94971H7.83214C8.07845 3.84383 8.28577 3.66643 8.42694 3.44019C8.5681 3.21395 8.63643 2.94918 8.62321 2.68185V2.55852C8.62321 2.11649 8.79878 1.69266 9.11137 1.38007C9.42396 1.06748 9.84779 0.891906 10.2898 0.891906C10.7318 0.891906 11.1557 1.06748 11.4683 1.38007C11.7808 1.69266 11.9564 2.11649 11.9564 2.55852V2.63352C11.9432 2.90085 12.0115 3.16562 12.1527 3.39186C12.2939 3.6181 12.5012 3.7955 12.7475 3.90138C12.9989 4.01226 13.2777 4.04544 13.5481 3.99628C13.8185 3.94712 14.0679 3.81791 14.2642 3.62638L14.3142 3.57638C14.4688 3.42157 14.6525 3.29856 14.8547 3.21433C15.0569 3.13009 15.2737 3.08626 15.4927 3.08626C15.7117 3.08626 15.9286 3.13009 16.1308 3.21433C16.333 3.29856 16.5166 3.42157 16.6713 3.57638C16.8261 3.73105 16.9491 3.91466 17.0333 4.11686C17.1176 4.31906 17.1614 4.53595 17.1614 4.75495C17.1614 4.97395 17.1176 5.19084 17.0333 5.39304C16.9491 5.59524 16.8261 5.77885 16.6713 5.93352L16.6213 5.98352C16.4298 6.17984 16.3006 6.42917 16.2514 6.69956C16.2022 6.96995 16.2354 7.24881 16.3463 7.50019V7.57519C16.4522 7.8215 16.6296 8.02882 16.8558 8.16998C17.0821 8.31115 17.3468 8.37948 17.6142 8.36626H17.7375C18.1795 8.36626 18.6034 8.54183 18.9159 8.85442C19.2285 9.16701 19.4041 9.59084 19.4041 10.0329C19.4041 10.4749 19.2285 10.8987 18.9159 11.2113C18.6034 11.5239 18.1795 11.6995 17.7375 11.6995H17.6625C17.3952 11.6863 17.1304 11.7546 16.9042 11.8958C16.6779 12.0369 16.5005 12.2443 16.3947 12.4906V12.4906Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-[#181d27]">
                  7. Configuration et paramètres
                </h2>
              </div>

              <h3 className="font-semibold text-[#181d27] mb-2">Paramètres utilisateur</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                Dans la section Paramètres, vous pouvez personnaliser votre compte :
              </p>
              <ul className="space-y-2 mb-6 ml-4">
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Profil</strong> - Modifier votre nom, email et photo de profil</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Mot de passe</strong> - Changer votre mot de passe de connexion</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Notifications</strong> - Configurer vos préférences d'alertes</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Langue</strong> - Sélectionner la langue d'interface</span>
                </li>
              </ul>

              <h3 className="font-semibold text-[#181d27] mb-2">Paramètres système</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                Les administrateurs ont accès à des paramètres avancés :
              </p>
              <ul className="space-y-2 mb-4 ml-4">
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Fréquence de rafraîchissement</strong> - Intervalle de mise à jour des données</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Sauvegardes automatiques</strong> - Configuration des backups</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Maintenance</strong> - Planification des mises à jour</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">API et intégrations</strong> - Connexion à des services tiers</span>
                </li>
              </ul>
            </div>

            {/* Section 8: Utilisateurs */}
            <div className="bg-white border border-[#E9EAEB] rounded-[10px] p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-[#F9F5FF] flex items-center justify-center">
                  <svg className="size-5 text-[#6941C6]" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M14.1667 17.5V15.8333C14.1667 14.9493 13.8155 14.1014 13.1904 13.4763C12.5652 12.8512 11.7174 12.5 10.8333 12.5H4.16667C3.28261 12.5 2.43477 12.8512 1.80965 13.4763C1.18453 14.1014 0.833336 14.9493 0.833336 15.8333V17.5M17.5 6.66667V12.5M20.4167 9.58333H14.5833M10.8333 5C10.8333 6.84095 9.34095 8.33333 7.5 8.33333C5.65905 8.33333 4.16667 6.84095 4.16667 5C4.16667 3.15905 5.65905 1.66667 7.5 1.66667C9.34095 1.66667 10.8333 3.15905 10.8333 5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-[#181d27]">
                  8. Gestion des utilisateurs
                </h2>
              </div>

              <h3 className="font-semibold text-[#181d27] mb-2">Liste des utilisateurs</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                La page Utilisateurs permet aux administrateurs de gérer les accès à l'application.
                Chaque utilisateur est affiché avec :
              </p>
              <ul className="space-y-2 mb-6 ml-4">
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Nom et prénom</strong> - Identité de l'utilisateur</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Email</strong> - Adresse de contact</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Rôle</strong> - Niveau de permissions (Admin, Gestionnaire, Observateur)</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Statut</strong> - Actif ou Inactif</span>
                </li>
              </ul>

              <h3 className="font-semibold text-[#181d27] mb-2">Ajouter un utilisateur</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                Cliquez sur "Ajouter un utilisateur" pour inviter une nouvelle personne :
              </p>
              <ol className="space-y-2 mb-6 ml-4 list-decimal list-inside">
                <li className="text-[#535862]">Entrez l'adresse email de l'utilisateur</li>
                <li className="text-[#535862]">Sélectionnez le rôle approprié</li>
                <li className="text-[#535862]">Définissez les permissions spécifiques (optionnel)</li>
                <li className="text-[#535862]">Envoyez l'invitation</li>
              </ol>

              <h3 className="font-semibold text-[#181d27] mb-2">Rôles et permissions</h3>
              <div className="space-y-3 mb-4">
                <div className="bg-[#FAFAFA] border border-[#E9EAEB] rounded-lg p-4">
                  <p className="font-medium text-[#181d27] mb-1">👑 Administrateur</p>
                  <p className="text-sm text-[#535862]">
                    Accès complet : gestion des utilisateurs, configuration système, toutes les salles
                  </p>
                </div>
                <div className="bg-[#FAFAFA] border border-[#E9EAEB] rounded-lg p-4">
                  <p className="font-medium text-[#181d27] mb-1">⚙️ Gestionnaire</p>
                  <p className="text-sm text-[#535862]">
                    Gestion des salles, configuration des seuils, consultation des logs
                  </p>
                </div>
                <div className="bg-[#FAFAFA] border border-[#E9EAEB] rounded-lg p-4">
                  <p className="font-medium text-[#181d27] mb-1">👁️ Observateur</p>
                  <p className="text-sm text-[#535862]">
                    Consultation uniquement : dashboard, notifications, pas de modifications
                  </p>
                </div>
              </div>
            </div>

            {/* Section 9: Historique */}
            <div className="bg-white border border-[#E9EAEB] rounded-[10px] p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-[#F9F5FF] flex items-center justify-center">
                  <svg className="size-5 text-[#6941C6]" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 5V10L13.3333 11.6667"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-[#181d27]">
                  9. Historique des transactions
                </h2>
              </div>

              <h3 className="font-semibold text-[#181d27] mb-2">Consulter les logs système</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                L'historique des transactions enregistre tous les événements de l'application sous forme de tableau détaillé :
              </p>
              <ul className="space-y-2 mb-6 ml-4">
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Time</strong> - Date et heure précise de l'événement</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Status</strong> - Nature de l'événement (Succès, Erreur, Avertissement, Info)</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Host</strong> - Salle ou système concerné</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Request</strong> - Type d'opération (code technique)</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Messages</strong> - Description détaillée de l'événement</span>
                </li>
              </ul>

              <h3 className="font-semibold text-[#181d27] mb-2">Filtrer et exporter</h3>
              <p className="text-[#535862] leading-relaxed mb-4">
                Utilisez les outils en haut de la page pour :
              </p>
              <ul className="space-y-2 mb-6 ml-4">
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Rechercher</strong> - Trouvez rapidement un événement spécifique</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Filtrer</strong> - Affichez uniquement certains types d'événements</span>
                </li>
                <li className="flex items-start gap-2 text-[#535862]">
                  <span className="text-[#6941C6] mt-1">•</span>
                  <span><strong className="text-[#181d27]">Exporter</strong> - Téléchargez les logs au format CSV pour analyse externe</span>
                </li>
              </ul>

              <div className="bg-[#F9F5FF] border border-[#E9D7FE] rounded-lg p-4">
                <p className="text-sm text-[#6941C6]">
                  💡 <strong>Astuce :</strong> Le header du tableau reste visible lors du scroll pour faciliter
                  la lecture de longues listes d'événements.
                </p>
              </div>
            </div>

            {/* Section 10: Conseils */}
            <div className="bg-white border border-[#E9EAEB] rounded-[10px] p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-gradient-to-br from-[#F79009] to-[#FB923C] flex items-center justify-center">
                  <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-[#181d27]">
                  10. Conseils et bonnes pratiques
                </h2>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-[#6941C6] pl-4">
                  <h3 className="font-semibold text-[#181d27] mb-1">✅ Vérifiez régulièrement vos notifications</h3>
                  <p className="text-sm text-[#535862]">
                    Consultez la page Notifications au moins une fois par jour pour rester informé des alertes importantes.
                  </p>
                </div>

                <div className="border-l-4 border-[#6941C6] pl-4">
                  <h3 className="font-semibold text-[#181d27] mb-1">✅ Définissez des seuils adaptés</h3>
                  <p className="text-sm text-[#535862]">
                    Les températures recommandées pour les salles de classe sont entre 19°C et 24°C.
                    Ajustez vos seuils en fonction de votre établissement.
                  </p>
                </div>

                <div className="border-l-4 border-[#6941C6] pl-4">
                  <h3 className="font-semibold text-[#181d27] mb-1">✅ Abonnez-vous aux salles critiques</h3>
                  <p className="text-sm text-[#535862]">
                    Activez les notifications pour les salles sensibles (informatique, laboratoires)
                    afin d'être alerté immédiatement en cas de problème.
                  </p>
                </div>

                <div className="border-l-4 border-[#6941C6] pl-4">
                  <h3 className="font-semibold text-[#181d27] mb-1">✅ Utilisez les filtres intelligemment</h3>
                  <p className="text-sm text-[#535862]">
                    Le filtre "Alertes" est votre meilleur allié pour identifier rapidement
                    les salles nécessitant une attention immédiate.
                  </p>
                </div>

                <div className="border-l-4 border-[#6941C6] pl-4">
                  <h3 className="font-semibold text-[#181d27] mb-1">✅ Exportez l'historique régulièrement</h3>
                  <p className="text-sm text-[#535862]">
                    Téléchargez vos logs mensuellement pour garder une trace des événements
                    et analyser les tendances à long terme.
                  </p>
                </div>

                <div className="border-l-4 border-[#6941C6] pl-4">
                  <h3 className="font-semibold text-[#181d27] mb-1">✅ Formez votre équipe</h3>
                  <p className="text-sm text-[#535862]">
                    Partagez ce guide avec tous les utilisateurs de SensorHub pour garantir
                    une utilisation optimale de l'application.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-white border border-[#E9EAEB] rounded-full px-6 py-3">
                <span className="text-sm text-[#535862]">
                  Besoin d'aide supplémentaire ? Contactez le support à
                </span>
                <a href="mailto:support@sensorhub.app" className="text-sm font-medium text-[#6941C6] hover:underline">
                  support@sensorhub.app
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

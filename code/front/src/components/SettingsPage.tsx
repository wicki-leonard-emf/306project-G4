import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"

export function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)

  return (
    <div className="flex-1 overflow-auto bg-[#FAFAFA]">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-white border-b border-[#E9EAEB]">
          <div className="px-8 py-8">
            <h1 className="text-[30px] leading-[38px] font-semibold text-[#181d27] mb-1">
              Paramètres
            </h1>
            <p className="text-[#535862]">
              Gérez vos préférences et la configuration de l'application
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Section */}
            <div className="bg-white border border-[#E9EAEB] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#181d27] mb-6">
                Profil utilisateur
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" defaultValue="Olivia" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" defaultValue="Rhye" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="olivia.rhye@example.com" />
                </div>
                <div>
                  <Label htmlFor="role">Rôle</Label>
                  <Input id="role" defaultValue="Administrateur" disabled />
                </div>
                <div className="flex justify-end pt-4">
                  <Button>Enregistrer les modifications</Button>
                </div>
              </div>
            </div>

            {/* Temperature Settings */}
            <div className="bg-white border border-[#E9EAEB] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#181d27] mb-6">
                Paramètres de température
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minTemp">Température minimale par défaut (°C)</Label>
                    <Input id="minTemp" type="number" defaultValue="18" />
                  </div>
                  <div>
                    <Label htmlFor="maxTemp">Température maximale par défaut (°C)</Label>
                    <Input id="maxTemp" type="number" defaultValue="24" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="alertDelay">Délai d'alerte (minutes)</Label>
                  <Input id="alertDelay" type="number" defaultValue="15" />
                  <p className="text-xs text-[#717680] mt-1">
                    Durée pendant laquelle la température doit dépasser les seuils avant de déclencher une alerte
                  </p>
                </div>
                <div>
                  <Label htmlFor="refreshRate">Fréquence de rafraîchissement (secondes)</Label>
                  <Input id="refreshRate" type="number" defaultValue="30" />
                </div>
                <div className="flex justify-end pt-4">
                  <Button>Enregistrer les modifications</Button>
                </div>
              </div>
            </div>

            {/* Notifications Settings */}
            <div className="bg-white border border-[#E9EAEB] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#181d27] mb-6">
                Notifications
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#181d27]">Notifications par email</p>
                    <p className="text-sm text-[#717680]">
                      Recevoir des alertes de température par email
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#181d27]">Notifications push</p>
                    <p className="text-sm text-[#717680]">
                      Recevoir des notifications dans le navigateur
                    </p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#181d27]">Rafraîchissement automatique</p>
                    <p className="text-sm text-[#717680]">
                      Actualiser automatiquement les données de température
                    </p>
                  </div>
                  <Switch
                    checked={autoRefresh}
                    onCheckedChange={setAutoRefresh}
                  />
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="bg-white border border-[#E9EAEB] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#181d27] mb-6">
                Apparence
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#181d27]">Mode sombre</p>
                    <p className="text-sm text-[#717680]">
                      Activer le thème sombre de l'interface
                    </p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white border border-[#fecdca] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#B42318] mb-6">
                Zone de danger
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#181d27]">Réinitialiser tous les paramètres</p>
                    <p className="text-sm text-[#717680]">
                      Restaurer les paramètres par défaut de l'application
                    </p>
                  </div>
                  <Button variant="outline">Réinitialiser</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#181d27]">Supprimer toutes les données</p>
                    <p className="text-sm text-[#717680]">
                      Effacer toutes les données de température et historiques
                    </p>
                  </div>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">Supprimer</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

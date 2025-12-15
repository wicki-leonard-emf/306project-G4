import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface RoomThresholdModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roomName: string
  onSave: (thresholds: {
    minTemp: number
    maxTemp: number
    minHumidity: number
    maxHumidity: number
    alertDelay: number
  }) => void
}

export function RoomThresholdModal({
  open,
  onOpenChange,
  roomName,
  onSave,
}: RoomThresholdModalProps) {
  const [minTemp, setMinTemp] = useState("18")
  const [maxTemp, setMaxTemp] = useState("24")
  const [minHumidity, setMinHumidity] = useState("40")
  const [maxHumidity, setMaxHumidity] = useState("65")
  const [alertDelay, setAlertDelay] = useState("30")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSave({
      minTemp: parseFloat(minTemp),
      maxTemp: parseFloat(maxTemp),
      minHumidity: parseFloat(minHumidity),
      maxHumidity: parseFloat(maxHumidity),
      alertDelay: parseInt(alertDelay),
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gérer le seuil - Salle {roomName}</DialogTitle>
          <DialogDescription>
            Configurez les seuils de température spécifiques pour cette salle.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minTemp">Température minimale (°C)</Label>
                <Input
                  id="minTemp"
                  type="number"
                  step="0.5"
                  min="0"
                  max="30"
                  value={minTemp}
                  onChange={(e) => setMinTemp(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="maxTemp">Température maximale (°C)</Label>
                <Input
                  id="maxTemp"
                  type="number"
                  step="0.5"
                  min="10"
                  max="40"
                  value={maxTemp}
                  onChange={(e) => setMaxTemp(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="alertDelay">Délai d'alerte (minutes)</Label>
              <Input
                id="alertDelay"
                type="number"
                step="5"
                min="5"
                max="120"
                value={alertDelay}
                onChange={(e) => setAlertDelay(e.target.value)}
                required
              />
              <p className="text-xs text-[#717680] mt-1.5">
                Temps avant de déclencher une alerte si le seuil est dépassé
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minHumidity">Humidité minimale (%)</Label>
                <Input
                  id="minHumidity"
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  value={minHumidity}
                  onChange={(e) => setMinHumidity(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="maxHumidity">Humidité maximale (%)</Label>
                <Input
                  id="maxHumidity"
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  value={maxHumidity}
                  onChange={(e) => setMaxHumidity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-[#fef3f2] border border-[#fecdca] rounded-lg p-4">
                <div className="flex gap-3">
                  <svg
                    className="size-5 text-[#F04438] shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 6V10M10 14H10.01M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-[#B42318]">
                      Alerte haute (température / humidité)
                    </p>
                    <p className="text-xs text-[#912018] mt-1">
                      Notification si la température dépasse <span className="font-semibold">{maxTemp}°C</span>
                      ou si l'humidité dépasse <span className="font-semibold">{maxHumidity}%</span> pendant plus de
                      <span className="font-semibold"> {alertDelay} minutes</span>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#eff8ff] border border-[#b9e6fe] rounded-lg p-4">
                <div className="flex gap-3">
                  <svg
                    className="size-5 text-[#0ba5ec] shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 6V10M10 14H10.01M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-[#026aa2]">
                      Alerte basse (température / humidité)
                    </p>
                    <p className="text-xs text-[#065986] mt-1">
                      Notification si la température descend sous <span className="font-semibold">{minTemp}°C</span>
                      ou si l'humidité descend sous <span className="font-semibold">{minHumidity}%</span> pendant plus de
                      <span className="font-semibold"> {alertDelay} minutes</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f9f5ff] border border-[#e9d7fe] rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="size-5 text-[#7f56d9] shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 6V10L12.5 11.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-[#6941c6] mb-1">
                    Seuil personnalisé
                  </p>
                  <p className="text-xs text-[#535862]">
                    Ces paramètres s'appliquent uniquement à la salle{" "}
                    <span className="font-semibold">{roomName}</span> et
                    remplacent les seuils par défaut.
                  </p>
                </div>
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" variant="default">
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

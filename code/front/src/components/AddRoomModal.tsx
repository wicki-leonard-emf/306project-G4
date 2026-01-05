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
import { Select } from "./ui/select"

interface AddRoomModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddRoom: (room: {
    room: string
    temperature: number
    humidity: number
    category: string
  }) => void
}

export function AddRoomModal({ open, onOpenChange, onAddRoom }: AddRoomModalProps) {
  const [roomName, setRoomName] = useState("")
  const [temperature, setTemperature] = useState("20")
  const [humidity, setHumidity] = useState("50")
  const [category, setCategory] = useState("all")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!roomName.trim()) {
      return
    }

    onAddRoom({
      room: roomName,
      temperature: parseFloat(temperature),
      humidity: parseFloat(humidity),
      category,
    })

    // Reset form
    setRoomName("")
    setTemperature("20")
    setHumidity("50")
    setCategory("all")
    onOpenChange(false)
  }

  const handleCancel = () => {
    setRoomName("")
    setTemperature("20")
    setHumidity("50")
    setCategory("all")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle salle</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle salle de classe à surveiller dans le système.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-5">
            <div>
              <Label htmlFor="roomName">Nom de la salle *</Label>
              <Input
                id="roomName"
                type="text"
                placeholder="Ex: A35, B12, C44..."
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="temperature">Température initiale (°C) *</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                min="-10"
                max="50"
                placeholder="20"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                required
              />
              <p className="text-xs text-[#717680] mt-1.5">
                Température actuelle de la salle de classe
              </p>
            </div>

            <div>
              <Label htmlFor="humidity">Humidité initiale (%) *</Label>
              <Input
                id="humidity"
                type="number"
                step="0.1"
                min="0"
                max="100"
                placeholder="50"
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
                required
              />
              <p className="text-xs text-[#717680] mt-1.5">
                Taux d'humidité relatif actuel de la salle
              </p>
            </div>

            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">Toutes les salles</option>
                <option value="subscriptions">Abonnements</option>
                <option value="priority">Prioritaire</option>
                <option value="standard">Standard</option>
              </Select>
              <p className="text-xs text-[#717680] mt-1.5">
                Organisez vos salles par catégorie
              </p>
            </div>

            <div className="bg-purple-light border border-purple-border rounded-lg p-4">
              <div className="flex gap-3">
                <svg
                  className="size-5 text-primary shrink-0 mt-0.5"
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
                  <p className="text-sm font-semibold text-primary">
                    Surveillance automatique
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Une fois ajoutée, la salle sera automatiquement surveillée
                    et vous recevrez des alertes selon les seuils configurés.
                  </p>
                </div>
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Annuler
            </Button>
            <Button type="submit" variant="default">
              Ajouter la salle
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

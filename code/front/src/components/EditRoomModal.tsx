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
import { Textarea } from "./ui/textarea"

interface EditRoomModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  room: {
    id: string
    name: string
    description?: string
  }
  onUpdateRoom: (roomId: string, updates: { name: string; description: string }) => Promise<void>
}

export function EditRoomModal({ open, onOpenChange, room, onUpdateRoom }: EditRoomModalProps) {
  const [roomName, setRoomName] = useState(room.name)
  const [description, setDescription] = useState(room.description || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Reset form when room changes or modal opens
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setRoomName(room.name)
      setDescription(room.description || "")
      setError("")
    }
    onOpenChange(newOpen)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!roomName.trim()) {
      setError("Le nom de la salle est requis")
      return
    }

    setIsSubmitting(true)

    try {
      await onUpdateRoom(room.id, {
        name: roomName.trim(),
        description: description.trim(),
      })
      onOpenChange(false)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Une erreur est survenue lors de la mise à jour")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setRoomName(room.name)
    setDescription(room.description || "")
    setError("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier la salle</DialogTitle>
          <DialogDescription>
            Modifiez le nom et la description de la salle de classe.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <svg
                    className="size-5 text-red-600 shrink-0 mt-0.5"
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
                      d="M10 6V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 14H10.01"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-red-800">Erreur</p>
                    <p className="text-xs text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="editRoomName">Nom de la salle *</Label>
              <Input
                id="editRoomName"
                type="text"
                placeholder="Ex: A35, B12, C44..."
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="editDescription">Description</Label>
              <Textarea
                id="editDescription"
                placeholder="Description optionnelle de la salle..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSubmitting}
                rows={4}
              />
              <p className="text-xs text-[#717680] mt-1.5">
                Ajoutez des détails supplémentaires sur cette salle (optionnel)
              </p>
            </div>

            <div className="bg-[#f9f5ff] border border-[#e9d7fe] rounded-lg p-4">
              <div className="flex gap-3">
                <svg
                  className="size-5 text-[#7f56d9] shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9 5H7C5.89543 5 5 5.89543 5 7V15C5 16.1046 5.89543 17 7 17H13C14.1046 17 15 16.1046 15 15V12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 15H10L16.5 8.5C17.3284 7.67157 17.3284 6.32843 16.5 5.5C15.6716 4.67157 14.3284 4.67157 13.5 5.5L7 12V13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-[#6941c6]">
                    Modification en cours
                  </p>
                  <p className="text-xs text-[#535862] mt-1">
                    Les modifications seront appliquées immédiatement après la sauvegarde.
                  </p>
                </div>
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

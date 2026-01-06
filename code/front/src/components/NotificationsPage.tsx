import { useState, useEffect } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import svgPaths from "../imports/svg-28zgc1ww4p"
import { toast } from "sonner"

interface Notification {
  id: string
  type: "warning" | "error" | "info" | "success"
  title: string
  details: string
  category: string
  timestamp: string
  read: boolean
  roomId: string
  roomName: string
}

interface Alert {
  id: string
  roomId: string
  sensorType: string
  thresholdType: string
  value: number
  threshold: number
  sentAt: string
  recipientCount: number
  room: {
    id: string
    name: string
  }
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "")

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "")

// Fonction pour formater le timestamp
const formatTimestamp = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 1) return "À l'instant"
  if (diffMinutes < 60) return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`
  if (diffHours < 24) return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`
  if (diffDays === 1) return "Hier"
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
}

// Fonction pour convertir une alerte API en notification UI
const convertAlertToNotification = (alert: Alert): Notification => {
  const { sensorType, thresholdType, value, threshold } = alert
  
  // Déterminer le type et le titre
  let type: Notification["type"] = "warning"
  let title = ""
  let category = "Alerte"
  
  const isCritical = Math.abs(value - threshold) > threshold * 0.2 // 20% au-delà du seuil
  
  if (isCritical) {
    type = "error"
    category = "Critique"
  }
  
  if (sensorType === "TEMPERATURE") {
    if (thresholdType === "max") {
      title = isCritical ? "Température critique" : "Alerte de température"
    } else {
      title = "Température basse"
    }
  } else if (sensorType === "HUMIDITY") {
    if (thresholdType === "max") {
      title = "Humidité élevée"
    } else {
      title = "Humidité basse"
    }
  }
  
  // Détails avec la valeur et le nom de la salle
  const unit = sensorType === "TEMPERATURE" ? "°C" : "%"
  const details = `${alert.room.name} • ${Math.round(value)}${unit}`
  
  return {
    id: alert.id,
    type,
    title,
    details,
    category,
    timestamp: formatTimestamp(alert.sentAt),
    read: false, // Par défaut, les alertes sont considérées comme non lues
    roomId: alert.roomId,
    roomName: alert.room.name
  }
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/alerts/me`, {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`)
      }

      const alerts: Alert[] = await response.json()
      const convertedNotifications = alerts.map(convertAlertToNotification)
      setNotifications(convertedNotifications)
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error)
      toast.error('Erreur', {
        description: 'Impossible de charger les notifications'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
    toast.success('Toutes les notifications ont été marquées comme lues')
  }

  const handleClearAll = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/alerts`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`)
      }

      setNotifications([])
      toast.success('Toutes les notifications ont été supprimées')
    } catch (error) {
      console.error('Erreur lors de la suppression des notifications:', error)
      toast.error('Erreur', {
        description: 'Impossible de supprimer les notifications'
      })
    }
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const getBadgeColor = (type: Notification["type"]) => {
    switch (type) {
      case "error":
        return "bg-destructive"
      case "warning":
        return "bg-warning"
      case "success":
        return "bg-success"
      case "info":
      default:
        return "bg-primary"
    }
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-[30px] leading-[38px] font-semibold text-foreground tracking-[0.4px]">
                    Notifications
                  </h1>
                  {unreadCount > 0 && (
                    <div className="bg-muted rounded-full px-2.5 py-1 h-7 flex items-center justify-center min-w-[28px]">
                      <span className="text-sm font-medium text-foreground">{unreadCount}</span>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground tracking-[-0.3125px]">
                  Consultez toutes vos alertes et notifications système
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="h-10" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
                  <svg className="size-5" fill="none" viewBox="0 0 20 20">
                    <path
                      d={svgPaths.p34ec0780}
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.67"
                    />
                  </svg>
                  Marquer tout comme lu
                </Button>
                <Button variant="outline" className="h-10" onClick={handleClearAll} disabled={notifications.length === 0}>
                  <svg className="size-5" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M2.5 5H4.16667H17.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d={svgPaths.p3dd27600}
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Effacer tout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-8 py-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-muted-foreground">Chargement des notifications...</div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <svg className="size-16 text-gray-300 mb-4 mx-auto" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-muted-foreground text-lg mb-2">Aucune notification</p>
                <p className="text-muted-foreground text-sm">
                  Vous n'avez pas encore de notifications
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-[10px] overflow-hidden">
              {notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`flex items-center gap-3 px-[22px] py-[22px] ${index !== 0 ? "border-t border-border" : ""
                    }`}
                >
                  {/* Left: Title and details */}
                  <div className="flex flex-col gap-1 w-[271px]">
                    <h3 className="font-semibold text-[#181d27] tracking-[-0.3125px]">
                      {notification.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-4">
                      {notification.details}
                    </p>
                  </div>

                  {/* Middle: Category and timestamp */}
                  <div className="flex flex-col gap-1 w-[247px]">
                    <div className="flex items-center gap-2">
                      <div className={`size-2 rounded-full ${getBadgeColor(notification.type)}`} />
                      <span className="font-semibold tracking-[-0.3125px]">
                        {notification.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground/60 leading-4">
                      {notification.timestamp}
                    </p>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-3 ml-auto">
                    {!notification.read && (
                      <>
                        <button 
                          className="text-xs text-muted-foreground hover:text-foreground leading-4"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          Marquer comme lu
                        </button>
                        <span className="text-xs text-border">•</span>
                      </>
                    )}
                    <button className="text-xs text-muted-foreground hover:text-foreground leading-4">
                      Voir la salle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

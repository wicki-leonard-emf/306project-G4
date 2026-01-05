import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import svgPaths from "../imports/svg-28zgc1ww4p"

interface Notification {
  id: string
  type: "warning" | "error" | "info" | "success"
  title: string
  details: string
  category: string
  timestamp: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "error",
    title: "Température critique",
    details: "Salle A35 • 32°C",
    category: "Alerte",
    timestamp: "Il y a 5 minutes",
    read: false
  },
  {
    id: "2",
    type: "warning",
    title: "Alerte de température",
    details: "Salle C36 • 26°C",
    category: "Alerte",
    timestamp: "Il y a 15 minutes",
    read: false
  },
  {
    id: "3",
    type: "info",
    title: "Système mis à jour",
    details: "Salle A32 • ajouté à la liste",
    category: "mise à jour",
    timestamp: "Il y a 1 heure",
    read: false
  },
  {
    id: "4",
    type: "success",
    title: "Température normalisée",
    details: "Salle A44 • 22°C",
    category: "Succès",
    timestamp: "Il y a 2 heures",
    read: true
  },
  {
    id: "5",
    type: "warning",
    title: "Température basse",
    details: "Salle A37 • 15°C",
    category: "Alerte",
    timestamp: "Il y a 3 heures",
    read: true
  },
  {
    id: "6",
    type: "info",
    title: "Nouveau seuil configuré",
    details: "Salle A42 • paramètres mis à jour",
    category: "mise à jour",
    timestamp: "Il y a 5 heures",
    read: true
  },
  {
    id: "7",
    type: "error",
    title: "Capteur déconnecté",
    details: "Salle A45 • hors ligne",
    category: "Alerte",
    timestamp: "Hier",
    read: true
  },
  {
    id: "8",
    type: "success",
    title: "Capteur reconnecté",
    details: "Salle A45 • en ligne",
    category: "Succès",
    timestamp: "Hier",
    read: true
  },
  {
    id: "9",
    type: "error",
    title: "Température critique",
    details: "Salle A35 • 32°C",
    category: "Alerte",
    timestamp: "Il y a 2 jours",
    read: true
  },
  {
    id: "10",
    type: "info",
    title: "Système synchronisé",
    details: "Tous les capteurs • synchronisation réussie",
    category: "mise à jour",
    timestamp: "Il y a 2 jours",
    read: true
  }
]

export function NotificationsPage() {
  const unreadCount = mockNotifications.filter(n => !n.read).length

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
                <Button variant="outline" className="h-10">
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
                <Button variant="outline" className="h-10">
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
          <div className="bg-card border border-border rounded-[10px] overflow-hidden">
            {mockNotifications.map((notification, index) => (
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
                      <button className="text-xs text-muted-foreground hover:text-foreground leading-4">
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
        </div>
      </div>
    </div>
  )
}

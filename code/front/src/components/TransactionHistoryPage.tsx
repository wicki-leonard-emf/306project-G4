import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface SystemLog {
  id: string
  time: string
  status: "success" | "warning" | "error" | "info"
  host: string
  request: string
  messages: string
}

const mockLogs: SystemLog[] = [
  {
    id: "1",
    time: "2024-12-15 14:32:18",
    status: "error",
    host: "Salle A35",
    request: "TEMPERATURE_ALERT",
    messages: "Température critique détectée • 32°C"
  },
  {
    id: "2",
    time: "2024-12-15 14:15:42",
    status: "success",
    host: "Salle C36",
    request: "THRESHOLD_UPDATE",
    messages: "Seuils mis à jour par Olivia Rhye"
  },
  {
    id: "3",
    time: "2024-12-15 13:58:03",
    status: "success",
    host: "Salle A44",
    request: "SENSOR_RECONNECTED",
    messages: "Capteur reconnecté avec succès"
  },
  {
    id: "4",
    time: "2024-12-15 13:46:21",
    status: "warning",
    host: "Salle A44",
    request: "SENSOR_DISCONNECTED",
    messages: "Perte de connexion avec le capteur"
  },
  {
    id: "5",
    time: "2024-12-15 12:30:15",
    status: "success",
    host: "Salle B12",
    request: "ROOM_ADDED",
    messages: "Nouvelle salle ajoutée par Phoenix Baker"
  },
  {
    id: "6",
    time: "2024-12-15 12:00:00",
    status: "success",
    host: "Système",
    request: "SYSTEM_SYNC",
    messages: "Synchronisation de 15 capteurs en 2.3s"
  },
  {
    id: "7",
    time: "2024-12-15 11:45:33",
    status: "info",
    host: "Salle A37",
    request: "SUBSCRIPTION_CHANGED",
    messages: "Abonnement modifié par Olivia Rhye"
  },
  {
    id: "8",
    time: "2024-12-15 11:20:08",
    status: "success",
    host: "Salle C36",
    request: "TEMPERATURE_NORMALIZED",
    messages: "Température revenue à 22°C"
  },
  {
    id: "9",
    time: "2024-12-15 10:00:00",
    status: "success",
    host: "Système",
    request: "DATABASE_BACKUP",
    messages: "Sauvegarde de 245 MB effectuée en 5.2s"
  },
  {
    id: "10",
    time: "2024-12-15 09:15:22",
    status: "success",
    host: "Système",
    request: "USER_LOGIN",
    messages: "Connexion de Olivia Rhye depuis 192.168.1.45"
  },
  {
    id: "11",
    time: "2024-12-15 08:45:12",
    status: "warning",
    host: "Salle A42",
    request: "TEMPERATURE_WARNING",
    messages: "Température élevée détectée • 27°C"
  },
  {
    id: "12",
    time: "2024-12-15 06:00:00",
    status: "info",
    host: "Système",
    request: "SYSTEM_UPDATE",
    messages: "Version 2.1.0 installée avec succès"
  },
  {
    id: "13",
    time: "2024-12-14 23:30:45",
    status: "success",
    host: "Salle A35",
    request: "THRESHOLD_APPLY",
    messages: "Nouveaux seuils appliqués"
  },
  {
    id: "14",
    time: "2024-12-14 22:15:18",
    status: "error",
    host: "Salle B08",
    request: "SENSOR_ERROR",
    messages: "Erreur de lecture du capteur"
  },
  {
    id: "15",
    time: "2024-12-14 21:00:00",
    status: "info",
    host: "Système",
    request: "SCHEDULED_REPORT",
    messages: "Rapport quotidien généré automatiquement"
  }
]

export function TransactionHistoryPage() {
  const getStatusColor = (status: SystemLog["status"]) => {
    switch (status) {
      case "success":
        return "bg-[#039855]"
      case "warning":
        return "bg-[#F79009]"
      case "error":
        return "bg-[#D92D20]"
      case "info":
      default:
        return "bg-[#6941C6]"
    }
  }

  const getStatusLabel = (status: SystemLog["status"]) => {
    switch (status) {
      case "success":
        return "Succès"
      case "warning":
        return "Avertissement"
      case "error":
        return "Erreur"
      case "info":
      default:
        return "Info"
    }
  }

  return (
    <div className="flex-1 overflow-auto bg-[#FAFAFA]">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-white border-b border-[#E9EAEB]">
          <div className="px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="text-[30px] leading-[38px] font-semibold text-[#181d27] tracking-[0.4px]">
                  Historique des transactions
                </h1>
                <p className="text-[#535862] tracking-[-0.3125px]">
                  Consultez tous les logs et événements système
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="h-10">
                  <svg className="size-5" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M14.1667 6.66667L10 2.5M10 2.5L5.83333 6.66667M10 2.5V12.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.67"
                    />
                  </svg>
                  Exporter
                </Button>
                <Button variant="outline" className="h-10">
                  <svg className="size-5" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M8.33333 5H4.16667C3.72464 5 3.30072 5.17559 2.98816 5.48816C2.67559 5.80072 2.5 6.22464 2.5 6.66667V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H13.3333C13.7754 17.5 14.1993 17.3244 14.5118 17.0118C14.8244 16.6993 15 16.2754 15 15.8333V11.6667M11.6667 2.5H17.5M17.5 2.5V8.33333M17.5 2.5L8.33333 11.6667"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.67"
                    />
                  </svg>
                  Filtrer
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="mt-6">
              <div className="relative max-w-md">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                    stroke="#717680"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.66667"
                  />
                </svg>
                <Input
                  type="text"
                  placeholder="Rechercher dans les logs..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 px-8 py-8 overflow-auto">
          <div className="bg-white border border-[#E9EAEB] rounded-[10px] overflow-hidden">
            <div className="overflow-auto max-h-[calc(100vh-320px)]">
              <table className="w-full">
                {/* Sticky Header */}
                <thead className="bg-[#FAFAFA] sticky top-0 z-10">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-sm text-[#120f1a] w-[159px]">
                      Time
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-sm text-[#120f1a] w-[147px]">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-sm text-[#120f1a] w-[215px]">
                      Host
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-sm text-[#120f1a] w-[183px]">
                      Request
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-sm text-[#120f1a] w-[171px]">
                      Messages
                    </th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {mockLogs.map((log, index) => (
                    <tr
                      key={log.id}
                      className={`${
                        index !== 0 ? "border-t border-[#E9EAEB]" : ""
                      } hover:bg-[#FAFAFA] transition-colors`}
                    >
                      <td className="px-4 py-4 text-xs text-[#717680]">
                        {log.time}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`size-2 rounded-full ${getStatusColor(log.status)}`} />
                          <span className="text-sm text-[#181d27]">
                            {getStatusLabel(log.status)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#181d27]">
                        {log.host}
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs font-mono text-[#6941C6] bg-[#F9F5FF] px-2 py-1 rounded">
                          {log.request}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#535862]">
                        {log.messages}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { RoomThresholdModal } from "./RoomThresholdModal"

interface RoomDetailPageProps {
  room: {
    id: string
    room: string
    temperature: number
    humidity: number
    trend: "up" | "down"
    percentage: number
    period: string
    chartData: number[]
    category?: string
  }
  isSubscribed: boolean
  onToggleSubscription: (roomId: string) => void
  onBack: () => void
}

export function RoomDetailPage({
  room,
  isSubscribed,
  onToggleSubscription,
  onBack,
}: RoomDetailPageProps) {
  const [thresholdModalOpen, setThresholdModalOpen] = useState(false)
  const isHot = room.trend === "up"
  const color = isHot ? "#F04438" : "#7F56D9"

  const handleSaveThreshold = (thresholds: {
    minTemp: number
    maxTemp: number
    minHumidity: number
    maxHumidity: number
    alertDelay: number
  }) => {
    console.log(`Seuils sauvegardés pour la salle ${room.room}:`, thresholds)
  }

  return (
    <div className="flex-1 overflow-auto bg-background text-foreground">
      <div className="flex flex-col h-full">
        {/* Header with Back Button */}
        <div className="bg-card border-b border-border">
          <div className="px-8 py-6">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <svg className="size-5" fill="none" viewBox="0 0 20 20">
                  <path
                    d="M15.8334 10H4.16675M4.16675 10L10.0001 15.8333M4.16675 10L10.0001 4.16667"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.67"
                  />
                </svg>
                <span className="text-sm font-semibold">Retour</span>
              </Button>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-[30px] leading-[38px] font-semibold text-foreground">
                  Salle {room.room}
                </h1>
                {isSubscribed && (
                  <Badge variant="secondary" className="px-3 py-1.5">
                    Abonné
                  </Badge>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setThresholdModalOpen(true)}
                >
                  <svg className="size-5 text-foreground" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M11.6667 3.33333C11.6667 2.8731 11.2936 2.5 10.8333 2.5C10.3731 2.5 10 2.8731 10 3.33333C10 3.79357 10.3731 4.16667 10.8333 4.16667C11.2936 4.16667 11.6667 3.79357 11.6667 3.33333Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M11.6667 12.0833V3.33333C11.6667 2.8731 11.2936 2.5 10.8333 2.5H10C9.53976 2.5 9.16667 2.8731 9.16667 3.33333V12.0833C8.12404 12.5631 7.5 13.6378 7.5 14.8333C7.5 16.5742 8.92586 17.9167 10.8333 17.9167C12.7408 17.9167 14.1667 16.5742 14.1667 14.8333C14.1667 13.6378 13.5426 12.5631 12.5 12.0833H11.6667Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="text-sm font-semibold">Gérer le seuil</span>
                </Button>
                <Button
                  variant={isSubscribed ? "outline" : "default"}
                  onClick={() => onToggleSubscription(room.id)}
                >
                  {isSubscribed ? (
                    <>
                      <svg className="size-5" fill="none" viewBox="0 0 20 20">
                        <path
                          d="M7.5 10L9.16667 11.6667L12.5 8.33333M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <span className="text-sm font-semibold">Abonné</span>
                    </>
                  ) : (
                    <>
                      <svg className="size-5" fill="none" viewBox="0 0 20 20">
                        <path
                          d="M10 6.66667V10M10 13.3333H10.0083M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <span className="text-sm font-semibold">S'abonner</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Current Temperature Section */}
            <div className="bg-gradient-to-br from-[#f9f5ff] to-white border border-[#e9d7fe] rounded-xl p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#6941c6] mb-3">
                    Température actuelle
                  </p>
                  <div className="flex items-end gap-4">
                    <span className="text-6xl font-normal text-[#181d27]">
                      {room.temperature}°
                    </span>
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="size-6" fill="none" viewBox="0 0 20 20">
                        {room.trend === "down" ? (
                          <path
                            d="M10 15.8333V4.16667M10 4.16667L4.16667 10M10 4.16667L15.8333 10"
                            stroke={color}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.66667"
                          />
                        ) : (
                          <path
                            d="M10 4.16667V15.8333M10 15.8333L15.8333 10M10 15.8333L4.16667 10"
                            stroke={color}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.66667"
                          />
                        )}
                      </svg>
                      <span className="text-base font-semibold" style={{ color }}>
                        {room.percentage}%
                      </span>
                      <span className="text-base text-[#535862]">
                        {room.period}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-[#e9d7fe] shadow-sm">
                  <svg className="size-5 text-[#1849a9]" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 18c2.7614 0 5-2.2386 5-5 0-2.582-2.3651-6.0145-4.0678-8.0363-.5157-.6358-1.349-.6358-1.8647 0C7.3651 6.9855 5 10.418 5 13c0 2.7614 2.2386 5 5 5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <p className="text-xs text-[#535862] leading-tight">Humidité</p>
                    <p className="text-lg font-semibold text-[#1849a9]">{room.humidity}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white border border-[#E9EAEB] rounded-xl p-6">
                <p className="text-sm text-[#717680] mb-2">Température min</p>
                <p className="text-3xl font-semibold text-[#181d27]">11°C</p>
                <p className="text-sm text-[#535862] mt-2">Dernières 24h</p>
              </div>
              <div className="bg-white border border-[#E9EAEB] rounded-xl p-6">
                <p className="text-sm text-[#717680] mb-2">Température max</p>
                <p className="text-3xl font-semibold text-[#181d27]">26°C</p>
                <p className="text-sm text-[#535862] mt-2">Dernières 24h</p>
              </div>
              <div className="bg-white border border-[#E9EAEB] rounded-xl p-6">
                <p className="text-sm text-[#717680] mb-2">Humidité</p>
                <p className="text-3xl font-semibold text-[#181d27]">{room.humidity}%</p>
                <p className="text-sm text-[#535862] mt-2">Relatif actuel</p>
              </div>
              <div className="bg-white border border-[#E9EAEB] rounded-xl p-6">
                <p className="text-sm text-[#717680] mb-2">Température moy</p>
                <p className="text-3xl font-semibold text-[#181d27]">
                  {room.temperature}°C
                </p>
                <p className="text-sm text-[#535862] mt-2">Dernières 24h</p>
              </div>
            </div>

            {/* Charts Section - Under Construction */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-[#181d27]">
                Graphiques de température
              </h2>

              {/* Chart 1 - Main Temperature Chart */}
              <div className="bg-white border border-[#E9EAEB] rounded-xl p-10">
                <div className="flex flex-col items-center justify-center h-80">
                  <svg
                    className="size-20 text-[#d5d7da] mb-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 13.125C3 12.504 3.504 12 4.125 12H6.375C6.996 12 7.5 12.504 7.5 13.125V19.875C7.5 20.496 6.996 21 6.375 21H4.125C3.504 21 3 20.496 3 19.875V13.125Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5 5.625C10.5 5.004 11.004 4.5 11.625 4.5H13.875C14.496 4.5 15 5.004 15 5.625V19.875C15 20.496 14.496 21 13.875 21H11.625C11.004 21 10.5 20.496 10.5 19.875V5.625Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 9.375C18 8.754 18.504 8.25 19.125 8.25H21.375C21.996 8.25 22.5 8.754 22.5 9.375V19.875C22.5 20.496 21.996 21 21.375 21H19.125C18.504 21 18 20.496 18 19.875V9.375Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-lg font-semibold text-[#535862] mb-2">
                    Graphique en construction
                  </p>
                  <p className="text-sm text-[#717680] text-center max-w-lg">
                    Les données de température seront bientôt affichées ici avec
                    des graphiques détaillés sur 24h, 7 jours et 30 jours.
                  </p>
                </div>
              </div>

              {/* Chart 2 - Trends Analysis */}
              <div className="bg-white border border-[#E9EAEB] rounded-xl p-10">
                <div className="flex flex-col items-center justify-center h-64">
                  <svg
                    className="size-20 text-[#d5d7da] mb-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 3V21M21 21H3M7 13L11 9L15 13L21 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-lg font-semibold text-[#535862] mb-2">
                    Analyse des tendances
                  </p>
                  <p className="text-sm text-[#717680] text-center max-w-lg">
                    Évolution et prédictions à venir
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RoomThresholdModal
        open={thresholdModalOpen}
        onOpenChange={setThresholdModalOpen}
        roomName={room.room}
        onSave={handleSaveThreshold}
      />
    </div>
  )
}

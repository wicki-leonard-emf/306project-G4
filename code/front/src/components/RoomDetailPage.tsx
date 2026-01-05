import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { RoomThresholdModal } from "./RoomThresholdModal"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "./ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts"

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
  const [historicalData, setHistoricalData] = useState<Array<{ time: string, temperature: number, humidity: number }>>([])
  const isHot = room.trend === "up"
  const color = isHot ? "#F04438" : "#7F56D9"

  // Generate historical data from chartData
  useEffect(() => {
    const now = new Date()
    const data = room.chartData.map((value, index) => {
      const time = new Date(now.getTime() - (room.chartData.length - index - 1) * 60000) // 1 minute intervals
      return {
        time: time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        temperature: Math.round(value * 40 * 10) / 10, // Convert to temperature
        humidity: room.humidity + (Math.random() - 0.5) * 10 // Simulate humidity variation
      }
    })
    setHistoricalData(data)
  }, [room.chartData, room.humidity])

  const chartConfig = {
    temperature: {
      label: "Température (°C)",
      color: color,
    },
    humidity: {
      label: "Humidité (%)",
      color: "#1849a9",
    },
  }

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
              <div className="bg-white border border-[#E9EAEB] rounded-xl p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[#181d27] mb-1">
                    Évolution de la température
                  </h3>
                  <p className="text-sm text-[#717680]">
                    Données en temps réel sur les dernières minutes
                  </p>
                </div>
                <ChartContainer config={chartConfig} className="h-80 w-full">
                  <AreaChart data={historicalData}>
                    <defs>
                      <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="time"
                      className="text-xs"
                      tick={{ fill: '#717680' }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: '#717680' }}
                      label={{ value: '°C', angle: -90, position: 'insideLeft', style: { fill: '#717680' } }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="temperature"
                      stroke={color}
                      strokeWidth={2}
                      fill="url(#colorTemp)"
                      animationDuration={300}
                    />
                  </AreaChart>
                </ChartContainer>
              </div>

              {/* Chart 2 - Humidity Analysis */}
              <div className="bg-white border border-[#E9EAEB] rounded-xl p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[#181d27] mb-1">
                    Température et Humidité
                  </h3>
                  <p className="text-sm text-[#717680]">
                    Comparaison des deux métriques
                  </p>
                </div>
                <ChartContainer config={chartConfig} className="h-64 w-full">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="time"
                      className="text-xs"
                      tick={{ fill: '#717680' }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: '#717680' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke={color}
                      strokeWidth={2}
                      dot={false}
                      animationDuration={300}
                    />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke="#1849a9"
                      strokeWidth={2}
                      dot={false}
                      animationDuration={300}
                    />
                  </LineChart>
                </ChartContainer>
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

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { RoomThresholdModal } from "./RoomThresholdModal"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
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

type TimePeriod = '4h' | '1d' | '1w' | '1m'

export function RoomDetailPage({
  room,
  isSubscribed,
  onToggleSubscription,
  onBack,
}: RoomDetailPageProps) {
  const [thresholdModalOpen, setThresholdModalOpen] = useState(false)
  const [historicalData, setHistoricalData] = useState<Array<{ time: string, temperature: number, humidity: number }>>([])
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('4h')
  const isHot = room.trend === "up"
  // Utiliser des couleurs réelles pour Recharts (pas de variables CSS)
  const color = isHot ? "#ef4444" : "#a855f7" // red-500 et purple-500

  // Generate historical data based on selected period
  useEffect(() => {
    const now = new Date()
    let dataPoints: number
    let intervalMs: number
    let timeFormat: (date: Date) => string

    switch (selectedPeriod) {
      case '4h':
        dataPoints = 48 // 5 min intervals
        intervalMs = 5 * 60 * 1000
        timeFormat = (date) => date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        break
      case '1d':
        dataPoints = 48 // 30 min intervals
        intervalMs = 30 * 60 * 1000
        timeFormat = (date) => date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        break
      case '1w':
        dataPoints = 56 // 3 hour intervals
        intervalMs = 3 * 60 * 60 * 1000
        timeFormat = (date) => date.toLocaleDateString('fr-FR', { weekday: 'short', hour: '2-digit' })
        break
      case '1m':
        dataPoints = 60 // 12 hour intervals
        intervalMs = 12 * 60 * 60 * 1000
        timeFormat = (date) => date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
        break
    }

    const data = Array.from({ length: dataPoints }, (_, index) => {
      const time = new Date(now.getTime() - (dataPoints - index - 1) * intervalMs)
      // Use current temperature as base and add variation
      const baseTemp = room.temperature
      const variation = (Math.random() - 0.5) * 4 // ±2°C variation
      const trendEffect = room.trend === 'up' ? (index / dataPoints) * 2 : -(index / dataPoints) * 2

      return {
        time: timeFormat(time),
        temperature: Math.round((baseTemp + variation + trendEffect) * 10) / 10,
        humidity: Math.round((room.humidity + (Math.random() - 0.5) * 15) * 10) / 10
      }
    })

    setHistoricalData(data)
  }, [room.temperature, room.humidity, room.trend, selectedPeriod])

  const chartConfig = {
    temperature: {
      label: "Température (°C)",
      color: color,
    },
    humidity: {
      label: "Humidité (%)",
      color: "#3b82f6", // blue-500
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
            <div className="bg-gradient-to-br from-purple-light to-background border border-purple-border rounded-xl p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary mb-3">
                    Température actuelle
                  </p>
                  <div className="flex items-end gap-4">
                    <span className="text-6xl font-normal text-foreground">
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
                      <span className="text-base text-muted-foreground">
                        {room.period}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg border border-purple-border shadow-sm">
                  <svg className="size-5 text-blue-primary" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 18c2.7614 0 5-2.2386 5-5 0-2.582-2.3651-6.0145-4.0678-8.0363-.5157-.6358-1.349-.6358-1.8647 0C7.3651 6.9855 5 10.418 5 13c0 2.7614 2.2386 5 5 5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <p className="text-xs text-muted-foreground leading-tight">Humidité</p>
                    <p className="text-lg font-semibold text-blue-primary">{room.humidity}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-2">Température min</p>
                <p className="text-3xl font-semibold text-foreground">11°C</p>
                <p className="text-sm text-muted-foreground mt-2">Dernières 24h</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-2">Température max</p>
                <p className="text-3xl font-semibold text-foreground">26°C</p>
                <p className="text-sm text-muted-foreground mt-2">Dernières 24h</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-2">Humidité</p>
                <p className="text-3xl font-semibold text-foreground">{room.humidity}%</p>
                <p className="text-sm text-muted-foreground mt-2">Relatif actuel</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-2">Température moy</p>
                <p className="text-3xl font-semibold text-foreground">
                  {room.temperature}°C
                </p>
                <p className="text-sm text-muted-foreground mt-2">Dernières 24h</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Graphiques de température
                </h2>

                {/* Period Selection Buttons */}
                <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
                  <button
                    onClick={() => setSelectedPeriod('4h')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedPeriod === '4h'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                      }`}
                  >
                    4 heures
                  </button>
                  <button
                    onClick={() => setSelectedPeriod('1d')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedPeriod === '1d'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                      }`}
                  >
                    1 jour
                  </button>
                  <button
                    onClick={() => setSelectedPeriod('1w')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedPeriod === '1w'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                      }`}
                  >
                    1 semaine
                  </button>
                  <button
                    onClick={() => setSelectedPeriod('1m')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedPeriod === '1m'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                      }`}
                  >
                    1 mois
                  </button>
                </div>
              </div>

              {/* Chart 1 - Main Temperature Chart */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Évolution de la température
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedPeriod === '4h' && 'Données des 4 dernières heures'}
                    {selectedPeriod === '1d' && 'Données des dernières 24 heures'}
                    {selectedPeriod === '1w' && 'Données de la dernière semaine'}
                    {selectedPeriod === '1m' && 'Données du dernier mois'}
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
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      label={{ value: '°C', angle: -90, position: 'insideLeft', style: { fill: 'hsl(var(--muted-foreground))' } }}
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
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Température et Humidité
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Comparaison des deux métriques
                  </p>
                </div>
                <ChartContainer config={chartConfig} className="h-64 w-full">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="time"
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke={color}
                      strokeWidth={2}
                      dot={false}
                      animationDuration={300}
                      name="Température (°C)"
                    />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                      animationDuration={300}
                      name="Humidité (%)"
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

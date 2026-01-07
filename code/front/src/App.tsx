import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Sidebar } from "./components/Sidebar"
import { SidebarProvider } from "./components/ui/sidebar"
import { RoomCard } from "./components/RoomCard"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { AddRoomModal } from "./components/AddRoomModal"
import { EditRoomModal } from "./components/EditRoomModal"
import { ThresholdModal } from "./components/ThresholdModal"
import { RoomDetailPage } from "./components/RoomDetailPage"
import { SettingsPage } from "./components/SettingsPage"
import { UsersPage } from "./components/UsersPage"
import { DocumentationPage } from "./components/DocumentationPage"
import svgPaths from "./imports/svg-734m2ckqag"
import { fetchWithAuth } from "./lib/fetchWithAuth"

interface Room {
  id: string
  room: string
  temperature: number
  humidity: number
  trend: "up" | "down"
  percentage: number
  period: string
  chartData: number[]
  category?: string
  description?: string
}

interface ApiRoom {
  id: string
  name: string
  description?: string
  currentTemp?: number
  currentHumidity?: number
  lastUpdate?: string
}

const generateChartData = (trend: "up" | "down") => {
  const data: number[] = []
  let current = Math.random() * 0.3 + 0.3

  for (let i = 0; i < 20; i++) {
    data.push(current)
    const change = (Math.random() - 0.5) * 0.15
    current = Math.max(0.1, Math.min(0.9, current + change))

    // Bias towards trend direction
    if (trend === "up" && i > 10) {
      current = Math.min(0.9, current + 0.02)
    } else if (trend === "down" && i > 10) {
      current = Math.max(0.1, current - 0.02)
    }
  }

  return data
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const formatLastUpdate = (iso?: string) => {
  if (!iso) return "Mise à jour inconnue"

  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return "Mise à jour inconnue"

  const diffMs = Date.now() - date.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 1) return "Il y a quelques secondes"
  if (diffMinutes < 60) return `Il y a ${diffMinutes} min`
  if (diffHours < 24) return `Il y a ${diffHours} h`
  return `Il y a ${diffDays} j`
}

const normalizeTempForChart = (temp: number) => {
  const normalized = temp / 40
  return clamp(normalized, 0.05, 0.95)
}

interface AppProps {
  onLogout?: () => void
}

export default function App({ onLogout }: AppProps) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastFetch, setLastFetch] = useState<Date | null>(null)
  const [userRole, setUserRole] = useState<string>("ADMIN") // Temporairement en ADMIN pour debug
  const [userEmail, setUserEmail] = useState<string>("")

  // Modal states
  const [addRoomModalOpen, setAddRoomModalOpen] = useState(false)
  const [editRoomModalOpen, setEditRoomModalOpen] = useState(false)
  const [roomToEdit, setRoomToEdit] = useState<Room | null>(null)
  const [thresholdModalOpen, setThresholdModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [showRoomDetail, setShowRoomDetail] = useState(false)

  // Simple filters as an array of active filter names
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Subscriptions state
  const [subscribedRooms, setSubscribedRooms] = useState<string[]>([])

  // Theme
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light"
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    if (saved) return saved
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  // Page navigation
  const [currentPage, setCurrentPage] = useState<string>("overview")


  const handleAddRoom = (newRoom: { room: string; temperature: number; humidity: number; category: string }) => {
    const room: Room = {
      id: Date.now().toString(),
      room: newRoom.room,
      temperature: newRoom.temperature,
      humidity: newRoom.humidity,
      trend: Math.random() > 0.5 ? "up" : "down",
      percentage: Math.floor(Math.random() * 20) + 1,
      period: "Depuis maintenant",
      chartData: generateChartData(Math.random() > 0.5 ? "up" : "down"),
      category: newRoom.category,
    }

    setRooms([...rooms, room])
  }

  const handleSaveThresholds = (thresholds: { minTemp: number; maxTemp: number; alertDelay: number }) => {
    console.log("Seuils sauvegardés:", thresholds)
    // Here you would typically save to backend or state management
  }

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f: string) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const handleToggleSubscription = async (roomId: string) => {
    const isCurrentlySubscribed = subscribedRooms.includes(roomId)
    const action = isCurrentlySubscribed ? 'DELETE' : 'POST'

    try {
      const response = await fetchWithAuth(`/api/subscriptions/rooms/${roomId}`, {
        method: action,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Erreur ${response.status}`)
      }

      // Mettre à jour l'état local
      if (isCurrentlySubscribed) {
        setSubscribedRooms(subscribedRooms.filter((id: string) => id !== roomId))
        toast.success('Désabonnement réussi', {
          description: 'Vous ne recevrez plus de notifications pour cette salle'
        })
      } else {
        setSubscribedRooms([...subscribedRooms, roomId])
        toast.success('Abonnement réussi', {
          description: 'Vous recevrez désormais des alertes par email'
        })
      }
    } catch (error) {
      console.error('Erreur lors de l\'abonnement:', error)
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : 'Impossible de modifier l\'abonnement'
      })
    }
  }

  const handleEditRoom = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId)
    if (room) {
      setRoomToEdit(room)
      setEditRoomModalOpen(true)
    }
  }

  const handleUpdateRoom = async (roomId: string, updates: { name: string; description: string }) => {
    try {
      const response = await fetchWithAuth(`/api/rooms/${roomId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        const errorData = await response.json()

        if (response.status === 409) {
          throw new Error('Une salle avec ce nom existe déjà')
        } else if (response.status === 401) {
          throw new Error('Vous devez être connecté pour effectuer cette action')
        } else if (response.status === 403) {
          throw new Error('Vous n\'avez pas les permissions pour modifier cette salle')
        } else if (errorData.error) {
          throw new Error(errorData.error)
        } else {
          throw new Error(`Erreur lors de la mise à jour: ${response.status}`)
        }
      }

      // Update local state immediately for responsive UI
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId
            ? { ...room, room: updates.name, description: updates.description }
            : room
        )
      )

      toast.success('Salle modifiée', {
        description: `La salle "${updates.name}" a été mise à jour avec succès`
      })

      return await response.json()
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la salle:', error)
      toast.error('Erreur lors de la modification', {
        description: error instanceof Error ? error.message : 'Impossible de modifier la salle'
      })
      throw error
    }
  }

  const handleDeleteRoom = async (roomId: string) => {
    try {
      const response = await fetchWithAuth(`/api/rooms/${roomId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()

        if (response.status === 401) {
          throw new Error('Vous devez être connecté pour effectuer cette action')
        } else if (response.status === 403) {
          throw new Error('Vous n\'avez pas les permissions pour supprimer cette salle')
        } else if (response.status === 404) {
          throw new Error('Salle introuvable')
        } else if (errorData.error) {
          throw new Error(errorData.error)
        } else {
          throw new Error(`Erreur lors de la suppression: ${response.status}`)
        }
      }

      // Update local state immediately for responsive UI
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId))

      toast.success('Salle supprimée', {
        description: 'La salle a été supprimée avec succès'
      })

      return await response.json()
    } catch (error) {
      console.error('Erreur lors de la suppression de la salle:', error)
      toast.error('Erreur lors de la suppression', {
        description: error instanceof Error ? error.message : 'Impossible de supprimer la salle'
      })
      throw error
    }
  }

  const handleEditThreshold = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId)
    if (room) {
      setSelectedRoom(room)
      setThresholdModalOpen(true)
    }
  }

  // Fonction de récupération des salles
  const fetchRooms = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetchWithAuth('/api/rooms')
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`)
      }

      const data: ApiRoom[] = await response.json()

      // Récupérer l'historique pour chaque salle (en parallèle)
      const roomsWithHistory = await Promise.all(
        data.map(async (roomFromApi) => {
          const previousRoom = rooms.find((room) => room.id === roomFromApi.id)
          const rawTemp = Number(roomFromApi.currentTemp ?? 0)
          const rawHumidity = Number(roomFromApi.currentHumidity ?? 0)

          const temperature = Number.isFinite(rawTemp) ? Math.round(rawTemp * 10) / 10 : 0
          const humidity = Number.isFinite(rawHumidity) ? Math.round(rawHumidity) : 0

          // Récupérer l'historique de la journée (1d)
          let chartData: number[] = []
          let trend: "up" | "down" = "up"
          let percentage = 0

          try {
            const historyResponse = await fetchWithAuth(`/api/rooms/${roomFromApi.id}/history?period=1d`)
            if (historyResponse.ok) {
              const historyData = await historyResponse.json()

              if (historyData.data && historyData.data.length > 0) {
                // Extraire les températures des 24 dernières heures
                const temps = historyData.data
                  .filter((d: any) => d.temperature !== null)
                  .map((d: any) => d.temperature)

                if (temps.length > 0) {
                  // Prendre jusqu'à 20 points équidistants pour le chart
                  const step = Math.max(1, Math.floor(temps.length / 20))
                  chartData = temps
                    .filter((_: any, i: number) => i % step === 0)
                    .slice(-20)
                    .map((t: number) => normalizeTempForChart(t))

                  // Calculer le trend et le pourcentage basé sur la moyenne des 4 dernières heures vs 4 heures précédentes
                  const recentTemps = temps.slice(-4) // 4 dernières mesures
                  const olderTemps = temps.slice(-8, -4) // 4 mesures d'avant

                  if (recentTemps.length > 0 && olderTemps.length > 0) {
                    const recentAvg = recentTemps.reduce((a: number, b: number) => a + b, 0) / recentTemps.length
                    const olderAvg = olderTemps.reduce((a: number, b: number) => a + b, 0) / olderTemps.length

                    trend = recentAvg > olderAvg ? "up" : "down"
                    percentage = olderAvg > 0 ? Math.abs(Math.round(((recentAvg - olderAvg) / olderAvg) * 100)) : 0
                  }
                }
              }
            }
          } catch (error) {
            console.error(`Erreur lors de la récupération de l'historique pour ${roomFromApi.id}:`, error)
          }

          // Si pas de données d'historique, utiliser la valeur actuelle
          if (chartData.length === 0) {
            const normalizedValue = normalizeTempForChart(temperature)
            chartData = Array.from({ length: 20 }, () => normalizedValue)
          }

          // Si les données ne font pas 20 points, compléter avec la valeur actuelle
          while (chartData.length < 20) {
            chartData.unshift(chartData[0] || normalizeTempForChart(temperature))
          }

          return {
            id: roomFromApi.id,
            room: roomFromApi.name ?? "Salle",
            temperature,
            humidity,
            trend,
            percentage,
            period: formatLastUpdate(roomFromApi.lastUpdate),
            chartData,
            category: previousRoom?.category ?? "all",
            description: roomFromApi.description,
          }
        })
      )

      setRooms(roomsWithHistory)
      setLastFetch(new Date())
    } catch (error) {
      console.error("Erreur lors de la récupération des salles:", error)
      toast.error('Erreur de chargement', {
        description: 'Impossible de récupérer les données des salles'
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  // Fonction de rafraîchissement manuel
  const handleManualRefresh = () => {
    fetchRooms()
    toast.info('Actualisation en cours...', {
      description: 'Récupération des dernières données'
    })
  }

  // Fonction pour récupérer les abonnements
  const fetchSubscriptions = async () => {
    try {
      const response = await fetchWithAuth('/api/subscriptions/me')

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`)
      }

      const subscriptions = await response.json()
      const roomIds = subscriptions.map((sub: any) => sub.roomId)
      setSubscribedRooms(roomIds)
    } catch (error) {
      console.error('Erreur lors de la récupération des abonnements:', error)
      // Ne pas afficher de toast d'erreur ici pour ne pas polluer l'interface
    }
  }

  // Fonction pour récupérer les infos de l'utilisateur connecté
  const fetchUserInfo = async () => {
    try {
      const response = await fetchWithAuth('/api/auth/me')

      if (response.ok) {
        const data = await response.json()
        setUserRole(data.user.role)
        setUserEmail(data.user.email || "")
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des infos utilisateur:', error)
    }
  }

  // Effet pour la récupération automatique (toutes les 60 secondes)
  useEffect(() => {
    let isMounted = true
    let intervalId: number

    const fetchRoomsIfMounted = async () => {
      if (isMounted) {
        await fetchRooms()
      }
    }

    const fetchDataIfMounted = async () => {
      if (isMounted) {
        await fetchRooms()
        await fetchSubscriptions()
        await fetchUserInfo()
      }
    }

    fetchDataIfMounted()
    // Intervalle de 60 secondes (60000 ms) au lieu de 2 secondes
    intervalId = window.setInterval(fetchRoomsIfMounted, 60000)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [])

  const filteredRooms = rooms.filter((room: Room) => {
    const matchesSearch = room.room.toLowerCase().includes(searchTerm.toLowerCase())

    // Temperature range filters
    if (activeFilters.includes("cold") && room.temperature >= 18) return false
    if (activeFilters.includes("optimal") && (room.temperature < 18 || room.temperature > 24)) return false
    if (activeFilters.includes("warm") && (room.temperature < 24 || room.temperature > 28)) return false
    if (activeFilters.includes("hot") && room.temperature <= 28) return false

    // Trend filters
    if (activeFilters.includes("up") && room.trend !== "up") return false
    if (activeFilters.includes("down") && room.trend !== "down") return false

    // Category filters
    if (activeFilters.includes("subscriptions") && room.category !== "subscriptions") return false
    if (activeFilters.includes("priority") && room.category !== "priority") return false
    if (activeFilters.includes("standard") && room.category !== "standard") return false

    return matchesSearch
  })

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background text-foreground">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} onLogout={onLogout} userRole={userRole} userEmail={userEmail} />

        <div className="flex-1 overflow-auto">
          <div className="w-full max-w-[1600px] mx-auto px-8">
            {showRoomDetail && selectedRoom ? (
              <RoomDetailPage
                room={selectedRoom}
                isSubscribed={subscribedRooms.includes(selectedRoom.id)}
                onToggleSubscription={handleToggleSubscription}
                onBack={() => setShowRoomDetail(false)}
              />
            ) : currentPage === "settings" ? (
              <SettingsPage />
            ) : currentPage === "users" ? (
              <UsersPage />
            ) : currentPage === "documentation" ? (
              <DocumentationPage />
            ) : (
              <div className="flex flex-col h-full">{/* Header */}
                <div className="bg-card border-b border-border">
                  <div className="py-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h1 className="text-[30px] leading-[38px] font-semibold text-foreground mb-1">
                          Bon retour {userEmail ? userEmail.split('@')[0] : ' !'} !
                        </h1>
                        <p className="text-muted-foreground">
                          Suivez et gérez le climat des salles de classes
                          {lastFetch && (
                            <span className="ml-2 text-xs opacity-70">
                              • Dernière mise à jour : {lastFetch.toLocaleTimeString('fr-FR')}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                          className="shrink-0"
                        >
                          {theme === "dark" ? (
                            <div className="flex items-center gap-2">
                              <svg className="size-5" viewBox="0 0 24 24" fill="none">
                                <path
                                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span className="text-sm font-semibold">Mode clair</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <svg className="size-5" viewBox="0 0 24 24" fill="none">
                                <path
                                  d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95L5.636 18.364M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span className="text-sm font-semibold">Mode sombre</span>
                            </div>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleManualRefresh}
                          disabled={isRefreshing}
                        >
                          <svg className="size-5" fill="none" viewBox="0 0 20 20">
                            <path
                              d="M17.5 10A7.5 7.5 0 1 1 2.5 10 7.5 7.5 0 0 1 17.5 10M13.333 8.333L10 11.667m0 0L6.667 8.333M10 11.667V3.333"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.67"
                            />
                          </svg>
                          <span className="text-sm font-semibold">
                            {isRefreshing ? 'Actualisation...' : 'Rafraîchir'}
                          </span>
                        </Button>
                        <Button variant="outline" onClick={() => setThresholdModalOpen(true)}>
                          <svg className="size-6 text-foreground" fill="none" viewBox="0 0 24 24">
                            <path
                              d={svgPaths.p1d2235f0}
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.67"
                            />
                          </svg>
                          <span className="text-sm font-semibold">
                            Gérer le seuil par défaut
                          </span>
                        </Button>
                        <Button variant="default" onClick={() => setAddRoomModalOpen(true)}>
                          <svg className="size-5" fill="none" viewBox="0 0 20 20">
                            <path
                              d={svgPaths.p17eb400}
                              stroke="white"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.67"
                            />
                          </svg>
                          <span className="text-sm font-semibold">Ajouter</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filters and Search */}
                <div className="py-6 bg-card border-b border-border">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Temperature filters */}
                        <Button
                          variant={activeFilters.includes("cold") ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFilter("cold")}
                        >
                          <span className="text-sm font-semibold">Froid (&lt;18°C)</span>
                        </Button>
                        <Button
                          variant={activeFilters.includes("optimal") ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFilter("optimal")}
                        >
                          <span className="text-sm font-semibold">Optimal (18-24°C)</span>
                        </Button>
                        <Button
                          variant={activeFilters.includes("warm") ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFilter("warm")}
                        >
                          <span className="text-sm font-semibold">Chaud (24-28°C)</span>
                        </Button>
                        <Button
                          variant={activeFilters.includes("hot") ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFilter("hot")}
                        >
                          <span className="text-sm font-semibold">Très chaud (&gt;28°C)</span>
                        </Button>

                        <div className="h-6 w-px bg-border" />

                        {/* Trend filters */}
                        <Button
                          variant={activeFilters.includes("up") ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFilter("up")}
                        >
                          <span className="text-sm font-semibold">En hausse</span>
                        </Button>
                        <Button
                          variant={activeFilters.includes("down") ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFilter("down")}
                        >
                          <span className="text-sm font-semibold">En baisse</span>
                        </Button>

                        <div className="h-6 w-px bg-border" />

                        {/* Category filters */}
                        <Button
                          variant={activeFilters.includes("subscriptions") ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFilter("subscriptions")}
                        >
                          <span className="text-sm font-semibold">Abonnements</span>
                        </Button>

                        {activeFilters.length > 0 && (
                          <>
                            <div className="h-6 w-px bg-border" />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setActiveFilters([])}
                            >
                              <span className="text-sm font-semibold text-muted-foreground">Réinitialiser tout</span>
                            </Button>
                          </>
                        )}
                      </div>

                      <div className="w-80">
                        <div className="relative">
                          <svg
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d={svgPaths.p272bfa00}
                              stroke="hsl(var(--muted-foreground))"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.66667"
                            />
                          </svg>
                          <Input
                            type="text"
                            placeholder="Recherche"
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {activeFilters.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {filteredRooms.length} {filteredRooms.length > 1 ? "salles trouvées" : "salle trouvée"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Room Cards Grid */}
                <div className="flex-1 py-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRooms.map((room) => (
                      <RoomCard
                        key={room.id}
                        {...room}
                        isSubscribed={subscribedRooms.includes(room.id)}
                        onToggleSubscription={handleToggleSubscription}
                        onClick={() => { setSelectedRoom(room); setShowRoomDetail(true); }}
                        onEditRoom={handleEditRoom}
                        onDeleteRoom={handleDeleteRoom}
                        onEditThreshold={handleEditThreshold}
                        userRole={userRole}
                      />
                    ))}
                  </div>

                  {filteredRooms.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <svg
                        className="size-16 text-gray-300 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d={svgPaths.p272bfa00}
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <p className="text-muted-foreground text-lg mb-2">
                        Aucune salle trouvée
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Essayez de modifier vos critères de recherche ou filtres
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <AddRoomModal
            open={addRoomModalOpen}
            onOpenChange={setAddRoomModalOpen}
            onAddRoom={handleAddRoom}
          />

          <ThresholdModal
            open={thresholdModalOpen}
            onOpenChange={setThresholdModalOpen}
            onSave={handleSaveThresholds}
          />

          {roomToEdit && (
            <EditRoomModal
              open={editRoomModalOpen}
              onOpenChange={setEditRoomModalOpen}
              room={{
                id: roomToEdit.id,
                name: roomToEdit.room,
                description: roomToEdit.description,
              }}
              onUpdateRoom={handleUpdateRoom}
            />
          )}
        </div>
      </div>
    </SidebarProvider>
  )
}

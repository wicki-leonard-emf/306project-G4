import { useEffect, useState } from "react"
import { Sidebar } from "./components/Sidebar"
import { RoomCard } from "./components/RoomCard"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Login } from "./components/Login"
import { AddRoomModal } from "./components/AddRoomModal"
import { ThresholdModal } from "./components/ThresholdModal"
import { RoomDetailPage } from "./components/RoomDetailPage"
import { SettingsPage } from "./components/SettingsPage"
import { NotificationsPage } from "./components/NotificationsPage"
import { UsersPage } from "./components/UsersPage"
import { TransactionHistoryPage } from "./components/TransactionHistoryPage"
import { DocumentationPage } from "./components/DocumentationPage"
import svgPaths from "./imports/svg-734m2ckqag"

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

const initialRooms: Room[] = [
  {
    id: "1",
    room: "A35",
    temperature: 13,
    humidity: 48,
    trend: "down",
    percentage: 4,
    period: "Depuis ce matin",
    chartData: generateChartData("down"),
    category: "all"
  },
  {
    id: "2",
    room: "A44",
    temperature: 12,
    humidity: 52,
    trend: "up",
    percentage: 10,
    period: "Depuis hier",
    chartData: generateChartData("up"),
    category: "subscriptions"
  },
  {
    id: "3",
    room: "C36",
    temperature: 23,
    humidity: 63,
    trend: "down",
    percentage: 20,
    period: "Cette semaine",
    chartData: generateChartData("down"),
    category: "all"
  },
  {
    id: "4",
    room: "A37",
    temperature: 13,
    humidity: 47,
    trend: "down",
    percentage: 4,
    period: "Depuis ce matin",
    chartData: generateChartData("down"),
    category: "all"
  },
  {
    id: "5",
    room: "A36",
    temperature: 23,
    humidity: 58,
    trend: "down",
    percentage: 20,
    period: "Cette semaine",
    chartData: generateChartData("down"),
    category: "subscriptions"
  },
  {
    id: "6",
    room: "A42",
    temperature: 12,
    humidity: 55,
    trend: "up",
    percentage: 10,
    period: "Depuis hier",
    chartData: generateChartData("up"),
    category: "all"
  },
  {
    id: "7",
    room: "A45",
    temperature: 12,
    humidity: 61,
    trend: "up",
    percentage: 10,
    period: "Depuis hier",
    chartData: generateChartData("up"),
    category: "subscriptions"
  },
  {
    id: "8",
    room: "A41",
    temperature: 23,
    humidity: 57,
    trend: "down",
    percentage: 20,
    period: "Cette semaine",
    chartData: generateChartData("down"),
    category: "all"
  },
  {
    id: "9",
    room: "A34",
    temperature: 13,
    humidity: 50,
    trend: "down",
    percentage: 4,
    period: "Depuis ce matin",
    chartData: generateChartData("down"),
    category: "all"
  }
]

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [rooms, setRooms] = useState<Room[]>(initialRooms)
  const [searchTerm, setSearchTerm] = useState("")

  // Modal states
  const [addRoomModalOpen, setAddRoomModalOpen] = useState(false)
  const [thresholdModalOpen, setThresholdModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [showRoomDetail, setShowRoomDetail] = useState(false)

  // Simple filters as an array of active filter names
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Subscriptions state
  const [subscribedRooms, setSubscribedRooms] = useState<string[]>(["2", "5", "7"])

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

  const handleLogin = (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true)
      setLoginError("")
    } else {
      setLoginError("Nom d'utilisateur ou mot de passe incorrect. Veuillez réessayer avec admin/admin.")
    }
  }

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

  const handleToggleSubscription = (roomId: string) => {
    if (subscribedRooms.includes(roomId)) {
      setSubscribedRooms(subscribedRooms.filter((id: string) => id !== roomId))
    } else {
      setSubscribedRooms([...subscribedRooms, roomId])
    }
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} error={loginError} />
  }

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
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

      {showRoomDetail && selectedRoom ? (
        <RoomDetailPage
          room={selectedRoom}
          isSubscribed={subscribedRooms.includes(selectedRoom.id)}
          onToggleSubscription={handleToggleSubscription}
          onBack={() => setShowRoomDetail(false)}
        />
      ) : currentPage === "settings" ? (
        <SettingsPage />
      ) : currentPage === "notifications" ? (
        <NotificationsPage />
      ) : currentPage === "users" ? (
        <UsersPage />
      ) : currentPage === "transactionHistory" ? (
        <TransactionHistoryPage />
      ) : currentPage === "documentation" ? (
        <DocumentationPage />
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-card border-b border-border">
              <div className="px-8 py-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-[30px] leading-[38px] font-semibold text-foreground mb-1">
                      Bon retour, Olivia
                    </h1>
                    <p className="text-muted-foreground">
                      Suivez et gérez le climat des salles de classes
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
            <div className="px-8 py-6 bg-card border-b border-border">
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
                        <div className="h-6 w-px bg-[#E9EAEB]" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveFilters([])}
                        >
                          <span className="text-sm font-semibold text-[#717680]">Réinitialiser tout</span>
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
                          stroke="#717680"
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
                    <span className="text-sm text-[#717680]">
                      {filteredRooms.length} {filteredRooms.length > 1 ? "salles trouvées" : "salle trouvée"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Room Cards Grid */}
            <div className="flex-1 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    {...room}
                    isSubscribed={subscribedRooms.includes(room.id)}
                    onToggleSubscription={handleToggleSubscription}
                    onClick={() => { setSelectedRoom(room); setShowRoomDetail(true); }}
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
                  <p className="text-[#535862] text-lg mb-2">
                    Aucune salle trouvée
                  </p>
                  <p className="text-[#717680] text-sm">
                    Essayez de modifier vos critères de recherche ou filtres
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
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
    </div>
  )
}
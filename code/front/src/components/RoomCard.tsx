import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Edit, Eye, Settings, Clock, Download, Trash2, MoreVertical, FileEdit } from "lucide-react"

interface RoomCardProps {
  id: string
  room: string
  temperature: number
  humidity: number
  trend: "up" | "down"
  percentage: number
  period: string
  chartData: number[]
  isSubscribed?: boolean
  onToggleSubscription?: (roomId: string) => void
  onClick?: () => void
  onEditRoom?: (roomId: string) => void
  onDeleteRoom?: (roomId: string) => void
  onEditThreshold?: (roomId: string) => void
  userRole?: string
}

export function RoomCard({
  id,
  room,
  temperature,
  humidity,
  trend,
  percentage,
  period,
  chartData,
  isSubscribed,
  onToggleSubscription,
  onClick,
  onEditRoom,
  onDeleteRoom,
  onEditThreshold,
  userRole
}: RoomCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  
  const isHot = trend === "up"
  // Utiliser des couleurs réelles pour Recharts (pas de variables CSS)
  const color = isHot ? "#ef4444" : "#a855f7" // red-500 et purple-500

  // Transform chartData for Recharts
  const chartDataFormatted = chartData.map((value, index) => ({
    index,
    value: value * 40 // Convert normalized value back to temperature range (0-40)
  }))

  const chartConfig = {
    value: {
      label: "Température",
      color: color,
    },
  }

  // Debug
  console.log('RoomCard userRole:', userRole)

  return (
    <div
      className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all cursor-pointer hover:border-primary"
      onClick={onClick}
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{room}</span>
            <span className="px-2 py-1 rounded-md bg-blue-light text-blue-primary text-xs font-semibold">
              {humidity}% HR
            </span>
            {isSubscribed && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-light rounded-md">
                <svg className="size-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52678 4.06881 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5789 18.2537 10.292 18.3304 10 18.3304C9.70802 18.3304 9.42115 18.2537 9.16814 18.1079C8.91513 17.9622 8.70484 17.7526 8.55835 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span className="text-xs font-medium text-primary">Abonné</span>
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 hover:bg-muted rounded transition-colors" onClick={(e) => e.stopPropagation()}>
              <MoreVertical className="size-5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  if (onClick) onClick()
                }}
              >
                <Eye className="h-4 w-4" />
                <span>Voir les détails</span>
              </DropdownMenuItem>

              {userRole === "ADMIN" && (
                <>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onEditRoom) onEditRoom(id)
                    }}
                  >
                    <FileEdit className="h-4 w-4" />
                    <span>Renommer</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onEditThreshold) onEditThreshold(id)
                    }}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Modifier les seuils</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      // TODO: Implement export functionality
                      console.log("Export data for room:", id)
                    }}
                  >
                    <Download className="h-4 w-4" />
                    <span>Exporter les données</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteDialogOpen(true)
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Supprimer la salle</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Temperature */}
        <div className="text-[48px] leading-none font-normal text-foreground tracking-tight">
          {temperature}°
        </div>

        {/* Trend and Chart */}
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-1.5">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 20 20"
            >
              {trend === "down" ? (
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
            <span className="text-sm" style={{ color }}>
              {percentage}%
            </span>
            <span className="text-sm text-muted-foreground">{period}</span>
          </div>

          {/* Mini Chart */}
          <div className="shrink-0 w-[97px] h-[49px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <AreaChart data={chartDataFormatted}>
                <defs>
                  <linearGradient id={`gradient-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={1.5}
                  fill={`url(#gradient-${id})`}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
      </div>

      {/* Alert Dialog pour confirmer la suppression */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cette salle ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La salle "{room}" et toutes ses données (capteurs, lectures, abonnements) seront définitivement supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.stopPropagation()
                if (onDeleteRoom) onDeleteRoom(id)
                setDeleteDialogOpen(false)
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
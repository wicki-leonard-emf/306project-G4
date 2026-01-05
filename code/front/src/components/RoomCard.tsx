import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

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
}

export function RoomCard({ id, room, temperature, humidity, trend, percentage, period, chartData, isSubscribed, onToggleSubscription, onClick, onEditRoom }: RoomCardProps) {
  const isHot = trend === "up"
  const color = isHot ? "#F04438" : "#7F56D9"

  // Generate SVG path for mini chart
  const width = 97
  const height = 49
  const points = chartData.map((value, index) => {
    const x = (index / (chartData.length - 1)) * width
    const y = height - (value * height)
    return `${x},${y}`
  }).join(" ")

  const pathD = `M${points}`

  return (
    <div
      className="bg-white rounded-xl border border-[#E9EAEB] p-6 hover:shadow-lg transition-all cursor-pointer hover:border-[#7f56d9]"
      onClick={onClick}
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#414651]">{room}</span>
            <span className="px-2 py-1 rounded-md bg-[#e6f0ff] text-[#1849a9] text-xs font-semibold">
              {humidity}% HR
            </span>
          </div>
          {isSubscribed ? (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#F9F5FF] rounded-md">
              <svg className="size-4 text-[#6941C6]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52678 4.06881 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5789 18.2537 10.292 18.3304 10 18.3304C9.70802 18.3304 9.42115 18.2537 9.16814 18.1079C8.91513 17.9622 8.70484 17.7526 8.55835 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span className="text-xs font-medium text-[#6941C6]">Abonné</span>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="p-1 hover:bg-gray-100 rounded transition-colors">
                <svg className="size-5" fill="none" viewBox="0 0 20 20">
                  <path
                    d="M10 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 10C10.8333 9.53976 10.4602 9.16667 10 9.16667C9.53976 9.16667 9.16667 9.53976 9.16667 10C9.16667 10.4602 9.53976 10.8333 10 10.8333Z"
                    fill="#717680"
                  />
                  <path
                    d="M10 5C10.4602 5 10.8333 4.6269 10.8333 4.16667C10.8333 3.70643 10.4602 3.33333 10 3.33333C9.53976 3.33333 9.16667 3.70643 9.16667 4.16667C9.16667 4.6269 9.53976 5 10 5Z"
                    fill="#717680"
                  />
                  <path
                    d="M10 16.6667C10.4602 16.6667 10.8333 16.2936 10.8333 15.8333C10.8333 15.3731 10.4602 15 10 15C9.53976 15 9.16667 15.3731 9.16667 15.8333C9.16667 16.2936 9.53976 16.6667 10 16.6667Z"
                    fill="#717680"
                  />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    if (onEditRoom) onEditRoom(id)
                  }}
                >
                  Modifier le nom
                </DropdownMenuItem>
                <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                <DropdownMenuItem>Modifier le seuil</DropdownMenuItem>
                <DropdownMenuItem>Historique</DropdownMenuItem>
                <DropdownMenuItem>Exporter les données</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Temperature */}
        <div className="text-[48px] leading-none font-normal text-[#181d27] tracking-tight">
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
            <span className="text-sm text-[#535862]">{period}</span>
          </div>

          {/* Mini Chart */}
          <svg
            className="shrink-0"
            width="97"
            height="49"
            viewBox="0 0 97 49"
            fill="none"
          >
            <path
              d={pathD}
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
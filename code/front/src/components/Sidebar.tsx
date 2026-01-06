import { useState } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import svgPaths from "../imports/svg-734m2ckqag"
import imgLogo from "figma:asset/d0fc03f5c47a5583e2cfa35ac5f6aa36545efb07.png"
import imgAvatar from "figma:asset/67da9fddd372b1b5b44ffef41eed6ceb810ddf8a.png"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  onLogout?: () => void
}

export function Sidebar({ currentPage, onPageChange, onLogout }: SidebarProps) {
  const [dashboardOpen, setDashboardOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="bg-card text-foreground flex h-screen flex-col w-[312px] border-r border-border">
      <div className="flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex flex-col gap-8 pt-8">
          <div className="px-3.5">
            <div className="flex gap-3.5 items-center">
              <div className="relative shrink-0 size-14">
                <img
                  alt="SensorHub Logo"
                  className="size-full object-cover rounded"
                  src={imgLogo}
                />
              </div>
              <p className="font-semibold text-foreground text-2xl tracking-tight">
                SensorHub
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="px-6">
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  d={svgPaths.p272bfa00}
                  stroke="currentColor"
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

          {/* Navigation */}
          <div className="px-4">
            <div className="flex flex-col gap-1">
              {/* Maison */}
              <button
                className={`flex items-center px-3 py-2 rounded-md hover:bg-muted transition-colors ${currentPage === "home" ? "bg-muted" : ""
                  }`}
                onClick={() => onPageChange("home")}
              >
                <div className="flex gap-3 items-center">
                  <svg className="size-6 text-muted-foreground" fill="none" viewBox="0 0 24 24">
                    <path
                      d={svgPaths.p2ff764c0}
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="font-semibold text-muted-foreground">Maison</span>
                </div>
              </button>

              {/* Tableau de bord */}
              <div className="flex flex-col gap-2">
                <CollapsibleTrigger
                  onClick={() => setDashboardOpen(!dashboardOpen)}
                  className={`flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted transition-colors ${["overview", "notifications", "transactionHistory"].includes(currentPage) ? "bg-muted" : ""}`}
                >
                  <div className="flex gap-3 items-center">
                    <svg className="size-6 text-muted-foreground" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M18 20V10M12 20V4M6 20V14"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                    <span className="font-semibold text-muted-foreground">
                      Tableau de bord
                    </span>
                  </div>
                  <svg
                    className={`size-5 transition-transform text-muted-foreground ${dashboardOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M15 12.5L10 7.5L5 12.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.38889"
                    />
                  </svg>
                </CollapsibleTrigger>

                <CollapsibleContent isOpen={dashboardOpen}>
                  <div className="flex flex-col gap-1 pb-2">
                    <button
                      className={`flex items-center px-3 py-2 pl-12 rounded-md hover:bg-muted transition-colors ${currentPage === "overview" ? "bg-muted" : ""
                        }`}
                      onClick={() => onPageChange("overview")}
                    >
                      <span className="font-semibold text-muted-foreground">
                        Aperçu
                      </span>
                    </button>
                    <button
                      className={`flex items-center justify-between px-3 py-2 pl-12 rounded-md hover:bg-muted transition-colors ${currentPage === "notifications" ? "bg-muted" : ""
                        }`}
                      onClick={() => onPageChange("notifications")}
                    >
                      <span className="font-semibold text-muted-foreground">
                        Notifications
                      </span>
                      <Badge variant="default">10</Badge>
                    </button>
                    <button
                      className={`flex items-center px-3 py-2 pl-12 rounded-md hover:bg-muted transition-colors ${currentPage === "transactionHistory" ? "bg-muted" : ""
                        }`}
                      onClick={() => onPageChange("transactionHistory")}
                    >
                      <span className="font-semibold text-muted-foreground">
                        Historique des transactions
                      </span>
                    </button>
                  </div>
                </CollapsibleContent>
              </div>

              {/* Utilisateurs */}
              <button
                className={`flex items-center px-3 py-2 rounded-md hover:bg-muted transition-colors ${currentPage === "users" ? "bg-muted" : ""
                  }`}
                onClick={() => onPageChange("users")}
              >
                <div className="flex gap-3 items-center">
                  <svg className="size-6 text-muted-foreground" fill="none" viewBox="0 0 24 24">
                    <path
                      d={svgPaths.pae41680}
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="font-semibold text-muted-foreground">
                    Utilisateurs
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              {/* Documentation */}
              <button
                className={`flex gap-3 items-center px-3 py-2 rounded-md hover:bg-muted transition-colors ${currentPage === "documentation" ? "bg-muted" : ""
                  }`}
                onClick={() => onPageChange("documentation")}
              >
                <svg className="size-6 text-muted-foreground" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M10 2V10L13 7L16 10V2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d={svgPaths.p2460274}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span className="font-semibold text-muted-foreground">
                  Documentation
                </span>
              </button>

              {/* Paramètres */}
              <button
                className={`flex gap-3 items-center px-3 py-2 rounded-md hover:bg-muted transition-colors ${currentPage === "settings" ? "bg-muted" : ""
                  }`}
                onClick={() => onPageChange("settings")}
              >
                <svg className="size-6 text-muted-foreground" fill="none" viewBox="0 0 24 24">
                  <g clipPath="url(#clip0_settings)">
                    <path
                      d={svgPaths.p3cccb600}
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d={svgPaths.p3737f500}
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_settings">
                      <rect fill="white" height="24" width="24" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="font-semibold text-muted-foreground">
                  Paramètres
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Account */}
            <div className="flex items-center justify-between px-2">
              <div className="flex gap-3 items-center">
                <img
                  alt="Olivia Rhye"
                  className="size-10 rounded-full object-cover"
                  src={imgAvatar}
                />
                <p className="font-semibold text-foreground text-sm">
                  Olivia Rhye
                </p>
              </div>
              <button
                onClick={onLogout}
                disabled={!onLogout}
                className="p-2 rounded-lg transition-colors duration-200 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                title="Logout"
              >
                <svg className="size-5 fill-current" fill="none" viewBox="0 0 20 20">
                  <path
                    d={svgPaths.p17b1b80}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.67"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
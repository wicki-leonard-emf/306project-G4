import { useState } from "react"
import { Home, BarChart3, Bell, History, Users, BookOpen, Settings, LogOut, Search, ChevronDown } from "lucide-react"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import imgLogo from "figma:asset/d0fc03f5c47a5583e2cfa35ac5f6aa36545efb07.png"
import imgAvatar from "figma:asset/67da9fddd372b1b5b44ffef41eed6ceb810ddf8a.png"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  onLogout?: () => void
  userRole?: string
}

export function Sidebar({ currentPage, onPageChange, onLogout, userRole }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <ShadcnSidebar className="border-r" collapsible="none">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-2">
          <img
            alt="SensorHub Logo"
            className="size-10 rounded object-cover"
            src={imgLogo}
          />
          <span className="text-xl font-semibold">SensorHub</span>
        </div>
        
        <div className="px-2 py-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Recherche"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onPageChange("home")}
                  isActive={currentPage === "home"}
                >
                  <Home className="h-5 w-5" />
                  <span>Maison</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={["overview", "notifications", "transactionHistory"].includes(currentPage)}
                    >
                      <BarChart3 className="h-5 w-5" />
                      <span>Tableau de bord</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton 
                          onClick={() => onPageChange("overview")}
                          isActive={currentPage === "overview"}
                        >
                          <span>Aperçu</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton 
                          onClick={() => onPageChange("notifications")}
                          isActive={currentPage === "notifications"}
                        >
                          <Bell className="h-4 w-4" />
                          <span>Notifications</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {userRole === "ADMIN" && (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton 
                            onClick={() => onPageChange("transactionHistory")}
                            isActive={currentPage === "transactionHistory"}
                          >
                            <History className="h-4 w-4" />
                            <span>Historique des transactions</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {userRole === "ADMIN" && (
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => onPageChange("users")}
                    isActive={currentPage === "users"}
                  >
                    <Users className="h-5 w-5" />
                    <span>Utilisateurs</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onPageChange("documentation")}
                  isActive={currentPage === "documentation"}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Documentation</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onPageChange("settings")}
                  isActive={currentPage === "settings"}
                >
                  <Settings className="h-5 w-5" />
                  <span>Paramètres</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Separator className="mb-2" />
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <img
              alt="User Avatar"
              className="h-8 w-8 rounded-full object-cover"
              src={imgAvatar}
            />
            <span className="text-sm font-medium">Olivia Rhye</span>
          </div>
          <button
            onClick={onLogout}
            disabled={!onLogout}
            className="rounded-lg p-2 transition-colors hover:bg-destructive hover:text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-50"
            title="Déconnexion"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}
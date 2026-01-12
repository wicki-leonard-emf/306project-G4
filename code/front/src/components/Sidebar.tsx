import { Home, BarChart3, Users, BookOpen, Settings, LogOut } from "lucide-react"
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
} from "./ui/sidebar"
import { Separator } from "./ui/separator"
import imgLogo from "figma:asset/d0fc03f5c47a5583e2cfa35ac5f6aa36545efb07.png"
import imgAvatar from "figma:asset/67da9fddd372b1b5b44ffef41eed6ceb810ddf8a.png"
import { Button } from "./ui/button"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  onLogout?: () => void
  userRole?: string
  userEmail?: string
}

export function Sidebar({ currentPage, onPageChange, onLogout, userRole, userEmail }: SidebarProps) {
  return (
    <ShadcnSidebar className="border-r w-64" collapsible="none">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-2">
          <img
            alt="SensorHub Logo"
            className="size-10 rounded object-cover"
            src={imgLogo}
          />
          <span className="text-xl font-semibold">SensorHub</span>
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

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onPageChange("overview")}
                  isActive={currentPage === "overview"}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Tableau de bord</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

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
            <span className="text-sm font-medium">{userEmail ? userEmail.split('@')[0] : 'Utilisateur'}</span>
          </div>
          <Button
            onClick={onLogout}
            disabled={!onLogout}
            variant="ghost"
          >
            <LogOut size={19} />
          </Button>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}
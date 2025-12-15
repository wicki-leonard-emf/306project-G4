import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "viewer"
  status: "active" | "inactive"
  avatar: string
  lastActive: string
  rooms: number
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Olivia Rhye",
    email: "olivia.rhye@example.com",
    role: "admin",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    lastActive: "En ligne",
    rooms: 12
  },
  {
    id: "2",
    name: "Phoenix Baker",
    email: "phoenix.baker@example.com",
    role: "manager",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
    lastActive: "Il y a 5 min",
    rooms: 8
  },
  {
    id: "3",
    name: "Lana Steiner",
    email: "lana.steiner@example.com",
    role: "viewer",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    lastActive: "Il y a 2h",
    rooms: 3
  },
  {
    id: "4",
    name: "Demi Wilkinson",
    email: "demi.wilkinson@example.com",
    role: "manager",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    lastActive: "Il y a 1 jour",
    rooms: 6
  },
  {
    id: "5",
    name: "Candice Wu",
    email: "candice.wu@example.com",
    role: "viewer",
    status: "inactive",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
    lastActive: "Il y a 3 jours",
    rooms: 0
  },
  {
    id: "6",
    name: "Natali Craig",
    email: "natali.craig@example.com",
    role: "viewer",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
    lastActive: "Il y a 1h",
    rooms: 4
  },
  {
    id: "7",
    name: "Drew Cano",
    email: "drew.cano@example.com",
    role: "manager",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    lastActive: "Il y a 30 min",
    rooms: 9
  }
]

export function UsersPage() {
  const getRoleBadge = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-[#7f56d9] hover:bg-[#6941c6]">Administrateur</Badge>
      case "manager":
        return <Badge className="bg-[#12B76A] hover:bg-[#0E9F6E]">Gestionnaire</Badge>
      case "viewer":
        return <Badge variant="secondary">Lecteur</Badge>
    }
  }

  const getStatusBadge = (status: User["status"]) => {
    if (status === "active") {
      return (
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-[#12B76A]" />
          <span className="text-sm text-[#535862]">Actif</span>
        </div>
      )
    }
    return (
      <div className="flex items-center gap-1.5">
        <div className="size-2 rounded-full bg-[#717680]" />
        <span className="text-sm text-[#717680]">Inactif</span>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto bg-[#FAFAFA]">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-white border-b border-[#E9EAEB]">
          <div className="px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[30px] leading-[38px] font-semibold text-[#181d27] mb-1">
                  Utilisateurs
                </h1>
                <p className="text-[#535862]">
                  Gérez les utilisateurs et leurs accès à l'application
                </p>
              </div>
              <Button variant="default">
                <svg className="size-5" fill="none" viewBox="0 0 20 20">
                  <path
                    d="M10 4.16667V15.8333M4.16667 10H15.8333"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.67"
                  />
                </svg>
                Ajouter un utilisateur
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white border-b border-[#E9EAEB] px-8 py-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-[#f9f5ff] to-white border border-[#e9d7fe] rounded-lg p-4">
              <p className="text-sm text-[#717680] mb-1">Total utilisateurs</p>
              <p className="text-2xl font-semibold text-[#181d27]">{mockUsers.length}</p>
            </div>
            <div className="bg-gradient-to-br from-[#ecfdf3] to-white border border-[#a6f4c5] rounded-lg p-4">
              <p className="text-sm text-[#717680] mb-1">Actifs</p>
              <p className="text-2xl font-semibold text-[#181d27]">
                {mockUsers.filter(u => u.status === "active").length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#fff1f3] to-white border border-[#fecdca] rounded-lg p-4">
              <p className="text-sm text-[#717680] mb-1">Administrateurs</p>
              <p className="text-2xl font-semibold text-[#181d27]">
                {mockUsers.filter(u => u.role === "admin").length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#fffaeb] to-white border border-[#fedf89] rounded-lg p-4">
              <p className="text-sm text-[#717680] mb-1">Gestionnaires</p>
              <p className="text-2xl font-semibold text-[#181d27]">
                {mockUsers.filter(u => u.role === "manager").length}
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white border-b border-[#E9EAEB] px-8 py-4">
          <div className="relative max-w-md">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                stroke="#717680"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.66667"
              />
            </svg>
            <Input
              type="text"
              placeholder="Rechercher un utilisateur..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          <div className="bg-white border border-[#E9EAEB] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#FAFAFA] border-b border-[#E9EAEB]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#717680] uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#717680] uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#717680] uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#717680] uppercase tracking-wider">
                    Dernière activité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#717680] uppercase tracking-wider">
                    Salles
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-[#717680] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9EAEB]">
                {mockUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="size-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-[#181d27]">{user.name}</p>
                          <p className="text-sm text-[#717680]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#535862]">{user.lastActive}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-[#181d27]">
                        {user.rooms}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <svg className="size-4" fill="none" viewBox="0 0 20 20">
                            <path
                              d="M14.1667 2.49993C14.3856 2.28106 14.6455 2.10744 14.9313 1.98899C15.2171 1.87054 15.5236 1.80957 15.8334 1.80957C16.1432 1.80957 16.4497 1.87054 16.7355 1.98899C17.0213 2.10744 17.2812 2.28106 17.5001 2.49993C17.719 2.7188 17.8926 2.97863 18.011 3.2644C18.1295 3.55016 18.1905 3.85664 18.1905 4.16643C18.1905 4.47622 18.1295 4.7827 18.011 5.06847C17.8926 5.35423 17.719 5.61406 17.5001 5.83293L6.25008 17.0829L1.66675 18.3329L2.91675 13.7496L14.1667 2.49993Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Modifier
                        </Button>
                        <Button variant="ghost" size="sm">
                          <svg className="size-4" fill="none" viewBox="0 0 20 20">
                            <path
                              d="M2.5 5H4.16667H17.5M15.8334 4.99999V16.6667C15.8334 17.1087 15.6578 17.5326 15.3453 17.8452C15.0327 18.1577 14.6088 18.3333 14.1667 18.3333H5.83341C5.39139 18.3333 4.96747 18.1577 4.65491 17.8452C4.34234 17.5326 4.16675 17.1087 4.16675 16.6667V4.99999H15.8334Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Supprimer
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

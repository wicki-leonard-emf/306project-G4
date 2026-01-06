import { useState, useEffect } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface User {
  id: string
  email: string
  role: "ADMIN" | "ENSEIGNANT" | "ELEVE"
}

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/users')
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des utilisateurs')
      }
      const data = await response.json()
      setUsers(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRoleBadge = (role: User["role"]) => {
    switch (role) {
      case "ADMIN":
        return <Badge className="bg-[#7f56d9] hover:bg-[#6941c6]">Administrateur</Badge>
      case "ENSEIGNANT":
        return <Badge className="bg-[#12B76A] hover:bg-[#0E9F6E]">Enseignant</Badge>
      case "ELEVE":
        return <Badge variant="secondary">Élève</Badge>
    }
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
              <p className="text-2xl font-semibold text-[#181d27]">{users.length}</p>
            </div>
            <div className="bg-gradient-to-br from-[#ecfdf3] to-white border border-[#a6f4c5] rounded-lg p-4">
              <p className="text-sm text-[#717680] mb-1">Administrateurs</p>
              <p className="text-2xl font-semibold text-[#181d27]">
                {users.filter(u => u.role === "ADMIN").length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#fff1f3] to-white border border-[#fecdca] rounded-lg p-4">
              <p className="text-sm text-[#717680] mb-1">Enseignants</p>
              <p className="text-2xl font-semibold text-[#181d27]">
                {users.filter(u => u.role === "ENSEIGNANT").length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#fffaeb] to-white border border-[#fedf89] rounded-lg p-4">
              <p className="text-sm text-[#717680] mb-1">Élèves</p>
              <p className="text-2xl font-semibold text-[#181d27]">
                {users.filter(u => u.role === "ELEVE").length}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          {loading ? (
            <div className="bg-white border border-[#E9EAEB] rounded-xl p-8 text-center">
              <p className="text-[#717680]">Chargement des utilisateurs...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="bg-white border border-[#E9EAEB] rounded-xl p-8 text-center">
              <p className="text-[#717680]">
                {searchQuery ? "Aucun utilisateur ne correspond à votre recherche" : "Aucun utilisateur trouvé"}
              </p>
            </div>
          ) : (
            <div className="bg-white border border-[#E9EAEB] rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#FAFAFA] border-b border-[#E9EAEB]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#717680] uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#717680] uppercase tracking-wider">
                      Rôle
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-[#717680] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9EAEB]">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#181d27]">{user.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        {getRoleBadge(user.role)}
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
          )}
        </div>
      </div>
    </div>
  )
}

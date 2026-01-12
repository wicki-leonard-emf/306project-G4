import React from "react"

type DocSection = {
  id: string
  title: string
  description?: string
  content: React.ReactNode
}

export function DocumentationPage() {
  const sections: DocSection[] = [
    {
      id: "overview",
      title: "SensorHub — Documentation",
      description:
        "Guide utilisateur + repères techniques (API + Raspberry Pi) basés sur le code réel du repo.",
      content: (
        <div className="space-y-4">
          <p className="text-[#535862] leading-relaxed">
            SensorHub centralise la <strong className="text-[#181d27]">température</strong> et l’
            <strong className="text-[#181d27]">humidité</strong> des salles, affiche un état en temps réel, un historique, et permet la
            configuration de seuils d’alerte.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-lg border border-[#E9EAEB] bg-white p-4">
              <div className="text-sm text-[#717680] mb-1">Frontend</div>
              <div className="font-semibold text-[#181d27]">React (Vite)</div>
              <div className="text-sm text-[#535862]">UI, navigation, tableaux et graphiques</div>
            </div>
            <div className="rounded-lg border border-[#E9EAEB] bg-white p-4">
              <div className="text-sm text-[#717680] mb-1">Backend</div>
              <div className="font-semibold text-[#181d27]">Express + Prisma</div>
              <div className="text-sm text-[#535862]">API REST, auth, base PostgreSQL</div>
            </div>
            <div className="rounded-lg border border-[#E9EAEB] bg-white p-4">
              <div className="text-sm text-[#717680] mb-1">Edge / IoT</div>
              <div className="font-semibold text-[#181d27]">Raspberry Pi + Phidget</div>
              <div className="text-sm text-[#535862]">Envoi des lectures via `X-API-Key`</div>
            </div>
          </div>
          <div className="rounded-lg border border-[#E9D7FE] bg-[#F9F5FF] p-4">
            <div className="text-sm text-[#6941C6]">
              <strong>Docs projet (repo) :</strong> <span className="font-mono">documentation/2_CahierDesCharges.md</span> et{" "}
              <span className="font-mono">documentation/3_Documentation_Projet.md</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "roles",
      title: "Rôles & permissions",
      description: "Ce que chaque type d’utilisateur peut faire.",
      content: (
        <div className="space-y-4">
          <div className="rounded-lg border border-[#E9EAEB] bg-white p-4">
            <ul className="space-y-2">
              <li className="text-[#535862]">
                <strong className="text-[#181d27]">ADMIN</strong> : gestion des salles, seuils d’alerte, utilisateurs, suppression/édition.
              </li>
              <li className="text-[#535862]">
                <strong className="text-[#181d27]">Utilisateur</strong> : consultation, historique, abonnement/désabonnement aux alertes.
              </li>
              <li className="text-[#535862]">
                <strong className="text-[#181d27]">Raspberry Pi</strong> : ingestion des données via une clé <span className="font-mono">X-API-Key</span>.
              </li>
            </ul>
          </div>
          <p className="text-sm text-[#717680]">
            JWT : <span className="font-mono">Authorization: Bearer &lt;token&gt;</span> — RPi : <span className="font-mono">X-API-Key: &lt;RPI_API_KEY&gt;</span>
          </p>
        </div>
      ),
    },
    {
      id: "usage",
      title: "Utilisation (UI)",
      description: "Ce que vous pouvez faire depuis l’interface.",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg border border-[#E9EAEB] bg-white p-4">
              <div className="font-semibold text-[#181d27] mb-1">Tableau de bord</div>
              <div className="text-[#535862] text-sm leading-relaxed">
                Vue globale des salles (température, humidité, tendance). Cliquez une carte pour ouvrir la vue détaillée.
              </div>
            </div>
            <div className="rounded-lg border border-[#E9EAEB] bg-white p-4">
              <div className="font-semibold text-[#181d27] mb-1">Vue détaillée</div>
              <div className="text-[#535862] text-sm leading-relaxed">
                Détails d’une salle + historique. Selon votre rôle, vous pouvez aussi configurer les seuils et éditer.
              </div>
            </div>
            <div className="rounded-lg border border-[#E9EAEB] bg-white p-4">
              <div className="font-semibold text-[#181d27] mb-1">Seuils & alertes</div>
              <div className="text-[#535862] text-sm leading-relaxed">
                Les admins définissent les seuils min/max (et délai). Les alertes sont visibles dans l’application.
              </div>
            </div>
            <div className="rounded-lg border border-[#E9EAEB] bg-white p-4">
              <div className="font-semibold text-[#181d27] mb-1">Abonnements</div>
              <div className="text-[#535862] text-sm leading-relaxed">
                Abonnez-vous à une salle pour recevoir des notifications (selon configuration serveur).
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-[#E9EAEB] bg-white p-4">
            <div className="font-semibold text-[#181d27] mb-2">Bonnes pratiques</div>
            <ul className="space-y-1 text-sm text-[#535862]">
              <li>Définissez des seuils réalistes (avec l’intendance).</li>
              <li>En cas d’alerte, vérifiez la salle et l’emplacement du capteur.</li>
              <li>Surveillez les valeurs incohérentes (capteur, calibration, ventilation, etc.).</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "api",
      title: "API (référence rapide)",
      description: "Liste des endpoints utiles (préfixe /api).",
      content: (
        <div className="space-y-4">
          <div className="rounded-lg border border-[#E9EAEB] bg-white p-4 overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#717680]">
                  <th className="py-2 pr-3 font-medium">Méthode</th>
                  <th className="py-2 pr-3 font-medium">Route</th>
                  <th className="py-2 pr-3 font-medium">Auth</th>
                  <th className="py-2 font-medium">But</th>
                </tr>
              </thead>
              <tbody className="text-[#535862]">
                {[
                  ["GET", "/health", "Public", "Health check"],
                  ["GET", "/rooms", "Public", "Lister les salles"],
                  ["GET", "/rooms/:id", "Public", "Détails d’une salle"],
                  ["GET", "/rooms/:roomId/history", "Public", "Historique d’une salle"],
                  ["PATCH", "/rooms/:id/thresholds", "JWT + ADMIN", "Mettre à jour les seuils"],
                  ["POST", "/rooms/:roomId/readings", "X-API-Key", "Ingérer des lectures (RPi)"],
                  ["GET", "/sensors", "Public", "Lister les capteurs"],
                  ["POST", "/sensors/readings", "X-API-Key", "Ingérer une lecture"],
                  ["POST", "/auth/login", "Public", "Connexion (JWT)"],
                  ["GET", "/auth/me", "JWT", "Profil utilisateur"],
                  ["GET", "/subscriptions/me", "Public", "Mes abonnements"],
                  ["POST", "/subscriptions/rooms/:roomId", "Public", "S’abonner"],
                  ["DELETE", "/subscriptions/rooms/:roomId", "Public", "Se désabonner"],
                  ["GET", "/users", "JWT + ADMIN", "Lister les utilisateurs"],
                  ["GET", "/alerts/me", "Public", "Mes alertes"],
                  ["GET", "/alerts", "JWT + ADMIN", "Toutes les alertes"],
                ].map(([method, route, auth, purpose]) => (
                  <tr key={`${method}:${route}`} className="border-t border-[#E9EAEB]">
                    <td className="py-2 pr-3 font-mono text-[#181d27]">{method}</td>
                    <td className="py-2 pr-3 font-mono">{route}</td>
                    <td className="py-2 pr-3">{auth}</td>
                    <td className="py-2">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-lg border border-[#E9EAEB] bg-white p-4">
            <div className="font-semibold text-[#181d27] mb-2">Headers importants</div>
            <ul className="space-y-1 text-sm text-[#535862]">
              <li>
                JWT: <span className="font-mono">Authorization: Bearer &lt;token&gt;</span>
              </li>
              <li>
                Raspberry Pi: <span className="font-mono">X-API-Key: &lt;RPI_API_KEY&gt;</span>
              </li>
              <li>
                Ingestion capteur: <span className="font-mono">serialNumber</span> (string) + <span className="font-mono">value</span> (number)
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "rpi",
      title: "Raspberry Pi (ingestion)",
      description: "Comment pousser des lectures vers l’API.",
      content: (
        <div className="space-y-4">
          <div className="rounded-lg border border-[#E9EAEB] bg-white p-4">
            <div className="font-semibold text-[#181d27] mb-2">Principe</div>
            <p className="text-sm text-[#535862] leading-relaxed">
              Le Raspberry Pi appelle l’API avec une clé partagée (<span className="font-mono">RPI_API_KEY</span>) via le header{" "}
              <span className="font-mono">X-API-Key</span>. Toute requête sans clé valide renvoie <span className="font-mono">401</span>.
            </p>
          </div>
          <div className="rounded-lg border border-[#E9EAEB] bg-white p-4">
            <div className="font-semibold text-[#181d27] mb-2">Exemples (curl)</div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-[#717680] mb-1">Lectures pour une salle</div>
                <pre className="rounded-lg bg-[#0B0F1A] text-[#E6E9F2] p-3 overflow-auto">{`curl -X POST "http://localhost:3000/api/rooms/<roomId>/readings" \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: <RPI_API_KEY>" \\
  -d '{ "temperature": 22.4, "humidity": 41.0 }'`}</pre>
              </div>
              <div>
                <div className="text-[#717680] mb-1">Lecture capteur</div>
                <pre className="rounded-lg bg-[#0B0F1A] text-[#E6E9F2] p-3 overflow-auto">{`curl -X POST "http://localhost:3000/api/sensors/readings" \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: <RPI_API_KEY>" \\
  -d '{ "serialNumber": "PHIDGET-123", "value": 22.4 }'`}</pre>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-[#FEF0C7] bg-[#FFFAEB] p-4">
            <div className="text-sm text-[#B54708]">
              Si vous obtenez <span className="font-mono">401 UNAUTHORIZED</span>, vérifiez <span className="font-mono">RPI_API_KEY</span> côté serveur
              et le header envoyé.
            </div>
          </div>
        </div>
      ),
    },
  ]

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="flex flex-col h-full">
        <div className="flex-1 py-10 px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-gradient-to-br from-[#7F56D9] to-[#9E77ED] flex items-center justify-center">
                  <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-[#181d27]">Documentation</h1>
                  <p className="text-sm text-[#535862]">
                    Une doc courte, vraie et maintenable (basée sur l’API et le repo).
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
              <aside className="lg:sticky lg:top-6 self-start">
                <div className="rounded-[10px] border border-[#E9EAEB] bg-white p-4">
                  <div className="text-sm font-semibold text-[#181d27] mb-3">Sommaire</div>
                  <nav className="space-y-1">
                    {sections.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => scrollTo(s.id)}
                        className="w-full text-left text-sm text-[#535862] hover:text-[#181d27] rounded-md px-2 py-1 hover:bg-[#FAFAFA]"
                      >
                        {s.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              <main className="space-y-6">
                {sections.map((s) => (
                  <section key={s.id} id={s.id} className="rounded-[10px] border border-[#E9EAEB] bg-white p-6 md:p-8">
                    <div className="mb-4">
                      <h2 className="text-xl md:text-2xl font-semibold text-[#181d27]">{s.title}</h2>
                      {s.description ? <p className="text-sm text-[#535862] mt-1">{s.description}</p> : null}
                    </div>
                    {s.content}
                  </section>
                ))}

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-white border border-[#E9EAEB] rounded-full px-6 py-3">
                    <span className="text-sm text-[#535862]">Une correction à faire ?</span>
                    <span className="text-sm font-medium text-[#6941C6] font-mono">code/front/src/components/DocumentationPage.tsx</span>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

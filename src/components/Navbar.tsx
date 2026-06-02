import { useState } from 'react'
import { useApp, type Page } from '../AppContext'

const navLinks: { label: string; page: Page }[] = [
  { label: 'Inicio', page: 'home' },
  { label: 'Servicios', page: 'services' },
  { label: 'Equipo', page: 'team' },
  { label: 'Reservar', page: 'booking' },
  { label: 'Contacto', page: 'contact' },
]

export default function Navbar() {
  const { currentPage, setPage } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (page: Page) => {
    setPage(page)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="bg-secondary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl">✨</span>
            <span className="text-primary text-2xl font-bold tracking-tight group-hover:opacity-90 transition-opacity">
              GlowStile
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:text-primary hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNav('booking')}
              className="ml-3 btn-primary text-sm py-2"
            >
              Reservar Cita
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-300 hover:text-primary p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-secondary border-t border-white/10 px-4 pb-4">
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => handleNav(page)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === page
                  ? 'text-primary bg-white/10'
                  : 'text-gray-300 hover:text-primary hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

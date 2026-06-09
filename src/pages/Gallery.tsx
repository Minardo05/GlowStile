import { useState } from 'react'
import { useApp } from '../AppContext'

const galleryItems = [
  { id: 1, title: "Corte Bob Moderno", category: "Corte", emoji: "✂️", gradient: "from-pink-200 to-rose-300", tag: "Después" },
  { id: 2, title: "Coloración Rubio Platino", category: "Color", emoji: "✨", gradient: "from-yellow-100 to-amber-200", tag: "Después" },
  { id: 3, title: "Mechas Balayage", category: "Color", emoji: "🎨", gradient: "from-amber-200 to-orange-300", tag: "Después" },
  { id: 4, title: "Keratina Brasileña", category: "Tratamiento", emoji: "💆", gradient: "from-teal-100 to-cyan-200", tag: "Resultado" },
  { id: 5, title: "Manicura Francesa", category: "Uñas", emoji: "💅", gradient: "from-pink-100 to-fuchsia-200", tag: "Después" },
  { id: 6, title: "Peinado de Novia", category: "Peinado", emoji: "👰", gradient: "from-purple-100 to-indigo-200", tag: "Especial" },
  { id: 7, title: "Limpieza Facial", category: "Estética", emoji: "🧖", gradient: "from-green-100 to-emerald-200", tag: "Resultado" },
  { id: 8, title: "Coloración Castaño", category: "Color", emoji: "🌰", gradient: "from-orange-200 to-amber-300", tag: "Después" },
  { id: 9, title: "Corte Degradé", category: "Corte", emoji: "💈", gradient: "from-blue-100 to-sky-200", tag: "Después" },
  { id: 10, title: "Uñas en Gel", category: "Uñas", emoji: "💎", gradient: "from-violet-100 to-purple-200", tag: "Después" },
  { id: 11, title: "Depilación Facial", category: "Estética", emoji: "🌿", gradient: "from-lime-100 to-green-200", tag: "Resultado" },
  { id: 12, title: "Peinado Ondas", category: "Peinado", emoji: "🌊", gradient: "from-cyan-100 to-blue-200", tag: "Después" },
]

const categories = ["Todos", "Corte", "Color", "Uñas", "Estética", "Peinado"]

const tagColors: Record<string, string> = {
  "Después": "bg-rose-500 text-white",
  "Resultado": "bg-emerald-500 text-white",
  "Especial": "bg-purple-500 text-white",
}

export default function Gallery() {
  const { setPage } = useApp()
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const filtered = activeCategory === "Todos"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-secondary text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-primary uppercase tracking-widest text-sm font-semibold mb-3">Inspiración</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestra Galería</h1>
          <p className="text-gray-300 text-lg">
            Descubre las transformaciones que hacemos realidad cada día en GlowStile.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(item => (
            <div
              key={item.id}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />

              {/* Emoji */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl drop-shadow-md select-none">{item.emoji}</span>
              </div>

              {/* Tag badge */}
              <div className="absolute top-3 right-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full shadow ${tagColors[item.tag] ?? "bg-gray-500 text-white"}`}>
                  {item.tag}
                </span>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-4">
                <p className="text-white text-sm font-semibold leading-tight">{item.title}</p>
                <p className="text-white/70 text-xs mt-0.5">{item.category}</p>
              </div>

              {/* Hover overlay */}
              <div
                className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredId === item.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  onClick={() => setPage('booking')}
                  className="bg-white text-secondary font-semibold text-sm px-5 py-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg font-medium">No hay fotos en esta categoría aún.</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="bg-secondary text-white py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-3">¿Lista para tu transformación?</h2>
          <p className="text-gray-300 mb-7">Reserva tu cita y únete a nuestra galería de estilos.</p>
          <button
            onClick={() => setPage('booking')}
            className="btn-primary"
          >
            Reservar Cita
          </button>
        </div>
      </section>
    </div>
  )
}

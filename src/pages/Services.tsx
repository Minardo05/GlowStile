import { useState } from 'react'
import { services } from '../data/services'
import { useApp } from '../AppContext'

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'cabello', label: 'Cabello' },
  { id: 'uñas', label: 'Uñas' },
  { id: 'estetica', label: 'Estética' },
]

export default function Services() {
  const { setPage } = useApp()
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory)

  return (
    <section className="py-16 px-4 bg-accent min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary text-center mb-2">Servicios</h1>
        <p className="text-center text-gray-500 mb-10">Elige el servicio que mejor se adapta a ti</p>

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-secondary border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {service.icon}
              </div>
              <h3 className="font-bold text-secondary text-lg mb-1">{service.name}</h3>
              <p className="text-gray-400 text-sm mb-4">Duración: {service.duration}</p>
              <p className="text-primary font-bold text-2xl mb-5">€{service.price}</p>
              <button
                onClick={() => setPage('booking')}
                className="btn-outline text-sm py-2 px-5 w-full"
              >
                Reservar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

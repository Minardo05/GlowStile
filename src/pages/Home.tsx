import { useApp } from '../AppContext'
import { services } from '../data/services'

export default function Home() {
  const { setPage } = useApp()

  const featured = services.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-primary uppercase tracking-widest text-sm font-semibold mb-4">Bienvenida / Bienvenido</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Tu belleza,<br />
            <span className="text-primary">nuestro arte</span>
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
            En GlowStile transformamos tu estilo con pasión y profesionalismo. Cortes, color, tratamientos y mucho más.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setPage('booking')} className="btn-primary">
              Reservar Cita
            </button>
            <button onClick={() => setPage('services')} className="btn-outline">
              Ver Servicios
            </button>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-primary text-white py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          {[
            { value: '8+', label: 'Años de experiencia' },
            { value: '500+', label: 'Clientes satisfechos' },
            { value: '4', label: 'Especialistas' },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-80 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured services */}
      <section className="py-20 px-4 bg-accent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary text-center mb-2">Nuestros Servicios</h2>
          <p className="text-center text-gray-500 mb-12">Una selección de lo que ofrecemos</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(service => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="font-semibold text-secondary text-lg mb-1">{service.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{service.duration}</p>
                <p className="text-primary font-bold text-xl">€{service.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => setPage('services')} className="btn-primary">
              Ver todos los servicios
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary text-white py-20 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">¿Lista/o para brillar?</h2>
          <p className="text-gray-300 mb-8">Reserva tu cita hoy y disfruta de una experiencia única en GlowStile.</p>
          <button onClick={() => setPage('booking')} className="btn-primary">
            Reservar Ahora
          </button>
        </div>
      </section>
    </div>
  )
}

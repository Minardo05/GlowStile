import { team } from '../data/team'
import { useApp } from '../AppContext'

export default function Team() {
  const { setPage } = useApp()

  return (
    <section className="py-16 px-4 bg-accent min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary text-center mb-2">Nuestro Equipo</h1>
        <p className="text-center text-gray-500 mb-14">
          Profesionales apasionados por la belleza y el cuidado personal
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map(member => (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-6xl mb-4">{member.emoji}</div>
              <h3 className="font-bold text-secondary text-xl mb-1">{member.name}</h3>
              <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
              <p className="text-gray-400 text-sm">{member.specialty}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-secondary rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">¿Quieres conocernos en persona?</h2>
          <p className="text-gray-300 mb-6">Visítanos o reserva tu cita con tu especialista favorito.</p>
          <button onClick={() => setPage('booking')} className="btn-primary">
            Reservar con un especialista
          </button>
        </div>
      </div>
    </section>
  )
}

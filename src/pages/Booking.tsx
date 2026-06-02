import { useState } from 'react'
import { services } from '../data/services'
import { team } from '../data/team'

type FormState = {
  name: string
  phone: string
  email: string
  fechaNacimiento: string
  service: string
  specialist: string
  date: string
  time: string
  notes: string
}

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30']

export default function Booking() {
  const [form, setForm] = useState<FormState>({
    name: '', phone: '', email: '', fechaNacimiento: '', service: '', specialist: '', date: '', time: '', notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="py-24 px-4 bg-accent min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-secondary mb-3">¡Cita solicitada!</h2>
          <p className="text-gray-500 mb-4">
            Gracias <strong>{form.name}</strong>. Nos pondremos en contacto contigo a través de
            <strong> {form.email || form.phone}</strong> para confirmar tu cita.
          </p>
          <p className="text-gray-500 mb-6">¡Te enviaremos un saludo especial en tu cumpleaños! 🎂</p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name:'', phone:'', email:'', fechaNacimiento:'', service:'', specialist:'', date:'', time:'', notes:'' }) }}
            className="btn-primary"
          >
            Nueva reserva
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-accent min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary text-center mb-2">Reservar Cita</h1>
        <p className="text-center text-gray-500 mb-10">Rellena el formulario y te contactaremos para confirmar</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
          {/* Personal info */}
          <div>
            <h3 className="font-semibold text-secondary mb-4 text-lg border-b border-gray-100 pb-2">
              Datos personales
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Nombre *</label>
                <input
                  type="text" name="name" required value={form.name} onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Teléfono *</label>
                <input
                  type="tel" name="phone" required value={form.phone} onChange={handleChange}
                  placeholder="+34 600 000 000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                🎂 Fecha de Nacimiento *
              </label>
              <input
                type="date" name="fechaNacimiento" required value={form.fechaNacimiento} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              />
            </div>
          </div>

          {/* Service selection */}
          <div>
            <h3 className="font-semibold text-secondary mb-4 text-lg border-b border-gray-100 pb-2">
              Servicio y especialista
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Servicio *</label>
                <select
                  name="service" required value={form.service} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white"
                >
                  <option value="">Selecciona un servicio</option>
                  {services.map(s => (
                    <option key={s.id} value={s.name}>{s.icon} {s.name} — €{s.price}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Especialista</label>
                <select
                  name="specialist" value={form.specialist} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white"
                >
                  <option value="">Sin preferencia</option>
                  {team.map(t => (
                    <option key={t.id} value={t.name}>{t.emoji} {t.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Date & time */}
          <div>
            <h3 className="font-semibold text-secondary mb-4 text-lg border-b border-gray-100 pb-2">
              Fecha y hora
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Fecha *</label>
                <input
                  type="date" name="date" required value={form.date} onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Hora *</label>
                <select
                  name="time" required value={form.time} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white"
                >
                  <option value="">Selecciona hora</option>
                  {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Notas adicionales</label>
            <textarea
              name="notes" value={form.notes} onChange={handleChange}
              rows={3} placeholder="Alguna preferencia o información adicional..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none"
            />
          </div>

          <button type="submit" className="btn-primary w-full text-base py-4">
            Solicitar Cita
          </button>
        </form>
      </div>
    </section>
  )
}

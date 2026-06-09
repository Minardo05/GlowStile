import { useState, useEffect } from 'react'
import { useApp } from '../AppContext'
import {
  type Appointment,
  getAppointments,
  cancelAppointment,
} from '../utils/appointments'

const STORAGE_KEY = 'glowstile_appointments'

// Seed mock appointments when localStorage is empty
const seedMockAppointments = (): Appointment[] => {
  const now = new Date()
  const addDays = (d: number) => {
    const dt = new Date(now)
    dt.setDate(dt.getDate() + d)
    return dt.toISOString().split('T')[0]
  }

  const mock: Appointment[] = [
    {
      id: 'mock-1',
      clientName: 'Ana Pérez',
      phone: '+34 612 345 678',
      email: 'ana@email.com',
      service: 'Coloración',
      specialist: 'María García',
      date: addDays(3),
      time: '10:00',
      notes: 'Tono castaño oscuro',
      status: 'confirmed',
      createdAt: new Date(now.getTime() - 2 * 24 * 3600 * 1000).toISOString(),
    },
    {
      id: 'mock-2',
      clientName: 'Laura Gómez',
      phone: '+34 698 765 432',
      email: 'laura@email.com',
      service: 'Manicura',
      specialist: 'Laura Sánchez',
      date: addDays(7),
      time: '16:30',
      status: 'pending',
      createdAt: new Date(now.getTime() - 1 * 24 * 3600 * 1000).toISOString(),
    },
    {
      id: 'mock-3',
      clientName: 'Sofía Ruiz',
      phone: '+34 677 111 222',
      email: 'sofia@email.com',
      service: 'Limpieza Facial',
      specialist: 'Ana Martínez',
      date: addDays(14),
      time: '11:00',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'mock-4',
      clientName: 'Elena Torres',
      phone: '+34 655 333 444',
      email: 'elena@email.com',
      service: 'Corte de Cabello',
      specialist: 'Carlos López',
      date: addDays(-5),
      time: '09:30',
      status: 'cancelled',
      createdAt: new Date(now.getTime() - 10 * 24 * 3600 * 1000).toISOString(),
    },
  ]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(mock))
  return mock
}

const serviceEmojis: Record<string, string> = {
  'Corte de Cabello': '✂️',
  'Coloración': '🎨',
  'Mechas/Highlights': '✨',
  'Tratamiento Keratina': '💆',
  'Manicura': '💅',
  'Pedicura': '🦶',
  'Depilación Facial': '🌿',
  'Limpieza Facial': '🧖',
}

const getServiceEmoji = (service: string): string =>
  serviceEmojis[service] ?? '📅'

const formatDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const isFuture = (dateStr: string, timeStr: string): boolean => {
  const [year, month, day] = dateStr.split('-').map(Number)
  const [hours, minutes] = timeStr.split(':').map(Number)
  const dt = new Date(year, month - 1, day, hours, minutes)
  return dt > new Date()
}

const isThisMonth = (dateStr: string): boolean => {
  const [year, month] = dateStr.split('-').map(Number)
  const now = new Date()
  return year === now.getFullYear() && month === now.getMonth() + 1
}

const statusConfig = {
  confirmed: {
    label: 'Confirmada',
    classes: 'bg-green-100 text-green-700 border border-green-200',
  },
  pending: {
    label: 'Pendiente',
    classes: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  },
  cancelled: {
    label: 'Cancelada',
    classes: 'bg-gray-100 text-gray-500 border border-gray-200',
  },
}

export default function Appointments() {
  const { setPage } = useApp()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  useEffect(() => {
    const stored = getAppointments()
    if (stored.length === 0) {
      setAppointments(seedMockAppointments())
    } else {
      setAppointments(stored)
    }
  }, [])

  const handleCancel = (id: string) => {
    cancelAppointment(id)
    setAppointments(getAppointments())
    setCancellingId(null)
  }

  const sorted = [...appointments].sort((a, b) =>
    `${a.date}T${a.time}` < `${b.date}T${b.time}` ? -1 : 1
  )

  const total = appointments.length
  const thisMonth = appointments.filter(
    (a) => a.status !== 'cancelled' && isThisMonth(a.date)
  ).length
  const nextApt = sorted.find(
    (a) => a.status !== 'cancelled' && isFuture(a.date, a.time)
  )

  return (
    <section className="py-16 px-4 bg-accent min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-secondary">Mis Citas</h1>
            <p className="text-gray-500 mt-1">Gestiona tus reservas</p>
          </div>
          <button
            onClick={() => setPage('booking')}
            className="btn-primary whitespace-nowrap self-start sm:self-auto"
          >
            + Nueva Cita
          </button>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-3xl font-bold text-secondary">{total}</p>
            <p className="text-xs text-gray-500 mt-1">Total citas</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-sm font-semibold text-secondary leading-tight">
              {nextApt
                ? new Date(
                    Number(nextApt.date.split('-')[0]),
                    Number(nextApt.date.split('-')[1]) - 1,
                    Number(nextApt.date.split('-')[2])
                  ).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
                : '—'}
            </p>
            <p className="text-xs text-gray-500 mt-1">Próxima cita</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-3xl font-bold text-secondary">{thisMonth}</p>
            <p className="text-xs text-gray-500 mt-1">Citas este mes</p>
          </div>
        </div>

        {/* Empty state */}
        {sorted.length === 0 && (
          <div className="bg-white rounded-2xl p-16 shadow-sm text-center">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-bold text-secondary mb-2">No tienes citas</h2>
            <p className="text-gray-500 mb-6">¡Reserva tu primera cita y luce increíble!</p>
            <button onClick={() => setPage('booking')} className="btn-primary">
              Reservar ahora
            </button>
          </div>
        )}

        {/* Appointment cards */}
        <div className="space-y-4">
          {sorted.map((apt) => {
            const future = isFuture(apt.date, apt.time)
            const status = statusConfig[apt.status]
            const isCancelling = cancellingId === apt.id

            return (
              <div
                key={apt.id}
                className={`bg-white rounded-2xl p-6 shadow-sm transition-opacity ${
                  apt.status === 'cancelled' ? 'opacity-60' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  {/* Left: service info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="text-4xl flex-shrink-0 mt-0.5">
                      {getServiceEmoji(apt.service)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-secondary text-lg">{apt.service}</h3>
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${status.classes}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        con <span className="font-medium text-gray-700">{apt.specialist || 'Sin preferencia'}</span>
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <span>📅</span>
                          <span className="capitalize">{formatDate(apt.date)}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span>🕐</span>
                          {apt.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>👤</span>
                          {apt.clientName}
                        </span>
                      </div>
                      {apt.notes && (
                        <p className="mt-2 text-sm text-gray-400 italic">"{apt.notes}"</p>
                      )}
                    </div>
                  </div>

                  {/* Right: cancel button */}
                  {future && apt.status !== 'cancelled' && (
                    <div className="flex-shrink-0 self-start">
                      {isCancelling ? (
                        <div className="flex flex-col items-end gap-2">
                          <p className="text-sm text-gray-600 font-medium">¿Cancelar cita?</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setCancellingId(null)}
                              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                            >
                              No
                            </button>
                            <button
                              onClick={() => handleCancel(apt.id)}
                              className="text-xs px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                            >
                              Sí, cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setCancellingId(apt.id)}
                          className="text-xs px-3 py-2 rounded-xl border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 transition"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

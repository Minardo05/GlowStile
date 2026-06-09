export interface Appointment {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  fechaNacimiento?: string;
  service: string;
  specialist: string;
  date: string;
  time: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

const STORAGE_KEY = 'glowstile_appointments';

export const getAppointments = (): Appointment[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Appointment[];
  } catch {
    return [];
  }
};

const persistAppointments = (appointments: Appointment[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};

export const saveAppointment = (
  apt: Omit<Appointment, 'id' | 'createdAt' | 'status'>
): Appointment => {
  const newApt: Appointment = {
    ...apt,
    id: crypto.randomUUID(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  const existing = getAppointments();
  persistAppointments([...existing, newApt]);
  return newApt;
};

export const cancelAppointment = (id: string): void => {
  const appointments = getAppointments().map((apt) =>
    apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
  );
  persistAppointments(appointments);
};

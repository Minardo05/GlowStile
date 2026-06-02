import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="py-16 px-4 bg-accent min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary text-center mb-2">Contacto</h1>
        <p className="text-center text-gray-500 mb-14">Estamos aquí para ayudarte</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-secondary text-xl mb-5">Información</h2>
              {[
                { icon: '📍', label: 'Dirección', value: 'Calle Gran Vía 42, Madrid 28013' },
                { icon: '📞', label: 'Teléfono', value: '+34 91 123 45 67' },
                { icon: '✉️', label: 'Email', value: 'hola@glowstile.es' },
                { icon: '🕐', label: 'Horario', value: 'Lun–Vie 9:00–20:00 · Sáb 9:00–18:00' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4 mb-4 last:mb-0">
                  <span className="text-2xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{item.label}</p>
                    <p className="text-secondary font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="bg-secondary rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Síguenos</h3>
              <div className="flex gap-4">
                {['📸 Instagram', '🎵 TikTok', '📘 Facebook'].map(s => (
                  <span key={s} className="bg-white/10 px-3 py-2 rounded-full text-sm cursor-pointer hover:bg-primary transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {sent ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">💌</div>
                <h3 className="text-2xl font-bold text-secondary mb-2">¡Mensaje enviado!</h3>
                <p className="text-gray-500 mb-6">Te responderemos lo antes posible.</p>
                <button onClick={() => { setSent(false); setForm({ name:'', email:'', message:'' }) }} className="btn-primary">
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-secondary text-xl mb-6">Envíanos un mensaje</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Nombre *</label>
                    <input
                      type="text" name="name" required value={form.name} onChange={handleChange}
                      placeholder="Tu nombre"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email *</label>
                    <input
                      type="email" name="email" required value={form.email} onChange={handleChange}
                      placeholder="tu@email.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Mensaje *</label>
                    <textarea
                      name="message" required value={form.message} onChange={handleChange}
                      rows={5} placeholder="¿En qué podemos ayudarte?"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full py-3">
                    Enviar Mensaje
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

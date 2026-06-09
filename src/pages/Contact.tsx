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

            {/* WhatsApp CTA */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-secondary text-xl mb-3">WhatsApp</h2>
              <p className="text-gray-500 text-sm mb-4">¿Prefieres escribirnos directamente? Estamos en WhatsApp.</p>
              <a
                href="https://wa.me/5491100000000?text=Hola%20GlowStile%2C%20quiero%20hacer%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full text-white font-semibold shadow hover:opacity-90 transition"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L.057 23.882l6.198-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.5-5.188-1.375l-.371-.22-3.843 1.007 1.027-3.748-.242-.385A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Chatear por WhatsApp
              </a>
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

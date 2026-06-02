import { useState } from 'react'
import { AppContext, type Page } from './AppContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Services from './pages/Services'
import Team from './pages/Team'
import Booking from './pages/Booking'
import Contact from './pages/Contact'

function App() {
  const [currentPage, setPage] = useState<Page>('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':     return <Home />
      case 'services': return <Services />
      case 'team':     return <Team />
      case 'booking':  return <Booking />
      case 'contact':  return <Contact />
    }
  }

  return (
    <AppContext.Provider value={{ currentPage, setPage }}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {renderPage()}
        </main>
        <footer className="bg-secondary text-gray-400 text-center py-6 text-sm">
          <p>© {new Date().getFullYear()} GlowStile · Todos los derechos reservados</p>
        </footer>
      </div>
    </AppContext.Provider>
  )
}

export default App

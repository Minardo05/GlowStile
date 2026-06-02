import { createContext, useContext } from 'react'

export type Page = 'home' | 'services' | 'team' | 'booking' | 'contact'

interface AppContextType {
  currentPage: Page
  setPage: (page: Page) => void
}

export const AppContext = createContext<AppContextType>({
  currentPage: 'home',
  setPage: () => {},
})

export const useApp = () => useContext(AppContext)

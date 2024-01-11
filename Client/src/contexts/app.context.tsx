import { createContext, useState } from 'react'

interface AppContextInterface {
  isOpenLoginDialog: boolean
  setIsOpenLoginDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
  isOpenLoginDialog: false,
  setIsOpenLoginDialog: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenLoginDialog, setIsOpenLoginDialog] = useState<boolean>(initialAppContext.isOpenLoginDialog)
  return <AppContext.Provider value={{ isOpenLoginDialog, setIsOpenLoginDialog }}>{children}</AppContext.Provider>
}

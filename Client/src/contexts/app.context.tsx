import { createContext, useState } from 'react'

export interface AppContextInterface {
  isOpenLoginDialog: boolean
  setIsOpenLoginDialog: React.Dispatch<React.SetStateAction<boolean>>
  isOpenRegisterDialog: boolean
  setIsOpenRegisterDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
  isOpenLoginDialog: false,
  setIsOpenLoginDialog: () => null,
  isOpenRegisterDialog: false,
  setIsOpenRegisterDialog: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenLoginDialog, setIsOpenLoginDialog] = useState<boolean>(initialAppContext.isOpenLoginDialog)
  const [isOpenRegisterDialog, setIsOpenRegisterDialog] = useState<boolean>(initialAppContext.isOpenRegisterDialog)
  return (
    <AppContext.Provider
      value={{ isOpenLoginDialog, setIsOpenLoginDialog, isOpenRegisterDialog, setIsOpenRegisterDialog }}
    >
      {children}
    </AppContext.Provider>
  )
}

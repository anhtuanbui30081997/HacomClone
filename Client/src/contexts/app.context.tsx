import { createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/out'

export interface AppContextInterface {
  isOpenLoginDialog: boolean
  setIsOpenLoginDialog: React.Dispatch<React.SetStateAction<boolean>>
  isOpenRegisterDialog: boolean
  setIsOpenRegisterDialog: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
  isOpenLoginDialog: false,
  setIsOpenLoginDialog: () => null,
  isOpenRegisterDialog: false,
  setIsOpenRegisterDialog: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenLoginDialog, setIsOpenLoginDialog] = useState<boolean>(initialAppContext.isOpenLoginDialog)
  const [isOpenRegisterDialog, setIsOpenRegisterDialog] = useState<boolean>(initialAppContext.isOpenRegisterDialog)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  return (
    <AppContext.Provider
      value={{
        isOpenLoginDialog,
        setIsOpenLoginDialog,
        isOpenRegisterDialog,
        setIsOpenRegisterDialog,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

import { createContext, useContext, useMemo } from "react"

//context
export const ProfileContext = createContext({})

//hook
export const useMapContext = () => useContext(ProfileContext)

//provider
export const ProfileContextProvider = ({ children }) => {
  const value = useMemo(() => ({

  }),
    [])
  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}
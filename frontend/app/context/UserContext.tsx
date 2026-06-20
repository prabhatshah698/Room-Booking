"use client"

import {
  createContext,
  useContext,
  useState
} from "react"

interface UserContextType {
  userName: string
  setUserName: (
    name: string
  ) => void

  profileImage: string
  setProfileImage: (
    image: string
  ) => void
}

const UserContext =
  createContext<
    UserContextType | undefined
  >(undefined)

export function UserProvider({
  children
}: {
  children: React.ReactNode
}) {

  const [
    userName,
    setUserName
  ] = useState("user")

  const [
    profileImage,
    setProfileImage
  ] = useState("/avatar.png")

  return (

    <UserContext.Provider
      value={{
        userName,
        setUserName,
        profileImage,
        setProfileImage
      }}
    >
      {children}
    </UserContext.Provider>

  )
}

export const useUser = () => {

  const context =
    useContext(UserContext)

  if (!context) {

    throw new Error(
      "useUser must be used inside UserProvider"
    )
  }

  return context
}
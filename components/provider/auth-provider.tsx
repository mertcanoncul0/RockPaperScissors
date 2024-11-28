'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner'

type User = {
  id: string
  email: string
  username: string
  score: number
}

type Options = {
  winningScore: number
  moves: string[]
}

type Game = {
  user: number
  gpu: number
  userMove: string
  gpuMove: string
  isGameOver?: boolean
}

interface AuthContextType {
  isAuthenticated: boolean
  setAuthenticated: (isAuthenticated: boolean) => void
  user: User
  setUser: (user: User) => void
  options: Options
  setOptions: (options: Options) => void
  isLoading: boolean
  game: Game
  setGame: (game: Game) => void
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  setAuthenticated: () => {},
  user: {
    id: '',
    email: '',
    username: '',
    score: 0,
  },
  setUser: () => {},
  options: {
    winningScore: 3,
    moves: ['rock', 'paper', 'scissors'],
  },
  setOptions: () => {},
  isLoading: false,
  game: {
    gpu: 0,
    user: 0,
    userMove: '',
    gpuMove: '',
    isGameOver: false,
  },
  setGame: () => {},
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<User>(defaultAuthContext.user)
  const [options, setOptions] = useState<Options>(defaultAuthContext.options)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [game, setGame] = useState<Game>(defaultAuthContext.game)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch('/api/auth', { credentials: 'include' })

        if (res.ok) {
          const data = await res.json()
          setIsAuthenticated(true)
          setUser(data)
          setIsLoading(false)
        } else {
          setIsAuthenticated(false)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Failed to check authentication status', error)
        setIsAuthenticated(false)
        setIsLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        options,
        setOptions,
        setUser,
        setAuthenticated: setIsAuthenticated,
        isLoading,
        game,
        setGame,
      }}
    >
      <NextUIProvider>
        {children}
        <Toaster />
      </NextUIProvider>
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

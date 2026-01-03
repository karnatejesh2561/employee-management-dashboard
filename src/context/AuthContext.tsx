import { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
    isAuthenticated: boolean
    user: { email: string } | null
    login: (email: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<{ email: string } | null>(null)

    // Check localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('authUser')
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser)
                setUser(parsedUser)
                setIsAuthenticated(true)
            } catch (e) {
                localStorage.removeItem('authUser')
            }
        }
    }, [])

    const login = (email: string) => {
        const userData = { email }
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem('authUser', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem('authUser')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

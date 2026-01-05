import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <nav className="bg-gradient-to-r from-white to-purple-50  border-b border-purple-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                EMD
                            </Link>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white transition rounded-lg hover:from-red-600 hover:to-pink-600"
                            >
                                <LogOut size={18} />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {children}
            </main>

            <footer className="bg-gradient-to-r from-white to-purple-50 border-t border-purple-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <p className="text-gray-600 text-center text-sm">
                        © 2024 Employee Management System. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EmployeeForm from './pages/EmployeeForm'
import EmployeeDetail from './pages/EmployeeDetail'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
    const { isAuthenticated } = useAuth()

    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
                path="/*"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/add" element={<EmployeeForm />} />
                                <Route path="/edit/:id" element={<EmployeeForm />} />
                                <Route path="/employee/:id" element={<EmployeeDetail />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
    )
}

export default App

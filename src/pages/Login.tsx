import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const loginSchema = yup.object().shape({
    email: yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
})

type LoginFormInputs = yup.InferType<typeof loginSchema>

export default function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema)
    })

    const onSubmit = (data: LoginFormInputs) => {
        // Simple login - in real app, you'd verify credentials with backend
        login(data.email)
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-3 sm:p-4">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 sm:w-80 sm:h-80 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 sm:opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 sm:w-80 sm:h-80 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 sm:opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 sm:w-80 sm:h-80 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 sm:opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-200/30 relative z-10">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-xl sm:text-2xl md:text-[28px] font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight">
                        Welcome to Employee Management
                    </h1>
                    <p className="text-xs sm:text-sm md:text-lg text-gray-600 mt-2 sm:mt-3">Professional HR Management System</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                    <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register('email')}
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-900 placeholder-gray-400 text-sm sm:text-base ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.email && (
                            <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register('password')}
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-900 placeholder-gray-400 text-sm sm:text-base ${errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.password && (
                            <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 sm:py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 font-semibold transition transform  text-sm sm:text-base active:scale-95"
                    >
                        Sign In
                    </button>
                </form>

                {/* <div className="mt-6 p-4 bg-blue-100 rounded-lg border border-blue-300">
                    <p className="text-sm text-gray-800 text-center font-medium">
                        <span className="text-purple-600 font-bold">Demo Credentials:</span><br />
                        <span className="text-gray-700">Email: demo@company.com</span><br />
                        <span className="text-gray-700">Password: password123</span>
                    </p>
                </div> */}
            </div>
        </div>
    )
}

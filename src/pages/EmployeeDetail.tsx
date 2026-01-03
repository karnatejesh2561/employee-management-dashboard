import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEmployeeStore } from '../hooks/useEmployeeStore'

export default function EmployeeDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getEmployee, deleteEmployee } = useEmployeeStore()

    const employee = getEmployee(id!)

    if (!employee) {
        return (
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Employee not found</h1>
                <Link to="/" className="text-purple-600 hover:text-purple-700 font-bold">
                    Back to Dashboard
                </Link>
            </div>
        )
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            deleteEmployee(employee.id)
            navigate('/')
        }
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {employee.firstName} {employee.lastName}
                    </h1>
                    <p className="text-gray-700 mt-2">{employee.position} at {employee.department}</p>
                </div>
                <div className="flex gap-2">
                    <Link
                        to={`/edit/${employee.id}`}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-amber-600 hover:to-orange-700 font-bold transition transform hover:scale-105"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-pink-700 font-bold transition transform hover:scale-105"
                    >
                        Delete
                    </button>
                    <Link
                        to="/"
                        className="bg-gradient-to-r from-gray-600 to-slate-700 text-white px-6 py-3 rounded-lg hover:from-gray-700 hover:to-slate-800 font-bold transition transform hover:scale-105"
                    >
                        Back
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/95 border border-purple-200 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        Personal Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-700 text-sm font-semibold">Email</p>
                            <p className="text-gray-900 font-bold text-lg">{employee.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-700 text-sm font-semibold">Phone</p>
                            <p className="text-gray-900 font-bold text-lg">{employee.phone}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/95 border border-purple-200 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        Status
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-700 text-sm font-semibold">Current Status</p>
                            <span
                                className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${employee.status === 'Active'
                                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                                    : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                                    }`}
                            >
                                {employee.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white/95 border border-purple-200 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        Work Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-700 text-sm font-semibold">Department</p>
                            <p className="text-gray-900 font-bold text-lg">{employee.department}</p>
                        </div>
                        <div>
                            <p className="text-gray-700 text-sm font-semibold">Position</p>
                            <p className="text-gray-900 font-bold text-lg">{employee.position}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/95 border border-purple-200 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        Employment Details
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-700 text-sm font-semibold">Join Date</p>
                            <p className="text-gray-900 font-bold text-lg">
                                {new Date(employee.joinDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 text-sm font-semibold">Salary</p>
                            <p className="text-gray-900 font-bold text-lg">
                                ${employee.salary.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

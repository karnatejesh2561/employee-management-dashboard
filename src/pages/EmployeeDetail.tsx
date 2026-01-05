import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEmployeeStore } from '../hooks/useEmployeeStore'
import AvatarDisplay from '../components/AvatarDisplay'
import { Edit, Trash2, ArrowLeft } from 'lucide-react'

export default function EmployeeDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getEmployee, deleteEmployee } = useEmployeeStore()

    const employee = getEmployee(id!)

    if (!employee) {
        return (
            <div className="text-center py-12 px-4">
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Top Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start flex-1">
                    <AvatarDisplay
                        firstName={employee.firstName}
                        lastName={employee.lastName}
                        avatar={(employee as any).avatar}
                        size="lg"
                    />
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            {employee.firstName} {employee.lastName}
                        </h1>
                        <p className="text-gray-700 mt-1 sm:mt-2 text-sm sm:text-base">
                            {employee.position} at {employee.department}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
                    <Link
                        to={`/edit/${employee.id}`}
                        className="flex items-center gap-2 bg-white border-2 border-amber-500 text-amber-600 px-4 sm:px-6 py-2 rounded-lg hover:bg-amber-50 font-bold transition text-sm sm:text-base"
                    >
                        <Edit size={16} />
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 bg-white border-2 border-red-500 text-red-600 px-4 sm:px-6 py-2 rounded-lg hover:bg-red-50 font-bold transition text-sm sm:text-base"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-white border-2 border-gray-400 text-gray-700 px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-50 font-bold transition text-sm sm:text-base"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </Link>
                </div>
            </div>

            {/* Employee Info Section */}
            <div className="bg-white/95 border border-purple-200 p-6 sm:p-8 rounded-xl">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 text-center sm:text-left">
                    Employee Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Column 1 */}
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-600 text-sm font-semibold">Email</p>
                            <p className="text-gray-900 font-bold text-base break-all">{employee.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm font-semibold">Phone</p>
                            <p className="text-gray-900 font-bold text-base">{employee.phone}</p>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-600 text-sm font-semibold">Department</p>
                            <p className="text-gray-900 font-bold text-base">{employee.department}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm font-semibold">Position</p>
                            <p className="text-gray-900 font-bold text-base">{employee.position}</p>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-600 text-sm font-semibold">Join Date</p>
                            <p className="text-gray-900 font-bold text-base">
                                {new Date(employee.joinDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm font-semibold">Salary</p>
                            <p className="text-gray-900 font-bold text-base">
                                ${employee.salary.toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm font-semibold">Status</p>
                            <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 ${employee.status === 'Active'
                                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                                        : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                                    }`}
                            >
                                {employee.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import { Link } from 'react-router-dom'
import { Employee } from '../types'

interface EmployeeTableProps {
    employees: Employee[]
    onDelete: (id: string) => void
}

export default function EmployeeTable({ employees, onDelete }: EmployeeTableProps) {
    return (
        <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-xl shadow-xl border border-purple-200">
                <table className="w-full border-collapse bg-white">
                    <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-bold">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-bold">Department</th>
                            <th className="px-6 py-4 text-left text-sm font-bold">Position</th>
                            <th className="px-6 py-4 text-left text-sm font-bold">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr
                                key={employee.id}
                                className={`border-b border-purple-100 transition hover:bg-purple-100/40 ${index % 2 === 0 ? 'bg-white' : 'bg-purple-50'
                                    }`}
                            >
                                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                                    {employee.firstName} {employee.lastName}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{employee.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{employee.department}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{employee.position}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold ${employee.status === 'Active'
                                            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                                            : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                                            }`}
                                    >
                                        {employee.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm flex gap-2">
                                    <Link
                                        to={`/employee/${employee.id}`}
                                        className="text-cyan-600 hover:text-cyan-700 font-bold transition transform hover:scale-110"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to={`/edit/${employee.id}`}
                                        className="text-amber-600 hover:text-amber-700 font-bold transition transform hover:scale-110"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this employee?')) {
                                                onDelete(employee.id)
                                            }
                                        }}
                                        className="text-red-600 hover:text-red-700 font-bold transition transform hover:scale-110"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {employees.map((employee) => (
                    <div
                        key={employee.id}
                        className="bg-white border border-purple-200 rounded-lg shadow-lg p-5 hover:shadow-xl transition"
                    >
                        <div className="mb-4 pb-4 border-b border-purple-100">
                            <h3 className="text-lg font-bold text-gray-900">
                                {employee.firstName} {employee.lastName}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{employee.email}</p>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-semibold text-gray-700">Department:</span>
                                <span className="text-sm text-gray-900 font-medium">{employee.department}</span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-semibold text-gray-700">Position:</span>
                                <span className="text-sm text-gray-900 font-medium">{employee.position}</span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-semibold text-gray-700">Join Date:</span>
                                <span className="text-sm text-gray-900 font-medium">
                                    {new Date(employee.joinDate).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-semibold text-gray-700">Status:</span>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${employee.status === 'Active'
                                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                                        : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                                        }`}
                                >
                                    {employee.status}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-purple-100">
                            <Link
                                to={`/employee/${employee.id}`}
                                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-2 rounded-lg font-semibold text-center text-sm hover:from-cyan-600 hover:to-blue-600 transition"
                            >
                                View
                            </Link>
                            <Link
                                to={`/edit/${employee.id}`}
                                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-2 rounded-lg font-semibold text-center text-sm hover:from-amber-600 hover:to-orange-600 transition"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this employee?')) {
                                        onDelete(employee.id)
                                    }
                                }}
                                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-lg font-semibold text-center text-sm hover:from-red-600 hover:to-pink-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

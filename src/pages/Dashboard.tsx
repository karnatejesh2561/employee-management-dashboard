import { useState, useMemo } from 'react'
import { useEmployeeStore } from '../hooks/useEmployeeStore'
import EmployeeTable from '../components/EmployeeTable'
import CustomSelect from '../components/CustomSelect'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

export default function Dashboard() {
    const { employees, deleteEmployee, searchEmployees } = useEmployeeStore()
    const [searchTerm, setSearchTerm] = useState('')
    const [filterDepartment, setFilterDepartment] = useState('')
    const [filterStatus, setFilterStatus] = useState('')

    const filteredEmployees = useMemo(() => {
        let result = searchTerm ? searchEmployees(searchTerm) : employees

        if (filterDepartment) {
            result = result.filter(emp => emp.department === filterDepartment)
        }

        if (filterStatus) {
            result = result.filter(emp => emp.status === filterStatus)
        }

        return result
    }, [employees, searchTerm, filterDepartment, filterStatus, searchEmployees])

    const departments = [...new Set(employees.map(emp => emp.department))]

    const totalEmployees = employees.length
    const activeEmployees = employees.filter(emp => emp.status === 'Active').length
    const inactiveEmployees = employees.filter(emp => emp.status === 'Inactive').length


    return (
        <div>
            <div className="mb-8 flex flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-4xl font-bold text-black">
                    Employees
                </h1>
                <Link
                    to="/add"
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 md:px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 font-medium text-sm md:text-base transition transform"
                >
                    <Plus size={18} />
                    <span className="hidden sm:inline">Add Employee</span>
                    <span className="sm:hidden">Add</span>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
                    <p className="text-gray-500 font-medium">Total Employees</p>
                    <p className="text-2xl font-bold text-purple-600">{totalEmployees}</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
                    <p className="text-gray-500 font-medium">Active Employees</p>
                    <p className="text-2xl font-bold text-green-600">{activeEmployees}</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
                    <p className="text-gray-500 font-medium">Inactive Employees</p>
                    <p className="text-2xl font-bold text-red-600">{inactiveEmployees}</p>
                </div>
            </div>

            <div className="bg-white/95 border border-gray-200 p-6 rounded-xl mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Search Employees
                        </label>
                        <input
                            type="text"
                            placeholder="Search by name, email, or department..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                        />
                    </div>

                    <div>

                        <CustomSelect
                            options={[
                                { value: '', label: 'All Departments' },
                                ...departments.map(dept => ({ value: dept, label: dept }))
                            ]}
                            value={filterDepartment}
                            onChange={(e) => setFilterDepartment(e.target.value)}
                            label="Department"
                        />
                    </div>

                    <div>

                        <CustomSelect
                            options={[
                                { value: '', label: 'All Status' },
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' }
                            ]}
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            label="Status"
                        />
                    </div>
                </div>

                <p className="text-gray-700 text-sm font-medium">
                    Showing <span className="font-bold text-purple-600">{filteredEmployees.length}</span> of <span className="font-bold text-purple-600">{employees.length}</span> employees
                </p>
            </div>

            {filteredEmployees.length === 0 ? (
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-12 rounded-xl  text-center border border-purple-300">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">No employees found</h2>
                    <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
            ) : (
                <EmployeeTable
                    employees={filteredEmployees}
                    onDelete={deleteEmployee}
                />
            )}
        </div>
    )
}

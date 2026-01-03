import { useState, useMemo } from 'react'
import { useEmployeeStore } from '../hooks/useEmployeeStore'
import EmployeeTable from '../components/EmployeeTable'
import CustomSelect from '../components/CustomSelect'

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

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    Welcome Back
                </h1>
            </div>

            <div className="bg-white/95 border border-purple-200 p-6 rounded-xl shadow-lg mb-8">
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
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-12 rounded-xl shadow-lg text-center border border-purple-300">
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

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEmployeeStore } from '../hooks/useEmployeeStore'
import CustomSelect from '../components/CustomSelect'
import { Employee } from '../types'

const employeeSchema = yup.object().shape({
    firstName: yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters'),
    lastName: yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters'),
    email: yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    phone: yup.string()
        .required('Phone is required')
        .matches(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
    department: yup.string()
        .required('Department is required'),
    position: yup.string()
        .required('Position is required')
        .min(2, 'Position must be at least 2 characters'),
    joinDate: yup.string()
        .required('Join date is required'),
    salary: yup.number()
        .required('Salary is required')
        .min(0, 'Salary cannot be negative'),
    status: yup.string()
        .oneOf(['Active', 'Inactive'], 'Invalid status')
})

type EmployeeFormInputs = yup.InferType<typeof employeeSchema>

export default function EmployeeForm() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { addEmployee, updateEmployee, getEmployee } = useEmployeeStore()
    const [departmentValue, setDepartmentValue] = useState('')
    const [statusValue, setStatusValue] = useState('Active')

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<EmployeeFormInputs>({
        resolver: yupResolver(employeeSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            department: '',
            position: '',
            joinDate: '',
            salary: 0,
            status: 'Active'
        }
    })

    useEffect(() => {
        if (id) {
            const employee = getEmployee(id)
            if (employee) {
                const { id: _, ...rest } = employee
                reset(rest)
                setDepartmentValue(employee.department)
                setStatusValue(employee.status)
            }
        }
    }, [id, getEmployee, reset])

    const onSubmit = (formData: EmployeeFormInputs) => {
        const completeData = {
            ...formData,
            department: departmentValue,
            status: statusValue
        }
        if (id) {
            updateEmployee(id, completeData)
        } else {
            addEmployee(completeData)
        }
        navigate('/')
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white/95 border border-purple-200 p-8 rounded-xl shadow-xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {id ? 'Edit Employee' : 'Add New Employee'}
                    </h1>
                    <p className="text-gray-700 mt-2">Fill in the details below to {id ? 'update' : 'create'} an employee record</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                placeholder="John"
                                {...register('firstName')}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                placeholder="Doe"
                                {...register('lastName')}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="john.doe@company.com"
                                {...register('email')}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Phone
                            </label>
                            <input
                                type="tel"
                                placeholder="555-0101"
                                {...register('phone')}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Department
                            </label>
                            <CustomSelect
                                options={[
                                    { value: '', label: 'Select Department' },
                                    { value: 'Engineering', label: 'Engineering' },
                                    { value: 'HR', label: 'HR' },
                                    { value: 'Sales', label: 'Sales' },
                                    { value: 'Marketing', label: 'Marketing' },
                                    { value: 'Finance', label: 'Finance' },
                                    { value: 'Operations', label: 'Operations' }
                                ]}
                                value={departmentValue}
                                onChange={(e) => setDepartmentValue(e.target.value)}
                                label="Department"
                                error={errors.department?.message}
                            />
                            {errors.department && (
                                <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Position
                            </label>
                            <input
                                type="text"
                                placeholder="Senior Developer"
                                {...register('position')}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${errors.position ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                            />
                            {errors.position && (
                                <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Join Date
                            </label>
                            <input
                                type="date"
                                {...register('joinDate')}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${errors.joinDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                            />
                            {errors.joinDate && (
                                <p className="text-red-500 text-sm mt-1">{errors.joinDate.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Salary
                            </label>
                            <input
                                type="number"
                                placeholder="0"
                                {...register('salary', { valueAsNumber: true })}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${errors.salary ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                            />
                            {errors.salary && (
                                <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Status
                        </label>
                        <CustomSelect
                            options={[
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' }
                            ]}
                            value={statusValue}
                            onChange={(e) => setStatusValue(e.target.value)}
                            label="Status"
                        />
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 font-bold transition transform hover:scale-105 shadow-lg"
                        >
                            {id ? 'Update Employee' : 'Add Employee'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="flex-1 bg-gradient-to-r from-gray-400 to-gray-600 text-white px-6 py-3 rounded-lg hover:from-gray-500 hover:to-gray-700 font-bold transition transform hover:scale-105"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

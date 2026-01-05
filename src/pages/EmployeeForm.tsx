// src/components/EmployeeForm.tsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEmployeeStore } from '../hooks/useEmployeeStore'
import { User } from 'lucide-react'
import { Employee } from '../types'
import CustomSelect from '../components/CustomSelect'

const employeeSchema = yup.object().shape({
    firstName: yup.string().required('First name is required').min(2),
    lastName: yup.string().required('Last name is required').min(2),
    email: yup.string().email('Invalid email').required(),
    phone: yup.string().required('Phone required').matches(/^[\d\s\-\+\(\)]+$/),
    department: yup.string().required(),
    position: yup.string().required().min(2),
    joinDate: yup.string().required(),
    salary: yup.number().required().min(0),
})

type EmployeeFormInputs = yup.InferType<typeof employeeSchema>

export default function EmployeeForm() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { addEmployee, updateEmployee, getEmployee } = useEmployeeStore()
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<EmployeeFormInputs>({
        resolver: yupResolver(employeeSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            department: '',
            position: '',
            joinDate: '',
            salary: 0
        }
    })

    useEffect(() => {
        if (!id) return
        const emp = getEmployee(id)
        if (!emp) return
        reset(emp)
        setAvatarPreview(emp.avatar || null)
    }, [id])

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onloadend = () => setAvatarPreview(reader.result as string)
        reader.readAsDataURL(file)
    }

    const handleRemoveAvatar = () => setAvatarPreview(null)

    const onSubmit = (data: EmployeeFormInputs) => {
        const completeData: Employee = {
            ...data,
            avatar: avatarPreview,
            status: id ? getEmployee(id)?.status || 'Active' : 'Active',
            id: id || crypto.randomUUID()
        }

        if (id) updateEmployee(id, completeData)
        else addEmployee(completeData)

        navigate('/')
    }

    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-6">
            <div className="bg-white/95 border border-purple-200 p-6 sm:p-8 rounded-xl">
                <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">{id ? 'Edit Employee' : 'Add New Employee'}</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
                    {/* Avatar */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pb-6 border-b border-purple-200">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed flex items-center justify-center bg-purple-50 overflow-hidden">
                            {avatarPreview ? (
                                <img src={avatarPreview} className="w-full h-full object-cover" />
                            ) : (
                                <User size={40} />
                            )}
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-2 flex-1">
                            <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" id="avatar-upload" />
                            <label htmlFor="avatar-upload" className="bg-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer text-center">Upload</label>
                            {avatarPreview && (
                                <button
                                    type="button"
                                    onClick={handleRemoveAvatar}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div>
                            <label className="block font-medium mb-1">First Name</label>
                            <input {...register('firstName')} placeholder='firstName' className="w-full px-4 py-2 border rounded-lg" />
                            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block font-medium mb-1">Last Name</label>
                            <input {...register('lastName')} placeholder='lastName' className="w-full px-4 py-2 border rounded-lg" />
                            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block font-medium mb-1">Email</label>
                            <input {...register('email')} placeholder='email' className="w-full px-4 py-2 border rounded-lg" />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block font-medium mb-1">Phone</label>
                            <input {...register('phone')} placeholder='phone' className="w-full px-4 py-2 border rounded-lg" />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                        </div>

                        {/* Department */}
                        <div className="sm:col-span-2">
                            <Controller
                                name="department"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        options={[
                                            { value: '', label: 'Select Department' },
                                            { value: 'Engineering', label: 'Engineering' },
                                            { value: 'HR', label: 'HR' },
                                            { value: 'Sales', label: 'Sales' },
                                            { value: 'Marketing', label: 'Marketing' },
                                        ]}
                                        value={field.value}
                                        onChange={field.onChange}
                                        label="Department"
                                        error={errors.department?.message}
                                    />
                                )}
                            />
                        </div>

                        {/* Position */}
                        <div>
                            <label className="block font-medium mb-1">Position</label>
                            <input {...register('position')} placeholder="position" className="w-full px-4 py-2 border rounded-lg" />
                            {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>}
                        </div>

                        {/* Join Date */}
                        <div>
                            <label className="block font-medium mb-1">Join Date</label>
                            <input type="date" {...register('joinDate')} className="w-full px-4 py-2 border rounded-lg" />
                            {errors.joinDate && <p className="text-red-500 text-sm mt-1">{errors.joinDate.message}</p>}
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="block font-medium mb-1">Salary</label>
                            <input type="number" {...register('salary', { valueAsNumber: true })} className="w-full px-4 py-2 border rounded-lg" />
                            {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <button type="submit" className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-bold">{id ? 'Update' : 'Add'}</button>
                        <button type="button" onClick={() => navigate('/')} className="flex-1 bg-gray-400 text-white px-6 py-3 rounded-lg font-bold">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

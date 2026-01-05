// src/components/EmployeeTable.tsx
import { Employee } from "../types";
import ActionDropdown from "./ActionDropdown";
import AvatarDisplay from "./AvatarDisplay";
import { useEmployeeStore } from "../hooks/useEmployeeStore";

interface EmployeeTableProps {
    employees: Employee[];
}

export default function EmployeeTable({ employees }: EmployeeTableProps) {
    const { updateEmployee, deleteEmployee } = useEmployeeStore();

    const handleToggleStatus = (employee: Employee) => {
        const newStatus = employee.status === "Active" ? "Inactive" : "Active";
        updateEmployee(employee.id, { status: newStatus });
    };

    return (
        <>
            {/* Desktop Table */}
            <div className="hidden md:block rounded-lg border border-gray-200">
                <table className="w-full border-separate border-spacing-0">
                    <thead className="bg-purple-50 text-black">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold first:rounded-tl-lg last:rounded-tr-lg">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-bold">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-bold">Department</th>
                            <th className="px-6 py-4 text-left text-sm font-bold">Position</th>
                            <th className="px-6 py-4 text-left text-sm font-bold">Status</th>
                            <th className="px-6 py-4 text-right text-sm font-bold first:rounded-tl-lg last:rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {employees.map((emp, index) => (
                            <tr
                                key={emp.id}
                                className={`transition ${index !== employees.length - 1 ? "border-b border-gray-200" : "last:rounded-bl-lg last:rounded-br-lg"}`
                                }
                            >
                                <td className="px-6 py-4 text-sm text-gray-900 font-semibold flex items-center gap-3">
                                    <AvatarDisplay firstName={emp.firstName} lastName={emp.lastName} avatar={emp.avatar} size="sm" />
                                    {emp.firstName} {emp.lastName}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{emp.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{emp.department}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{emp.position}</td>

                                <td className="px-6 py-4 text-sm">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={emp.status === "Active"}
                                            onChange={() => handleToggleStatus(emp)}
                                        />
                                        <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition"></div>
                                        <span
                                            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300
                ${emp.status === "Active" ? "translate-x-6" : "translate-x-0"}`}
                                        ></span>
                                    </label>
                                </td>

                                <td className="px-6 py-4 text-sm text-right relative">
                                    <ActionDropdown employee={emp} onDelete={() => deleteEmployee(emp.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Mobile Card */}
            <div className="md:hidden space-y-4">
                {employees.map(emp => (
                    <div key={emp.id} className="bg-white border border-purple-200 rounded-lg p-5">
                        <div className="flex items-start justify-between">
                            <div className="mb-4 pb-4 border-b border-purple-100">
                                <h3 className="text-lg font-bold text-gray-900">{emp.firstName} {emp.lastName}</h3>
                                <p className="text-sm text-gray-600 mt-1">{emp.email}</p>
                            </div>
                            <div className="relative">
                                <ActionDropdown employee={emp} onDelete={() => deleteEmployee(emp.id)} />
                            </div>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-gray-700">Department:</span>
                                <span className="text-sm text-gray-900 font-medium">{emp.department}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-gray-700">Position:</span>
                                <span className="text-sm text-gray-900 font-medium">{emp.position}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-gray-700">Status:</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={emp.status === "Active"}
                                        onChange={() => handleToggleStatus(emp)}
                                    />
                                    <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition"></div>
                                    <span
                                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300
                    ${emp.status === "Active" ? "translate-x-6" : "translate-x-0"}`}
                                    ></span>
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

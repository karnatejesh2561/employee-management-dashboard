import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MoreVertical, Eye, Edit, Trash2 } from 'lucide-react'
import { Employee } from '../types'

interface ActionDropdownProps {
    employee: Employee
    onDelete: (id: string) => void
}

export default function ActionDropdown({ employee, onDelete }: ActionDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleButtonClick = () => {
        setIsOpen(!isOpen)
    }

    const handleDelete = () => {
        onDelete(employee.id)
        setIsOpen(false)
    }

    return (
        <div ref={dropdownRef} >
            <button
                ref={buttonRef}
                onClick={handleButtonClick}
                className="p-2 hover:bg-purple-100 rounded-lg transition text-gray-600 hover:text-purple-600"
                aria-label="More options"
            >
                <MoreVertical size={20} />
            </button>

            {isOpen && (
                <div
                    className="absolute w-48 bg-white border border-purple-200 rounded-lg shadow-xl z-50 right-8"

                >
                    <Link
                        to={`/employee/${employee.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition text-gray-700 hover:text-cyan-600 border-b border-purple-100"
                    >
                        <Eye size={18} />
                        <span className="font-medium">View</span>
                    </Link>
                    <Link
                        to={`/edit/${employee.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition text-gray-700 hover:text-amber-600 border-b border-purple-100"
                    >
                        <Edit size={18} />
                        <span className="font-medium">Edit</span>
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-50 transition text-gray-700 hover:text-red-600"
                    >
                        <Trash2 size={18} />
                        <span className="font-medium">Delete</span>
                    </button>
                </div>
            )}
        </div>
    )
}

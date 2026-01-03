import { useState, useRef, useEffect } from 'react'

interface CustomSelectProps {
    options: { value: string; label: string }[]
    value: string
    onChange: (event: { target: { value: string } }) => void
    placeholder?: string
    label?: string
    error?: string | boolean
}

export default function CustomSelect({
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    label,
    error
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const selectedOption = options.find(opt => opt.value === value)
    const displayValue = selectedOption?.label || placeholder

    return (
        <div className="w-full" ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-4 py-2 text-left bg-white border rounded-lg focus:outline-none transition flex justify-between items-center ${error ? 'border-red-500' : 'border-gray-300'
                        } hover:border-purple-400 focus:ring-2 focus:ring-purple-500`}
                >
                    <span className={value ? 'text-gray-900' : 'text-gray-400'}>
                        {displayValue}
                    </span>
                    <svg
                        className={`w-5 h-5 text-gray-600 transition transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 9l7 7 7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-purple-200 rounded-lg shadow-lg z-50">
                        {options.length === 0 ? (
                            <div className="px-4 py-2 text-gray-500 text-sm">No options available</div>
                        ) : (
                            <div className="max-h-60 overflow-y-auto">
                                {options.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            onChange({ target: { value: option.value } })
                                            setIsOpen(false)
                                        }}
                                        className={`w-full text-left px-4 py-3 transition ${value === option.value
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold'
                                            : 'hover:bg-purple-100 text-gray-900'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

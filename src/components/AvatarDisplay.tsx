
interface AvatarDisplayProps {
    firstName: string
    lastName: string
    avatar?: string | null
    size?: 'sm' | 'md' | 'lg'
}

export default function AvatarDisplay({
    firstName,
    lastName,
    avatar,
    size = 'md'
}: AvatarDisplayProps) {
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

    const sizeClasses = {
        sm: 'w-10 h-10 text-xs',
        md: 'w-12 h-12 text-sm',
        lg: 'w-24 h-24 text-2xl'
    }

    if (avatar) {
        return (
            <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-purple-300 flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100`}>
                <img
                    src={avatar}
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full object-cover"
                />
            </div>
        )
    }

    return (
        <div className={`${sizeClasses[size]} rounded-full border-2 border-purple-300 flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold`}>
            {initials}
        </div>
    )
}

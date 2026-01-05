import { X, AlertTriangle } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'danger'
}: ConfirmModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    const getColors = () => {
        switch (type) {
            case 'danger':
                return {
                    icon: 'text-red-600 bg-red-100',
                    button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                };
            case 'warning':
                return {
                    icon: 'text-amber-600 bg-amber-100',
                    button: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500'
                };
            default:
                return {
                    icon: 'text-blue-600 bg-blue-100',
                    button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                };
        }
    };

    const colors = getColors();

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all scale-100 animate-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-full ${colors.icon}`}>
                            <AlertTriangle size={18} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-lg transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-gray-600 leading-relaxed">{message}</p>
                </div>

                <div className="flex items-center justify-end gap-3 p-4 bg-gray-50 rounded-b-xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 font-medium hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 rounded-lg transition"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`px-4 py-2 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors.button}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

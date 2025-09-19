import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineClose, AiOutlineLoading3Quarters, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function FormBox({
    title = 'Form',
    fields = [],
    initialData = {},
    onSubmit,
    onCancel,
    isLoading = false,
    isOpen = false,
    subtitle = null,
}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, touchedFields },
        watch
    } = useForm({
        defaultValues: initialData,
        mode: 'onChange'
    });

    useEffect(() => {
        if (isOpen) {
            reset(initialData);
        }
    }, [isOpen, initialData, reset]);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && isOpen && onCancel) {
                onCancel();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
            return () => document.removeEventListener('keydown', handleEscKey);
        }
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    const watchedFields = watch();
    const hasChanges = Object.keys(touchedFields).length > 0;

    // Handle backdrop click to close modal
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && onCancel) {
            onCancel();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[8888] bg-black/60 backdrop-blur-xs flex items-center justify-center animate-fadeIn"
            onClick={handleBackdropClick}
        >
            <div
                className="relative bg-white w-full max-w-lg mx-4 rounded-2xl shadow-2xl animate-slideUp border border-gray-100 max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {subtitle || (initialData?.id ? 'Perbarui informasi dengan data yang benar' : 'Lengkapi semua field yang diperlukan')}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full transition-all duration-200"
                    >
                        <AiOutlineClose size={20} />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {fields.map((field) => (
                            <FormField
                                key={field.name}
                                field={field}
                                register={register}
                                error={errors[field.name]}
                                value={watchedFields[field.name]}
                                touched={touchedFields[field.name]}
                            />
                        ))}

                        {/* Form Actions */}
                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 sticky bottom-0 bg-white">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || isSubmitting}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center gap-2 ${isLoading || isSubmitting
                                    ? 'bg-gray-400 text-white'
                                    : hasChanges
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                                    }`}
                            >
                                {(isLoading || isSubmitting) && (
                                    <AiOutlineLoading3Quarters className="animate-spin" size={16} />
                                )}
                                {isLoading || isSubmitting
                                    ? 'Menyimpan...'
                                    : initialData?.id
                                        ? 'Simpan Perubahan'
                                        : 'Tambah Data'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Animation CSS */}
            <style>
                {`
          @keyframes fadeIn {
            from { 
              opacity: 0; 
            }
            to { 
              opacity: 1; 
            }
          }

          @keyframes slideUp {
            from {
              transform: translateY(20px) scale(0.95);
              opacity: 0;
            }
            to {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }

          .animate-slideUp {
            animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
        `}
            </style>
        </div>
    );
}
function FormField({ field, register, error, value, touched }) {
    const [showPassword, setShowPassword] = React.useState(false);
    const {
        name,
        label,
        type = 'text',
        required = false,
        options = [],
        placeholder = '',
        description = ''
    } = field;

    const validationRules = {
        required: required ? `${label} wajib diisi.` : false,
        ...(type === 'email' && {
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Format email tidak valid'
            }
        }),
        ...(type === 'password' && {
            minLength: {
                value: 6,
                message: 'Password minimal 6 karakter'
            }
        })
    };

    const baseInputClass = 'w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent';
    const inputClass = error
        ? `${baseInputClass} border-red-300 focus:ring-red-500 bg-red-50`
        : touched
            ? `${baseInputClass} border-green-300 focus:ring-blue-500 bg-green-50`
            : `${baseInputClass} border-gray-300 focus:ring-blue-500 hover:border-gray-400`;

    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="space-y-2">
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {description && (
                <p className="text-xs text-gray-500 -mt-1">{description}</p>
            )}

            <div className="relative">
                {type === 'select' ? (
                    <select
                        id={name}
                        {...register(name, validationRules)}
                        className={`${inputClass} ${field.className || ''} text-sm leading-5`}
                        style={{
                            minHeight: '3rem',
                            paddingRight: '2.5rem' // Space for dropdown arrow
                        }}
                    >
                        <option value="" className="text-gray-500">-- Pilih {label} --</option>
                        {options.map((opt) => (
                            <option
                                key={opt.value}
                                value={opt.value}
                                title={opt.title || opt.label}
                                className="py-3 px-4 text-sm leading-relaxed text-gray-800 bg-white hover:bg-blue-50"
                                style={{
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    lineHeight: '1.5',
                                    maxHeight: '4rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: 'block'
                                }}
                            >
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ) : type === 'textarea' ? (
                    <textarea
                        id={name}
                        rows={4}
                        placeholder={placeholder || `Masukkan ${label.toLowerCase()}`}
                        {...register(name, validationRules)}
                        className={inputClass}
                    />
                ) : type === 'checkbox' ? (
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id={name}
                            {...register(name)}
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
                        />
                        <label htmlFor={name} className="text-sm text-gray-600">
                            {placeholder || `Setuju dengan ${label.toLowerCase()}`}
                        </label>
                    </div>
                ) : (
                    <>
                        <input
                            type={inputType}
                            id={name}
                            placeholder={placeholder || `Masukkan ${label.toLowerCase()}`}
                            {...register(name, validationRules)}
                            autoComplete={
                                type === 'password' ? 'new-password' :
                                    type === 'email' ? 'off' : undefined
                            }
                            className={type === 'password' ? `${inputClass} pr-12` : inputClass}
                        />
                        {type === 'password' && (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* Success State */}
            {touched && !error && value && (
                <div className="flex items-center space-x-2 text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">Terisi dengan benar</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="flex items-center space-x-2 text-red-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">{error.message}</p>
                </div>
            )}
        </div>
    );
}

export default FormBox;

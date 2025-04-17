import React, { useState } from "react";

const FormData = ({ fields, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => {
            acc[field.name] = field.defaultValue || "";
            return acc;
        }, {})
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const renderInput = (field) => {
        const baseClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200";
        
        switch (field.type) {
            case 'select':
                return (
                    <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className={`${baseClasses} cursor-pointer`}
                        required={field.required}
                    >
                        <option value="" disabled>Pilih {field.label}</option>
                        {field.options.map((option, idx) => (
                            <option key={idx} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );
            case 'textarea':
                return (
                    <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`${baseClasses} min-h-[120px]`}
                        required={field.required}
                    />
                );
            default:
                return (
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={baseClasses}
                        required={field.required}
                    />
                );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                {fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                        <label
                            htmlFor={field.name}
                            className="block text-sm font-medium text-gray-700"
                        >
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {renderInput(field)}
                        {field.description && (
                            <p className="text-xs text-gray-500 mt-1">{field.description}</p>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="flex justify-end gap-4 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 font-medium"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
                >
                    Simpan Data
                </button>
            </div>
        </form>
    );
};

export default FormData;
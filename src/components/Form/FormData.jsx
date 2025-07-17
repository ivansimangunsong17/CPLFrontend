import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const FormData = ({ fields, onSubmit, onCancel }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    // Reset form setiap kali field (defaultValues) berubah, terutama saat edit
    useEffect(() => {
        const defaults = fields.reduce((acc, field) => {
            acc[field.name] = field.defaultValue || "";
            return acc;
        }, {});
        reset(defaults);
    }, [fields, reset]);


    const watchPassword = watch("password");

    const renderInput = (field) => {
        const rules = {
            required: field.required && `${field.label} wajib diisi`,
        };

        // Tambahkan validasi khusus
        if (field.name === "password" && field.required !== false) {
            rules.minLength = {
                value: 8,
                message: "Password minimal 8 karakter",
            };
        }

        if (field.name === "password_confirmation") {
            rules.validate = (value) =>
                value === watchPassword || "Konfirmasi password tidak cocok";
        }

        if (field.type === "email") {
            rules.pattern = {
                value: /^\S+@\S+\.\S+$/,
                message: "Email tidak valid",
            };
        }

        const commonProps = {
            ...register(field.name, rules),
            id: field.name,
            placeholder: field.placeholder,
            autoComplete: "off",
            className:
                "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200",
        };

        switch (field.type) {
            case "select":
                return (
                    <select {...commonProps}>
                        <option value="" disabled>
                            Pilih {field.label}
                        </option>
                        {field.options?.map((option, idx) => (
                            <option key={idx} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );


            case "textarea":
                return (
                    <textarea
                        {...commonProps}
                        className={`${commonProps.className} min-h-[120px]`}
                    />
                );

            default:
                return <input type={field.type} {...commonProps} />;
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="space-y-6">
            <input type="text" name="fake_username" autoComplete="username" className="hidden" />
            <input type="password" name="fake_password" autoComplete="new-password" className="hidden" />
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

                        {errors[field.name] && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors[field.name].message}
                            </p>
                        )}

                        {field.helpText && (
                            <p className="text-xs text-gray-500 mt-1">{field.helpText}</p>
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

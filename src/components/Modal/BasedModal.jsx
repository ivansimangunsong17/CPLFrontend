import React from "react";

const BaseModal = ({ title, onClose, children }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                <button
                    className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
                    onClick={onClose}
                >
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
};

export default BaseModal;

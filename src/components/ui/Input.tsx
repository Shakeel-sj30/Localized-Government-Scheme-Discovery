import React from 'react';

export function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={`block w-full rounded-lg border-gray-300 border shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 ${className}`}
            {...props}
        />
    );
}

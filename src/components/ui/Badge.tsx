import React from 'react';

export function Badge({ className = "", children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 ${className}`} {...props}>
            {children}
        </span>
    );
}

// Simple alternative for components/ui/Card3D.tsx
import React from "react";
import { cn } from "@/lib/utils";

export const Card3D = ({
    className,
    children,
    title,
    description,
    icon,
    theme,
    onClick,
}: {
    className?: string;
    children?: React.ReactNode;
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    theme?: string;
    onClick?: () => void;
}) => {
    return (
        <button
            onClick={onClick}
            className={cn("rounded-xl relative w-full text-right", className)}
        >
            {icon && <div className="mb-2">{icon}</div>}
            {title && <h3 className="text-lg font-bold text-white mb-1">{title}</h3>}
            {description && <p className="text-sm text-neutral-400">{description}</p>}
            {children}
        </button>
    );
};
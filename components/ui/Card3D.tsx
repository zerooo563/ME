// Simple alternative for components/ui/Card3D.tsx
import React from "react";
import { cn } from "@/lib/utils";

export const Card3D = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
    title?: string; // Optional so it never crashes
}) => {
    return (
        <div className={cn("rounded-xl relative", className)}>
            {children}
        </div>
    );
};
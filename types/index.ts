import { ReactNode } from "react";

export type ThemeType = "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info" | "neutral";

export interface CardData {
    id: string;
    category: "math-data" | "pedagogy" | "marketing-gaming";
    title: string;
    description: string;
    detailedContent?: ReactNode;
    icon?: ReactNode;
    theme?: ThemeType;
    gradient?: string;
    disabled?: boolean;
    loading?: boolean;
}
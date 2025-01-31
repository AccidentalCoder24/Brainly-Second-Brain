import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary"; 
    text: string; 
    startIcon?: ReactElement; 
    onClick?: () => void;
    fullWidth?: boolean; 
    loading?: boolean; 
}
 
const variantClasses = {
    "primary": "bg-[#4F46E5] text-white hover:bg-[#4338CA]", 
    "secondary": "bg-[#E0E7FF] text-[#3730A3] hover:bg-[#C7D2FE]", 
};

const defaultStyles = "px-4 h-10 rounded-md font-medium flex items-center justify-center min-w-[120px] transition duration-200";      

export function Button({ variant, text, startIcon, onClick, fullWidth, loading }: ButtonProps) {
    return (
        <button  
            onClick={onClick} 
            className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full" : ""} ${loading ? "opacity-50 cursor-not-allowed" : ""}`} 
            disabled={loading} 
        >
            {startIcon && <div className="mr-2">{startIcon}</div>}
            {text}
        </button>
    );
} 


import React from 'react';

interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', width = 40, height = 40 }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg
                width={width}
                height={height}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#1B4332]"
            >
                {/* Basket Body */}
                <path
                    d="M20 35 H80 L75 85 H25 L20 35 Z"
                    fill="#1B4332"
                    stroke="#1B4332"
                    strokeWidth="4"
                    strokeLinejoin="round"
                />
                {/* Basket Weave Pattern */}
                <path
                    d="M25 45 H75 M28 55 H72 M30 65 H70 M33 75 H67"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                {/* Basket Handle */}
                <path
                    d="M30 35 C30 10 70 10 70 35"
                    stroke="#1B4332"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                />
                {/* Leaf Accent */}
                <path
                    d="M65 35 Q85 15 95 25 Q85 45 65 35"
                    fill="#4ADE80"
                    stroke="white"
                    strokeWidth="2"
                />
                <path
                    d="M65 35 Q80 30 95 25"
                    stroke="white"
                    strokeWidth="1"
                />
            </svg>
            <span className="font-bold text-xl text-[#1B4332] tracking-tight">
                SzomszédKosár
            </span>
        </div>
    );
};

export default Logo;

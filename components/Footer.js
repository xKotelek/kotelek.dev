"use client";
import { useEffect, useState } from "react";

export default function FooterComponent() {
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        setTimeout(() => { setShowFooter(true) }, 100);
    }, []);

    return (
        <div className={`${showFooter ? "bottom-0 blur-none opacity-100" : "bottom-12 blur-[8px] opacity-0"} duration-800 fixed flex justify-center items-center w-full font-bold`}>
            <span>Copyright &copy; 2025 <a href="https://kotelek.dev" className="text-purple-700 hover:text-purple-500 duration-300">xKotelek</a></span>
        </div>
    );
}
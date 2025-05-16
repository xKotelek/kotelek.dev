"use client";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function NotFound() {
    const [showName, setShowName] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
        setTimeout(() => {setShowName(true)}, 100);
        setTimeout(() => {setShowError(true)}, 300);
        setTimeout(() => {setShowBtn(true)}, 500);
    }, []);

    return (
        <div className="w-full h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
            <div className="text-center flex flex-col items-center justify-center gap-6">
                <h1 className={`${showName ? "opacity-100 translate-y-0 blur-none" : "opacity-0 -translate-y-12 blur-[8px]"} duration-800 text-4xl font-black text-purple-500`}>xKotelek</h1>
                <h2 className={`${showError ? "opacity-100 translate-y-0 blur-none" : "opacity-0 -translate-y-12 blur-[8px]"} duration-800 text-2xl font-bold`}>Page not found!</h2>
                <div className={`${showBtn ? "opacity-100 translate-y-0 blur-none" : "opacity-0 -translate-y-12 blur-[8px]"} duration-800`}>
                    <Link
                        className="px-4 py-2 font-bold bg-purple-700/25 hover:scale-110 hover:bg-purple-700/50 duration-300 border border-purple-700 rounded-2xl"
                        href="/"
                    >
                        Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}

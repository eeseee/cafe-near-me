"use client"

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PageTransition({ children }: { children: React.JSX.Element}) {
    const [showIntro, setShowIntro] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setShowIntro(false);
        }, 1000); 
    
        return () => clearTimeout(timer);
      }, []);

    return (
        <>
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeIn", duration: 0.5 }}
                        className="h-screen flex justify-center items-center"
                    >
                        <Image src="/logo.png" alt="logo" width={50} height={50}/>
                    </motion.div>
                )}
            </AnimatePresence>

            {children}
        </>
    )
}
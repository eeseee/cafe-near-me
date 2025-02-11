"use client"

import { motion, AnimatePresence } from "framer-motion"
import React, { useState, useEffect } from "react";
import Image from "next/image";

import Header from "@/components/header"

export default function About() {
    const [showIntro, setShowIntro] = useState(true);

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

            <motion.main 
                className="h-screen w-screen flex flex-col justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeIn", duration: 0.5, delay: 2 }}
            >
                <Header />
                <div className="">
                    <h1 className="col-span-5 col-start-3">cafe near me.</h1>
                    <p className="row-start-2 col-start-3 col-span-8">we sometimes host pop-up cafes.</p>
                    <br></br>
                    <p>
                        menu inspired by <a href="https://x.com/samdape" target="_blank" className="underline">@samdape</a>
                        <br></br>
                        menu code template by <a href="https://www.frontend.fyi/tutorials/making-a-foldable-map-with-framer-motion" target="_blank" className="underline">@frontend.fyi</a>
                    </p>
                </div>
            </motion.main>
        </>
    )
}
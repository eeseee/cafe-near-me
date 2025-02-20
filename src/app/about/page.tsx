"use client"

import { motion } from "framer-motion"
import React from "react";

import Header from "@/components/header"
import PageTransition from "@/components/page-transition";

export default function About() {

    return (
        <>
            <PageTransition>
                <motion.main 
                    className="h-screen w-screen flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeIn", duration: 0.5, delay: 2 }}
                >
                    <Header />
                    <div className="h-full w-full flex flex-col items-center pt-[100px]">
                        <div className="">
                            <h1>cafe near me.</h1>
                            <p className="">we sometimes host pop-up cafes.</p>
                            <br></br>
                            <p>
                                menu inspired by <a href="https://x.com/samdape" target="_blank" className="underline">@samdape</a>
                                <br></br>
                                menu code template by <a href="https://www.frontend.fyi/tutorials/making-a-foldable-map-with-framer-motion" target="_blank" className="underline">@frontend.fyi</a>
                            </p>
                        </div>
                    </div>
                </motion.main>
            </PageTransition>
        </>
    )
}
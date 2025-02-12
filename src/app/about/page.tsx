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
            </PageTransition>
        </>
    )
}
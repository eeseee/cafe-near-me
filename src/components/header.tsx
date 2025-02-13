"use client"

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function Header() {

    return (
        <motion.header 
            className="p-5 w-full"
            initial={{opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ ease: "easeIn", duration: 0.5, delay: 3}}
        >
          <div className="flex w-full justify-between">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={50} height={50}/>
            </Link>
            <nav>
              <Link href="/about">
                <p className="font-black text-[24px]">about</p>
              </Link>
            </nav>
          </div>
        </motion.header>
    )
}
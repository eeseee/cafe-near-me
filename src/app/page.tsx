"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

import Header from "@/components/header";
import Menu from "@/components/foldable-menu";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const dragX = useMotionValue(0);
  const textOpacity = useTransform(dragX, [0, 300], [1, 0]);
  const textPosition = useTransform(dragX, [0, 300], [0, 50]);

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
        <div className="h-3/4 w-3/4 min-w-[300px] max-w-[900px]">
          <Menu dragX={dragX}/>
        </div>
        <motion.div
          initial={{opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ ease: "easeIn", duration: 0.5, delay: 3}}
        >
          <motion.p
            style={{ opacity: textOpacity, y: textPosition }}
            className="text-[#5F5F5F]"
          >
            drag to open
          </motion.p>
        </motion.div>
      </motion.main>
    </>
  );
}

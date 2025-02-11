"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

import Header from "@/components/header";
import Menu from "@/components/foldable-menu";
import { ArrowRight } from "lucide-react";

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
        <div className="hidden md:block h-3/4 w-3/4 min-w-[300px] max-w-[900px] content-center">
          <Menu dragX={dragX}/>
        </div>
        <div className="block md:hidden h-3/4 w-3/4 content-center">
          <div className="w-full h-full grid grid-cols-3">
            <motion.div 
              style={{skewY: "1deg" }}
              className="bg-contain bg-center bg-no-repeat bg-[url(/menu-center.png)] origin-bottom-right shadow-xl"
            ></motion.div>
            <motion.div
              className="bg-contain bg-center bg-no-repeat bg-[url(/menu-right.png)] brightness-[--brightness] shadow-xl"
            ></motion.div>
            <motion.div 
              style={{ skewY: "-1deg" }}
              className="bg-contain bg-center bg-no-repeat bg-[url(/menu-front.png)] origin-bottom-left shadow-xl"
              ></motion.div>
          </div>
        </div>
        <motion.div
          initial={{opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ ease: "easeIn", duration: 0.5, delay: 3}}
          className="hidden md:block pt-5"
        >
          <motion.p
            style={{ opacity: textOpacity, y: textPosition }}
            className="text-[#5F5F5F] flex items-center"
          >
            drag to open
            <motion.span
              initial={{ x: 0}}
              animate={{ x: 10 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
            >
              <ArrowRight className="ml-2 h-4 w-4"/>
            </motion.span>
          </motion.p>
        </motion.div>
      </motion.main>
    </>
  );
}

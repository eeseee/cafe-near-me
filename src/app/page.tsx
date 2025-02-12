"use client";

import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Header from "@/components/header";
import Menu from "@/components/foldable-menu";
import PageTransition from "@/components/page-transition";

export default function Home() {
  const dragX = useMotionValue(0);
  const textOpacity = useTransform(dragX, [0, 200], [1, 0]);
  const textPosition = useTransform(dragX, [0, 200], [0, 50]);

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
          <div className="h-3/4 w-3/4 min-w-[300px] max-w-[900px] content-center">
            <Menu dragX={dragX}/>
          </div>
          <motion.div
            initial={{opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ ease: "easeIn", duration: 0.5, delay: 3}}
            className="pt-5"
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

      </PageTransition>
    </>
  );
}

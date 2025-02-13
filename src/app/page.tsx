"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Header from "@/components/header";
import Menu from "@/components/foldable-menu";
import PageTransition from "@/components/page-transition";
import ZoomButton from "@/components/zoom-button";

export default function Home() {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [isFolded, setIsFolded] = useState<boolean>(true);

  const dragX = useMotionValue(0);
  const textOpacity = useTransform(dragX, [0, 200], [1, 0]);
  const textPosition = useTransform(dragX, [0, 200], [0, 50]);

  useMotionValueEvent(dragX, "change", (currentX) => {
    if (currentX > 260) {
        setIsFolded(false);
    } else {
        setIsFolded(true);
    }
  });

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
          <div className="h-3/4 w-3/4 min-w-[300px] max-w-[900px] flex flex-col justify-center items-center space-y-5">
            <motion.div
              className="flex justify-center md:hidden"
              initial={{opacity: 0}}
              animate={{ opacity: 1}}
              transition={{ ease: "easeIn", duration: 0.5, delay: 3}}
            >
              <ZoomButton isZoomed={isZoomed} setIsZoomed={setIsZoomed}/>
            </motion.div>
            <Menu dragX={dragX} isZoomed={isZoomed} isFolded={isFolded} setIsFolded={setIsFolded} />
            <motion.div
              initial={{opacity: 0}}
              animate={{ opacity: 1}}
              transition={{ ease: "easeIn", duration: 0.5, delay: 3}}
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
          </div>
        </motion.main>

      </PageTransition>
    </>
  );
}

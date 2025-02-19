"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Header from "@/components/header";
import PageTransition from "@/components/page-transition";
import ZoomButton from "@/components/zoom-button";
import MobileMenu from "@/components/mobile-menu";

export default function Home() {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const dragX = useMotionValue(0);
  const textOpacity = useTransform(dragX, [0, 200], [1, 0]);
  const textPosition = useTransform(dragX, [0, 200], [0, 50]);

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
          <div className="flex flex-col justify-center items-center space-y-5">
            <motion.div
              className="flex justify-center md:hidden"
              initial={{opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeIn", duration: 0.5, delay: 3}}
            >
              <ZoomButton isZoomed={isZoomed} setIsZoomed={setIsZoomed}/>
            </motion.div>
            <MobileMenu isZoomed={isZoomed} />
            <motion.div
              initial={{opacity: 0 }}
              animate={{ opacity: 1}}
              transition={{ ease: "easeIn", duration: 0.5, delay: 3}}
            >
              <motion.p
                style={{ opacity: textOpacity, y: textPosition }}
                className="text-[#5F5F5F] flex items-center"
              >
                drag to open
                <motion.span
                  initial={{ x: 0 }}
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

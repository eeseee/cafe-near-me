"use client";

import React, { useState } from "react";
import { motion, useMotionValue} from "framer-motion";

import Header from "@/components/header";
import Menu from "@/components/foldable-menu";
import PageTransition from "@/components/page-transition";
import ZoomButton from "@/components/zoom-button";

export default function Home() {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const dragX = useMotionValue(0);

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
          <div className="flex flex-col justify-center items-center space-y-5 pt-5">
            <motion.div
              className="flex justify-center md:hidden"
              initial={{opacity: 0}}
              animate={{ opacity: 1}}
              transition={{ ease: "easeIn", duration: 0.5, delay: 3}}
            >
              <ZoomButton isZoomed={isZoomed} setIsZoomed={setIsZoomed} />
            </motion.div>
            <Menu dragX={dragX} isZoomed={isZoomed} setIsZoomed={setIsZoomed}/>
          </div>
        </motion.main>

      </PageTransition>
    </>
  );
}

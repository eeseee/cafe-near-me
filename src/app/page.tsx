"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useMotionValueEvent, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Header from "@/components/header";
import Menu from "@/components/foldable-menu";
import PageTransition from "@/components/page-transition";
import ZoomButton from "@/components/zoom-button";

const anim = {
  initial: { y: 0 },
  zoom: { y: 180 }
}

export default function Home() {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [isFolded, setIsFolded] = useState<boolean>(true);
  const [curIndex, setCurIndex] = useState<number>(1);

  const dragX = useMotionValue(0);
  const dragXMobile = useMotionValue(0);
  const controls = useAnimation();

  const textOpacity = useTransform(dragX, [0, 200], [1, 0]);
  const textPosition = useTransform(dragX, [0, 200], [0, 50]);

  useEffect(() => {
    controls.start(curIndex === 0 ? "left" : curIndex === 1 ? "center" : "right")
  }, [curIndex, controls]);

  useEffect(() => {
    setCurIndex(1);
  }, [isZoomed]);

  useMotionValueEvent(dragX, "change", (currentX) => {
    if (currentX > 160) {
      setIsFolded(false);
    } else {
      setIsFolded(true);
    }
  });

  const handleDragEnd = () => {
    const currentX = dragXMobile.get();
  
    if (currentX > 0) {
      setCurIndex((prev) => Math.max(0, prev - 1));
    } else if (currentX < 0) {
      setCurIndex((prev) => Math.min(2, prev + 1));
    }
  
    dragXMobile.set(0);
  };

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
            <div className="grid">
              <div className="flex flex-col justify-center items-center space-y-5 [grid-area:1/1]">
                <Menu dragX={dragX} isZoomed={isZoomed} isFolded={isFolded} controls={controls} setIsZoomed={setIsZoomed}/>
                <motion.div
                  initial={{opacity: 0}}
                  animate={{ opacity: 1}}
                  transition={{ ease: "easeIn", duration: 0.5, delay: 3}}
                >
                  <motion.div
                    variants={anim}
                    initial="initial"
                    animate={isZoomed ? "zoom" : "initial"}
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
                </motion.div>
              </div>
              {
                isZoomed && !isFolded ? (
                  <motion.div
                    drag="x"
                    style={{ x: dragXMobile }}
                    dragConstraints={{ left: -10, right: 10 }}
                    onDragEnd={handleDragEnd}
                    className="relative z-10 [grid-area:1/1]"
                  ></motion.div>
                ) : (
                  <motion.div
                    drag="x"
                    _dragX={dragX}
                    style={{ x: dragX }}
                    dragConstraints={{ left: 0, right: 200 }}
                    dragListener={true}
                    dragTransition={{
                      modifyTarget: (target) => {
                        return target > 100 ? 200 : 0;
                      },
                      timeConstant: 45
                    }}
                    className="relative z-10 [grid-area:1/1] cursor-grab active:cursor-grabbing bg-black opacity-[10%]"
                  ></motion.div>
                )
              }
            </div>
          </div>
        </motion.main>

      </PageTransition>
    </>
  );
}

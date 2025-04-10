"use client"

import { motion, useTransform, useMotionValueEvent, MotionStyle, MotionValue, useMotionValue, useAnimation } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

interface MenuProps {
    dragX: MotionValue
    isZoomed: boolean
    setIsZoomed: (isZoomed: boolean) => void
}

const anim = {
    open: { scale: 1.0 },
    folded: { scale: 0.9 },
    zoomed: { scale: 1.5, y: 80 }
}

const skewAnim = {
    open: { rotate: "0deg" },
    folded: { rotate: "3deg" },
    zoomed: { rotate: "0deg" }
}

const slide = {
    left: { x: 140 },
    center: { x: 0 },
    right: { x: -140 },
};

const textAnim = {
    initial: { scale: 1.0 },
    zoom: { scale: 0.6 }
}

export default function Menu({
    dragX,
    isZoomed,
    setIsZoomed,
}: MenuProps) {
    const [isFolded, setIsFolded] = useState<boolean>(true);
    const [curIndex, setCurIndex] = useState<number>(1);

    const dragXMobile = useMotionValue(0);
    const controls = useAnimation();

    const xLeftSection = useTransform(dragX, [0, 200], ["100%", "0%"]);
    const xRightSection = useTransform(dragX, [0, 200], ["-100%", "0%"]);
    const centerScale = useTransform(dragX, [100, 200], [0.0, 1.001]);
    const centerBrightness = useTransform(dragX, [100, 200], [0.8, 1]);
    const textOpacity = useTransform(dragX, [0, 200], [1, 0]);
    const textPosition = useTransform(dragX, [0, 200], [0, 50]);

    const handleDragEnd = () => {
      const currentX = dragXMobile.get();
    
      if (currentX > 0) {
        setCurIndex((prev) => Math.max(0, prev - 1));
      } else if (currentX < 0) {
        setCurIndex((prev) => Math.min(2, prev + 1));
      }
    
      dragXMobile.set(0);
    };
    
    useMotionValueEvent(dragX, "change", (currentX) => {
      if (currentX > 160) {
        setIsFolded(false);
      } else {
        setIsFolded(true);
      }
    });

    useEffect(() => {
        controls.start(curIndex === 0 ? "left" : curIndex === 1 ? "center" : "right")
    }, [curIndex, controls]);

    useEffect(() => {
        setCurIndex(1);
    }, [isZoomed]);

    return (
        <motion.div
            animate={isZoomed ? "zoomed" : isFolded ? "folded" : "open"}
            variants={anim}
            initial="folded"
            whileHover="open"
        >
            <motion.div 
                className="grid aspect-[800/569]"
                variants={slide}
                initial="center"
                animate={controls}
                onDoubleClick={() => {
                    if (window.innerWidth <= 768) {
                        setIsZoomed(!isZoomed);
                    }
                }}
            >
                <div className="flex flex-col justify-center items-center space-y-5 [grid-area:1/1]">
                    <motion.div 
                        className="grid grid-cols-3"
                        variants={skewAnim}
                        initial="folded"
                        whileHover="open"
                        animate={isZoomed ? "zoomed" : isFolded ? "folded" : "open"}
                    >
                        <motion.div 
                            style={{ x: xLeftSection, skewY: "1deg" }}
                            className="origin-bottom-right shadow-xl"
                        >
                            <Image src="/menu-left.png" width={300} height={640} alt="menu-center"/>
                        </motion.div>
                        <motion.div 
                            style={{ scaleX: centerScale, "--brightness": centerBrightness } as MotionStyle}
                            className="brightness-[--brightness] shadow-xl"
                        >
                            <Image src="/menu-center.png" width={300} height={640} alt="menu-right"/>
                        </motion.div>
                        <motion.div 
                            style={{ x: xRightSection, skewY: "-1deg" }}
                            className="origin-bottom-left shadow-xl"
                        >
                            <Image src="/menu-front.png" width={300} height={640} alt="menu-front"/>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{ opacity: 1}}
                        transition={{ ease: "easeIn", duration: 0.5, delay: 3}}
                    >
                        <motion.div
                            variants={textAnim}
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
                        >
                        </motion.div>
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
                            className="relative z-10 [grid-area:1/1] cursor-grab active:cursor-grabbing"
                        ></motion.div>
                    )
                }
            </motion.div>
        </motion.div>
    )
    
}
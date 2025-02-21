"use client"

import { motion, useTransform, MotionStyle, MotionValue, AnimationControls } from "framer-motion";
import Image from "next/image";
import React from "react";

interface MenuProps {
    dragX: MotionValue
    isZoomed: boolean
    isFolded: boolean
    controls: AnimationControls
    setIsZoomed: (isZoomed: boolean) => void
}

const anim = {
    open: { scale: 1.0, rotate: "0deg" },
    folded: { scale: 0.9, rotate: "3deg" },
    zoomed: { scale: 1.5, y: 80, rotate: "0deg"}
}

const slide = {
    left: { x: 140 },
    center: { x: 0 },
    right: { x: -140 },
};

export default function Menu({
    dragX,
    isZoomed,
    isFolded,
    controls,
    setIsZoomed,
}: MenuProps) {
    const xLeftSection = useTransform(dragX, [0, 200], ["100%", "0%"]);
    const xRightSection = useTransform(dragX, [0, 200], ["-100%", "0%"]);
    const centerScale = useTransform(dragX, [100, 200], [0.0, 1.001]);
    const centerBrightness = useTransform(dragX, [100, 200], [0.8, 1]);

    return (
        <motion.div
            animate={isZoomed ? "zoomed" : isFolded ? "folded" : "open"}
            variants={anim}
            initial="folded"
            whileHover={"open"}
        >
            <motion.div 
                className="aspect-[800/569]"
                variants={slide}
                initial="center"
                animate={controls}
                onDoubleClick={() => setIsZoomed(!isZoomed)}
            >
                <div className="grid grid-cols-3">
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
                </div>
            </motion.div>
        </motion.div>
    )
    
}
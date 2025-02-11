"use client"

import { motion, useTransform, MotionStyle, useMotionValueEvent, MotionValue } from "framer-motion";
import React, { useState } from "react";

interface MenuProps {
    dragX: MotionValue
}

export default function Menu({
    dragX,
}: MenuProps) {
    const [isFolded, setIsFolded] = useState<boolean>(true);
    const xLeftSection = useTransform(dragX, [0, 300], ["100%", "0%"]);
    const xRightSection = useTransform(dragX, [0, 300], ["-100%", "0%"]);
    const centerScale = useTransform(dragX, [150, 300], [0.0, 1.001]);
    const centerBrightness = useTransform(dragX, [150, 300], [0.8, 1]);

    useMotionValueEvent(dragX, "change", (currentX) => {
        if (currentX > 260) {
            setIsFolded(false);
        } else {
            setIsFolded(true);
        }
    })

    const anim = {
        open: { scale: 1, rotate: "0deg" },
        folded: { scale: 0.9, rotate: "3deg" }
    }

    return (
        <motion.div
            animate={isFolded ? "folded" : "open"}
            variants={anim}
            initial="folded"
        >
            <motion.div 
                className="grid aspect-[800/569]" 
                onHoverStart={() => setIsFolded(false)} 
                onHoverEnd={() => setIsFolded(true)}
            >
                <div className="grid grid-cols-3 [grid-area:1/1]">
                    <motion.div 
                        style={{ x: xLeftSection, skewY: "1deg" }}
                        className="bg-contain bg-center bg-no-repeat bg-[url(/menu-center.png)] origin-bottom-right shadow-xl"
                    ></motion.div>
                    <motion.div 
                        style={{ scaleX: centerScale, "--brightness": centerBrightness } as MotionStyle}
                        className="bg-contain bg-center bg-no-repeat bg-[url(/menu-right.png)] brightness-[--brightness] shadow-xl"
                    ></motion.div>
                    <motion.div 
                        style={{ x: xRightSection, skewY: "-1deg" }}
                        className="bg-contain bg-center bg-no-repeat bg-[url(/menu-front.png)] origin-bottom-left shadow-xl"
                    ></motion.div>
                </div>
                <motion.div
                    drag="x"
                    _dragX={dragX}
                    style={{ x: dragX }}
                    dragConstraints={{ left: 0, right: 300 }}
                    dragTransition={{
                        modifyTarget: (target) => {
                            return target > 150 ? 300 : 0;
                        },
                        timeConstant: 45
                    }}
                    className="relative z-10 [grid-area:1/1] cursor-grab active:cursor-grabbing"
                ></motion.div>
            </motion.div>
        </motion.div>
    )
    
}
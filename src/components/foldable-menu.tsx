"use client"

import { motion, useTransform, MotionStyle, useMotionValueEvent, MotionValue } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

interface MenuProps {
    dragX: MotionValue
}

export default function Menu({
    dragX,
}: MenuProps) {
    const [isFolded, setIsFolded] = useState<boolean>(true);
    const xLeftSection = useTransform(dragX, [0, 200], ["100%", "0%"]);
    const xRightSection = useTransform(dragX, [0, 200], ["-100%", "0%"]);
    const centerScale = useTransform(dragX, [100, 200], [0.0, 1.001]);
    const centerBrightness = useTransform(dragX, [100, 200], [0.8, 1]);

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
                        className="origin-bottom-right shadow-xl"
                    >
                        <Image src="/menu-center.png" width={300} height={640} alt="menu-center"/>
                    </motion.div>
                    <motion.div 
                        style={{ scaleX: centerScale, "--brightness": centerBrightness } as MotionStyle}
                        className="brightness-[--brightness] shadow-xl"
                    >
                        <Image src="/menu-right.png" width={300} height={640} alt="menu-right"/>
                    </motion.div>
                    <motion.div 
                        style={{ x: xRightSection, skewY: "-1deg" }}
                        className="origin-bottom-left shadow-xl"
                    >
                        <Image src="/menu-front.png" width={300} height={640} alt="menu-front"/>
                    </motion.div>
                </div>
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
            </motion.div>
        </motion.div>
    )
    
}
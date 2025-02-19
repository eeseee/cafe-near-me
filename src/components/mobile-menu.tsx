import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";

export default function MobileMenu({ isZoomed }: { isZoomed: boolean }) {
  const anim = {
    folded: { scale: 0.9, rotate: "3deg" },
    zoomed: { scale: 2.0, y: 150 },
  };

  const slide = {
    left: { x: 140 },
    center: { x: 0 },
    right: { x: -140 },
  };

  const dragX = useMotionValue(0);
  const [curIndex, setCurIndex] = useState<number>(1);

  const handleDragEnd = () => {
    const currentX = dragX.get(); // Get the current value of dragX

    if (currentX > 0) {
      setCurIndex((prev) => Math.max(0, prev - 1)); // Swiped right
    } else if (currentX < 0) {
      setCurIndex((prev) => Math.min(2, prev + 1)); // Swiped left
    }

    dragX.set(0); // Reset dragX to 0 after handling the drag end
  };

  return (
    <motion.div
      variants={anim}
      initial="folded"
      animate={isZoomed ? "zoomed" : "folded"}
    >
      <div className="grid">
        <motion.ul
          className="flex [grid-area:1/1]"
          variants={slide}
          initial="center"
          animate={
            curIndex === 0 ? "left" : curIndex === 1 ? "center" : "right"
          }
        >
          <motion.li>
            <div>
              <Image src="/menu-left.png" width={300} height={640} alt="menu-left" />
            </div>
          </motion.li>
          <motion.li>
            <div>
              <Image src="/menu-center.png" width={300} height={640} alt="menu-center" />
            </div>
          </motion.li>
          <motion.li>
            <div>
              <Image src="/menu-front.png" width={300} height={640} alt="menu-front" />
            </div>
          </motion.li>
        </motion.ul>
        <motion.div
          className="relative z-10 [grid-area:1/1]"
          drag="x"
          style={{ x: dragX }}
          dragConstraints={{ left: -10, right: 10 }}
          onDragEnd={handleDragEnd}
        ></motion.div>
      </div>
    </motion.div>
  );
}
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";

export default function MobileMenu({ isZoomed }: { isZoomed: boolean }) {
  const anim = {
    folded: { scale: 0.9, rotate: "3deg" },
    zoomed: { scale: 2.0, y: 150 },
  };

  const dragX = useMotionValue(0);

  // Define the snap points (center positions of the divs)
  const snapPoints = [140, 0, -140];

  // Function to find the nearest snap point
  const findNearestSnapPoint = (currentX: number) => {
    return snapPoints.reduce((prev, curr) => {
      return Math.abs(curr - currentX) < Math.abs(prev - currentX) ? curr : prev;
    });
  };

  return (
    <motion.div
      variants={anim}
      initial="folded"
      animate={isZoomed ? "zoomed" : "folded"}
    >
      <motion.ul 
        className="flex"
        drag="x"
        style={{ x: dragX }}
        dragConstraints={{ left: -140, right: 140 }}
        dragListener={true}
        dragTransition={{
            modifyTarget: (target) => {
                // Find the nearest snap point
                const nearestSnapPoint = findNearestSnapPoint(target);
                return nearestSnapPoint;
            },
            timeConstant: 45
        }}
      >
        <motion.li>
          <div>
            <Image src="/menu-left.png" width={300} height={640} alt="menu-center" />
          </div>
        </motion.li>
        <motion.li>
          <div>
            <Image src="/menu-center.png" width={300} height={640} alt="menu-right" />
          </div>
        </motion.li>
        <motion.li>
          <div>
            <Image src="/menu-front.png" width={300} height={640} alt="menu-front" />
          </div>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
}
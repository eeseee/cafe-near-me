import { motion } from "framer-motion"

interface ZoomButtonProps {
    isZoomed: boolean;
    setIsZoomed: (isZoomed: boolean) => void;
}

const LABEL = ["in", "out"];
const DURATION = 0.25;
const STAGGER = 0.025;

export default function ZoomButton({
    isZoomed,
    setIsZoomed,
}: ZoomButtonProps) {

    const animTop = {
        before: { y: 0 },
        after: { y: "-100%" }
    }

    const animBot = {
        before: { y: "100%" },
        after: { y: 0 }
    }

    return (
        <motion.button
            onClick={() => setIsZoomed(!isZoomed)}
            className="px-3 py-1 text-[#5F5F5F] flex justify-center border rounded-full"
        >
            <span>zoom </span>
                <div className="relative block whitespace-nowrap overflow-hidden w-[30px]">
                    <div>
                        {LABEL[0].split("").map((l, i) => (
                            <motion.span 
                                key={i}
                                variants={animTop}
                                animate={isZoomed ? "after" : "before"}
                                transition={{
                                    duration: DURATION,
                                    ease: "easeInOut",
                                    delay: STAGGER*i
                                }}
                                className="inline-block"
                            >
                                {l}
                            </motion.span>
                        ))}
                    </div>
                    <div className="absolute inset-0">
                        {LABEL[1].split("").map((l, i) => (
                            <motion.span 
                                key={i}
                                variants={animBot}
                                animate={isZoomed ? "after": "before"}
                                transition={{
                                    duration: DURATION,
                                    ease: "easeInOut",
                                    delay: STAGGER*i
                                }}
                                className="inline-block"
                            >
                                {l}
                            </motion.span>
                        ))}
                    </div>
                </div>
        </motion.button>
    )
}
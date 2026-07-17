"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function PageFlip() {
  return (
    <AnimatePresence>
      {true && (
        <motion.div
          key="flip"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 180 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "transparent",
            transformOrigin: "left center",
            zIndex: 9999,
          }}
        />
      )}
    </AnimatePresence>
  );
}

import { motion, useAnimationFrame } from "motion/react";
function MobileBlock() {
  return (
    <div className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-black px-8 lg:hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex flex-col items-center text-center gap-4"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-6xl"
        >
          😬
        </motion.div>
        <h1 className="text-white font-bold text-2xl tracking-tight leading-tight">
          Yeah… about that.
        </h1>
        <p className="text-[#999] text-sm leading-relaxed max-w-65">
          I couldn't be arsed making this responsive.
          <br />
          Open it on a desktop, cheers.
        </p>
      </motion.div>
    </div>
  );
}

export default MobileBlock;

import { motion } from "motion/react";

function InfoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-sm mx-4 rounded-2xl border border-[#2a2a2a] bg-[#111] p-6 shadow-2xl"
        initial={{ scale: 0.92, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 12 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-white font-semibold text-lg leading-none tracking-tight">
              Demo credentials
            </h2>
            <p className="text-[#555] text-sm mt-1.5">
              Use these to log in successfully
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#555] hover:text-white transition ml-4 mt-0.5 text-lg leading-none"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-[#222] bg-[#0a0a0a] px-4 py-3">
            <p className="text-[#555] text-xs mb-1 uppercase tracking-widest font-mono">
              Email
            </p>
            <p className="text-white font-mono text-sm">sam@mail.com</p>
          </div>
          <div className="rounded-xl border border-[#222] bg-[#0a0a0a] px-4 py-3">
            <p className="text-[#555] text-xs mb-1 uppercase tracking-widest font-mono">
              Password
            </p>
            <p className="text-white font-mono text-sm">password</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-white text-black text-sm font-medium py-2.5 hover:bg-[#eee] transition"
        >
          Got it
        </button>
      </motion.div>
    </motion.div>
  );
}
export default InfoModal;

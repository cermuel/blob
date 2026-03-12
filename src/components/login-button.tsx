import { motion, useAnimationFrame } from "motion/react";
import { useEffect, useRef } from "react";

function LoginButton({
  invalid,
  success,
  onClick,
}: {
  invalid: boolean;
  success: boolean;
  onClick: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const particles = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
      type: "confetti" | "dust";
      rotation: number;
      rotationSpeed: number;
      width: number;
    }>
  >([]);
  const isHovered = useRef(false);
  const t = useRef(0);
  const successTriggered = useRef(false);

  useEffect(() => {
    if (success && !successTriggered.current) {
      successTriggered.current = true;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const W = canvas.width;
      const H = canvas.height;
      const colors = [
        "#ff862f",
        "#4c7cff",
        "#f5c400",
        "#ff4d4d",
        "#00e5ff",
        "#b266ff",
      ];
      for (let i = 0; i < 80; i++) {
        particles.current.push({
          x: W / 2 + (Math.random() - 0.5) * W * 0.6,
          y: H / 2,
          vx: (Math.random() - 0.5) * 8,
          vy: -Math.random() * 10 - 4,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          size: 4 + Math.random() * 4,
          width: 3 + Math.random() * 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: "confetti",
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.3,
        });
      }
    }
  }, [success]);

  useAnimationFrame((_, delta) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    t.current += delta * 0.001;
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    if (isHovered.current && !success) {
      for (let i = 0; i < 3; i++) {
        const edge = Math.floor(Math.random() * 4);
        let x = 0,
          y = 0;
        if (edge === 0) {
          x = Math.random() * W;
          y = 0;
        } else if (edge === 1) {
          x = W;
          y = Math.random() * H;
        } else if (edge === 2) {
          x = Math.random() * W;
          y = H;
        } else {
          x = 0;
          y = Math.random() * H;
        }
        particles.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          life: 0,
          maxLife: 40 + Math.random() * 40,
          size: 1.5 + Math.random() * 2.5,
          width: 2,
          color: "",
          type: "dust",
          rotation: 0,
          rotationSpeed: 0,
        });
      }
    }

    particles.current = particles.current.filter((p) => p.life < p.maxLife);

    for (const p of particles.current) {
      p.life++;
      const progress = p.life / p.maxLife;
      if (p.type === "confetti") {
        p.vy += 0.25;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        const alpha = progress < 0.7 ? 1 : 1 - (progress - 0.7) / 0.3;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.width / 2, -p.size / 2, p.width, p.size);
        ctx.restore();
      } else {
        p.x += p.vx;
        p.y += p.vy;
        const alpha =
          progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0,0%,90%,${alpha * 0.7})`;
        ctx.fill();
      }
    }

    if (!success) {
      const gradient = ctx.createLinearGradient(
        W * (0.3 + 0.3 * Math.sin(t.current * 0.7)),
        0,
        W * (0.7 + 0.3 * Math.cos(t.current * 0.5)),
        H,
      );
      gradient.addColorStop(0, `hsla(0,0%,100%,0.08)`);
      gradient.addColorStop(0.5, `hsla(0,0%,100%,0.04)`);
      gradient.addColorStop(1, `hsla(0,0%,100%,0.08)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);
    }
  });

  return (
    <motion.button
      ref={btnRef}
      type="submit"
      className={`mono relative overflow-hidden mt-1 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-[10px] px-4 font-medium ${invalid ? "fieldReject" : ""}`}
      onClick={onClick}
      onHoverStart={() => {
        isHovered.current = true;
      }}
      onHoverEnd={() => {
        isHovered.current = false;
      }}
      animate={{
        backgroundColor: success ? "#22c55e" : "#ffffff",
        color: success ? "#ffffff" : "#000000",
        scale: success ? [1, 1.04, 1] : 1,
      }}
      whileHover={success ? {} : { scale: 1.015 }}
      whileTap={success ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <canvas
        ref={canvasRef}
        width={460}
        height={48}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <motion.span
        className="relative z-10 flex items-center gap-2"
        animate={invalid ? { x: [0, -6, 6, -6, 6, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <motion.span
          animate={{
            width: success ? "auto" : 0,
            opacity: success ? 1 : 0,
            marginRight: success ? 6 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          style={{ display: "inline-block", overflow: "hidden" }}
        >
          ✓
        </motion.span>
        {success ? "Welcome back!" : "Log In"}
      </motion.span>
    </motion.button>
  );
}

export default LoginButton;

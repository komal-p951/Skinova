import React, { useEffect, useRef } from "react";

function FireConfetti({subtotal,total}) {

    useEffect(() => {
      if (subtotal - total >= 1) {
        fireConfetti();
      } else {
        stopConfetti();
      }
    }, [subtotal, total]);

    const canvasRef = useRef(null);
    const animRef = useRef(null);

    const COLORS = [
        "#7F77DD",
        "#1D9E75",
        "#D85A30",
        "#378ADD",
        "#D4537E",
        "#EF9F27",
    ];

  function fireConfetti() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let particles = [];
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 3 + 2,
        w: Math.random() * 10 + 5,
        h: Math.random() * 5 + 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.15,
        opacity: 1,
      });
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        if (p.y > canvas.height * 0.75) p.opacity -= 0.02;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      particles = particles.filter((p) => p.opacity > 0);
      animRef.current = requestAnimationFrame(loop);
    }
    loop();
  }

  function stopConfetti() {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const canvas = canvasRef.current;
    if (canvas)
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export default FireConfetti;

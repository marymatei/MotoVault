import { useEffect, useRef } from "react";

export default function BackgroundGears() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: -1000, y: -1000, radius: 160 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const gearCount = 90;
    const gears = Array.from({ length: gearCount }, () => ({
      x: Math.random() * (width - 60) + 30,
      y: Math.random() * (height - 60) + 30,
      vx: (Math.random() - 0.5) * 1.8,
      vy: (Math.random() - 0.5) * 1.8,
      baseSpeed: (Math.random() - 0.5) * 0.03,
      spinSpeed: 0.015,
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 8 + 8,
      teeth: Math.floor(Math.random() * 3) * 2 + 6,
      opacity: Math.random() * 0.35 + 0.35,
    }));

    const drawGear = (x, y, radius, teeth, angle, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";

      ctx.strokeStyle = isDark
        ? `rgba(232, 210, 181, ${opacity + 0.2})`
        : `rgba(89, 9, 7, ${opacity})`;
      ctx.lineWidth = isDark ? 2.0 : 1.6;

      ctx.beginPath();
      const outerRadius = radius;
      const innerRadius = radius * 0.7;
      const holeRadius = radius * 0.28;

      for (let i = 0; i < teeth; i++) {
        const a1 = (i / teeth) * Math.PI * 2;
        const a2 = ((i + 0.25) / teeth) * Math.PI * 2;
        const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
        const a4 = ((i + 0.75) / teeth) * Math.PI * 2;

        if (i === 0) ctx.moveTo(Math.cos(a1) * innerRadius, Math.sin(a1) * innerRadius);
        ctx.lineTo(Math.cos(a1) * outerRadius, Math.sin(a1) * outerRadius);
        ctx.lineTo(Math.cos(a2) * outerRadius, Math.sin(a2) * outerRadius);
        ctx.lineTo(Math.cos(a3) * innerRadius, Math.sin(a3) * innerRadius);
        ctx.lineTo(Math.cos(a4) * innerRadius, Math.sin(a4) * innerRadius);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, holeRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      gears.forEach((gear) => {
        const dx = gear.x - mouse.x;
        const dy = gear.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          gear.vx += Math.cos(angle) * force * 1.5;
          gear.vy += Math.sin(angle) * force * 1.5;
          gear.spinSpeed = gear.baseSpeed + force * 0.4;
        } else {
          gear.spinSpeed += (gear.baseSpeed - gear.spinSpeed) * 0.05;
        }

        gear.x += gear.vx;
        gear.y += gear.vy;
        gear.vx *= 0.98;
        gear.vy *= 0.98;
        gear.angle += gear.spinSpeed;

        const minX = gear.radius + 2;
        const maxX = width - gear.radius - 2;
        const minY = gear.radius + 2;
        const maxY = height - gear.radius - 2;

        if (gear.x <= minX) {
          gear.x = minX;
          gear.vx = Math.max(Math.abs(gear.vx), 1.2);
        } else if (gear.x >= maxX) {
          gear.x = maxX;
          gear.vx = -Math.max(Math.abs(gear.vx), 1.2);
        }

        if (gear.y <= minY) {
          gear.y = minY;
          gear.vy = Math.max(Math.abs(gear.vy), 1.2);
        } else if (gear.y >= maxY) {
          gear.y = maxY;
          gear.vy = -Math.max(Math.abs(gear.vy), 1.2);
        }

        drawGear(gear.x, gear.y, gear.radius, gear.teeth, gear.angle, gear.opacity);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
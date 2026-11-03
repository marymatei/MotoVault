import { useEffect, useRef, useState } from "react";

const OBSTACLES = [
  { icon: "🛢️", name: "Oil Spill" },
  { icon: "⚠️", name: "Cone" },
  { icon: "🕳️", name: "Pothole" }
];

const BONUSES = [
  { icon: "⛽", pts: 25, name: "Fuel Boost" },
  { icon: "🪖", pts: 15, name: "Pro Helmet" },
  { icon: "⭐", pts: 30, name: "MotoGP Star" }
];

export default function Game() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState("idle");
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(50);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(0);

  const gameRef = useRef({
    lane: 0,
    targetLane: 0,
    items: [],
    roadPos: 0,
    score: 0,
    distance: 0,
    speed: 50,
    lives: 3,
    animId: null,
    lastSpawn: 0
  });

  function startGame() {
    gameRef.current = {
      lane: 0,
      targetLane: 0,
      items: [],
      roadPos: 0,
      score: 0,
      distance: 0,
      speed: 50,
      lives: 3,
      animId: null,
      lastSpawn: Date.now()
    };
    setScore(0);
    setDistance(0);
    setSpeed(50);
    setLives(3);
    setGameState("playing");
  }

  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function handleKeyDown(e) {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        gameRef.current.targetLane = Math.max(-1, gameRef.current.targetLane - 1);
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        gameRef.current.targetLane = Math.min(1, gameRef.current.targetLane + 1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    function gameLoop() {
      const g = gameRef.current;
      const now = Date.now();

      g.lane += (g.targetLane - g.lane) * 0.2;

      g.distance += Math.round(g.speed / 45);
      g.speed = Math.min(220, 50 + Math.floor(g.distance / 100) * 2);
      setDistance(g.distance);
      setSpeed(g.speed);

      g.roadPos = (g.roadPos + g.speed / 12) % 60;

      const spawnInterval = Math.max(450, 1300 - Math.floor(g.speed * 3.5));
      if (now - g.lastSpawn > spawnInterval) {
        const laneVal = Math.floor(Math.random() * 3) - 1;
        const isBad = Math.random() < 0.55;
        const pool = isBad ? OBSTACLES : BONUSES;
        const itemData = pool[Math.floor(Math.random() * pool.length)];

        g.items.push({
          lane: laneVal,
          z: 0.05,
          speed: 0.003 + g.speed * 0.00006,
          isBad,
          ...itemData
        });
        g.lastSpawn = now;
      }

      const W = canvas.width;
      const H = canvas.height;
      const horizonY = 90;

      const skyGradient = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGradient.addColorStop(0, "#070a0f");
      skyGradient.addColorStop(1, "#172131");
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, W, horizonY);

      ctx.strokeStyle = "#84cc16";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#84cc16";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(W, horizonY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = "#0c140d";
      ctx.fillRect(0, horizonY, W, H - horizonY);

      const topWidth = 100;
      const bottomWidth = 620;
      const topX = W / 2 - topWidth / 2;
      const bottomX = W / 2 - bottomWidth / 2;

      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.moveTo(topX, horizonY);
      ctx.lineTo(topX + topWidth, horizonY);
      ctx.lineTo(bottomX + bottomWidth, H);
      ctx.lineTo(bottomX, H);
      ctx.closePath();
      ctx.fill();

      for (let y = horizonY; y < H; y += 15) {
        const p = (y - horizonY) / (H - horizonY);
        const currentRoadW = topWidth + (bottomWidth - topWidth) * p;
        const currentLeftX = W / 2 - currentRoadW / 2;
        const currentRightX = W / 2 + currentRoadW / 2;
        const kerbW = 12 * p + 2;

        const isRed = Math.floor((y + g.roadPos) / 20) % 2 === 0;
        ctx.fillStyle = isRed ? "#ef4444" : "#ffffff";

        ctx.fillRect(currentLeftX - kerbW, y, kerbW, 15);
        ctx.fillRect(currentRightX, y, kerbW, 15);
      }

      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 2;
      for (let y = horizonY; y < H; y += 20) {
        const p = (y - horizonY) / (H - horizonY);
        const currentRoadW = topWidth + (bottomWidth - topWidth) * p;
        const laneW = currentRoadW / 3;

        if (Math.floor((y + g.roadPos) / 20) % 2 === 0) {
          const lx = W / 2 - laneW / 2;
          ctx.beginPath();
          ctx.moveTo(lx, y);
          ctx.lineTo(lx, y + 10);
          ctx.stroke();

          const rx = W / 2 + laneW / 2;
          ctx.beginPath();
          ctx.moveTo(rx, y);
          ctx.lineTo(rx, y + 10);
          ctx.stroke();
        }
      }

      for (let i = g.items.length - 1; i >= 0; i--) {
        const item = g.items[i];
        item.z += item.speed;

        const p = item.z;
        const itemY = horizonY + (H - horizonY) * p;
        const currentRoadW = topWidth + (bottomWidth - topWidth) * p;
        const laneW = currentRoadW / 3;

        const itemX = W / 2 + item.lane * laneW;
        const scale = Math.max(0.2, p * 1.5);

        ctx.font = `${Math.round(28 * scale)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(item.icon, itemX, itemY);

        if (p >= 0.80 && p <= 0.95 && Math.abs(g.lane - item.lane) < 0.5) {
          if (item.isBad) {
            g.lives -= 1;
            setLives(g.lives);
            if (g.lives <= 0) {
              setGameState("gameover");
              setHighScore((prev) => Math.max(prev, g.score + g.distance));
              return;
            }
          } else {
            g.score += item.pts;
            setScore(g.score);
          }
          g.items.splice(i, 1);
          continue;
        }

        if (p > 1.1) {
          g.items.splice(i, 1);
        }
      }

      const playerP = 0.88;
      const playerRoadW = topWidth + (bottomWidth - topWidth) * playerP;
      const playerLaneW = playerRoadW / 3;
      const playerX = W / 2 + g.lane * playerLaneW;
      const playerY = horizonY + (H - horizonY) * playerP;

      ctx.font = "48px sans-serif";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 10;
      ctx.fillText("🏍️", playerX, playerY);
      ctx.shadowBlur = 0;

      g.animId = requestAnimationFrame(gameLoop);
    }

    gameRef.current.animId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (gameRef.current.animId) cancelAnimationFrame(gameRef.current.animId);
    };
  }, [gameState]);

  return (
    <section className="game-section" id="arcade">
      <div className="game-container">
        <div className="game-header">
          <div>
            <span className="hero-tagline">ARCADE</span>
            <h2 className="section-title">Grand Prix 🏍️🏁</h2>
            <p className="section-subtitle">
              Use <strong>A / D</strong> or <strong>Left / Right Arrows</strong> to switch lanes. Collect bonuses and avoid obstacles!
            </p>
          </div>

          <div className="game-scoreboard">
            <div className="score-box">
              <span className="score-label">SPEED</span>
              <span className="score-value green">{speed} km/h</span>
            </div>
            <div className="score-box">
              <span className="score-label">DISTANCE</span>
              <span className="score-value yellow">{distance} m</span>
            </div>
            <div className="score-box">
              <span className="score-label">SCORE</span>
              <span className="score-value white">{score}</span>
            </div>
            <div className="score-box">
              <span className="score-label">LIVES</span>
              <span className="score-value red">{"❤️".repeat(Math.max(0, lives))}</span>
            </div>
          </div>
        </div>

        <div className="canvas-wrapper">
          <canvas ref={canvasRef} width={800} height={420} className="game-canvas" />

          {gameState === "idle" && (
            <div className="game-overlay">
              <h3>Ready to Race in 3D?</h3>
              <p>Controls: <strong>A / D</strong> or <strong>Left / Right Arrow Keys</strong></p>
              <button className="btn-primary" onClick={startGame}>
                Start 3D Grand Prix 🏁
              </button>
            </div>
          )}

          {gameState === "gameover" && (
            <div className="game-overlay">
              <h3 className="danger-text">CRASHED! 💥</h3>
              <p>Distance: <strong>{distance} m</strong> | Total Score: <strong>{score + distance}</strong></p>
              <button className="btn-primary" onClick={startGame}>
                Re-enter Race 🔄
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
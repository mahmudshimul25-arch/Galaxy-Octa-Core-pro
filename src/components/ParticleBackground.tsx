import React, { useEffect, useState, memo } from 'react';

export const ParticleBackground = memo(() => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div className="absolute inset-0 bg-slate-950" />
      
      {/* Heavy glowing radial gradients */}
      <div className="absolute top-0 left-1/4 w-3/4 h-3/4 bg-cyan-900/20 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-blue-900/20 blur-[100px] rounded-full mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-emerald-900/10 blur-[150px] rounded-full mix-blend-screen" />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-cyan-400"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${p.size * 2}px rgba(34,211,238,0.8)`,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            willChange: 'transform, opacity'
          }}
        />
      ))}
      <style>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
});

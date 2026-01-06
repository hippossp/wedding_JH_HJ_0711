import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export function FlowerPetal() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // 꽃잎 생성
    const newPetals: Petal[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 5,
      size: 10 + Math.random() * 12,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
          }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{
            y: '110vh',
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 180, 360],
            x: [0, 40, -40, 20, -20, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 24 24" fill="rgba(251, 207, 232, 0.8)">
            <path d="M12 2C9.24 2 7 4.24 7 7c0 1.77.94 3.31 2.33 4.19C8.5 12.07 8 13.46 8 15c0 2.21 1.79 4 4 4s4-1.79 4-4c0-1.54-.5-2.93-1.33-3.81C15.94 10.31 17 8.77 17 7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
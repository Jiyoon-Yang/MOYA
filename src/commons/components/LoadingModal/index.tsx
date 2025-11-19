import { COLORS } from '../../constants';
import { motion } from 'motion/react';

interface LoadingModalProps {
  message?: string;
}

export function LoadingModal({ message = '묘가 당신을 위해 편지를 쓰고 있어요...' }: LoadingModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl p-12 text-center"
        style={{ backgroundColor: COLORS.white }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl mb-6"
        >
          🐱✍️
        </motion.div>
        
        <p className="text-lg" style={{ color: COLORS.charcoalNavy }}>
          {message}
        </p>
        
        <div className="flex gap-2 justify-center mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS.apricotCoral }}
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SplashScreen({ onFinish }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      onFinish(); // Notify parent when splash ends
    }, 4000); // Splash screen duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Droplet */}
          <motion.div
            className="w-6 h-6 bg-blue-500 rounded-full"
            initial={{ y: -200 }}
            animate={{ y: 0, scale: [1, 2, 0.5, 1.2], opacity: [1, 1, 0.8, 0.5] }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          {/* Splash effect */}
          <motion.div
            className="absolute w-40 h-40 rounded-full border-8 border-blue-500"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.5, 2], opacity: [1, 0.5, 0] }}
            transition={{ duration: 1.5, delay: 1 }}
          />

          {/* Skillify text */}
          <motion.h1
            className="absolute text-white text-5xl font-extrabold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            Skillify
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
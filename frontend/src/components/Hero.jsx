import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/romantic-bg.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf6ee]/70 via-[#fdf6ee]/50 to-[#fdf6ee]" />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#d4a5a5] opacity-30 select-none pointer-events-none"
          style={{
            left: `${15 + i * 13}%`,
            top: `${20 + (i % 3) * 20}%`,
            fontSize: `${12 + i * 4}px`,
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
        >
          ♡
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-dancing text-2xl md:text-3xl text-[#c9957d] mb-4"
        >
          a little corner of the internet
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-playfair text-5xl md:text-7xl lg:text-8xl text-[#5c3d2e] leading-tight italic"
        >
          Made for{' '}
          <span className="relative inline-block">
            <span className="relative z-10">You</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute bottom-1 left-0 right-0 h-3 bg-[#e8c4b8]/50 origin-left rounded"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-lora text-lg md:text-xl text-[#8b6b4a] mt-6 max-w-xl mx-auto leading-relaxed italic"
        >
          Every photograph, every memory, every quiet moment we've shared —
          gathered here, just for us.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <div className="h-px w-12 bg-[#c4a882]" />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart size={22} className="text-[#c9957d] fill-[#c9957d]" />
          </motion.div>
          <div className="h-px w-12 bg-[#c4a882]" />
        </motion.div>

        <motion.a
          href="#timer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="inline-block mt-10 btn-vintage font-lora text-sm tracking-wide"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Relive our story
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#b8a090]"
      >
        <span className="font-lora text-xs tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#c4a882] to-transparent"
        />
      </motion.div>
    </section>
  );
}

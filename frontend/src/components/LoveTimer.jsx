import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const START_DATE = new Date('2026-02-22T04:30:00');

function getTimeDiff(start) {
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0)   { hours += 24;   days--; }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  return { years, months, days, hours, minutes, seconds };
}

const CounterUnit = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="flex flex-col items-center gap-1"
  >
    <div className="relative">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#fdf6ee] to-[#f5ead8] border border-[#e8d5b7] shadow-[0_4px_20px_rgba(92,61,46,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] flex items-center justify-center">
        <span className="font-playfair text-3xl md:text-4xl text-[#5c3d2e] font-semibold tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
    </div>
    <span className="font-lora text-xs uppercase tracking-[0.15em] text-[#b8a090] mt-1">
      {label}
    </span>
  </motion.div>
);

export default function LoveTimer() {
  const [diff, setDiff] = useState(getTimeDiff(START_DATE));

  useEffect(() => {
    const interval = setInterval(() => setDiff(getTimeDiff(START_DATE)), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="timer"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/romantic-bg.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf6ee] via-[#fdf6ee]/60 to-[#fdf6ee]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Decorative top */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c4a882]" />
          <Heart size={18} className="text-[#c9957d] fill-[#c9957d]" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c4a882]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="font-dancing text-xl md:text-2xl text-[#c9957d] mb-3"
        >
          It has been
        </motion.p>

        {/* Counter Grid */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 my-8">
          <CounterUnit value={diff.years}   label="years"   delay={0.1} />
          <CounterUnit value={diff.months}  label="months"  delay={0.15} />
          <CounterUnit value={diff.days}    label="days"    delay={0.2} />
          <CounterUnit value={diff.hours}   label="hours"   delay={0.25} />
          <CounterUnit value={diff.minutes} label="minutes" delay={0.3} />
          <CounterUnit value={diff.seconds} label="seconds" delay={0.35} />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="font-playfair text-2xl md:text-4xl text-[#5c3d2e] italic leading-relaxed"
        >
          since we confessed our love.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="font-lora text-[#8b6b4a] mt-4 text-base md:text-lg"
        >
          22nd February, 2026 · 4:30 AM
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 flex items-center justify-center gap-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            >
              <Heart size={i === 1 ? 20 : 14} className="text-[#d4a5a5] fill-[#d4a5a5]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

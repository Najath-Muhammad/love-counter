import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-14 text-center border-t border-[#e8d5b7]">
      <div className="max-w-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <div className="h-px w-10 bg-[#c4a882]" />
          <Heart size={16} className="text-[#c9957d] fill-[#c9957d]" />
          <div className="h-px w-10 bg-[#c4a882]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-dancing text-2xl text-[#8b6b4a]"
        >
          With all my love, always.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="font-lora text-sm text-[#b8a090] mt-3"
        >
          Since 22 February 2026 · Forever & beyond
        </motion.p>
      </div>
    </footer>
  );
}

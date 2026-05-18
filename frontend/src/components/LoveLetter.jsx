import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';
import { fetchLetter } from '../services/api';

const FALLBACK_LETTER = {
  title: 'To the One Who Makes Everything Brighter',
  author: 'Yours, always',
  content: `My dearest,

I don't quite know how to begin this — because how do you put into words something that lives entirely in the chest, in the quiet between heartbeats?

There are mornings I wake up and the first thing I think of is you. Not dramatically. Not like in the movies. Just… quietly, the way a room fills with early light. You are there before anything else.

I think about the way you laugh when something catches you off guard. The way you always find the words when I am out of them. The way you make ordinary moments feel like they are worth saving.

I have kept so many of those moments — not in photographs, but in the way my hands remember, in the echo of your voice in a quiet room.

Thank you for being someone I did not have to shrink for. Thank you for the long calls that turned into longer silences, and how neither of us ever minded. Thank you for choosing me — again and again, in all the small ways that no one else ever sees.

I am not very good at grand gestures. But I am very good at this: loving you, simply and completely, on all the ordinary days.

Forever yours,`,
};

export default function LoveLetter() {
  const [letter, setLetter] = useState(null);

  useEffect(() => {
    fetchLetter()
      .then((res) => {
        const data = res.data?.data;
        setLetter(data || FALLBACK_LETTER);
      })
      .catch(() => setLetter(FALLBACK_LETTER));
  }, []);

  if (!letter) return null;

  return (
    <section id="letter" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-dancing text-[#c9957d] text-xl mb-2"
          >
            written from the heart
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-playfair text-3xl md:text-5xl text-[#5c3d2e] italic"
          >
            A Love Letter
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-[#c4a882] to-transparent"
          />
        </div>

        {/* Letter Paper */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="paper-letter rounded-2xl p-10 md:p-14 relative overflow-hidden"
        >
          {/* Decorative feather icon */}
          <div className="absolute top-8 right-8 opacity-10">
            <Feather size={60} className="text-[#8b6b4a] rotate-[-20deg]" />
          </div>

          <h3 className="font-playfair text-xl md:text-2xl text-[#5c3d2e] italic mb-8 relative z-10">
            {letter.title}
          </h3>

          <div className="font-crimson text-[#4a3728] text-lg md:text-xl leading-[2] whitespace-pre-line relative z-10">
            {letter.content}
          </div>

          <p className="font-dancing text-[#8b6b4a] text-2xl mt-8 relative z-10">
            {letter.author}
          </p>

          {/* Corner decorations */}
          <div className="absolute bottom-4 left-4 opacity-20 font-dancing text-4xl text-[#c4a882]">
            ❧
          </div>
          <div className="absolute top-4 left-4 opacity-20 font-dancing text-4xl text-[#c4a882]">
            ❦
          </div>
        </motion.div>
      </div>
    </section>
  );
}

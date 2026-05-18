import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { fetchTimeline } from '../services/api';

const FALLBACK_EVENTS = [
  { _id: 'e1', emoji: '👀', title: 'First Glance',     date: '2026-01-10', description: 'I noticed you before you noticed me. Time stopped.' },
  { _id: 'e2', emoji: '💬', title: 'First Words',      date: '2026-01-20', description: 'Such a small conversation that changed everything.' },
  { _id: 'e3', emoji: '📞', title: 'First Call',       date: '2026-02-05', description: 'Three hours felt like three minutes. I never wanted to hang up.' },
  { _id: 'e4', emoji: '💌', title: 'The Confession',   date: '2026-02-22', description: 'At 4:30 in the morning, I told you how I felt. You said yes.' },
  { _id: 'e5', emoji: '🌸', title: 'First Date',       date: '2026-03-14', description: 'Nervous, blushing, laughing too loud. Perfect.' },
  { _id: 'e6', emoji: '✨', title: 'Favourite Memory', date: '2026-04-01', description: 'That moment I realised I am the luckiest person alive.' },
];

function TimelineCard({ event, index }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-60px' }}
      className={`relative flex w-full items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-6 mb-16`}
    >
      {/* Card */}
      <div className="md:w-5/12 w-full">
        <div className="bg-[#fdf9f0] border border-[#e8d5b7] rounded-2xl p-6 shadow-[0_4px_20px_rgba(92,61,46,0.1)] hover:shadow-[0_8px_32px_rgba(92,61,46,0.15)] transition-shadow duration-300">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{event.emoji}</span>
            <div>
              <h3 className="font-playfair text-xl text-[#5c3d2e] font-semibold">
                {event.title}
              </h3>
              <p className="font-lora text-xs text-[#b8a090] mt-1 tracking-wide">
                {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric',
                })}
              </p>
              <p className="font-lora text-[#8b6b4a] mt-3 text-sm leading-relaxed italic">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Center dot */}
      <div className="md:w-2/12 flex justify-center items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 + 0.2 }}
          viewport={{ once: true }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e8d5b7] to-[#c4a882] border-4 border-[#fdf6ee] shadow-[0_0_0_2px_#c4a882] flex items-center justify-center z-10 relative"
        >
          <Heart size={14} className="text-[#5c3d2e] fill-[#5c3d2e]" />
        </motion.div>
      </div>

      <div className="md:w-5/12" />
    </motion.div>
  );
}

export default function Timeline() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchTimeline()
      .then((res) => {
        const data = res.data?.data;
        setEvents(data && data.length > 0 ? data : FALLBACK_EVENTS);
      })
      .catch(() => setEvents(FALLBACK_EVENTS));
  }, []);

  return (
    <section id="timeline" className="py-24 px-6 bg-[#fdf0e8]/40">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-dancing text-[#c9957d] text-xl mb-2"
          >
            how it all began
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-playfair text-3xl md:text-5xl text-[#5c3d2e] italic"
          >
            Our Journey
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-[#c4a882] to-transparent"
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c4a882] to-transparent transform -translate-x-1/2" />

          {events.map((event, i) => (
            <TimelineCard key={event._id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

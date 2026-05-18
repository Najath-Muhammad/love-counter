import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';
import { fetchPhotos } from '../services/api';

const FALLBACK_PHOTOS = [
  {
    _id: 'f1',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&q=80',
    caption: 'That golden evening',
    memoryNote: 'The light was perfect, just like you.',
    date: '2026-03-10',
  },
  {
    _id: 'f2',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80',
    caption: 'Little moments',
    memoryNote: 'I was so nervous that day.',
    date: '2026-02-22',
  },
  {
    _id: 'f3',
    imageUrl: 'https://images.unsplash.com/photo-1504730655501-e2f1f5adf4e2?w=400&q=80',
    caption: 'Walking together',
    memoryNote: 'Time slows down with you.',
  },
  {
    _id: 'f4',
    imageUrl: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&q=80',
    caption: 'Stolen glances',
    memoryNote: 'You caught me staring again.',
    date: '2026-04-05',
  },
  {
    _id: 'f5',
    imageUrl: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=400&q=80',
    caption: 'Our favourite spot',
    memoryNote: 'We sat here for hours.',
    date: '2026-03-28',
  },
  {
    _id: 'f6',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
    caption: 'Lazy afternoon',
    memoryNote: 'Nothing and everything at once.',
  },
];

function distributeToColumns(items, colCount) {
  const cols = Array.from({ length: colCount }, () => []);
  items.forEach((item, i) => cols[i % colCount].push(item));
  return cols;
}

function PhotoCard({ photo, index }) {
  const [hovered, setHovered] = useState(false);
  const rotations = [-2, 1.5, -1, 2.5, -1.5, 1];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      className="polaroid cursor-pointer group"
      style={{ transform: `rotate(${rotation}deg)` }}
      whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden rounded-sm">
        <img
          src={photo.imageUrl}
          alt={photo.caption || 'Memory'}
          className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ minHeight: 160, maxHeight: 280 }}
          loading="lazy"
        />
      </div>

      {/* Polaroid Caption */}
      <div className="mt-1 text-center px-1">
        {photo.caption && (
          <p className="font-dancing text-[#5c3d2e] text-base leading-tight mt-2">
            {photo.caption}
          </p>
        )}
        {photo.date && (
          <p className="flex items-center justify-center gap-1 text-[10px] font-lora text-[#b8a090] mt-1">
            <Calendar size={9} />
            {new Date(photo.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        )}
      </div>

      {/* Memory Note Overlay */}
      <AnimatePresence>
        {hovered && photo.memoryNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#5c3d2e]/75 flex items-center justify-center p-4 rounded-sm"
          >
            <p className="font-dancing text-white text-lg text-center leading-relaxed">
              "{photo.memoryNote}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [cols, setCols] = useState(3);

  useEffect(() => {
    fetchPhotos()
      .then((res) => {
        const data = res.data?.data;
        setPhotos(data && data.length > 0 ? data : FALLBACK_PHOTOS);
      })
      .catch(() => setPhotos(FALLBACK_PHOTOS));
  }, []);

  useEffect(() => {
    const update = () =>
      setCols(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const columns = distributeToColumns(photos, cols);

  return (
    <section id="memories" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-dancing text-[#c9957d] text-xl mb-2"
        >
          snapshots of us
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="font-playfair text-3xl md:text-5xl text-[#5c3d2e] italic"
        >
          Our Memories
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-[#c4a882] to-transparent"
        />
      </div>

      {/* Masonry Grid */}
      <div className="masonry-grid justify-center">
        {columns.map((col, ci) => (
          <div key={ci} className="masonry-col flex-1 min-w-0">
            {col.map((photo, pi) => (
              <div key={photo._id} className="relative">
                <PhotoCard photo={photo} index={ci * 3 + pi} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="text-center py-20">
          <Heart size={32} className="mx-auto text-[#d4a5a5] mb-4" />
          <p className="font-lora text-[#b8a090]">Memories will appear here soon…</p>
        </div>
      )}
    </section>
  );
}

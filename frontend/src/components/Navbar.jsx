import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, VolumeX, Heart, Menu, X } from 'lucide-react';

export default function Navbar({ musicPlaying, onMusicToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#timer',    label: 'Our Time' },
    { href: '#memories', label: 'Memories' },
    { href: '#timeline', label: 'Journey' },
    { href: '#letter',   label: 'Letter'  },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#fdf6ee]/85 backdrop-blur-md shadow-[0_2px_20px_rgba(92,61,46,0.1)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Heart
            size={18}
            className="text-[#c9957d] fill-[#c9957d] group-hover:scale-110 transition-transform"
          />
          <span className="font-dancing text-xl text-[#5c3d2e] tracking-wide">
            Our Story
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-lora text-sm text-[#8b6b4a] hover:text-[#5c3d2e] transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMusicToggle}
            title={musicPlaying ? 'Pause music' : 'Play music'}
            className="p-2 rounded-full bg-[#e8d5b7]/50 text-[#8b6b4a] hover:bg-[#e8d5b7] transition-all duration-300 hover:scale-110"
          >
            {musicPlaying ? <Music size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            className="md:hidden p-2 text-[#8b6b4a]"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#fdf6ee]/95 backdrop-blur-md px-6 pb-4 overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 font-lora text-[#8b6b4a] hover:text-[#5c3d2e] border-b border-[#e8d5b7] last:border-0"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

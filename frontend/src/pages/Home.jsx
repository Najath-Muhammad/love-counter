import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LoveTimer from '../components/LoveTimer';
import PhotoGallery from '../components/PhotoGallery';
import Timeline from '../components/Timeline';
import LoveLetter from '../components/LoveLetter';
import Footer from '../components/Footer';

export default function Home() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicPlaying((v) => !v);
  };

  return (
    <div className="relative">
      {/* Background music — add your own mp3 to /public/music.mp3 */}
      <audio ref={audioRef} loop preload="none">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <Navbar musicPlaying={musicPlaying} onMusicToggle={toggleMusic} />

      <main>
        <Hero />
        <LoveTimer />
        <PhotoGallery />
        <Timeline />
        <LoveLetter />
      </main>

      <Footer />
    </div>
  );
}

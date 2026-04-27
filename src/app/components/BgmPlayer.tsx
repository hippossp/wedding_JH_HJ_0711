import { useCallback, useEffect, useRef, useState } from 'react';
import { Music, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const BGM_SRC = '/music/wedding-bgm.mp3';

export function BgmPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.volume = 0.45;
      await audio.play();
      setIsPlaying(true);
      setNeedsInteraction(false);
      setShowHint(false);
      return true;
    } catch {
      setIsPlaying(false);
      setNeedsInteraction(true);
      return false;
    }
  }, []);

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    setNeedsInteraction(true);
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
      return;
    }

    void play();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;

    const autoplayTimer = window.setTimeout(() => {
      void play();
    }, 600);

    const playOnFirstInteraction = () => {
      void play();
    };

    window.addEventListener('pointerdown', playOnFirstInteraction, { once: true });
    window.addEventListener('touchstart', playOnFirstInteraction, { once: true });
    window.addEventListener('wheel', playOnFirstInteraction, { once: true });
    window.addEventListener('keydown', playOnFirstInteraction, { once: true });

    return () => {
      window.clearTimeout(autoplayTimer);
      window.removeEventListener('pointerdown', playOnFirstInteraction);
      window.removeEventListener('touchstart', playOnFirstInteraction);
      window.removeEventListener('wheel', playOnFirstInteraction);
      window.removeEventListener('keydown', playOnFirstInteraction);
    };
  }, [play]);

  return (
    <>
      <audio ref={audioRef} src={BGM_SRC} loop preload="auto" />

      <button
        type="button"
        onClick={toggle}
        className="fixed left-4 top-4 z-[90] flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-rose-500 shadow-lg ring-1 ring-rose-100 backdrop-blur transition hover:bg-white"
        aria-label={isPlaying ? '배경음악 일시정지' : '배경음악 재생'}
      >
        <Music className="absolute h-5 w-5 opacity-20" />
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-px" />}
      </button>

      <AnimatePresence>
        {showHint && !isPlaying && (
          <motion.div
            className="fixed left-1/2 top-16 z-[80] -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-xs text-neutral-600 shadow-md ring-1 ring-rose-100 backdrop-blur"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {needsInteraction ? '음악 버튼을 누르면 BGM이 재생됩니다' : '스크롤하면 음악이 함께 재생됩니다'}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

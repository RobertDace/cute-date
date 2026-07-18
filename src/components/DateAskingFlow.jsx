"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 🎨 HIGH-FIDELITY 3D GRADIENT VECTOR EMOJIS
// ==========================================
const Sakura3D = () => (
  <svg className="w-8 h-8 drop-shadow-[0_4px_10px_rgba(255,51,153,0.4)]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sakuraPetal" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff99cc" />
        <stop offset="70%" stopColor="#ff3399" />
        <stop offset="100%" stopColor="#cc0066" />
      </radialGradient>
      <radialGradient id="sakuraCenter" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffff99" />
        <stop offset="100%" stopColor="#ffcc00" />
      </radialGradient>
    </defs>
    <path d="M16 4C19 8 23 8 23 12C23 17 19 19 16 16C13 19 9 17 9 12C9 8 13 8 16 4Z" fill="url(#sakuraPetal)"/>
    <path d="M16 28C13 24 9 24 9 20C9 15 13 13 16 16C19 13 23 15 23 20C23 24 19 24 16 28Z" fill="url(#sakuraPetal)"/>
    <path d="M4 16C8 13 8 9 12 9C17 9 19 13 16 16C19 19 17 23 12 23C8 23 8 19 4 16Z" fill="url(#sakuraPetal)"/>
    <path d="M28 16C24 19 24 23 20 23C15 23 13 19 16 16C13 13 15 9 20 9C24 9 24 13 28 16Z" fill="url(#sakuraPetal)"/>
    <circle cx="16" cy="16" r="4" fill="url(#sakuraCenter)" />
  </svg>
);

const Calendar3D = () => (
  <svg className="w-7 h-7 drop-shadow-[0_4px_8px_rgba(255,255,255,0.1)]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="calBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#d9d9d9" />
      </linearGradient>
      <linearGradient id="calHeader" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff3399" />
        <stop offset="100%" stopColor="#b30059" />
      </linearGradient>
    </defs>
    <rect x="4" y="8" width="24" height="20" rx="4" fill="url(#calBody)" />
    <path d="M4 12C4 10 5.5 8 7.5 8H24.5C26.5 8 28 10 28 12V14H4V12Z" fill="url(#calHeader)" />
    <circle cx="9" cy="19" r="1.5" fill="#333333" /><circle cx="16" cy="19" r="1.5" fill="#333333" /><circle cx="23" cy="19" r="1.5" fill="#333333" />
    <circle cx="9" cy="24" r="1.5" fill="#333333" /><circle cx="16" cy="24" r="1.5" fill="#ff3399" /><circle cx="23" cy="24" r="1.5" fill="#333333" />
  </svg>
);

const Sparkles3D = () => (
  <svg className="w-6 h-6 animate-pulse" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sparkleGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffcc" />
        <stop offset="50%" stopColor="#ffcc00" />
        <stop offset="100%" stopColor="#ff6600" />
      </radialGradient>
    </defs>
    <path d="M16 2L19 11L28 14L19 17L16 26L13 17L4 14L13 11L16 2Z" fill="url(#sparkleGrad)" />
  </svg>
);

// ==========================================
// 🖱️ CUSTOM GLOWING CURSOR TRAIL EFFECT
// ==========================================
const CursorEffect = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-[#ff3399] pointer-events-none z-50 mix-blend-screen hidden sm:block shadow-[0_0_12px_#ff3399]"
      animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
    />
  );
};

// ==========================================
// 🌌 LIVE REACTIVE GLOWING BACKGROUND (GPU OPTIMIZED)
// ==========================================
const ReactiveBackground = ({ isPlaying }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = [...Array(12)].map((_, i) => ({ // Dioptimasi jadi 12 partikel
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 3,
      xRandom: Math.random() * 26 - 13
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Ambient Glow Center Core */}
      <motion.div 
        animate={isPlaying ? { scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform, opacity" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ff3399] rounded-full filter blur-[100px]" // 👈 Blur dioptimasi
      />
      
      {/* Floating Spark Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1.5 h-2 rounded-full bg-pink-500/20"
          style={{ 
            top: p.top, 
            left: p.left,
            willChange: "transform" // 👈 Angkat ke composite layer tersendiri
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, p.xRandom, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay
          }}
        />
      ))}
    </div>
  );
};

// ==========================================
// 🎉 HIGH-FESTIVE CONFETTI CELEBRATION (GPU ACCELERATED)
// ==========================================
const ConfettiCelebration = () => {
  const colors = ['#ff3399', '#008cff', '#ffcc00', '#ff99cc', '#00ffcc'];
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
      {[...Array(40)].map((_, i) => { // Mengurangi jumlah particle sedikit agar ramah HP low-end
        const randColor = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-4.5 rounded-sm"
            style={{ 
              top: "-20px", // Set posisi awal statis di atas luar layar
              left: `${Math.random() * 100}%`, 
              backgroundColor: randColor,
              willChange: "transform" // 👈 Perintah ke browser untuk siapin jalur GPU
            }}
            animate={{ 
              y: ["0vh", "115vh"], // 👈 Menggunakan CSS Translate (GPU), bukan properti Top (CPU)
              rotate: 360 * (Math.random() * 3 + 1),
              x: [0, (Math.random() * 100 - 50), (Math.random() * 60 - 30)]
            }}
            transition={{ 
              duration: 2.5 + Math.random() * 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 2
            }}
          />
        );
      })}
    </div>
  );
};

// ==========================================
// 📝 CONFIGURATION & SYSTEM VALUES
// ==========================================
const CONFIG = {
  step1: {
    title: "A Special Invitation Just For You 🌸",
    question: "Will you go on a date with me?",
    yesText: "YES, I'D LOVE TO! 💕",
    noText: "No 😢",
  },
  step2: {
    title: "So... when are you free?",
    dateLabel: "Pick a day (Look out for special days! ✨)",
    timeLabel: "What time works best?",
    submitText: "Set the date 💕"
  },
  step3: {
    title: "What are we feeling tonight?",
    submitText: "Next ❤️"
  },
  step4: {
    title: "YAYYY!! 💞",
    successMessage: "I absolutely can't wait to see you!",
    subtext: "(Deployment status: Perfect. Playlist synced. See you very soon xx)"
  },
  playlist: [
    { title: "Tell Me", artist: "Wonder Girls", file: "tellme_wondergirls.mp3", cover: "tellme.jpg" },
    { title: "WILDFLOWER", artist: "Billie Eilish", file: "wildflower_billieeilish.mp3", cover: "wildflower.jpg" },
    { title: "The Zombie Song", artist: "Stephanie Mabey", file: "thezombiesong_stephaniemabey.mp3", cover: "zombiesong.jpg" },
    { title: "Through the Darkness", artist: "佐藤奈央, Colin & Caroline", file: "throughthedarkness.mp3", cover: "darkness.jpg" },
    { title: "Dirty Little Secret", artist: "The All-American Rejects", file: "dirtylittlesecret_theallamericanrejects.mp3", cover: "dirtysecret.jpg" },
    { title: "Black Sheep (Brie Larson Vocal)", artist: "Metric, Brie Larson", file: "blacksheep_brielarson.mp3", cover: "blacksheep.jpg" },
    { title: "Frosty Like a Snowman", artist: "Scene Kidz", file: "frostylikeasnowman.mp3", cover: "frosty.jpg" },
    { title: "Partners in Crime", artist: "Set It Off, Ash Costello", file: "partnersincrime_setitoff.mp3", cover: "partnersincrime.jpg" },
    { title: "Hands up! - Nightcore", artist: "6arelyhuman, kets4eki", file: "handsup.mp3", cover: "handsup.jpg" },
    { title: "I don't remember", artist: "Rebzyyx", file: "idon'tremember.mp3", cover: "idonotremember.jpg" },
    { title: "Kiss Me Again - Club Mix", artist: "Roy Bee", file: "kissmeagain.mp3", cover: "kissmeagain.jpg" },
    { title: "Bait & Switch", artist: "KMFDM", file: "bait&switch.mp3", cover: "baitswitch.jpg" },
  ]
};

const DATE_ACTIVITIES = [
  { id: 'pizza', name: 'Pizza 🍕', description: 'Cheesy and warm goodness' },
  { id: 'sushi', name: 'Sushi Time 🍣', description: 'Premium rolls & deep talk environment' },
  { id: 'burgers', name: 'Burgers 🍔', description: 'Juicy patties and fries' },
  { id: 'pasta', name: 'Pasta 🍝', description: 'Creamy carbonara or bolognese' },
  { id: 'tacos', name: 'Tacos 🌮', description: 'Spicy and crunchy crunch' },
  { id: 'ramen', name: 'Ramen Night 🍜', description: 'Cozy authentic comfort food' },
];

const TIME_SLOTS = [
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function DateAskingFlow() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const playerRef = useRef(null); 
  const [toast, setToast] = useState({ show: false, title: '', artist: '' }); 

  // 🎵 HTML5 Audio State Engines
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);

  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const [now, setNow] = useState(new Date());
  useEffect(() => { setNow(new Date()); }, [step]);

  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth();
  const todayDay = now.getDate();

  const [currentMonth, setCurrentMonth] = useState(todayMonth);
  const [currentYear, setCurrentYear] = useState(todayYear);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  
  const blanks = Array(firstDayIndex).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendarGrid = [...blanks, ...days];

  const isPrevMonthDisabled = currentYear < todayYear || (currentYear === todayYear && currentMonth <= todayMonth);

  // 🎯 FIX SCOPE GLOBAL: Fungsi Navigasi Kalender Utama
  const handlePrevMonth = () => {
    if (isPrevMonthDisabled) return;
    if (currentMonth === 0) {
      setCurrentMonth(11); 
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0); 
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Autoplay Logic Framework (Multi-trigger Ekstra Sensitif)
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            cleanup();
          })
          .catch((err) => console.log("Autoplay strictly blocked by browser:", err));
      }
    };

    const cleanup = () => {
      window.removeEventListener('click', playAudio);
      window.removeEventListener('touchstart', playAudio);
      window.removeEventListener('scroll', playAudio);
    };

    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          window.addEventListener('click', playAudio);
          window.addEventListener('touchstart', playAudio);
          window.addEventListener('scroll', playAudio);
        });
    }

    return cleanup;
  }, []);

  // Logika menutup player saat klik di luar area card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isPlayerExpanded && playerRef.current && !playerRef.current.contains(event.target)) {
        setIsPlayerExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isPlayerExpanded]);

  // Logika memicu banner Toast Now Playing setiap lagu ganti
  useEffect(() => {
    setToast({
      show: true,
      title: CONFIG.playlist[currentTrackIdx].title,
      artist: CONFIG.playlist[currentTrackIdx].artist
    });
    const timer = setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3500);
    return () => clearTimeout(timer);
  }, [currentTrackIdx]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIdx]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const formatRemainingTime = (secs, dur) => {
    if (isNaN(secs) || isNaN(dur)) return "-0:00";
    const remaining = dur - secs;
    const minutes = Math.floor(remaining / 60);
    const seconds = Math.floor(remaining % 60);
    return `-${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTrackChange = (index) => {
    let nextIdx = index;
    if (isShuffle && index !== currentTrackIdx) {
      nextIdx = Math.floor(Math.random() * CONFIG.playlist.length);
    } else {
      if (index >= CONFIG.playlist.length) nextIdx = 0;
      if (index < 0) nextIdx = CONFIG.playlist.length - 1;
    }
    setCurrentTrackIdx(nextIdx);
    setCurrentTime(0);
  };

  const handleAudioEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      handleTrackChange(currentTrackIdx + 1);
    }
  };

  const isTimePast = (timeStr) => {
    if (!selectedDate) return false;
    if (selectedDate.year < todayYear) return true;
    if (selectedDate.year === todayYear && selectedDate.month < todayMonth) return true;
    if (selectedDate.year === todayYear && selectedDate.month === todayMonth && selectedDate.day < todayDay) return true;
    
    if (selectedDate.year === todayYear && selectedDate.month === todayMonth && selectedDate.day === todayDay) {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours, 10); minutes = parseInt(minutes, 10);
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      const slotDate = new Date(todayYear, todayMonth, todayDay, hours, minutes);
      return slotDate < now;
    }
    return false;
  };

  const handleNoHover = () => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const maxX = (container.width / 2) - 60;
    const maxY = (container.height / 2) - 40;
    const randomX = (Math.random() * 2 - 1) * maxX;
    const randomY = (Math.random() * 2 - 1) * maxY;
    setNoBtnPos({ x: randomX, y: randomY });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 14 } },
    exit: { opacity: 0, y: -30, scale: 0.98, transition: { duration: 0.25 } }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0d0714] font-sans select-none overflow-hidden text-neutral-100">
      
      {/* 🚀 EFEK ELEMEN BACKDROP DAN MOUSE KURSOR */}
      <CursorEffect />
      <ReactiveBackground isPlaying={isPlaying} />

      {/* Toast Notification Box */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs px-4 pointer-events-none">
        <AnimatePresence>
          {toast.show && (
            <motion.div
              initial={{ opacity: 0, y: -60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="w-full bg-[#130821]/90 border border-[#ff3399]/40 backdrop-blur-md px-4 py-3 rounded-2xl flex items-center gap-3.5 shadow-xl shadow-[#ff3399]/10"
            >
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-[#ff3399]/20 overflow-hidden shrink-0 flex items-center justify-center">
                <img src={`/covers/${CONFIG.playlist[currentTrackIdx].cover}`} alt="Toast Cover" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-black text-[#ff3399] uppercase tracking-widest">Now Playing</span>
                <span className="text-xs font-bold text-neutral-100 truncate tracking-tight">{toast.title}</span>
                <span className="text-[10px] text-neutral-400 truncate">by {toast.artist}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <audio 
        ref={audioRef}
        src={`/${CONFIG.playlist[currentTrackIdx].file}`}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onEnded={handleAudioEnded}
      />

      {/* ========================================================
          🎵 DYNAMIC FLOATING MUSIC PLAYER (EXACT COMPLIANCE VIEW)
         ======================================================== */}
      <div className="absolute bottom-6 left-6 z-50 flex flex-col items-start">
        <AnimatePresence mode="wait">
          {!isPlayerExpanded ? (
            /* MINI DISK CAP WITH ROTATING LIVE ALBUM PICTURE */
            <motion.button
              key="mini-player"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              onClick={() => setIsPlayerExpanded(true)}
              className="w-16 h-16 rounded-full bg-neutral-900 border-2 border-[#ff3399] flex items-center justify-center shadow-lg shadow-[#ff3399]/20 relative overflow-hidden group cursor-pointer"
            >
              <motion.div 
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={isPlaying ? { repeat: Infinity, duration: 4, ease: "linear" } : { duration: 0.5 }}
                className="absolute inset-0.5 rounded-full bg-[#1d0f2b] flex items-center justify-center overflow-hidden"
              >
                <img 
                  src={`/covers/${CONFIG.playlist[currentTrackIdx].cover}`} 
                  alt="Live Cover" 
                  className="w-full h-full object-cover absolute inset-0 opacity-80"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div 
                  className="absolute inset-0 rounded-full opacity-40 mix-blend-overlay pointer-events-none"
                  style={{ backgroundImage: `radial-gradient(circle, transparent 20%, rgba(0,0,0,0.6) 21%, transparent 22%, rgba(0,0,0,0.6) 40%, transparent 41%)` }}
                />
                <div className="w-3 h-3 rounded-full bg-[#0d0714] border border-[#ff3399] z-10 shadow-inner" />
              </motion.div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full z-20">
                <span className="text-pink-400 text-[9px] font-black tracking-widest">OPEN</span>
              </div>
            </motion.button>
          ) : (
            /* FULL SPOTIFY MOBILE CARD VIEW (Bound to playerRef click-outside) */
            <motion.div
              ref={playerRef} 
              key="expanded-player"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              className="bg-[#0d0714] border-2 border-[#ff3399]/40 p-5 rounded-[2.2rem] flex flex-col shadow-2xl shadow-[#ff3399]/5 w-[300px] relative"
            >
              {/* Drop-down Close Handle icon */}
              <button onClick={() => setIsPlayerExpanded(false)} className="absolute top-4 right-5 w-7 h-7 rounded-full bg-neutral-900/40 border border-neutral-800 text-neutral-400 font-bold flex items-center justify-center text-xs hover:text-[#ff3399] active:scale-90">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
              </button>

              {/* Album Cover Canvas */}
              <div className="w-full aspect-square bg-[#1d112c] rounded-[1.8rem] border border-[#ff3399]/10 shadow-inner relative overflow-hidden mt-2 select-none flex items-center justify-center">
                <img 
                  src={`/covers/${CONFIG.playlist[currentTrackIdx].cover}`} 
                  alt={CONFIG.playlist[currentTrackIdx].title} 
                  className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-25">
                  <svg className="w-12 h-12 text-[#ff3399]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L12 15v3c0 .55.45 1 1 1s1-.45 1-1v-1.07zM17.9 11c0 .41-.04.81-.1 1.21L14 8.31V6c0-.55-.45-1-1-1s-1 .45-1 1v3.19L6.16 6.16C7.57 4.79 9.5 4 11.99 4c4.01 0 7.33 2.94 7.91 6.83l-1.99.17z"/></svg>
                  <span className="text-[9px] font-black tracking-widest text-[#ff3399] uppercase mt-2">Album Cover</span>
                </div>
              </div>

              {/* Metadata Area */}
              <div className="flex flex-col mt-4 w-full">
                <span className="text-[9px] font-black tracking-widest text-[#ff3399] uppercase">Device / Local Storage</span>
                <h3 className="text-base font-bold text-neutral-100 truncate mt-0.5 tracking-tight">{CONFIG.playlist[currentTrackIdx].title}</h3>
                <p className="text-xs font-semibold text-neutral-400 truncate tracking-wide">{CONFIG.playlist[currentTrackIdx].artist}</p>
              </div>

              {/* Progress Slider */}
              <div className="w-full flex flex-col gap-1 mt-3">
                <div className="w-full h-0.5 bg-neutral-900 rounded-full relative">
                  <div className="h-full bg-[#ff3399] rounded-full" style={{ width: `${(currentTime / duration) * 100 || 0}%` }} />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 px-0.5">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatRemainingTime(currentTime, duration)}</span>
                </div>
              </div>

              {/* Spotify SVG Media Buttons Deck Component */}
              <div className="flex items-center justify-between w-full px-1 mt-4">
                <button 
                  onClick={() => setIsShuffle(!isShuffle)} 
                  className={`p-1.5 rounded-md transition-all ${isShuffle ? 'bg-[#008cff] text-neutral-900 shadow-md shadow-[#008cff]/20' : 'text-neutral-400 hover:text-neutral-200'}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5M4 20l7-7M21 3L13 11M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
                </button>
                <button onClick={() => handleTrackChange(currentTrackIdx - 1)} className="text-neutral-200 hover:text-[#ff3399] transition-colors active:scale-90">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-[#ff3399] text-neutral-900 flex items-center justify-center border-2 border-neutral-100 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,51,153,0.3)]"
                >
                  {isPlaying ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
                <button onClick={() => handleTrackChange(currentTrackIdx + 1)} className="text-neutral-200 hover:text-[#ff3399] transition-colors active:scale-90">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6z"/></svg>
                </button>
                <button 
                  onClick={() => setIsRepeat(!isRepeat)} 
                  className={`p-1.5 rounded-md transition-all ${isRepeat ? 'bg-[#008cff] text-neutral-900 shadow-md shadow-[#008cff]/20' : 'text-neutral-400 hover:text-neutral-200'}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                </button>
              </div>

              {/* Spotify Style Volume Control Deck */}
              <div className="flex items-center gap-2.5 w-full mt-4 px-1 border-t border-neutral-900 pt-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-500"><path d="M3.63 3.63a.996.996 0 0 0 0 1.41L7.29 8.7 5 11H1v2h4l6 5v-4.66l4.7 4.7a7.9 7.9 0 0 0 2.2-3.03l-1.92-.64c-.33.78-.83 1.48-1.46 2.05l-1.44-1.44L17.07 9.1l-1.41-1.42-2.31 2.31V5l-6 5H6.41L3.63 3.63z"/></svg>
                <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="flex-1 h-1 bg-neutral-900 rounded-full appearance-none accent-[#ff3399] border border-neutral-950 outline-none" />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#ff3399]"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
              </div>

              {/* Card Footer available indicator */}
              <div className="text-[8px] font-black text-center text-neutral-500 tracking-widest uppercase mt-4 flex items-center justify-center gap-1.5 opacity-70">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="mb-0.5"><path d="M4 6h16v10H4zm16-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h6l-2 2v2h8v-2l-2-2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/></svg> DEVICES AVAILABLE
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================
          📦 CONTAINER INTERFACE UTAMA APP FLOW
         ======================================================== */}
      <div ref={containerRef} className="relative z-10 w-full max-w-md p-4 flex flex-col items-center justify-center min-h-[620px]">
        <AnimatePresence mode="wait">
          
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div key="step1" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-[#170b24]/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-[#ff3399]/10 text-center flex flex-col items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <Sakura3D />
                <span className="text-[10px] font-black text-[#ff3399] uppercase tracking-widest mt-1">{CONFIG.step1.title}</span>
                <h1 className="text-3xl font-black text-neutral-100 tracking-tight leading-tight mt-1">{CONFIG.step1.question}</h1>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full mt-2 justify-center items-center relative min-h-[120px]">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 51, 153, 0.4)" }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={() => setStep(2)} 
                  className="px-8 py-3.5 bg-[#ff3399] text-neutral-900 font-black rounded-xl text-base min-w-[160px] z-10 border-2 border-neutral-100 shadow-lg shadow-[#ff3399]/20 transition-all duration-200"
                >
                  {CONFIG.step1.yesText}
                </motion.button>
                <motion.button 
                  animate={{ x: noBtnPos.x, y: noBtnPos.y }} 
                  transition={{ type: "spring", stiffness: 200, damping: 14 }} 
                  onMouseEnter={handleNoHover} 
                  onClick={handleNoHover} 
                  className="absolute sm:static px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 font-bold rounded-xl text-sm border border-neutral-800 transition-colors"
                >
                  {CONFIG.step1.noText}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div key="step2" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-[#170b24]/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-[#ff3399]/10 flex flex-col gap-5">
              <div className="text-center flex flex-col items-center gap-1">
                <Calendar3D />
                <h2 className="text-2xl font-black text-neutral-100 tracking-tight mt-1">{CONFIG.step2.title}</h2>
              </div>

              <div>
                <label className="text-[10px] font-black text-[#ff3399] uppercase tracking-widest block mb-2">{CONFIG.step2.dateLabel}</label>
                
                <div className="w-full border border-neutral-800/80 bg-neutral-950/60 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between px-1 text-neutral-300 font-bold text-sm">
                    <button onClick={handlePrevMonth} disabled={isPrevMonthDisabled} className={`p-1.5 rounded-lg transition-colors font-mono ${isPrevMonthDisabled ? 'text-neutral-700 cursor-not-allowed' : 'text-neutral-400 hover:bg-neutral-800'}`}>&lt;</button>
                    <span className="text-neutral-200 font-black">{MONTHS[currentMonth]} {currentYear}</span>
                    <button onClick={handleNextMonth} className="p-1.5 hover:bg-neutral-800 rounded-lg transition-colors text-neutral-400 font-mono">&gt;</button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-neutral-500 uppercase">
                    {WEEKDAYS.map(day => <div key={day}>{day}</div>)}
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {calendarGrid.map((day, idx) => {
                      if (day === null) return <div key={`blank-${idx}`} />;
                      
                      const isPastDay = currentYear < todayYear || 
                        (currentYear === todayYear && currentMonth < todayMonth) || 
                        (currentYear === todayYear && currentMonth === todayMonth && day < todayDay);

                      const isSelected = selectedDate && selectedDate.day === day && selectedDate.month === currentMonth && selectedDate.year === currentYear;
                      const isSpecialAnniversary = (currentYear === 2026 && currentMonth === 7 && day === 14);

                      return (
                        <button
                          key={`day-${day}`}
                          disabled={isPastDay}
                          onClick={() => {
                            setSelectedDate({ day, month: currentMonth, year: currentYear });
                            setSelectedTime('');
                          }}
                          className={`w-8 h-8 mx-auto flex flex-col items-center justify-center rounded-xl relative transition-all duration-150 ${
                            isSelected 
                              ? 'bg-[#ff3399] text-neutral-900 font-black scale-[1.05] border-2 border-neutral-100 shadow-md shadow-[#ff3399]/20' 
                              : isPastDay
                                ? 'text-neutral-700 font-light cursor-not-allowed bg-transparent opacity-25'
                                : isSpecialAnniversary 
                                  ? 'border-2 border-[#ff3399] text-[#ff3399] font-black bg-pink-950/20 shadow-[0_0_10px_rgba(255,51,153,0.25)]'
                                  : 'text-neutral-300 font-bold hover:bg-neutral-800 hover:text-[#ff3399]'
                          }`}
                        >
                          {day}
                          {isSpecialAnniversary && !isSelected && <span className="absolute -top-1.5 -right-1.5"><Sparkles3D /></span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-[#ff3399] uppercase tracking-widest block mb-2">{CONFIG.step2.timeLabel}</label>
                <div className="grid grid-cols-3 gap-2 max-h-36 overflow-y-auto pr-1">
                  {TIME_SLOTS.map((time) => {
                    const isTimeSelected = selectedTime === time;
                    const isSlotPast = isTimePast(time);

                    return (
                      <button 
                        key={time}
                        disabled={isSlotPast}
                        onClick={() => setSelectedTime(time)} 
                        className={`py-2 text-xs font-bold rounded-xl transition-all border ${
                          isTimeSelected 
                            ? 'bg-neutral-100 text-neutral-950 border-2 border-[#ff3399] font-black scale-[0.98]' 
                            : isSlotPast
                              ? 'bg-neutral-950/40 text-neutral-700 border-neutral-900 cursor-not-allowed opacity-30'
                              : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-[#ff3399]/60 hover:bg-neutral-800'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              <motion.button whileHover={selectedDate && selectedTime ? { scale: 1.02 } : {}} whileTap={selectedDate && selectedTime ? { scale: 0.98 } : {}} disabled={!selectedDate || !selectedTime} onClick={() => setStep(3)} className={`w-full py-3.5 mt-2 font-black rounded-xl transition-all shadow-lg text-center ${selectedDate && selectedTime ? 'bg-[#ff3399] text-neutral-900 border-2 border-neutral-100 shadow-[#ff3399]/10 hover:brightness-110' : 'bg-neutral-800 text-neutral-600 cursor-not-allowed'}`}>
                {CONFIG.step2.submitText}
              </motion.button>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div key="step3" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-[#170b24]/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-[#ff3399]/10 flex flex-col gap-5">
              <div className="text-center flex flex-col items-center gap-1">
                <h2 className="text-2xl font-black text-neutral-100 tracking-tight">{CONFIG.step3.title}</h2>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {DATE_ACTIVITIES.map((act) => {
                  const isActSelected = selectedActivity === act.name;
                  return (
                    <motion.button
                      key={act.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedActivity(act.name)}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col gap-0.5 transition-all ${
                        isActSelected
                          ? 'bg-neutral-800 text-neutral-100 border-2 border-[#ff3399] shadow-lg font-bold shadow-[#ff3399]/10'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-[#ff3399]/40 hover:bg-neutral-900'
                      }`}
                    >
                      <span className={`text-sm font-black ${isActSelected ? 'text-[#ff3399]' : 'text-neutral-200'}`}>{act.name}</span>
                      <span className="text-[10px] leading-tight mt-0.5">{act.description}</span>
                    </motion.button>
                  );
                })}
              </div>

              <motion.button whileHover={selectedActivity ? { scale: 1.02 } : {}} whileTap={selectedActivity ? { scale: 0.98 } : {}} disabled={!selectedActivity} onClick={() => setStep(4)} className={`w-full py-3.5 mt-2 font-black rounded-xl transition-all shadow-lg text-center ${selectedActivity ? 'bg-[#ff3399] text-neutral-900 border-2 border-neutral-100 shadow-[#ff3399]/10 hover:brightness-110' : 'bg-neutral-800 text-neutral-600 cursor-not-allowed'}`}>
                {CONFIG.step3.submitText}
              </motion.button>
            </motion.div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <motion.div key="step4" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-[#170b24]/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-[#ff3399]/10 text-center flex flex-col items-center gap-6 relative overflow-hidden">
              
              {/* 🎯 SUNTIKKAN LEDAKAN CONFETTI TEKSTUR PERAYAAN */}
              <ConfettiCelebration />

              <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-full h-full overflow-hidden rounded-3xl">
                {[...Array(12)].map((_, i) => (
                  <motion.div key={i} className="absolute w-1.5 h-1.5 bg-[#ff3399] rounded-full" initial={{ top: "0%", left: `${Math.random() * 100}%`, opacity: 1 }} animate={{ top: "100%", opacity: 0 }} transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() }} />
                ))}
              </div>

              <Sakura3D />
              <h2 className="text-4xl font-black text-[#ff3399] tracking-tight animate-bounce mt-1">{CONFIG.step4.title}</h2>
              
              <div className="w-full bg-neutral-950/80 border border-neutral-800 rounded-2xl p-5 text-left flex flex-col gap-4 my-1 shadow-inner">
                <div className="flex items-center gap-3.5 text-neutral-200">
                  <span className="text-base">📅</span>
                  <span className="font-bold text-sm sm:text-base text-neutral-100">
                    {selectedDate && new Date(selectedDate.year, selectedDate.month, selectedDate.day).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-3.5 text-neutral-200">
                  <span className="text-base">⏰</span>
                  <span className="font-bold text-sm sm:text-base text-neutral-100">{selectedTime}</span>
                </div>
                <div className="flex items-center gap-3.5 text-neutral-200">
                  <span className="text-base">✨</span>
                  <span className="font-bold text-sm sm:text-base text-[#ff3399]">Plan: {selectedActivity}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <p className="text-xl font-bold text-neutral-100">{CONFIG.step4.successMessage}</p>
                <p className="text-[9px] text-neutral-500 italic mt-3 max-w-[290px] mx-auto leading-normal tracking-wide">{CONFIG.step4.subtext}</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 📝 CONFIGURATION OBJECT (Black & Pink Theme)
// ==========================================
const CONFIG = {
  step1: {
    title: "A Special Invitation Just For You 🖤",
    question: "Will you go on a date with me?",
    yesText: "YES, I'D LOVE TO! 💕",
    noText: "No 😢",
  },
  step2: {
    title: "Let's match our times 📅✨",
    dateLabel: "Pick a day (Look out for special days! ✨)",
    timeLabel: "What time works best?",
    submitText: "Lock the Date 💕"
  },
  step3: {
    title: "What are we feeling tonight? 🍽️",
    submitText: "Finalize Setup 💕"
  },
  step4: {
    title: "YAYYY!! IT'S A DATE! 💖",
    successMessage: "I absolutely can't wait to see you! 🌷✨",
    subtext: "(Deployment status: Perfect. Playlist synced. See you very soon xx)"
  },
  // 🎵 Playlist data ala project myorbit (Ganti source URL dengan file audio/Spotify embed jika perlu)
  playlist: [
    { title: "Our Favorite Song 01", artist: "Artist Name", src: "#" },
    { title: "Cozy Vibe Track 02", artist: "Artist Name", src: "#" },
    { title: "Midnight Drive 03", artist: "Artist Name", src: "#" },
  ]
};

const DATE_ACTIVITIES = [
  { id: 'sushi', name: 'Sushi Dinner 🍣', description: 'Premium rolls & deep talk environment' },
  { id: 'gaming', name: 'Arcade & Gaming 🎮', description: 'Playful co-op matches & fun times' },
  { id: 'coffee', name: 'Late Coffee ☕', description: 'Warm drinks, quiet space, just us' },
  { id: 'ramen', name: 'Ramen Night 🍜', description: 'Cozy authentic comfort food' },
  { id: 'movie', name: 'Cinema Date 🎬', description: 'Watching something special together' },
  { id: 'gelato', name: 'Sweet Gelato 🍨', description: 'Ice cream walks & late night chills' },
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

  // 🎵 Audio Player States (myorbit core logic)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);

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

  const handlePrevMonth = () => {
    if (isPrevMonthDisabled) return;
    if (currentMonth === 0) {
      setCurrentMonth(11); setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0); setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-neutral-950 font-sans select-none overflow-hidden text-neutral-100">
      
      {/* Ambient Neon Pink Glow Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-pink-600 rounded-full filter blur-[140px] animate-pulse" />
      </div>

      {/* 🎵 Floating Music Player Widget (myorbit style Integration) */}
      <div className="absolute top-4 right-4 z-50 bg-neutral-900/90 backdrop-blur-md border border-pink-500/30 px-4 py-2.5 rounded-2xl flex items-center gap-4 shadow-lg shadow-pink-500/5 max-w-[280px]">
        <div className="flex flex-col min-w-[120px]">
          <span className="text-[10px] uppercase font-black tracking-widest text-pink-500 animate-pulse">Now Playing</span>
          <span className="text-xs font-bold truncate text-neutral-200">{CONFIG.playlist[currentTrackIdx].title}</span>
        </div>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-full bg-pink-500 hover:bg-pink-600 text-neutral-950 font-black flex items-center justify-center text-xs shadow-md shadow-pink-500/20 transition-all active:scale-95"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>

      <div ref={containerRef} className="relative z-10 w-full max-w-md p-4 flex flex-col items-center justify-center min-h-[620px]">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: WELCOME INTRO */}
          {step === 1 && (
            <motion.div key="step1" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-neutral-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-neutral-800 text-center flex flex-col items-center justify-center gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-black text-pink-400 uppercase tracking-widest">{CONFIG.step1.title}</span>
                <h1 className="text-3xl font-black text-neutral-100 tracking-tight leading-tight">{CONFIG.step1.question}</h1>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full mt-4 justify-center items-center relative min-h-[120px]">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(219, 39, 119, 0.4)" }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={() => setStep(2)} 
                  className="px-8 py-3.5 bg-pink-500 hover:bg-pink-600 text-neutral-950 font-black rounded-xl text-base min-w-[160px] z-10 border-2 border-pink-400 shadow-lg transition-all duration-200"
                >
                  {CONFIG.step1.yesText}
                </motion.button>
                <motion.button 
                  animate={{ x: noBtnPos.x, y: noBtnPos.y }} 
                  transition={{ type: "spring", stiffness: 200, damping: 14 }} 
                  onMouseEnter={handleNoHover} 
                  onClick={handleNoHover} 
                  className="absolute sm:static px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 font-bold rounded-xl text-sm border border-neutral-700 transition-colors"
                >
                  {CONFIG.step1.noText}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: HIGH-FIDELITY DYNAMIC CALENDAR */}
          {step === 2 && (
            <motion.div key="step2" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-neutral-900/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-neutral-800 flex flex-col gap-5">
              <div className="text-center">
                <h2 className="text-2xl font-black text-neutral-100 tracking-tight">{CONFIG.step2.title}</h2>
              </div>

              <div>
                <label className="text-[10px] font-black text-pink-400 uppercase tracking-widest block mb-2">{CONFIG.step2.dateLabel}</label>
                
                <div className="w-full border border-neutral-800 bg-neutral-950/60 rounded-2xl p-4 flex flex-col gap-3">
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
                      
                      // 🌟 Easter Egg: Deteksi Spesifik Anniversary & Birthday 14 Agustus
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
                              ? 'bg-pink-500 text-neutral-950 font-black scale-[1.05] border-2 border-neutral-100 shadow-md shadow-pink-500/20' 
                              : isPastDay
                                ? 'text-neutral-700 font-light cursor-not-allowed opacity-30'
                                : isSpecialAnniversary 
                                  ? 'border-2 border-pink-500 text-pink-400 font-black bg-pink-950/40 animate-pulse shadow-[0_0_10px_rgba(219,39,119,0.3)]'
                                  : 'text-neutral-300 font-bold hover:bg-neutral-800 hover:text-pink-400'
                          }`}
                        >
                          {day}
                          {isSpecialAnniversary && !isSelected && (
                            <span className="absolute -top-1 -right-1 text-[8px] animate-bounce">✨</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-pink-400 uppercase tracking-widest block mb-2">{CONFIG.step2.timeLabel}</label>
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
                            ? 'bg-neutral-100 text-neutral-950 border-2 border-pink-500 font-black scale-[0.98] shadow-md shadow-pink-500/10' 
                            : isSlotPast
                              ? 'bg-neutral-950/40 text-neutral-700 border-neutral-900 cursor-not-allowed opacity-30'
                              : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-pink-500/50 hover:bg-neutral-800'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              <motion.button whileHover={selectedDate && selectedTime ? { scale: 1.02 } : {}} whileTap={selectedDate && selectedTime ? { scale: 0.98 } : {}} disabled={!selectedDate || !selectedTime} onClick={() => setStep(3)} className={`w-full py-3.5 mt-2 font-black rounded-xl transition-all shadow-lg text-center ${selectedDate && selectedTime ? 'bg-pink-500 text-neutral-950 border-2 border-pink-400 shadow-pink-500/10 hover:bg-pink-600' : 'bg-neutral-800 text-neutral-600 cursor-not-allowed'}`}>
                {CONFIG.step2.submitText}
                  </motion.button>
            </motion.div>
          )}

          {/* STEP 3: VIBES SELECTOR */}
          {step === 3 && (
            <motion.div key="step3" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-neutral-900/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-neutral-800 flex flex-col gap-5">
              <div className="text-center">
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
                          ? 'bg-neutral-800 text-neutral-100 border-2 border-pink-500 shadow-lg font-bold shadow-pink-500/10'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-pink-500/40 hover:bg-neutral-900'
                      }`}
                    >
                      <span className={`text-sm font-black ${isActSelected ? 'text-pink-400' : 'text-neutral-200'}`}>{act.name}</span>
                      <span className="text-[10px] leading-tight mt-0.5">{act.description}</span>
                    </motion.button>
                  );
                })}
              </div>

              <motion.button whileHover={selectedActivity ? { scale: 1.02 } : {}} whileTap={selectedActivity ? { scale: 0.98 } : {}} disabled={!selectedActivity} onClick={() => setStep(4)} className={`w-full py-3.5 mt-2 font-black rounded-xl transition-all shadow-lg text-center ${selectedActivity ? 'bg-pink-500 text-neutral-950 border-2 border-pink-400 shadow-pink-500/10 hover:bg-pink-600' : 'bg-neutral-800 text-neutral-600 cursor-not-allowed'}`}>
                {CONFIG.step3.submitText}
              </motion.button>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS SUMMARY */}
          {step === 4 && (
            <motion.div key="step4" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-neutral-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-neutral-800 text-center flex flex-col items-center gap-6 relative overflow-hidden">
              {/* Confetti Pink Glow particles */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-full h-full overflow-hidden rounded-3xl">
                {[...Array(12)].map((_, i) => (
                  <motion.div key={i} className="absolute w-1.5 h-1.5 bg-pink-500 rounded-full" initial={{ top: "0%", left: `${Math.random() * 100}%`, opacity: 1 }} animate={{ top: "100%", opacity: 0 }} transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() }} />
                ))}
              </div>

              <h2 className="text-4xl font-black text-pink-500 tracking-tight animate-bounce">{CONFIG.step4.title}</h2>
              
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
                  <span className="font-bold text-sm sm:text-base text-pink-400">Plan: {selectedActivity}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <p className="text-xl font-bold text-neutral-100 font-serif">{CONFIG.step4.successMessage}</p>
                <p className="text-[9px] text-neutral-500 italic mt-3 max-w-[290px] mx-auto leading-normal tracking-wide">{CONFIG.step4.subtext}</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
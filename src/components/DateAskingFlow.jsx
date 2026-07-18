"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 📝 CONFIGURATION OBJECT
// ==========================================
const CONFIG = {
  step1: {
    title: "Special Invitation Just For You 🌸",
    question: "Will you go on a date with me?",
    yesText: "YES, I'D LOVE TO! ♥",
    noText: "No 😢",
  },
  step2: {
    title: "So... when are you free? 📅🐾",
    dateLabel: "Pick a day",
    timeLabel: "What time?",
    submitText: "Set the date ❤️"
  },
  step3: {
    title: "What are we feeling? 🍽️✨",
    submitText: "Next ❤️"
  },
  step4: {
    title: "YAYYY!! 💞",
    successMessage: "I can't wait to see you! 🌷✨",
    subtext: "Your date is set! I'll be counting down the days until we can enjoy our time together. Get ready for a wonderful experience filled with laughter, good food, and unforgettable memories. 🌸💖"
  }
};

const DATE_ACTIVITIES = [
  { id: 'pizza', name: 'Pizza 🍕', description: 'Cheesy and warm goodness' },
  { id: 'sushi', name: 'Sushi 🍣', description: 'Premium rolls & sashimi vibe' },
  { id: 'burgers', name: 'Burgers 🍔', description: 'Juicy patties and fries' },
  { id: 'pasta', name: 'Pasta 🍝', description: 'Creamy carbonara or bolognese' },
  { id: 'tacos', name: 'Tacos 🌮', description: 'Spicy and crunchy crunch' },
  { id: 'ramen', name: 'Ramen 🍜', description: 'Warm comfort food broth' },
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

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setNow(new Date());
  }, [step]);

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

  const isTimePast = (timeStr) => {
    if (!selectedDate) return false;
    
    if (selectedDate.year < todayYear) return true;
    if (selectedDate.year === todayYear && selectedDate.month < todayMonth) return true;
    if (selectedDate.year === todayYear && selectedDate.month === todayMonth && selectedDate.day < todayDay) return true;
    
    if (selectedDate.year === todayYear && selectedDate.month === todayMonth && selectedDate.day === todayDay) {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours, 10);
      minutes = parseInt(minutes, 10);

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
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <div ref={containerRef} className="relative z-10 w-full max-w-md p-4 flex flex-col items-center justify-center min-h-[600px]">
      <AnimatePresence mode="wait">
        
        {/* STEP 1 */}
        {step === 1 && (
          <motion.div key="step1" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/40 text-center flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">{CONFIG.step1.title}</span>
              <h1 className="text-3xl font-black text-rose-500 font-serif leading-snug">{CONFIG.step1.question}</h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full mt-4 justify-center items-center relative min-h-[120px]">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setStep(2)} className="px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full shadow-lg shadow-rose-200 transition-colors text-base min-w-[160px] z-10">
                {CONFIG.step1.yesText}
              </motion.button>
              <motion.button animate={{ x: noBtnPos.x, y: noBtnPos.y }} transition={{ type: "spring", stiffness: 150, damping: 15 }} onMouseEnter={handleNoHover} onClick={handleNoHover} className="absolute sm:static px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 font-medium rounded-full border border-slate-200 text-sm shadow-sm flex items-center gap-1.5">
                {CONFIG.step1.noText}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: HIGH CONTRAST DISABLED STATES */}
        {step === 2 && (
          <motion.div key="step2" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/40 flex flex-col gap-5">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-rose-500 font-serif">{CONFIG.step2.title}</h2>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">{CONFIG.step2.dateLabel}</label>
              
              <div className="w-full border border-rose-100/70 bg-rose-50/20 rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between px-1 text-slate-700 font-semibold text-sm">
                  <button onClick={handlePrevMonth} disabled={isPrevMonthDisabled} className={`p-1 rounded-lg transition-colors font-mono ${isPrevMonthDisabled ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:bg-rose-100/50'}`}>&lt;</button>
                  <span className="font-serif text-slate-800 font-bold text-base">{MONTHS[currentMonth]} {currentYear}</span>
                  <button onClick={handleNextMonth} className="p-1 hover:bg-rose-100/50 rounded-lg transition-colors text-slate-400 font-mono">&gt;</button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400">
                  {WEEKDAYS.map(day => <div key={day}>{day}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {calendarGrid.map((day, idx) => {
                    if (day === null) return <div key={`blank-${idx}`} />;
                    
                    const isPastDay = currentYear < todayYear || 
                      (currentYear === todayYear && currentMonth < todayMonth) || 
                      (currentYear === todayYear && currentMonth === todayMonth && day < todayDay);

                    const isSelected = selectedDate && selectedDate.day === day && selectedDate.month === currentMonth && selectedDate.year === currentYear;

                    return (
                      <button
                        key={`day-${day}`}
                        disabled={isPastDay}
                        onClick={() => {
                          setSelectedDate({ day, month: currentMonth, year: currentYear });
                          setSelectedTime('');
                        }}
                        className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full transition-all duration-150 ${
                          isSelected 
                            ? 'bg-rose-500 text-white shadow-md font-bold scale-[1.05] border-2 border-slate-900' 
                            : isPastDay
                              ? 'text-slate-300/85 font-light cursor-not-allowed bg-transparent' // Terbaca jelas abu-abunya namun terkesan non-aktif
                              : 'text-slate-600 font-medium hover:bg-rose-100/40 hover:text-rose-600'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">{CONFIG.step2.timeLabel}</label>
              <div className="grid grid-cols-3 gap-2 max-h-36 overflow-y-auto pr-1">
                {TIME_SLOTS.map((time) => {
                  const isTimeSelected = selectedTime === time;
                  const isSlotPast = isTimePast(time);

                  return (
                    <button 
                      key={time}
                      disabled={isSlotPast}
                      onClick={() => setSelectedTime(time)} 
                      className={`py-2 text-xs font-medium rounded-xl transition-all border ${
                        isTimeSelected 
                          ? 'bg-white text-rose-500 border-2 border-slate-900 shadow-md font-bold scale-[0.98]' 
                          : isSlotPast
                            ? 'bg-slate-100/70 text-slate-400/60 border-slate-200/50 cursor-not-allowed font-normal' // Terkunci padat berkelas
                            : 'bg-white text-slate-600 border-slate-100 hover:border-rose-200 hover:bg-rose-50/30'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.button whileHover={selectedDate && selectedTime ? { scale: 1.02 } : {}} whileTap={selectedDate && selectedTime ? { scale: 0.98 } : {}} disabled={!selectedDate || !selectedTime} onClick={() => setStep(3)} className={`w-full py-3.5 mt-2 font-bold rounded-2xl transition-all shadow-md text-center ${selectedDate && selectedTime ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
              {CONFIG.step2.submitText}
            </motion.button>
          </motion.div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <motion.div key="step3" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/40 flex flex-col gap-5">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-rose-500 font-serif">{CONFIG.step3.title}</h2>
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
                        ? 'bg-rose-50/70 text-slate-800 border-2 border-slate-900 shadow-lg font-bold'
                        : 'bg-white text-slate-700 border-slate-100 hover:border-rose-200'
                    }`}
                  >
                    <span className="text-base font-bold">{act.name}</span>
                    <span className={`text-[10px] ${isActSelected ? 'text-slate-500 font-medium' : 'text-slate-400'}`}>{act.description}</span>
                  </motion.button>
                );
              })}
            </div>

            <motion.button whileHover={selectedActivity ? { scale: 1.02 } : {}} whileTap={selectedActivity ? { scale: 0.98 } : {}} disabled={!selectedActivity} onClick={() => setStep(4)} className={`w-full py-3.5 mt-2 font-bold rounded-2xl transition-all shadow-md text-center ${selectedActivity ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
              {CONFIG.step3.submitText}
            </motion.button>
          </motion.div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <motion.div key="step4" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/40 text-center flex flex-col items-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-full h-full overflow-hidden rounded-3xl">
              {[...Array(12)].map((_, i) => (
                <motion.div key={i} className="absolute w-2 h-2 bg-pink-400 rounded-full" initial={{ top: "0%", left: `${Math.random() * 100}%`, opacity: 1 }} animate={{ top: "100%", opacity: 0 }} transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() }} />
              ))}
            </div>

            <h2 className="text-4xl font-black text-rose-500 font-serif tracking-wide animate-bounce">{CONFIG.step4.title}</h2>
            
            <div className="w-full bg-rose-50/60 border border-rose-100/80 rounded-2xl p-4 text-left flex flex-col gap-3.5 my-2">
              <div className="flex items-center gap-3 text-slate-700">
                <span className="text-lg">📅</span>
                <span className="font-semibold text-sm sm:text-base">
                  {selectedDate && new Date(selectedDate.year, selectedDate.month, selectedDate.day).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <span className="text-lg">⏰</span>
                <span className="font-semibold text-sm sm:text-base">{selectedTime}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <span className="text-lg">✨</span>
                <span className="font-semibold text-sm sm:text-base">Plan: {selectedActivity}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <p className="text-xl font-bold text-rose-500 font-serif">{CONFIG.step4.successMessage}</p>
              <p className="text-[9px] text-slate-400 italic mt-3 max-w-[290px] mx-auto leading-normal">{CONFIG.step4.subtext}</p>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
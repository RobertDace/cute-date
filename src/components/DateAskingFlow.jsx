"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FOOD_OPTIONS = [
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'pasta', name: 'Pasta', icon: '🍝' },
  { id: 'tacos', name: 'Tacos', icon: '🌮' },
  { id: 'ramen', name: 'Ramen', icon: '🍜' },
];

const TIME_SLOTS = [
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
];

export default function DateAskingFlow() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedFood, setSelectedFood] = useState('');
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

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
          <motion.div key="step1" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/40 text-center flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold text-rose-500 font-serif leading-relaxed px-2">🌸 Will you go on a date with me? 🌸</h1>
            <div className="flex flex-col sm:flex-row gap-4 w-full mt-4 justify-center items-center relative min-h-[120px]">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setStep(2)} className="px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full shadow-lg shadow-rose-200 transition-colors text-lg min-w-[140px] z-10">YES ♥</motion.button>
              <motion.button animate={{ x: noBtnPos.x, y: noBtnPos.y }} transition={{ type: "spring", stiffness: 150, damping: 15 }} onMouseEnter={handleNoHover} onClick={handleNoHover} className="absolute sm:static px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-full border border-slate-200 text-sm shadow-sm flex items-center gap-1.5">NO 😢</motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <motion.div key="step2" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/40 flex flex-col gap-5">
            <div className="text-center"><h2 className="text-2xl font-bold text-rose-500 font-serif">So... when are you free? 📅✨</h2></div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Pick a day</label>
              <input type="date" onChange={(e) => setSelectedDate(e.target.value)} className="w-full p-3 bg-rose-50/50 border border-rose-100 rounded-2xl text-slate-700 outline-none focus:border-rose-300 transition-colors font-medium text-center" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">What time?</label>
              <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                {TIME_SLOTS.map((time) => (
                  <button key={time} onClick={() => setSelectedTime(time)} className={`py-2 text-xs font-medium rounded-xl transition-all border ${selectedTime === time ? 'bg-rose-500 text-white border-rose-500 shadow-md scale-[0.98]' : 'bg-white text-slate-600 border-slate-100 hover:border-rose-200 hover:bg-rose-50/30'}`}>{time}</button>
                ))}
              </div>
            </div>
            <motion.button whileHover={selectedDate && selectedTime ? { scale: 1.02 } : {}} whileTap={selectedDate && selectedTime ? { scale: 0.98 } : {}} disabled={!selectedDate || !selectedTime} onClick={() => setStep(3)} className={`w-full py-3.5 mt-2 font-bold rounded-2xl transition-all shadow-md text-center ${selectedDate && selectedTime ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>Set the date ❤️</motion.button>
          </motion.div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <motion.div key="step3" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/40 flex flex-col gap-5">
            <div className="text-center"><h2 className="text-2xl font-bold text-rose-500 font-serif">What are we feeling? 🍽️✨</h2></div>
            <div className="grid grid-cols-2 gap-3">
              {FOOD_OPTIONS.map((food) => (
                <motion.button key={food.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedFood(food.name)} className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center gap-2 transition-all ${selectedFood === food.name ? 'bg-rose-500 text-white border-rose-500 shadow-lg font-semibold' : 'bg-white text-slate-700 border-slate-100 hover:border-rose-200'}`}>
                  <span className="text-3xl">{food.icon}</span>
                  <span className="text-sm">{food.name}</span>
                </motion.button>
              ))}
            </div>
            <motion.button whileHover={selectedFood ? { scale: 1.02 } : {}} whileTap={selectedFood ? { scale: 0.98 } : {}} disabled={!selectedFood} onClick={() => setStep(4)} className={`w-full py-3.5 mt-2 font-bold rounded-2xl transition-all shadow-md text-center ${selectedFood ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>Next ❤️</motion.button>
          </motion.div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <motion.div key="step4" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/40 text-center flex flex-col items-center gap-6 relative overflow-hidden">
            <h2 className="text-4xl font-black text-rose-500 font-serif tracking-wide animate-bounce">YAY!! 💞</h2>
            <div className="w-full bg-rose-50/60 border border-rose-100/80 rounded-2xl p-4 text-left flex flex-col gap-3.5 my-2">
              <div className="flex items-center gap-3 text-slate-700"><span>📅</span><span className="font-medium text-sm sm:text-base">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span></div>
              <div className="flex items-center gap-3 text-slate-700"><span>⏰</span><span className="font-medium text-sm sm:text-base">{selectedTime}</span></div>
              <div className="flex items-center gap-3 text-slate-700"><span>🍴</span><span className="font-medium text-sm sm:text-base">Let's eat {selectedFood}!</span></div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xl font-bold text-rose-500 font-serif">I can't wait to see you! 🌷✨</p>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
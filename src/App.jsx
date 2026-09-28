import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Heart, CalendarPlus, Sparkles, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Exact Wedding Date: Sunday, 22nd November 2026
  const targetDate = new Date('2026-11-22T08:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenTheater = () => {
    setCurtainOpen(true);

    setTimeout(() => {
      confetti({
        particleCount: 130,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#FFD700', '#E52B50', '#FFA500', '#FFFFFF']
      });
      setShowContent(true);
    }, 1200);
  };

  const calendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=B.kautham+%26+P.Geetha+Wedding&dates=20261122T023000Z/20261122T063000Z&details=Wedding+Ceremony+and+Reception+of+B.kautham+and+P.Geetha&location=Sri+Meenakshi+Sundareswarar+Temple,+Paramakudi";

  return (
    <div className="min-h-screen bg-[#120104] text-[#faebd7] font-serif relative overflow-x-hidden selection:bg-amber-600">
      
      <style>{`
        .curtain-left {
          background: repeating-linear-gradient(90deg, #3d030b 0px, #7a0c1c 25px, #240106 50px);
          transition: transform 1.6s cubic-bezier(0.77, 0, 0.175, 1);
          box-shadow: inset -20px 0 40px rgba(0, 0, 0, 0.8);
        }
        .curtain-right {
          background: repeating-linear-gradient(90deg, #240106 0px, #7a0c1c 25px, #3d030b 50px);
          transition: transform 1.6s cubic-bezier(0.77, 0, 0.175, 1);
          box-shadow: inset 20px 0 40px rgba(0, 0, 0, 0.8);
        }
        .curtain-open-left {
          transform: translateX(-100%);
        }
        .curtain-open-right {
          transform: translateX(100%);
        }
        .valance {
          background: radial-gradient(circle, #910d21 20%, #47040f 90%);
          box-shadow: 0 10px 30px rgba(0,0,0,0.8);
        }
        .gold-shine {
          background: linear-gradient(135deg, #fff7ad 0%, #ffa914 40%, #ffdf79 70%, #996515 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes pulseGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.7)); transform: scale(1); }
          50% { filter: drop-shadow(0 0 20px rgba(245, 158, 11, 1)); transform: scale(1.08); }
        }
      `}</style>

      {/* --- THEATER CURTAINS LAYER --- */}
      <div className={`fixed inset-0 z-50 pointer-events-none flex ${showContent ? 'hidden' : 'block'}`}>
        
        {/* Top Valance */}
        <div className="absolute top-0 left-0 right-0 h-16 valance border-b-4 border-amber-400 z-30 flex items-center justify-center pointer-events-auto">
          <div className="text-amber-300 font-sans tracking-[0.3em] text-xs uppercase font-bold flex items-center gap-2">
            <span>𑁍</span> WEDDING INVITATION PREMIERE <span>𑁍</span>
          </div>
        </div>

        {/* Left Curtain */}
        <div className={`w-1/2 h-full curtain-left pointer-events-auto relative ${curtainOpen ? 'curtain-open-left' : ''}`}>
          <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-600 shadow-2xl"></div>
        </div>

        {/* Right Curtain */}
        <div className={`w-1/2 h-full curtain-right pointer-events-auto relative ${curtainOpen ? 'curtain-open-right' : ''}`}>
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-amber-600 via-yellow-200 to-amber-400 shadow-2xl"></div>
        </div>

        {/* Center Curtain Trigger */}
        {!curtainOpen && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-auto p-4">
            <div className="bg-[#240207]/95 border-4 border-amber-400 p-8 rounded-full shadow-[0_0_50px_rgba(212,175,55,0.7)] text-center flex flex-col items-center max-w-xs">
              <div className="text-4xl mb-2 [animation:pulseGlow_2.5s_infinite]">🪔</div>
              <p className="text-xs text-amber-300 tracking-[0.25em] font-sans font-bold uppercase mb-1">|| WELCOME ||</p>
              <h2 className="text-xl font-bold gold-shine font-serif">B.kautham & P.Geetha</h2>
              <button
                onClick={handleOpenTheater}
                className="mt-5 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-black font-sans font-extrabold text-xs tracking-[0.2em] uppercase shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Sparkles size={16} /> ✦ OPEN INVITATION ✦
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- REVEALED WEDDING CARD SCREEN --- */}
      <main className="max-w-md mx-auto px-4 pt-16 pb-20 flex flex-col items-center text-center space-y-9 relative z-20">
        
        {/* Top Arch */}
        <div className="w-full border-t-2 border-b-2 border-amber-400/40 py-2 flex items-center justify-around text-amber-400 text-xs font-sans tracking-widest">
          <span>𑁍</span>
          <span>WEDDING INVITATION</span>
          <span>𑁍</span>
        </div>

        {/* Header & Invocation */}
        <header className="space-y-3 pt-2">
          <div className="text-4xl [animation:pulseGlow_2.5s_infinite]">🪔</div>
          <p className="text-xs text-amber-300/90 tracking-wide font-serif italic">
            With the blessing of elder,<br />
            We Request the honour of Your gracious presence on the occasion of wedding ceremony of
          </p>
        </header>

        {/* Groom & Bride Details */}
        <section className="w-full space-y-4">
          {/* Groom */}
          <div className="py-4 px-4 rounded-3xl bg-gradient-to-b from-[#4a0613]/70 to-transparent border border-amber-400/30 backdrop-blur-sm shadow-xl">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide gold-shine font-serif">
              B.kautham <span className="text-sm md:text-base font-normal text-amber-300">M.E.,M.B.A.,</span>
            </h1>
            <p className="text-xs text-amber-200/80 mt-1 font-sans">
              S/o.Dr. S.Balasubramanian Mrs.A.Alli
            </p>
          </div>

          <div className="text-amber-300 text-2xl font-serif italic">With...</div>

          {/* Bride */}
          <div className="py-4 px-4 rounded-3xl bg-gradient-to-b from-[#4a0613]/70 to-transparent border border-amber-400/30 backdrop-blur-sm shadow-xl">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide gold-shine font-serif">
              P.Geetha <span className="text-sm md:text-base font-normal text-amber-300">M.E.,</span>
            </h1>
            <p className="text-xs text-amber-200/80 mt-1 font-sans">
              D/o Mr.G.Pandy Perumal - Mrs.R.Jeya Pramila
            </p>
          </div>

          <p className="text-amber-300 font-sans tracking-[0.2em] text-xs font-bold uppercase pt-2">
            On Sunday 22nd November 2026
          </p>
        </section>

        {/* Countdown Timer */}
        <section className="w-full bg-gradient-to-b from-[#5c0819] to-[#36030c] border-2 border-amber-400/60 rounded-3xl p-5 shadow-2xl">
          <p className="text-amber-300 text-xs font-sans uppercase tracking-[0.25em] mb-4 font-bold flex items-center justify-center gap-2">
            <Sparkles size={14} /> Countdown to Wedding <Sparkles size={14} />
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Mins', val: timeLeft.minutes },
              { label: 'Secs', val: timeLeft.seconds },
            ].map((t) => (
              <div key={t.label} className="bg-[#1f0207]/90 p-2.5 rounded-2xl border border-amber-400/30 flex flex-col items-center">
                <span className="text-2xl font-bold text-amber-300 block font-serif">{String(t.val).padStart(2, '0')}</span>
                <span className="text-[10px] text-amber-200/80 font-sans mt-1">{t.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Events Cards */}
        <section className="w-full space-y-4 text-left">
          
          {/* Ceremony */}
          <div className="bg-[#4a0613] border-2 border-amber-400/60 p-5 rounded-3xl shadow-lg relative">
            <div className="absolute top-0 right-0 bg-amber-400 text-black text-[10px] font-extrabold px-3 py-1 rounded-bl-2xl uppercase">Ceremony</div>
            <h4 className="text-lg font-bold text-amber-200">Wedding Ceremony</h4>
            <div className="space-y-2 text-xs text-amber-100 font-sans mt-3">
              <p className="flex items-center gap-2"><Clock size={15} className="text-amber-400" /> 8 A.M to 10.30 A.M</p>
              <p className="flex items-start gap-2"><MapPin size={15} className="text-amber-400 shrink-0 mt-0.5" /> Sri Meenakshi Sundareswarar Temple, Paramakudi.</p>
            </div>
          </div>

          {/* Reception */}
          <div className="bg-[#4a0613] border-2 border-amber-400/60 p-5 rounded-3xl shadow-lg relative">
            <div className="absolute top-0 right-0 bg-amber-400/20 text-amber-300 border-l border-b border-amber-400/40 text-[10px] font-extrabold px-3 py-1 rounded-bl-2xl uppercase">Reception</div>
            <h4 className="text-lg font-bold text-amber-200">Reception</h4>
            <div className="space-y-2 text-xs text-amber-100 font-sans mt-3">
              <p className="flex items-center gap-2"><Clock size={15} className="text-amber-400" /> 11 A.M onwards</p>
              <p className="flex items-start gap-2">
                <MapPin size={15} className="text-amber-400 shrink-0 mt-0.5" /> 
                <span>
                  <strong>Sri Meenakshi Mahal</strong><br />
                  <span className="text-[11px] text-amber-200/70">[Near Railway Station,behind the bus stand] Paramakudi</span>
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Venue Action Buttons */}
        <section className="w-full grid grid-cols-2 gap-3 pt-1 font-sans">
          <a
            href="https://maps.google.com/?q=Sri+Meenakshi+Sundareswarar+Temple+Paramakudi"
            target="_blank"
            rel="noreferrer"
            className="py-3.5 rounded-2xl bg-amber-400 text-black text-xs font-bold tracking-wider uppercase text-center flex items-center justify-center gap-1.5 shadow"
          >
            <Compass size={15} /> Location Map
          </a>

          <a
            href={calendarUrl}
            target="_blank"
            rel="noreferrer"
            className="py-3.5 rounded-2xl bg-white/10 border border-amber-300/40 text-amber-100 text-xs font-bold tracking-wider uppercase text-center flex items-center justify-center gap-1.5 shadow"
          >
            <CalendarPlus size={15} /> Add Calendar
          </a>
        </section>

        {/* Card Special Quote */}
        <div className="w-full bg-[#450512]/90 border-2 border-amber-400/40 p-5 rounded-3xl shadow-xl space-y-2">
          <p className="text-xs text-amber-100/90 leading-relaxed italic font-serif">
            "Your Presence is the only gift we wish for.Having You share our Special day is Present enough"
          </p>
          <div className="w-16 h-[1px] bg-amber-400/30 mx-auto my-2"></div>
          <p className="text-[11px] text-amber-200/80 font-sans">
            We look forward to celebrating this Special occasion With You and Your family
          </p>
        </div>

        {/* Compliments Footer */}
        <footer className="pt-6 pb-4 text-xs text-amber-300/80 border-t border-amber-400/20 w-full space-y-1">
          <p className="italic font-serif text-amber-200/70">With Warm Regards...</p>
          <p className="font-serif text-amber-200 text-lg font-bold tracking-wider">Friends & Relatives</p>
          <p className="flex items-center justify-center gap-1 text-[11px] font-sans pt-3 text-amber-400/60">
            Made with <Heart size={12} className="text-red-500 fill-red-500" /> for the celebration
          </p>
        </footer>

      </main>

    </div>
  );
}
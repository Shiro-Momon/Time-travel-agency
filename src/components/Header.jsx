import React, { useState, useEffect } from 'react';
import { Calendar, Compass, HelpCircle, MessageSquare, Globe } from 'lucide-react';
import { translations } from '../utils/translations';

export default function Header({ onOpenChat, lang, setLang }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[lang];

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  return (
    <header className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-50 transition-all duration-300 ${isScrolled ? 'top-2' : 'top-4'}`}>
      <div className="glass rounded-2xl px-6 py-4 flex items-center justify-between border border-white/10 shadow-lg shadow-black/50">
        {/* Logo and Brand */}
        <a href="#home" onClick={scrollToTop} className="flex items-center gap-3 group">
          <img 
            src="/Assets/Images/Time travel agency logo.png" 
            alt="TimeTravel Agency Logo" 
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-display font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold-light via-luxury-gold to-luxury-gold-dark text-lg leading-none">
              TIMETRAVEL
            </span>
            <span className="text-[10px] tracking-[0.25em] text-gray-400 font-medium">
              AGENCY
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" onClick={scrollToTop} className="text-sm font-medium text-gray-300 hover:text-luxury-gold transition-colors duration-200 flex items-center gap-1.5">
            {t.navHome}
          </a>
          <a href="#destinations" className="text-sm font-medium text-gray-300 hover:text-luxury-gold transition-colors duration-200 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-luxury-gold" />
            {t.navDestinations}
          </a>
          <a href="#quiz" className="text-sm font-medium text-gray-300 hover:text-luxury-gold transition-colors duration-200 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-luxury-gold" />
            {t.navQuiz}
          </a>
          <a href="#booking" className="text-sm font-medium text-gray-300 hover:text-luxury-gold transition-colors duration-200 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-luxury-gold" />
            {t.navBook}
          </a>
        </nav>

        {/* Action Button & Language selector */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-xl px-2 py-1.5 hover:border-luxury-gold/50 transition-colors duration-200">
            <Globe className="w-3.5 h-3.5 text-luxury-gold" />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-gray-300 text-xs font-semibold outline-none cursor-pointer pr-1"
            >
              <option value="en" className="bg-luxury-card text-white">EN</option>
              <option value="fr" className="bg-luxury-card text-white">FR</option>
              <option value="es" className="bg-luxury-card text-white">ES</option>
            </select>
          </div>

          <button 
            onClick={onOpenChat}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-luxury-gold/30 hover:border-luxury-gold text-luxury-gold hover:text-white hover:bg-luxury-gold/10 transition-all duration-300 active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.navAiAdvisor}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

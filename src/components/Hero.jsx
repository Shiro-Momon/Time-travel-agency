import React from 'react';
import { ArrowDown, Compass } from 'lucide-react';
import { translations } from '../utils/translations';

export default function Hero({ lang }) {
  const t = translations[lang];

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-[1.01]"
        >
          <source src="/Assets/Video/Time travel agency Teaser.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-black/40 to-[#0B0B0C]/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-luxury-gold/30 bg-black/60 backdrop-blur-md mb-6 animate-pulse-slow">
          <span className="w-2 h-2 rounded-full bg-luxury-gold animate-ping" />
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-luxury-gold-light">
            Luxury Temporal Voyages
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-display font-extrabold tracking-tight text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
          <span className="block text-gray-200">{t.heroTitleLine1}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold-light via-luxury-gold to-luxury-gold-dark text-glow">
            {t.heroTitleLine2}
          </span>
        </h1>

        {/* Slogan */}
        <p className="text-gray-300 text-lg md:text-xl font-light tracking-wide max-w-2xl mb-10 leading-relaxed">
          {t.heroSlogan}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <a 
            href="#destinations" 
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-black hover:from-luxury-gold-light hover:to-luxury-gold shadow-lg shadow-luxury-gold/20 hover:shadow-luxury-gold/40 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <Compass className="w-5 h-5" />
            <span>{t.heroExplore}</span>
          </a>
          <a 
            href="#quiz" 
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>{t.heroQuiz}</span>
          </a>
        </div>
      </div>

      {/* Floating indicators / Scroll button */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce cursor-pointer">
        <a href="#destinations" className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-semibold mb-1">
            {t.heroScroll}
          </span>
          <ArrowDown className="w-5 h-5 text-luxury-gold" />
        </a>
      </div>
    </section>
  );
}

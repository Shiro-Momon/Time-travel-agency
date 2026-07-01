import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DestinationGallery from './components/DestinationGallery';
import RecommendationQuiz from './components/RecommendationQuiz';
import BookingForm from './components/BookingForm';
import ChatbotWidget from './components/ChatbotWidget';
import { translations } from './utils/translations';

export default function App() {
  const [selectedDestination, setSelectedDestination] = useState('paris-1889');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [lang, setLang] = useState('en');

  const handleSelectDestination = (destId) => {
    setSelectedDestination(destId);
    // Smooth scroll to booking form
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#F3F4F6] relative overflow-hidden">
      {/* Background Ambience Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none z-0" />

      {/* Navigation Header */}
      <Header onOpenChat={handleOpenChat} lang={lang} setLang={setLang} />

      {/* Main Sections */}
      <main className="relative z-10">
        {/* Cinematic Hero landing */}
        <Hero lang={lang} />

        {/* Gallery */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <DestinationGallery onSelectDestination={handleSelectDestination} lang={lang} />

        {/* Interactive quiz */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <RecommendationQuiz onSelectDestination={handleSelectDestination} lang={lang} />

        {/* Booking Form */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <BookingForm selectedDestId={selectedDestination} lang={lang} />
      </main>

      {/* Premium Footer */}
      <footer className="relative z-10 bg-black/60 border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Brand Details */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <img 
                src="/Assets/Images/Time travel agency logo.png" 
                alt="TimeTravel Agency Logo" 
                className="h-8 w-auto object-contain"
              />
              <span className="font-display font-extrabold tracking-widest text-luxury-gold text-base leading-none">
                TIMETRAVEL
              </span>
            </div>
            <p className="text-gray-500 text-xs font-light max-w-sm">
              {t.footerConcierge}
            </p>
          </div>

          {/* Center Badges */}
          <div className="flex flex-wrap justify-center gap-3 text-[10px] uppercase font-bold text-gray-500">
            <span className="px-3 py-1 rounded-full border border-white/5 bg-white/5">React 19</span>
            <span className="px-3 py-1 rounded-full border border-white/5 bg-white/5">Tailwind v4</span>
            <span className="px-3 py-1 rounded-full border border-white/5 bg-white/5">Vite</span>
            <span className="px-3 py-1 rounded-full border border-white/5 bg-white/5">Mistral AI</span>
          </div>

          {/* Right Copy */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-xs font-medium">
              &copy; {new Date().getFullYear()} TimeTravel Agency Inc.
            </p>
            <p className="text-gray-600 text-[10px] mt-1 font-light">
              {t.footerCompliance}
            </p>
          </div>
        </div>
      </footer>

      {/* Float Chatbot Agent Widget */}
      <ChatbotWidget 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        onOpen={() => setIsChatOpen(true)} 
        lang={lang}
      />
    </div>
  );
}

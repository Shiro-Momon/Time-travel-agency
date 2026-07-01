import React, { useState, useRef } from 'react';
import { Calendar, X, Clock, MapPin } from 'lucide-react';
import { translations } from '../utils/translations';

const getDestinationsData = (t) => [
  {
    id: 'paris-1889',
    name: t.parisName,
    tagline: t.parisTag,
    image: '/Assets/Images/Paris 16-9.png',
    imageSquare: '/Assets/Images/Paris 1-1.png',
    video: '/Assets/Video/Paris video.mp4',
    price: '18,500 €',
    duration: '5 days',
    era: '1889 AD',
    description: t.parisDesc,
    highlights: [t.parisH1, t.parisH2, t.parisH3, t.parisH4]
  },
  {
    id: 'cretaceous',
    name: t.cretaceousName,
    tagline: t.cretaceousTag,
    image: '/Assets/Images/Cretace 16-9.png',
    imageSquare: '/Assets/Images/Cretace 1-1.png',
    video: '/Assets/Video/Cretace video.mp4',
    price: '45,000 €',
    duration: '7 days',
    era: '65 Million BC',
    description: t.cretaceousDesc,
    highlights: [t.cretaceousH1, t.cretaceousH2, t.cretaceousH3, t.cretaceousH4]
  },
  {
    id: 'florence-1504',
    name: t.florenceName,
    tagline: t.florenceTag,
    image: '/Assets/Images/Florence 16-9.png',
    imageSquare: '/Assets/Images/Florence 1-1.png',
    video: '/Assets/Video/Florence video.mp4',
    price: '28,000 €',
    duration: '6 days',
    era: '1504 AD',
    description: t.florenceDesc,
    highlights: [t.florenceH1, t.florenceH2, t.florenceH3, t.florenceH4]
  }
];

export default function DestinationGallery({ onSelectDestination, lang }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [selectedDest, setSelectedDest] = useState(null);
  const videoRefs = useRef({});

  const t = translations[lang];
  const destinationsData = getDestinationsData(t);

  const handleMouseEnter = (id) => {
    setActiveVideo(id);
    if (videoRefs.current[id]) {
      videoRefs.current[id].play().catch((err) => console.log('Video play failed:', err));
    }
  };

  const handleMouseLeave = (id) => {
    setActiveVideo(null);
    if (videoRefs.current[id]) {
      videoRefs.current[id].pause();
      videoRefs.current[id].currentTime = 0;
    }
  };

  const openModal = (dest) => {
    setSelectedDest(dest);
  };

  const closeModal = () => {
    setSelectedDest(null);
  };

  const handleBookClick = (destId) => {
    onSelectDestination(destId);
    closeModal();
  };

  return (
    <section id="destinations" className="py-24 bg-[#0B0B0C] px-4 max-w-7xl mx-auto">
      {/* Title Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-glow">
          {t.galleryTitle}
        </h2>
        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-6" />
        <p className="text-gray-400 text-lg font-light">
          {t.gallerySubtitle}
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {destinationsData.map((dest) => {
          const isHovered = activeVideo === dest.id;
          return (
            <div
              key={dest.id}
              className="gallery-zoom-card group relative bg-luxury-card rounded-3xl overflow-hidden border border-white/5 hover:border-luxury-gold/30 transition-all duration-500 shadow-xl shadow-black/20 flex flex-col justify-between"
              onMouseEnter={() => handleMouseEnter(dest.id)}
              onMouseLeave={() => handleMouseLeave(dest.id)}
            >
              {/* Media Container */}
              <div className="relative aspect-video w-full overflow-hidden cursor-pointer" onClick={() => openModal(dest)}>
                {/* Fallback Image */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  className={`gallery-zoom-img absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    isHovered ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                {/* Hover Video */}
                <video
                  ref={(el) => (videoRefs.current[dest.id] = el)}
                  src={dest.video}
                  muted
                  loop
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                
                {/* Era Badge */}
                <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-luxury-gold-light tracking-wider uppercase">
                  {dest.era}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1 text-gray-100 group-hover:text-luxury-gold-light transition-colors duration-300">
                    {dest.name}
                  </h3>
                  <p className="text-luxury-gold text-xs font-semibold tracking-wider uppercase mb-3">
                    {dest.tagline}
                  </p>
                  <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                    {dest.description.substring(0, 120)}...
                  </p>
                </div>

                {/* Metadata details footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Clock className="w-3.5 h-3.5 text-luxury-gold" />
                    <span>{dest.duration}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase leading-none">{t.modalStarting}</span>
                    <span className="text-lg font-extrabold text-white">{dest.price}</span>
                  </div>
                </div>
              </div>

              {/* Action Overlay Button for whole card footer */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => openModal(dest)}
                  className="w-full py-3 rounded-xl font-bold bg-white/5 hover:bg-luxury-gold/10 text-gray-300 hover:text-white border border-white/10 hover:border-luxury-gold/40 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  {t.galleryButton}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Destination Modal */}
      {selectedDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300">
          <div className="relative w-full max-w-4xl bg-luxury-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image/Video Panel */}
            <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto min-h-[250px] md:min-h-0 bg-black">
              <video
                src={selectedDest.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-card via-transparent to-black/30 md:hidden" />
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-luxury-gold text-black text-xs font-bold uppercase tracking-wider">
                {selectedDest.era}
              </div>
            </div>

            {/* Modal Content Panel */}
            <div className="w-full md:w-1/2 p-8 overflow-y-auto flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-bold mb-1 block">
                  {t.modalEra}
                </span>
                <h3 className="text-3xl font-extrabold text-white mb-2 leading-none">
                  {selectedDest.name}
                </h3>
                <p className="text-sm font-medium text-gray-400 italic mb-6">
                  "{selectedDest.tagline}"
                </p>

                <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">{t.modalDescription}</h4>
                <p className="text-gray-300 text-sm font-light leading-relaxed mb-6">
                  {selectedDest.description}
                </p>

                {/* Key Highlights */}
                <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-3">{t.modalHighlights}</h4>
                <ul className="space-y-2 mb-8">
                  {selectedDest.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm text-gray-300 font-light">
                      <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price and Action Footer */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase leading-none">{t.bookingBase}</span>
                  <span className="text-2xl font-black text-luxury-gold-light mt-1">{selectedDest.price}</span>
                </div>
                <button
                  onClick={() => handleBookClick(selectedDest.id)}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-luxury-gold to-luxury-gold-dark hover:from-luxury-gold-light hover:to-luxury-gold text-black shadow-lg shadow-luxury-gold/10 transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.modalBookBtn}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}

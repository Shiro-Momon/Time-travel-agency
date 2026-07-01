import React, { useState, useEffect } from 'react';
import { Calendar, Users, Shield, ArrowRight, Sparkles, Ticket } from 'lucide-react';
import { translations } from '../utils/translations';

const ENA_PRICES = {
  'paris-1889': 18500,
  'florence-1504': 28000,
  'cretaceous': 45000
};

const CLASS_MULTIPLIERS = {
  'signature': 1.0,
  'executive': 1.25,
  'royal': 1.50
};

const monthNames = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
  es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
};

const dayNames = {
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  fr: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
  es: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"]
};

export default function BookingForm({ selectedDestId, lang }) {
  const [destination, setDestination] = useState(selectedDestId || 'paris-1889');
  const [departureDate, setDepartureDate] = useState('');
  const [selectedDateObj, setSelectedDateObj] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [viewYear, setViewYear] = useState(1889);
  const [viewMonth, setViewMonth] = useState(6); // July

  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState('signature');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [calculatedPrice, setCalculatedPrice] = useState(18500);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);

  const t = translations[lang];

  useEffect(() => {
    if (selectedDestId) {
      setDestination(selectedDestId);
      setDepartureDate('');
      setSelectedDateObj(null);
      setIsCalendarOpen(false);
    }
  }, [selectedDestId]);

  // Adjust view month/year based on selected destination
  useEffect(() => {
    if (destination === 'paris-1889') {
      setViewYear(1889);
      setViewMonth(6); // July 1889
    } else if (destination === 'florence-1504') {
      setViewYear(1504);
      setViewMonth(4); // May 1504
    } else if (destination === 'cretaceous') {
      setViewYear(2026);
      setViewMonth(6); // July 2026 proxy
    }
  }, [destination]);

  useEffect(() => {
    // Recalculate price
    const base = ENA_PRICES[destination] || 18500;
    const mult = CLASS_MULTIPLIERS[travelClass] || 1.0;
    setCalculatedPrice(Math.round(base * passengers * mult));
  }, [destination, passengers, travelClass]);

  const getDateHelperText = () => {
    switch (destination) {
      case 'paris-1889':
        return lang === 'fr' ? "Cible : 6 mai au 31 oct 1889" : lang === 'es' ? "Objetivo: 6 de mayo al 31 de oct, 1889" : "Target: May 6th to Oct 31st, 1889";
      case 'florence-1504':
        return lang === 'fr' ? "Cible : 1 mars au 30 sept 1504" : lang === 'es' ? "Objetivo: 1 de marzo al 30 de sept, 1504" : "Target: March 1st to September 30th, 1504";
      case 'cretaceous':
        return lang === 'fr' ? "Fenêtres stables, environ -65M d'années" : lang === 'es' ? "Ventanas estables, aprox. -65M de años" : "Target: Chrono-safe windows, approx. 65,000,000 BC";
      default:
        return "";
    }
  };

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => {
    const day = new Date(y, m, 1).getDay();
    return day === 0 ? 6 : day - 1; // Mon-start conversion
  };

  const formatDepartureDate = (rawDate) => {
    if (!rawDate) return '';
    const dateObj = new Date(rawDate);
    const locale = lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : 'en-US';
    
    if (destination === 'cretaceous') {
      const options = { month: 'long', day: 'numeric' };
      const formatted = dateObj.toLocaleDateString(locale, options);
      return `${formatted}, 65,000,000 BC`;
    }
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString(locale, options);
  };

  // Calendar prev/next logic with bounds
  const handlePrevMonth = () => {
    if (destination === 'paris-1889') {
      if (viewYear === 1889 && viewMonth === 4) return; // Limit to May
    } else if (destination === 'florence-1504') {
      if (viewYear === 1504 && viewMonth === 2) return; // Limit to March
    }

    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (destination === 'paris-1889') {
      if (viewYear === 1889 && viewMonth === 9) return; // Limit to October
    } else if (destination === 'florence-1504') {
      if (viewYear === 1504 && viewMonth === 8) return; // Limit to September
    }

    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isPrevDisabled = () => {
    if (destination === 'paris-1889') {
      return viewYear === 1889 && viewMonth === 4;
    } else if (destination === 'florence-1504') {
      return viewYear === 1504 && viewMonth === 2;
    }
    return false;
  };

  const isNextDisabled = () => {
    if (destination === 'paris-1889') {
      return viewYear === 1889 && viewMonth === 9;
    } else if (destination === 'florence-1504') {
      return viewYear === 1504 && viewMonth === 8;
    }
    return false;
  };

  const handleSelectDay = (day) => {
    setSelectedDateObj({ year: viewYear, month: viewMonth, day });
    const formattedString = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setDepartureDate(formattedString);
    setIsCalendarOpen(false);
  };

  // Generate calendar days
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const dayCells = [];

  const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
  const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  for (let i = firstDay - 1; i >= 0; i--) {
    dayCells.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    dayCells.push({ day: i, isCurrentMonth: true });
  }
  const remaining = 42 - dayCells.length;
  for (let i = 1; i <= remaining; i++) {
    dayCells.push({ day: i, isCurrentMonth: false });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!departureDate) newErrors.departureDate = t.errDate;
    if (!fullName.trim()) newErrors.fullName = t.errName;
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = t.errEmail;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    
    const ticketId = "TT-" + Math.floor(100000 + Math.random() * 900000);
    const details = {
      ticketId,
      fullName,
      email,
      destinationName: destination === 'paris-1889' ? t.parisName : destination === 'florence-1504' ? t.florenceName : t.cretaceousName,
      departureDate: formatDepartureDate(departureDate),
      passengers,
      travelClass: travelClass === 'signature' ? 'Signature Pod' : travelClass === 'executive' ? 'Executive Suite' : 'Royal Suite',
      price: calculatedPrice.toLocaleString() + ' €'
    };

    setTicketDetails(details);
    setIsSuccessOpen(true);
  };

  const resetForm = () => {
    setDepartureDate('');
    setSelectedDateObj(null);
    setFullName('');
    setEmail('');
    setPassengers(1);
    setTravelClass('signature');
    setIsSuccessOpen(false);
  };

  const selectPlaceholder = lang === 'fr' ? "Sélectionnez votre date..." : lang === 'es' ? "Seleccione la fecha..." : "Select transit date...";

  return (
    <section id="booking" className="py-24 bg-[#0B0B0C] px-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-bold mb-2 block">
          {lang === 'fr' ? "Bureau des Réservations" : lang === 'es' ? "Oficina de Reservas" : "Expedition Desk"}
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-glow">
          {t.bookingTitle}
        </h2>
        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-6" />
        <p className="text-gray-400 text-base font-light max-w-xl mx-auto">
          {t.bookingSubtitle}
        </p>
      </div>

      {/* Main Layout Card */}
      <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col lg:flex-row">
        
        {/* Left Form Panel */}
        <form onSubmit={handleSubmit} className="w-full lg:w-3/5 p-8 md:p-10 space-y-6 relative">
          
          {/* Destination Radio Grid */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {t.bookingTarget}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'paris-1889', label: t.parisName },
                { id: 'florence-1504', label: t.florenceName },
                { id: 'cretaceous', label: t.cretaceousName }
              ].map((dest) => (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => setDestination(dest.id)}
                  className={`py-3.5 px-2 rounded-xl text-xs md:text-sm font-bold border transition-all duration-300 cursor-pointer ${
                    destination === dest.id
                      ? 'bg-luxury-gold text-black border-luxury-gold shadow-lg shadow-luxury-gold/15'
                      : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-300'
                  }`}
                >
                  {dest.label}
                </button>
              ))}
            </div>
          </div>

          {/* Departure Date Inputs with Custom Real Calendar Popover */}
          <div className="space-y-2 relative">
            <div className="flex justify-between items-center">
              <label htmlFor="departureDate" className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {t.bookingDeparture}
              </label>
              <span className="text-[10px] text-luxury-gold font-medium">
                {getDateHelperText()}
              </span>
            </div>
            
            <div className="relative">
              <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 pointer-events-none z-10" />
              <button
                type="button"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/40 border focus:border-luxury-gold outline-none text-sm text-left transition-colors duration-200 cursor-pointer flex items-center min-h-[48px] ${
                  errors.departureDate ? 'border-red-500/50 text-red-400' : 'border-white/10 text-gray-200'
                }`}
              >
                <span>{departureDate ? formatDepartureDate(departureDate) : selectPlaceholder}</span>
              </button>

              {/* Click outside overlay */}
              {isCalendarOpen && (
                <div 
                  className="fixed inset-0 z-20 cursor-default"
                  onClick={() => setIsCalendarOpen(false)}
                />
              )}

              {/* Custom Popover Calendar */}
              {isCalendarOpen && (
                <div className="absolute top-[105%] left-0 z-30 p-4 w-80 glass-gold rounded-2xl shadow-2xl shadow-black/80 animate-fade-in border border-luxury-gold/30">
                  {/* Calendar Header controls */}
                  <div className="flex justify-between items-center mb-3">
                    <button
                      type="button"
                      disabled={isPrevDisabled()}
                      onClick={handlePrevMonth}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 cursor-pointer transition-colors duration-200 font-bold"
                    >
                      &larr;
                    </button>
                    <span className="font-display font-bold text-sm text-white tracking-wide">
                      {monthNames[lang][viewMonth]} {destination === 'cretaceous' ? '65,000,000 BC' : viewYear}
                    </span>
                    <button
                      type="button"
                      disabled={isNextDisabled()}
                      onClick={handleNextMonth}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 cursor-pointer transition-colors duration-200 font-bold"
                    >
                      &rarr;
                    </button>
                  </div>

                  {/* Day Names Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {dayNames[lang].map((name) => (
                      <span key={name} className="text-[10px] text-gray-500 font-bold uppercase py-1">{name}</span>
                    ))}
                  </div>

                  {/* Days cells grid */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {dayCells.map((cell, idx) => {
                      const isSelected = selectedDateObj &&
                                        selectedDateObj.year === viewYear &&
                                        selectedDateObj.month === viewMonth &&
                                        selectedDateObj.day === cell.day &&
                                        cell.isCurrentMonth;
                      
                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={!cell.isCurrentMonth}
                          onClick={() => handleSelectDay(cell.day)}
                          className={`text-xs py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                            !cell.isCurrentMonth
                              ? 'text-gray-700 font-light pointer-events-none'
                              : isSelected
                                ? 'bg-luxury-gold text-black font-extrabold shadow-md shadow-luxury-gold/30'
                                : 'text-gray-300 hover:bg-white/10 hover:text-luxury-gold'
                          }`}
                        >
                          {cell.day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            {errors.departureDate && (
              <p className="text-red-400 text-xs mt-1 font-light">{errors.departureDate}</p>
            )}
          </div>

          {/* Passenger and Class Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Passengers selection */}
            <div className="space-y-2">
              <label htmlFor="passengers" className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {t.bookingTravelers}
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
                <select
                  id="passengers"
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/40 border border-white/10 focus:border-luxury-gold outline-none text-sm text-gray-200 cursor-pointer appearance-none animate-none"
                >
                  {[1, 2, 3, 4].map((num) => (
                    <option key={num} value={num} className="bg-luxury-card text-white">
                      {num} {num === 1 ? (lang === 'fr' ? 'Voyageur Temporel' : lang === 'es' ? 'Viajero Temporal' : 'Temporal Traveler') : (lang === 'fr' ? 'Voyageurs Temporels' : lang === 'es' ? 'Viajeros Temporales' : 'Temporal Travelers')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Travel Class selection */}
            <div className="space-y-2">
              <label htmlFor="travelClass" className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {t.bookingPod}
              </label>
              <select
                id="travelClass"
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 focus:border-luxury-gold outline-none text-sm text-gray-200 cursor-pointer appearance-none"
              >
                <option value="signature" className="bg-luxury-card text-white">Signature Transit Pod (Standard)</option>
                <option value="executive" className="bg-luxury-card text-white">Executive Chrono-Suite (+25%)</option>
                <option value="royal" className="bg-luxury-card text-white">Royal Emperor Chamber (+50%)</option>
              </select>
            </div>

          </div>

          {/* Passenger Identity */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
              {t.bookingDetails}
            </h4>
            
            {/* Full Name */}
            <div className="space-y-2">
              <input
                type="text"
                placeholder={t.bookingName}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full px-4 py-3.5 rounded-xl bg-black/40 border focus:border-luxury-gold outline-none text-sm text-gray-200 transition-colors duration-200 ${
                  errors.fullName ? 'border-red-500/50' : 'border-white/10'
                }`}
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs font-light">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <input
                type="email"
                placeholder={t.bookingEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3.5 rounded-xl bg-black/40 border focus:border-luxury-gold outline-none text-sm text-gray-200 transition-colors duration-200 ${
                  errors.email ? 'border-red-500/50' : 'border-white/10'
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs font-light">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl text-base font-extrabold bg-gradient-to-r from-luxury-gold to-luxury-gold-dark hover:from-luxury-gold-light hover:to-luxury-gold text-black shadow-lg shadow-luxury-gold/10 hover:shadow-luxury-gold/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            <span>{t.bookingBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Right Calculator Panel */}
        <div className="w-full lg:w-2/5 bg-white/5 border-l border-white/10 p-8 md:p-10 flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {t.bookingLedger}
            </h4>
            
            {/* Calculation details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">{t.bookingBase}</span>
                <span className="text-white font-medium">
                  {(ENA_PRICES[destination] || 18500).toLocaleString()} €
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">{lang === 'fr' ? 'Voyageurs' : lang === 'es' ? 'Viajeros' : 'Travelers'}</span>
                <span className="text-white font-medium">x {passengers}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">{t.bookingClassMult}</span>
                <span className="text-white font-medium">x {CLASS_MULTIPLIERS[travelClass]}</span>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-base font-bold text-gray-200">{t.bookingTotal}</span>
                <span className="text-2xl font-black text-luxury-gold text-glow">
                  {calculatedPrice.toLocaleString()} €
                </span>
              </div>
            </div>

            {/* Shield list */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-gray-200 uppercase tracking-wide">{t.bookingSafetyTitle}</h5>
                  <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                    {t.bookingSafetyDesc}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Ticket className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-gray-200 uppercase tracking-wide">{t.bookingPermitTitle}</h5>
                  <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                    {t.bookingPermitDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center text-[10px] text-gray-500 font-light leading-relaxed">
            TimeTravel Inc. is registered under temporal directive C-491. All warp operations are closely monitored.
          </div>
        </div>

      </div>

      {/* Booking Success Modal */}
      {isSuccessOpen && ticketDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity duration-300">
          <div className="relative w-full max-w-lg bg-luxury-card rounded-3xl overflow-hidden border border-luxury-gold/30 shadow-2xl p-8 text-center flex flex-col items-center">
            
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-luxury-gold/10 border border-luxury-gold/50 flex items-center justify-center text-luxury-gold mb-6 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="text-3xl font-extrabold text-white mb-2 leading-none">
              {t.successTitle}
            </h3>
            <p className="text-sm font-light text-gray-400 mb-8">
              {t.successSubtitle}
            </p>

            {/* Ticket Card mockup */}
            <div className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-left space-y-4 mb-8 font-mono relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/5 rounded-full blur-2xl" />
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] text-gray-500">{t.successBoardingPass}</span>
                <span className="text-[10px] text-luxury-gold font-bold">{ticketDetails.ticketId}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 uppercase">{t.successTraveler}</span>
                  <span className="text-xs text-white font-bold">{ticketDetails.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 uppercase">{t.successTarget}</span>
                  <span className="text-xs text-white font-bold">{ticketDetails.destinationName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 uppercase">{t.successDeparture}</span>
                  <span className="text-xs text-white font-bold">{ticketDetails.departureDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 uppercase">{t.successTravelersCount}</span>
                  <span className="text-xs text-white font-bold">{ticketDetails.passengers} seat(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 uppercase">{t.successPod}</span>
                  <span className="text-xs text-white font-bold">{ticketDetails.travelClass}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 font-sans font-black">
                  <span className="text-xs text-gray-400">{t.successPrice}</span>
                  <span className="text-sm text-luxury-gold">{ticketDetails.price}</span>
                </div>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="w-full py-4 rounded-xl text-sm font-bold bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 transition-colors duration-200 cursor-pointer"
            >
              {t.successBtn}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

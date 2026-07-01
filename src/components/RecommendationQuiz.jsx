import React, { useState } from 'react';
import { RefreshCw, CheckCircle, Compass, ChevronRight } from 'lucide-react';
import { translations } from '../utils/translations';

const getQuestions = (t) => [
  {
    id: 1,
    question: t.q1,
    options: [
      { text: t.q1_opt1, pointsTo: "florence-1504" },
      { text: t.q1_opt2, pointsTo: "cretaceous" },
      { text: t.q1_opt3, pointsTo: "paris-1889" }
    ]
  },
  {
    id: 2,
    question: t.q2,
    options: [
      { text: t.q2_opt1, pointsTo: "paris-1889" },
      { text: t.q2_opt2, pointsTo: "cretaceous" },
      { text: t.q2_opt3, pointsTo: "florence-1504" }
    ]
  },
  {
    id: 3,
    question: t.q3,
    options: [
      { text: t.q3_opt1, pointsTo: "paris-1889" },
      { text: t.q3_opt2, pointsTo: "cretaceous" },
      { text: t.q3_opt3, pointsTo: "florence-1504" }
    ]
  },
  {
    id: 4,
    question: t.q4,
    options: [
      { text: t.q4_opt1, pointsTo: "paris-1889" },
      { text: t.q4_opt2, pointsTo: "cretaceous" },
      { text: t.q4_opt3, pointsTo: "florence-1504" }
    ]
  }
];

const getResultsData = (t) => ({
  'paris-1889': {
    name: t.parisName,
    tagline: t.parisTag,
    image: "/Assets/Images/Paris 1-1.png",
    description: t.r_paris,
    highlights: [t.parisH1, t.parisH2, t.parisH3]
  },
  'cretaceous': {
    name: t.cretaceousName,
    tagline: t.cretaceousTag,
    image: "/Assets/Images/Cretace 1-1.png",
    description: t.r_cretaceous,
    highlights: [t.cretaceousH1, t.cretaceousH2, t.cretaceousH3]
  },
  'florence-1504': {
    name: t.florenceName,
    tagline: t.florenceTag,
    image: "/Assets/Images/Florence 1-1.png",
    description: t.r_florence,
    highlights: [t.florenceH1, t.florenceH2, t.florenceH3]
  }
});

export default function RecommendationQuiz({ onSelectDestination, lang }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const t = translations[lang];
  const questions = getQuestions(t);
  const resultsData = getResultsData(t);

  const handleSelectOption = (pointsTo) => {
    const updatedAnswers = [...answers, pointsTo];
    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate final result
      const counts = {};
      let maxPoints = 0;
      let recommended = 'paris-1889'; // Default fallback

      updatedAnswers.forEach((ans) => {
        counts[ans] = (counts[ans] || 0) + 1;
        if (counts[ans] > maxPoints) {
          maxPoints = counts[ans];
          recommended = ans;
        }
      });

      setResult(recommended);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <section id="quiz" className="py-24 bg-luxury-dark px-4 border-y border-white/5">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-bold mb-2 block">
            Interactive Finder
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-glow">
            {t.quizTitle}
          </h2>
          <p className="text-gray-400 text-base font-light max-w-xl mx-auto">
            {t.quizSubtitle}
          </p>
        </div>

        {/* Quiz Container */}
        <div className="glass rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl shadow-black/40 min-h-[400px] flex flex-col justify-between">
          {!result ? (
            /* Active Quiz Step */
            <div className="flex flex-col justify-between h-full flex-grow">
              <div>
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-semibold text-luxury-gold uppercase tracking-wider">
                    {t.quizHeader.replace('{current}', questions[currentStep].id).replace('{total}', questions.length)}
                  </span>
                  <div className="flex gap-1.5">
                    {questions.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                          idx <= currentStep ? 'bg-luxury-gold' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
                  {questions[currentStep].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {questions[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.pointsTo)}
                    className="w-full text-left p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-luxury-gold/10 hover:border-luxury-gold/50 text-gray-300 hover:text-white font-medium transition-all duration-300 flex items-center justify-between group active:scale-[0.99] cursor-pointer"
                  >
                    <span>{opt.text}</span>
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-luxury-gold transition-colors duration-300" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="text-center md:text-left flex flex-col md:flex-row gap-8 items-center">
              {/* Result Image */}
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shrink-0 border-2 border-luxury-gold/30 shadow-lg shadow-luxury-gold/10">
                <img
                  src={resultsData[result].image}
                  alt={resultsData[result].name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Result Copy */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20 text-xs font-semibold uppercase tracking-wider mb-3">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{t.quizMatch}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                    {resultsData[result].name}
                  </h3>
                  <p className="text-luxury-gold text-sm font-semibold tracking-wide uppercase mb-4">
                    {resultsData[result].tagline}
                  </p>
                  <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-6">
                    {resultsData[result].description}
                  </p>

                  <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">{t.modalHighlights}</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {resultsData[result].highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
                  <button
                    onClick={() => onSelectDestination(result)}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-luxury-gold to-luxury-gold-dark hover:from-luxury-gold-light hover:to-luxury-gold text-black transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    <Compass className="w-4 h-4" />
                    <span>{t.quizPrebook}</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>{t.quizRetake}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

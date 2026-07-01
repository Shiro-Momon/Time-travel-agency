import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Key, AlertCircle, Sparkles } from 'lucide-react';
import { translations } from '../utils/translations';

const getSystemPrompt = (lang) => {
  const targetLang = lang === 'fr' ? 'French' : lang === 'es' ? 'Spanish' : 'English';
  return `You are the virtual assistant of TimeTravel Agency, a luxury temporal travel agency. 
Your role is to advise clients on their temporal voyages and guide them in choosing the best destination.
CRITICAL: You must write and reply ONLY in the ${targetLang} language!
Tone: Professional, warm, passionate about history, enthusiastic but never overly familiar, expert.
Knowledge Base:
- Paris 1889: Belle Époque, Eiffel Tower construction, World's Fair (Exposition Universelle). Price: 18,500 €.
- Cretaceous: -65 Million Years, dinosaur safaris, raw wilderness, T-Rex observation, prehistoric plants. Price: 45,000 €.
- Florence 1504: Italian Renaissance, workshops of Michelangelo and Leonardo da Vinci, unveil of Statue of David, banquets. Price: 28,000 €.

Guidance Rules:
- Answer questions about our three destinations.
- Offer cohesive historical facts and custom suggestions.
- If asked about pricing, be transparent but highlight the luxury, safety, and exclusivity of the package.
- Suggest destinations based on client interests.
- Keep answers relatively concise and engaging.`;
};

const getMockResponses = (lang) => {
  if (lang === 'fr') {
    return [
      {
        keywords: ['salut', 'bonjour', 'hey', 'hello'],
        text: "Bienvenue à TimeTravel Agency. Je suis votre concierge temporel. Comment puis-je vous aider dans votre voyage à travers les époques aujourd'hui ?"
      },
      {
        keywords: ['paris', '1889', 'belle', 'eiffel'],
        text: "Paris 1889 est une merveille du progrès humain ! Pour 18 500 €, vous assisterez à l'inauguration de la Tour Eiffel, explorerez l'Exposition Universelle et vivrez l'effervescence de la Belle Époque. Souhaitez-vous que je vous dirige vers le formulaire de réservation ?"
      },
      {
        keywords: ['cretace', 'cretacé', 'dinosaure', 'trex', 'prehistorique'],
        text: "Ah, le Crétacé ! Un voyage sauvage pour les aventuriers. Pour 45 000 €, observez le Tyrannosaure Rex en sécurité et explorez notre Terre primitive. L'aventure préhistorique vous tente ?"
      },
      {
        keywords: ['florence', '1504', 'renaissance', 'vinci', 'david', 'art'],
        text: "Florence 1504 est notre joyau culturel. Pour 28 000 €, accédez à l'atelier de Michel-Ange et assistez au dévoilement du David. C'est idéal pour les passionnés d'art et d'architecture."
      },
      {
        keywords: ['prix', 'tarif', 'combien', 'cout', 'coût'],
        text: "Nos expéditions commencent à 18 500 € pour Paris 1889, 28 000 € pour Florence 1504, et 45 000 € pour le Crétacé. Cela inclut le transit en chronosphère, l'hébergement de luxe, les costumes d'époque et la sécurité temporelle absolue."
      },
      {
        keywords: ['securite', 'sécurité', 'danger', 'dangereux'],
        text: "Votre sécurité est notre priorité absolue. Nous utilisons des chronosphères blindées et des boucliers thermiques/invisibles pour le Crétacé. Aucune perturbation de la ligne temporelle n'est possible."
      }
    ];
  } else if (lang === 'es') {
    return [
      {
        keywords: ['hola', 'buenos', 'buenas', 'hey', 'hello'],
        text: "Bienvenido a TimeTravel Agency. Soy su conserje temporal. ¿Cómo puedo asistirle hoy en su viaje a través del tiempo?"
      },
      {
        keywords: ['paris', '1889', 'belle', 'eiffel'],
        text: "¡París 1889 es un milagro del progreso humano! Por 18.500 €, asistirá a la inauguración de la Torre Eiffel, explorará la Exposición Universal y vivirá el esplendor de la Belle Époque. ¿Desea que le guíe al formulario de reserva?"
      },
      {
        keywords: ['cretacico', 'cretácico', 'dinosaurio', 'trex', 'prehistorico'],
        text: "¡El Cretácico! Un viaje salvaje para aventureros de verdad. Por 45.000 €, observe al T-Rex en observatorios blindados y explore la Tierra primitiva. ¿Le entusiasma la aventura prehistórica?"
      },
      {
        keywords: ['florencia', '1504', 'renaissance', 'vinci', 'david', 'art', 'renacimiento'],
        text: "Florencia 1504 es nuestra joya cultural. Por 28.000 €, entre en el taller de Miguel Ángel y asista a la presentación del David. Perfecto para amantes del arte."
      },
      {
        keywords: ['precio', 'costo', 'cuanto', 'tarifa', 'cuesta'],
        text: "Nuestras expediciones empiezan en 18.500 € para París 1889, 28.000 € para Florencia 1504 y 45.000 € para el Cretácico. Incluyen transporte en cronosfera, alojamiento de lujo y seguridad total."
      },
      {
        keywords: ['seguro', 'seguridad', 'peligro', 'peligroso'],
        text: "Su seguridad es prioritaria. Usamos cronosferas con tecnología militar y escudos de fuerza invisibles. Cumplimos estrictamente las directivas de no interferencia temporal."
      }
    ];
  } else {
    // English defaults
    return [
      {
        keywords: ['hi', 'hello', 'hey', 'bonjour'],
        text: "Welcome to TimeTravel Agency. I am your temporal concierge. How may I assist your voyage through the eras today?"
      },
      {
        keywords: ['paris', '1889', 'belle', 'eiffel'],
        text: "Paris 1889 is a marvel of human progress! For 18,500 €, you will witness the Eiffel Tower's grand opening, explore the World's Fair, and experience the cultural peak of the Belle Époque. Would you like me to guide you to our booking form?"
      },
      {
        keywords: ['cretaceous', 'cretace', 'dinosaur', 'trex', 'prehistoric'],
        text: "Ah, the Cretaceous Era! A wild journey for true adventurers. Priced at 45,000 €, you'll safely observe the Tyrannosaurus Rex in armored observatories and experience Earth in its rawest form. Does prehistoric adventure excite you?"
      },
      {
        keywords: ['florence', '1504', 'renaissance', 'vinci', 'david', 'art'],
        text: "Florence 1504 is our crown jewel of culture. For 28,000 €, you'll gain private access to Michelangelo's studio and attend the unveiling of the Statue of David. It is perfect for art and architecture lovers."
      },
      {
        keywords: ['price', 'pricing', 'cost', 'how much'],
        text: "Our expeditions start at 18,500 € for Paris 1889, 28,000 € for Florence 1504, and 45,000 € for the Cretaceous. These include chronosphere transit, ultra-premium lodging, historical outfits, and total chronological security."
      },
      {
        keywords: ['safe', 'security', 'dangerous', 'danger'],
        text: "Your safety is our absolute priority. We operate state-of-the-art chronospheres and provide high-tech invisible forcefields for Cretaceous safaris. We strictly adhere to the Temporal Non-Interference Directive."
      }
    ];
  }
};

const getDefaultMock = (lang) => {
  if (lang === 'fr') {
    return "C'est une question fascinante. Nos expéditions couvrent la Renaissance, la Belle Époque et le Crétacé préhistorique. Dites-m'en plus sur ce que vous aimez, et je vous conseillerai l'époque idéale !";
  } else if (lang === 'es') {
    return "Es una pregunta fascinante. Nuestras rutas cubren el Renacimiento, la Belle Époque y el Cretácico prehistórico. ¡Dígame qué le apasiona y le recomendaré la época ideal!";
  } else {
    return "That is a fascinating question. Our temporal mappings cover the Renaissance, the Belle Époque, and the Prehistoric Cretaceous. Tell me more about what you love to do, and I will recommend your ideal time period!";
  }
};

export default function ChatbotWidget({ isOpen, onClose, onOpen, lang }) {
  const t = translations[lang];
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState(localStorage.getItem('mistral_api_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize/Reset welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: t.chatConcierge,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [lang]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSaveKey = (e) => {
    e.preventDefault();
    localStorage.setItem('mistral_api_key', apiKey.trim());
    setShowKeyInput(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const activeKey = import.meta.env.VITE_MISTRAL_API_KEY || localStorage.getItem('mistral_api_key');

    if (activeKey) {
      // Direct API call to Mistral AI using mistral-small
      try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${activeKey}`
          },
          body: JSON.stringify({
            model: 'mistral-small-latest',
            messages: [
              { role: 'system', content: getSystemPrompt(lang) },
              ...messages.map(m => ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.text
              })),
              { role: 'user', content: input }
            ],
            temperature: 0.7
          })
        });

        if (!response.ok) throw new Error('API request failed');

        const data = await response.json();
        const botReply = data.choices[0].message.content;

        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: botReply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } catch (err) {
        console.error('Mistral AI call failed, falling back to mock response:', err);
        triggerMockResponse(input);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Simulate API call and respond with Mock
      setTimeout(() => {
        triggerMockResponse(input);
        setIsLoading(false);
      }, 800);
    }
  };

  const triggerMockResponse = (userInput) => {
    const cleanInput = userInput.toLowerCase();
    let reply = null;

    const mockResponses = getMockResponses(lang);

    for (const item of mockResponses) {
      if (item.keywords.some(keyword => cleanInput.includes(keyword))) {
        reply = item.text;
        break;
      }
    }

    if (!reply) reply = getDefaultMock(lang);

    setMessages((prev) => [
      ...prev,
      {
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-black hover:scale-110 shadow-lg shadow-luxury-gold/20 hover:shadow-luxury-gold/40 transition-all duration-300 animate-float active:scale-95 group cursor-pointer"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-[#0B0B0C]" />
        </button>
      )}

      {/* Expanded Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-[400px] h-[550px] glass-gold rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300">
          
          {/* Header */}
          <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-luxury-dark" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">{t.chatConciergeTitle}</h4>
                <p className="text-[10px] text-luxury-gold-light font-medium tracking-wide">{t.chatConciergeSub}</p>
              </div>
            </div>

            {/* Top Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowKeyInput(!showKeyInput)}
                className={`p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 ${
                  localStorage.getItem('mistral_api_key') ? 'text-luxury-gold' : 'text-gray-400'
                }`}
                title="Configure API Key"
              >
                <Key className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Panels (Key Input OR Messages) */}
          <div className="flex-grow overflow-y-auto p-4 flex flex-col justify-between bg-black/20">
            {showKeyInput ? (
              /* API Key Setup Form */
              <div className="flex flex-col justify-center items-center h-full p-4 text-center">
                <AlertCircle className="w-12 h-12 text-luxury-gold mb-3 animate-pulse" />
                <h5 className="font-display font-bold text-base text-white mb-2">{t.chatApiKeyTitle}</h5>
                {import.meta.env.VITE_MISTRAL_API_KEY ? (
                  <div className="text-xs text-green-400 font-semibold mb-4 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-green-400" />
                    <span>.env API Key Active</span>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 max-w-[280px] mb-6 font-light">
                    {t.chatApiKeyDesc}
                  </p>
                )}
                <form onSubmit={handleSaveKey} className="w-full flex flex-col gap-3">
                  <input
                    type="password"
                    placeholder={t.chatApiKeyPlaceholder}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-luxury-gold outline-none text-sm text-gray-200 transition-colors duration-200"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-grow py-3 rounded-xl text-xs font-bold bg-luxury-gold text-black hover:bg-luxury-gold-light transition-colors duration-200 cursor-pointer"
                    >
                      {t.chatApiKeySave}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowKeyInput(false)}
                      className="px-4 py-3 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                    >
                      {t.chatApiKeyCancel}
                    </button>
                  </div>
                  {localStorage.getItem('mistral_api_key') && (
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem('mistral_api_key');
                        setApiKey('');
                        setShowKeyInput(false);
                      }}
                      className="text-xs text-red-400 hover:text-red-300 font-medium underline mt-2"
                    >
                      {t.chatApiKeyDelete}
                    </button>
                  )}
                </form>
              </div>
            ) : (
              /* Message Logs */
              <div className="space-y-4 flex-grow flex flex-col justify-end">
                <div className="overflow-y-auto space-y-4 max-h-[380px] pr-1">
                  {messages.map((msg, index) => {
                    const isBot = msg.sender === 'bot';
                    return (
                      <div
                        key={index}
                        className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-end gap-2`}
                      >
                        {isBot && (
                          <div className="w-6 h-6 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-[10px] text-luxury-gold shrink-0">
                            {t.chatConciergePrefix}
                          </div>
                        )}
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-3 text-xs md:text-sm font-light leading-relaxed shadow-sm ${
                            isBot
                              ? 'bg-luxury-card text-gray-200 border border-white/5 rounded-bl-none'
                              : 'bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-black font-semibold rounded-br-none'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <span className={`block text-[9px] mt-1 text-right ${isBot ? 'text-gray-500' : 'text-black/60'}`}>
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {isLoading && (
                    <div className="flex justify-start items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-[10px] text-luxury-gold shrink-0 animate-spin">
                        *
                      </div>
                      <div className="bg-luxury-card text-gray-400 border border-white/5 rounded-2xl rounded-bl-none px-4 py-2.5 text-xs flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
          </div>

          {/* Footer Input Area */}
          {!showKeyInput && (
            <form onSubmit={handleSend} className="p-3 bg-white/5 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chatPlaceholder}
                disabled={isLoading}
                className="flex-grow px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-luxury-gold outline-none text-xs text-gray-200 transition-colors duration-200"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-3 rounded-xl bg-luxury-gold hover:bg-luxury-gold-light text-black transition-colors duration-200 disabled:opacity-50 flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      )}
    </>
  );
}

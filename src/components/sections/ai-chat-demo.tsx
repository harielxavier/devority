'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Users, Sparkles, Building2, Calendar, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define conversation scenarios for different industries
const conversationScenarios = [
  {
    id: 'attorney',
    industry: 'Law Firm',
    icon: Building2,
    color: 'from-blue-500 to-indigo-600',
    messages: [
      { type: 'bot', text: "Hello! Welcome to Johnson & Associates Law Firm. I'm your AI assistant. How can I help you today?" },
      { type: 'user', text: "I was in a car accident last week and need legal help" },
      { type: 'bot', text: "I'm sorry to hear about your accident. I can definitely help connect you with the right attorney. First, are you currently experiencing any injuries that required medical attention?" },
      { type: 'user', text: "Yes, I went to the ER and have ongoing back pain" },
      { type: 'bot', text: "Thank you for that information. This sounds like a case we can help with. Was the other driver at fault, and did you file a police report?" },
      { type: 'user', text: "Yes to both. The other driver ran a red light" },
      { type: 'bot', text: "Excellent, you've taken the right steps. Based on your situation, I recommend scheduling a free consultation with Attorney Sarah Johnson, our personal injury specialist. She has a 98% success rate with similar cases. Would Tuesday at 2 PM or Thursday at 10 AM work better for you?" },
      { type: 'user', text: "Tuesday at 2 PM works great" },
      { type: 'bot', text: "Perfect! I've scheduled your consultation for Tuesday at 2 PM with Attorney Johnson. I'm sending you a confirmation email with:\n• Meeting details and office location\n• Documents to bring\n• What to expect during your consultation\n\nIs there anything else I can help you with today?" }
    ]
  },
  {
    id: 'dental',
    industry: 'Dental Practice',
    icon: Building2,
    color: 'from-teal-500 to-cyan-600',
    messages: [
      { type: 'bot', text: "Welcome to Bright Smile Dental! I'm here to help with appointments, questions, or dental emergencies. What brings you here today?" },
      { type: 'user', text: "I have severe tooth pain and need to see someone urgently" },
      { type: 'bot', text: "I understand you're in pain, and we want to help right away. On a scale of 1-10, how would you rate your pain level?" },
      { type: 'user', text: "It's about an 8, keeping me awake at night" },
      { type: 'bot', text: "That sounds very uncomfortable. We have an emergency slot available today at 3:30 PM with Dr. Martinez. Would you be able to come in then?" },
      { type: 'user', text: "Yes, I can make that work. Thank you!" },
      { type: 'bot', text: "You're all set for 3:30 PM today with Dr. Martinez. I've noted this as an urgent care visit for severe tooth pain. Please bring:\n• Your insurance card\n• A list of current medications\n• Any recent dental X-rays if available\n\nWe'll text you directions and parking information. Feel better soon!" }
    ]
  },
  {
    id: 'hvac',
    industry: 'HVAC Services',
    icon: Building2,
    color: 'from-orange-500 to-red-600',
    messages: [
      { type: 'bot', text: "Hi there! Welcome to CoolBreeze HVAC Services. I can help with scheduling service, emergency repairs, or answering questions. What can I do for you?" },
      { type: 'user', text: "My AC stopped working and it's 95 degrees outside!" },
      { type: 'bot', text: "I understand how urgent this is in this heat! Let me help you right away. Is your system not turning on at all, or is it running but not cooling?" },
      { type: 'user', text: "It turns on but only blows warm air" },
      { type: 'bot', text: "Thank you for that detail. This could be a refrigerant issue or compressor problem. We have an emergency technician available who can be at your location within 2 hours. What's your zip code?" },
      { type: 'user', text: "78701" },
      { type: 'bot', text: "Great! I have technician Mike available for your area. He can arrive between 4-6 PM today. Our emergency service call is $125, which includes diagnosis. Any repairs would be additional. Should I schedule Mike for you?" },
      { type: 'user', text: "Yes please, the sooner the better" },
      { type: 'bot', text: "Perfect! Mike is scheduled for 4-6 PM today at your location. You'll receive:\n• A text when Mike is on his way\n• His direct number for any questions\n• An upfront price estimate before any work begins\n\nMike has a 4.9-star rating and specializes in AC repairs. Stay cool - help is on the way!" }
    ]
  },
  {
    id: 'restaurant',
    industry: 'Restaurant',
    icon: Building2,
    color: 'from-green-500 to-emerald-600',
    messages: [
      { type: 'bot', text: "Welcome to Bella Vista Italian Kitchen! I can help with reservations, catering, or answer any questions. How may I assist you?" },
      { type: 'user', text: "I'd like to make a reservation for 6 people this Saturday" },
      { type: 'bot', text: "I'd be happy to help with your reservation for 6 guests this Saturday! What time were you thinking? We have availability at 6:00, 7:30, or 9:00 PM." },
      { type: 'user', text: "7:30 would be perfect" },
      { type: 'bot', text: "Excellent choice! 7:30 PM for 6 guests this Saturday. Do you have any special requests? Perhaps a birthday celebration or dietary restrictions I should note?" },
      { type: 'user', text: "It's actually my wife's birthday! And we have one vegan in the group" },
      { type: 'bot', text: "How wonderful! Happy early birthday to your wife! 🎉 I've noted:\n• Birthday celebration (we'll prepare a complimentary dessert!)\n• One vegan guest (our chef has excellent vegan options)\n\nWould you prefer indoor dining or our scenic patio? The weather should be beautiful Saturday evening." },
      { type: 'user', text: "The patio sounds amazing" },
      { type: 'bot', text: "Perfect! Your reservation is confirmed:\n📅 Saturday at 7:30 PM\n👥 Party of 6\n🌿 Patio seating\n🎂 Birthday celebration with complimentary dessert\n🌱 Vegan options needed\n\nYou'll receive a confirmation text with directions and parking info. We look forward to making your wife's birthday special! See you Saturday!" }
    ]
  }
];

interface Message {
  type: 'bot' | 'user';
  text: string;
}

export function AIChatDemo() {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentScenario = conversationScenarios[currentScenarioIndex];

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [displayedMessages, currentTypingText]);

  // Typing animation effect
  useEffect(() => {
    if (currentMessageIndex < currentScenario.messages.length) {
      const message = currentScenario.messages[currentMessageIndex];
      const isUserMessage = message.type === 'user';
      
      // Delay before starting to type
      const startDelay = isUserMessage ? 1500 : 800;
      
      setTimeout(() => {
        setIsTyping(true);
        let charIndex = 0;
        const text = message.text;
        
        // Clear any existing interval
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
        }
        
        // Typing speed varies by message type
        const typingSpeed = isUserMessage 
          ? 30 + Math.random() * 20  // Faster for user
          : 20 + Math.random() * 15; // Slightly slower for bot
        
        typingIntervalRef.current = setInterval(() => {
          if (charIndex <= text.length) {
            setCurrentTypingText(text.slice(0, charIndex));
            charIndex++;
          } else {
            // Typing complete
            clearInterval(typingIntervalRef.current!);
            setIsTyping(false);
            setCurrentTypingText('');
            setDisplayedMessages(prev => [...prev, message]);
            setCurrentMessageIndex(prev => prev + 1);
          }
        }, typingSpeed);
      }, startDelay);
    } else {
      // All messages displayed, wait then move to next scenario
      const timeout = setTimeout(() => {
        const nextIndex = (currentScenarioIndex + 1) % conversationScenarios.length;
        setCurrentScenarioIndex(nextIndex);
        setDisplayedMessages([]);
        setCurrentMessageIndex(0);
        setCurrentTypingText('');
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
    
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, [currentMessageIndex, currentScenarioIndex, currentScenario.messages]);

  const currentTypingMessage = currentMessageIndex < currentScenario.messages.length
    ? currentScenario.messages[currentMessageIndex]
    : null;

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-sunset-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-container container-padding mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-electric-400" />
            <h2 className="text-section-title gradient-text">
              AI That Works While You Sleep
            </h2>
            <Sparkles className="w-8 h-8 text-sunset-400" />
          </div>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-4">
            Watch how our AI handles real customer conversations across different industries
          </p>
          <p className="text-sm text-electric-300 font-medium">
            24/7 availability • Instant responses • Zero wait times
          </p>
        </motion.div>

        {/* Main Chat Demo Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Industry Indicators */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {conversationScenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: index === currentScenarioIndex ? 1 : 0.5,
                  scale: index === currentScenarioIndex ? 1 : 0.9
                }}
                transition={{ duration: 0.3 }}
                className={`px-4 py-2 rounded-full glass-card flex items-center gap-2 ${
                  index === currentScenarioIndex ? 'ring-2 ring-electric-500/50' : ''
                }`}
              >
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${scenario.color} ${
                  index === currentScenarioIndex ? 'animate-pulse' : ''
                }`} />
                <span className="text-sm font-medium text-white/90">
                  {scenario.industry}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Chat Interface */}
          <div className="glass-card p-1 rounded-2xl">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm px-6 py-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${currentScenario.color} flex items-center justify-center`}>
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {currentScenario.industry} AI Assistant
                      </h3>
                      <p className="text-xs text-electric-400 flex items-center gap-1">
                        <span className="w-2 h-2 bg-electric-400 rounded-full animate-pulse" />
                        Active now • Responds instantly
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-white/50" />
                    <Calendar className="w-4 h-4 text-white/50" />
                    <Clock className="w-4 h-4 text-white/50" />
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div 
                ref={chatContainerRef}
                className="h-[500px] overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
              >
                <AnimatePresence>
                  {displayedMessages.map((message, index) => (
                    <motion.div
                      key={`${currentScenarioIndex}-${index}`}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                      className={`flex items-start gap-3 ${
                        message.type === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-electric-600' 
                          : `bg-gradient-to-r ${currentScenario.color}`
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`max-w-[70%] ${
                        message.type === 'user' ? 'text-right' : ''
                      }`}>
                        <div className={`inline-block px-4 py-3 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-electric-600 text-white'
                            : 'bg-white/10 text-white/90 backdrop-blur-sm'
                        }`}>
                          <p className="text-sm whitespace-pre-line leading-relaxed">
                            {message.text}
                          </p>
                        </div>
                        <p className="text-xs text-white/40 mt-1 px-2">
                          {new Date().toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit',
                            hour12: true 
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && currentTypingMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 ${
                      currentTypingMessage.type === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      currentTypingMessage.type === 'user' 
                        ? 'bg-electric-600' 
                        : `bg-gradient-to-r ${currentScenario.color}`
                    }`}>
                      {currentTypingMessage.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`max-w-[70%] ${
                      currentTypingMessage.type === 'user' ? 'text-right' : ''
                    }`}>
                      <div className={`inline-block px-4 py-3 rounded-2xl ${
                        currentTypingMessage.type === 'user'
                          ? 'bg-electric-600 text-white'
                          : 'bg-white/10 text-white/90 backdrop-blur-sm'
                      }`}>
                        <p className="text-sm whitespace-pre-line leading-relaxed">
                          {currentTypingText}
                          <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse" />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Typing dots when waiting to type */}
                {!isTyping && currentMessageIndex < currentScenario.messages.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${currentScenario.color}`}>
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input (Visual Only) */}
              <div className="px-6 py-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Customers type their questions here..."
                    className="flex-1 bg-white/5 text-white placeholder-white/40 px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-electric-500/50"
                    disabled
                  />
                  <button className="w-12 h-12 rounded-xl bg-gradient-to-r from-electric-500 to-sunset-500 flex items-center justify-center hover:shadow-lg hover:shadow-electric-500/25 transition-all duration-300">
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">24/7 Availability</h4>
              <p className="text-sm text-white/70">
                Never miss a lead. AI responds instantly, day or night.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-electric-500 to-blue-600 flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Auto-Scheduling</h4>
              <p className="text-sm text-white/70">
                Books appointments directly into your calendar system.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sunset-500 to-orange-600 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Lead Qualification</h4>
              <p className="text-sm text-white/70">
                Pre-qualifies leads and collects key information automatically.
              </p>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="glass-card p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-display font-semibold text-white mb-4">
                Ready to Never Miss Another Lead?
              </h3>
              <p className="text-white/80 mb-6">
                Join 50+ local businesses using AI to handle customer conversations 24/7
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/contact" variant="primary" size="lg">
                  Get Your AI Assistant
                </Button>
                <Button href="/services/ai-solutions" variant="secondary" size="lg">
                  Learn More
                </Button>
              </div>
              <p className="text-sm text-electric-300 mt-4">
                Setup in 24 hours • No technical skills required • 30-day money-back guarantee
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
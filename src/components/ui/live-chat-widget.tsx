'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatWidgetProps {
  delay?: number; // Delay in milliseconds before showing
}

export function LiveChatWidget({ delay = 30000 }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    service: ''
  });
  const [isTyping, setIsTyping] = useState(false);

  // Show widget after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Initial bot message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage("Hi! I'm here to help you get more customers online. What's your name?");
      }, 500);
    }
  }, [isOpen, messages.length]);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random typing delay
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    handleBotResponse(inputValue);
    setInputValue('');
  };

  const handleBotResponse = (userMessage: string) => {
    const step = currentStep;
    
    switch (step) {
      case 0: // Getting name
        setUserInfo(prev => ({ ...prev, name: userMessage }));
        addBotMessage(`Nice to meet you, ${userMessage}! What type of business do you have?`);
        setCurrentStep(1);
        break;
        
      case 1: // Getting business type
        setUserInfo(prev => ({ ...prev, business: userMessage }));
        addBotMessage("Great! What's the biggest challenge you're facing with getting new customers online?");
        setCurrentStep(2);
        break;
        
      case 2: // Getting challenge/service needed
        setUserInfo(prev => ({ ...prev, service: userMessage }));
        addBotMessage("I can definitely help with that! What's the best email to send you a custom strategy?");
        setCurrentStep(3);
        break;
        
      case 3: // Getting email
        setUserInfo(prev => ({ ...prev, email: userMessage }));
        addBotMessage("Perfect! And what's the best phone number to reach you for a quick strategy call?");
        setCurrentStep(4);
        break;
        
      case 4: // Getting phone
        setUserInfo(prev => ({ ...prev, phone: userMessage }));
        addBotMessage("Excellent! I'm sending your info to our team right now. Expect a call within 2 hours with a custom strategy for your business. Thanks for chatting!");
        setCurrentStep(5);
        
        // Submit the lead
        setTimeout(() => {
          submitLead();
        }, 1000);
        break;
        
      default:
        addBotMessage("Thanks for your interest! Our team will be in touch soon. Feel free to call us at (973) 555-0123 if you have any urgent questions.");
    }
  };

  const submitLead = async () => {
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userInfo,
          message: `Chat widget lead - Challenge: ${userInfo.service}`,
          source: 'Live Chat Widget',
          timestamp: new Date().toISOString()
        }),
      });
    } catch (error) {
      console.error('Failed to submit chat lead:', error);
    }
  };

  const quickResponses = [
    "Website design",
    "More leads",
    "SEO help",
    "AI solutions"
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative bg-gradient-to-r from-electric-500 to-sunset-500 text-white p-4 rounded-full shadow-2xl hover:shadow-electric-500/25 transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-6 h-6" />
              
              {/* Notification Badge */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                1
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-midnight border border-white/20 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                💬 Get instant help!
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-midnight"></div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 w-80 h-96 bg-gradient-to-br from-midnight via-navy-900 to-midnight border border-electric-500/30 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-electric-500 to-sunset-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Devority Assistant</h4>
                  <p className="text-xs text-white/80">Usually replies in minutes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-electric-500' 
                        : 'bg-sunset-500'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-3 h-3 text-white" />
                      ) : (
                        <Bot className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className={`px-3 py-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-electric-500 text-white'
                        : 'bg-white/10 text-white'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-sunset-500 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-white/10 px-3 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Responses */}
            {currentStep === 2 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickResponses.map((response) => (
                    <button
                      key={response}
                      onClick={() => {
                        setInputValue(response);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs text-white transition-colors"
                    >
                      {response}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-3 py-2 bg-electric-500 hover:bg-electric-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

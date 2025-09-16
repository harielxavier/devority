'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Search,
  PenTool,
  Code,
  Rocket,
  BarChart3,
  ArrowRight,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const phases = [
  {
    id: 1,
    title: 'Discovery',
    subtitle: 'Understanding your vision',
    duration: '1-2 weeks',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
    description: 'Deep dive into your business goals and requirements',
    keyPoints: ['Business analysis', 'Competitor research', 'Strategy planning']
  },
  {
    id: 2,
    title: 'Design',
    subtitle: 'Crafting your identity',
    duration: '1-2 weeks',
    icon: PenTool,
    color: 'from-purple-500 to-pink-500',
    description: 'Creating stunning, conversion-focused designs',
    keyPoints: ['Custom mockups', 'Brand guidelines', 'User experience']
  },
  {
    id: 3,
    title: 'Development',
    subtitle: 'Building with precision',
    duration: '2-3 weeks',
    icon: Code,
    color: 'from-green-500 to-emerald-500',
    description: 'Developing with cutting-edge technology',
    keyPoints: ['Clean code', 'AI integration', 'Performance optimization']
  },
  {
    id: 4,
    title: 'Launch',
    subtitle: 'Going live seamlessly',
    duration: '3-5 days',
    icon: Rocket,
    color: 'from-orange-500 to-red-500',
    description: 'Professional deployment and launch',
    keyPoints: ['Domain setup', 'SSL security', 'Analytics tracking']
  },
  {
    id: 5,
    title: 'Growth',
    subtitle: 'Continuous optimization',
    duration: 'Ongoing',
    icon: BarChart3,
    color: 'from-electric-500 to-sunset-500',
    description: 'Ongoing support and optimization',
    keyPoints: ['Performance monitoring', 'AI optimization', 'Strategic updates']
  }
];

export function CompactProcess() {
  const [activePhase, setActivePhase] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % phases.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentPhase = phases[activePhase];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          animate={{
            background: `linear-gradient(45deg, ${currentPhase.color.split(' ')[1]}, ${currentPhase.color.split(' ')[3]})`,
          }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          animate={{
            background: `linear-gradient(-45deg, ${currentPhase.color.split(' ')[3]}, ${currentPhase.color.split(' ')[1]})`,
          }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>

      <div className="max-w-container container-padding mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section-title text-white mb-6">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            From discovery to launch in 4-8 weeks
          </p>

          {/* Auto-play Controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm text-white/80 hover:text-white transition-colors"
            >
              {isAutoPlaying ? (
                <>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Auto-playing
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  Paused
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Compact Timeline Navigation */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-2 glass-card p-2 rounded-full">
            {phases.map((phase, index) => (
              <div key={phase.id} className="flex items-center">
                <motion.button
                  onClick={() => {
                    setActivePhase(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index === activePhase
                      ? 'text-white scale-110'
                      : 'text-white/50 hover:text-white/80 scale-90'
                  }`}
                  whileHover={{ scale: index === activePhase ? 1.1 : 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {index === activePhase && (
                    <motion.div
                      layoutId="activeBackground"
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${phase.color}`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <phase.icon className="w-5 h-5 relative z-10" />
                  
                  {/* Phase Number */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                    {phase.id}
                  </div>
                </motion.button>
                
                {index < phases.length - 1 && (
                  <motion.div
                    className="w-8 h-0.5 mx-2"
                    animate={{
                      background: index < activePhase 
                        ? 'linear-gradient(90deg, #00f5ff, #ff6b6b)' 
                        : 'rgba(255,255,255,0.2)'
                    }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 lg:p-12 relative overflow-hidden"
            >
              {/* Background Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${currentPhase.color} opacity-5`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.05 }}
                transition={{ duration: 0.8 }}
              />

              <div className="relative z-10">
                {/* Phase Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <motion.div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${currentPhase.color} flex items-center justify-center shadow-lg`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                    >
                      <currentPhase.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center gap-3 mb-2"
                      >
                        <h3 className="text-3xl font-display font-bold text-white">
                          Phase {currentPhase.id}: {currentPhase.title}
                        </h3>
                        <motion.div
                          className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${currentPhase.color} text-white`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                        >
                          {currentPhase.duration}
                        </motion.div>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-electric-300 font-medium text-lg"
                      >
                        {currentPhase.subtitle}
                      </motion.p>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-right"
                  >
                    <div className="text-2xl font-bold text-white mb-1">
                      {activePhase + 1}/{phases.length}
                    </div>
                    <div className="text-sm text-white/60">
                      {Math.round(((activePhase + 1) / phases.length) * 100)}% Complete
                    </div>
                  </motion.div>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-white/80 text-lg mb-8 leading-relaxed"
                >
                  {currentPhase.description}
                </motion.p>

                {/* Key Points */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {currentPhase.keyPoints.map((point, index) => (
                    <motion.div
                      key={point}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      <CheckCircle className={`w-5 h-5 text-green-400`} />
                      <span className="text-white/80 font-medium">{point}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Next Phase Preview */}
                {activePhase < phases.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-8 pt-6 border-t border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-white/60">
                        <span className="text-sm">Next:</span>
                        <div className="flex items-center gap-2">
                          {(() => {
                            const NextIcon = phases[activePhase + 1].icon;
                            return <NextIcon className="w-4 h-4" />;
                          })()}
                          <span className="font-medium">Phase {phases[activePhase + 1].id}: {phases[activePhase + 1].title}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/40" />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-4">
            Ready to start your journey?
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button href="/contact" variant="primary" size="lg" className="group">
                Start Phase 1: Discovery
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <Button href="/work" variant="secondary" size="lg">
              See Our Results
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

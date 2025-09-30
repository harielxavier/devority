'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Clock, Users, Calendar, Zap, TrendingUp } from 'lucide-react';

// Live Counter Component
export function LiveCounter({ 
  label, 
  startValue = 0, 
  endValue = 10, 
  duration = 3000,
  icon: Icon = TrendingUp 
}: {
  label: string;
  startValue?: number;
  endValue?: number;
  duration?: number;
  icon?: any;
}) {
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    const increment = (endValue - startValue) / (duration / 50);
    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + increment;
        if (next >= endValue) {
          clearInterval(timer);
          return endValue;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [startValue, endValue, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 text-sm text-electric-400"
    >
      <Icon className="w-4 h-4" />
      <span className="font-semibold">{Math.floor(count)}</span>
      <span className="text-white/70">{label}</span>
    </motion.div>
  );
}

// Availability Badge
export function AvailabilityBadge() {
  const [spotsLeft, setSpotsLeft] = useState(3);
  const [nextDate, setNextDate] = useState('');

  useEffect(() => {
    // Calculate next available date (2 weeks from now)
    const date = new Date();
    date.setDate(date.getDate() + 14);
    setNextDate(date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric' 
    }));

    // Simulate spots decreasing
    const timer = setInterval(() => {
      setSpotsLeft(prev => {
        const newValue = Math.max(1, prev - Math.random() > 0.7 ? 1 : 0);
        return newValue;
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-3 py-2 bg-sunset-500/20 border border-sunset-500/30 rounded-full text-sm"
    >
      <div className="w-2 h-2 bg-sunset-400 rounded-full animate-pulse" />
      <span className="text-sunset-300 font-medium">
        Only {spotsLeft} spots left this month
      </span>
    </motion.div>
  );
}

// Next Available Date
export function NextAvailableDate() {
  const [nextDate, setNextDate] = useState('');

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 10); // 10 days from now
    setNextDate(date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2 text-sm text-white/70"
    >
      <Calendar className="w-4 h-4" />
      <span>Next available start: {nextDate}</span>
    </motion.div>
  );
}

// Countdown Timer
export function CountdownTimer({ 
  title = "Limited Time Offer",
  hours = 24 
}: {
  title?: string;
  hours?: number;
}) {
  const [timeLeft, setTimeLeft] = useState({
    hours: hours,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center p-4 bg-gradient-to-r from-sunset-500/20 to-electric-500/20 border border-sunset-500/30 rounded-lg"
    >
      <h4 className="text-sm font-semibold text-white mb-2">{title}</h4>
      <div className="flex items-center justify-center gap-2 text-2xl font-bold text-sunset-300">
        <div className="flex flex-col items-center">
          <span>{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-xs text-white/60">hrs</span>
        </div>
        <span className="text-white/40">:</span>
        <div className="flex flex-col items-center">
          <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-xs text-white/60">min</span>
        </div>
        <span className="text-white/40">:</span>
        <div className="flex flex-col items-center">
          <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-xs text-white/60">sec</span>
        </div>
      </div>
    </motion.div>
  );
}

// Social Proof Counter
export function SocialProofCounter() {
  const [activeUsers, setActiveUsers] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveUsers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(8, Math.min(25, prev + change));
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 text-sm"
    >
      <div className="flex -space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 bg-gradient-to-br from-electric-400 to-sunset-400 rounded-full border-2 border-midnight"
          />
        ))}
      </div>
      <span className="text-white/80">
        <span className="text-electric-400 font-semibold">{activeUsers}</span> people viewing this page
      </span>
    </motion.div>
  );
}

// Recent Activity Feed
export function RecentActivity() {
  const activities = [
    "Sarah M. from Morristown just booked a strategy call",
    "Mike's HVAC increased leads by 65% this month",
    "Dr. Johnson reduced no-shows by 28%",
    "Legal firm in Summit got 42% more consultations"
  ];

  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentActivity(prev => (prev + 1) % activities.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [activities.length]);

  return (
    <motion.div
      key={currentActivity}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-2 text-sm text-white/80 bg-white/5 px-3 py-2 rounded-lg"
    >
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      <span>{activities[currentActivity]}</span>
    </motion.div>
  );
}

// Urgency Banner
export function UrgencyBanner({ 
  message = "🔥 Limited spots available - Book your strategy call today!",
  className = ""
}: {
  message?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r from-sunset-600 to-electric-600 text-white text-center py-2 px-4 text-sm font-medium ${className}`}
    >
      <motion.span
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {message}
      </motion.span>
    </motion.div>
  );
}

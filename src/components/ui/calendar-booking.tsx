'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  date: string;
  time: string;
}

export function CalendarBooking() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState<'date' | 'time' | 'details' | 'confirmation'>('date');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  
  const [bookingData, setBookingData] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'consultation',
    message: '',
    date: '',
    time: ''
  });

  // Generate next 14 days (excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let currentDate = new Date(today);
    
    while (dates.length < 10) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dayOfWeek = currentDate.getDay();
      
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push({
          date: currentDate.toISOString().split('T')[0],
          display: currentDate.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })
        });
      }
    }
    return dates;
  };

  // Available time slots
  const timeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: false },
    { time: '5:00 PM', available: true }
  ];

  const services = [
    { value: 'consultation', label: 'Free Website Consultation' },
    { value: 'audit', label: 'Website Audit & Strategy' },
    { value: 'demo', label: 'AI Solutions Demo' },
    { value: 'redesign', label: 'Website Redesign Discussion' },
    { value: 'seo', label: 'SEO Strategy Session' }
  ];

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setBookingData(prev => ({ ...prev, date }));
    setStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingData(prev => ({ ...prev, time }));
    setStep('details');
  };

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsBooked(true);
      setStep('confirmation');
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableDates = getAvailableDates();

  return (
    <div className="glass-card p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Calendar className="w-12 h-12 text-electric-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Schedule Your Free Consultation
        </h3>
        <p className="text-white/70">
          Book a 30-minute strategy session to discuss your business goals
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-4">
          {['date', 'time', 'details', 'confirmation'].map((stepName, index) => (
            <div key={stepName} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === stepName ? 'bg-electric-500 text-white' :
                ['date', 'time', 'details'].indexOf(step) > index ? 'bg-electric-500/50 text-white' :
                'bg-white/10 text-white/50'
              }`}>
                {index + 1}
              </div>
              {index < 3 && (
                <div className={`w-8 h-0.5 ${
                  ['date', 'time', 'details'].indexOf(step) > index ? 'bg-electric-500/50' : 'bg-white/10'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {step === 'date' && (
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Select a date</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableDates.map((date) => (
                <button
                  key={date.date}
                  onClick={() => handleDateSelect(date.date)}
                  className="p-3 bg-white/5 hover:bg-electric-500/20 border border-white/10 hover:border-electric-500/50 rounded-lg text-white text-sm transition-all"
                >
                  {date.display}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'time' && (
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Select a time</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                  className={`p-3 border rounded-lg text-sm transition-all ${
                    slot.available
                      ? 'bg-white/5 hover:bg-electric-500/20 border-white/10 hover:border-electric-500/50 text-white'
                      : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  {slot.time}
                  {!slot.available && (
                    <div className="text-xs text-red-400 mt-1">Booked</div>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep('date')}
              className="mt-4 text-electric-400 hover:text-electric-300 text-sm"
            >
              ← Back to dates
            </button>
          </div>
        )}

        {step === 'details' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Your details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={bookingData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={bookingData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={bookingData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
                  placeholder="(973) 555-0123"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={bookingData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
                  placeholder="Your company"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                What would you like to discuss? *
              </label>
              <select
                required
                value={bookingData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
              >
                {services.map((service) => (
                  <option key={service.value} value={service.value} className="bg-midnight">
                    {service.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Additional Details
              </label>
              <textarea
                value={bookingData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors resize-none"
                placeholder="Tell us about your project goals, current challenges, or any specific questions..."
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep('time')}
                className="text-electric-400 hover:text-electric-300 text-sm"
              >
                ← Back to time
              </button>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3"
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </div>
          </form>
        )}

        {step === 'confirmation' && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-4">
              Booking Confirmed!
            </h4>
            <div className="glass-card p-6 mb-6">
              <div className="space-y-2 text-white/80">
                <div><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</div>
                <div><strong>Time:</strong> {selectedTime}</div>
                <div><strong>Duration:</strong> 30 minutes</div>
                <div><strong>Type:</strong> {services.find(s => s.value === bookingData.service)?.label}</div>
              </div>
            </div>
            <p className="text-white/70 mb-6">
              We've sent a confirmation email with meeting details and a calendar invite. 
              We'll also send a reminder 24 hours before your appointment.
            </p>
            <Button
              onClick={() => {
                setStep('date');
                setSelectedDate('');
                setSelectedTime('');
                setIsBooked(false);
                setBookingData({
                  name: '',
                  email: '',
                  phone: '',
                  company: '',
                  service: 'consultation',
                  message: '',
                  date: '',
                  time: ''
                });
              }}
              variant="outline"
            >
              Book Another Meeting
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

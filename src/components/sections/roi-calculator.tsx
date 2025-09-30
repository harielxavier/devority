'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalculatorData {
  businessType: string;
  monthlyRevenue: number;
  currentLeads: number;
  conversionRate: number;
  averageOrderValue: number;
  email: string;
  name: string;
}

interface ROIResults {
  currentMonthlyRevenue: number;
  projectedMonthlyRevenue: number;
  monthlyIncrease: number;
  yearlyIncrease: number;
  roi: number;
  newLeadsPerMonth: number;
  additionalCustomers: number;
}

const businessTypes = [
  { value: 'attorney', label: 'Attorney/Law Firm', multiplier: 3.2 },
  { value: 'dentist', label: 'Dental Practice', multiplier: 2.8 },
  { value: 'hvac', label: 'HVAC/Trades', multiplier: 2.5 },
  { value: 'restaurant', label: 'Restaurant', multiplier: 2.2 },
  { value: 'retail', label: 'Retail/E-commerce', multiplier: 2.0 },
  { value: 'other', label: 'Other Local Business', multiplier: 2.3 }
];

export function ROICalculator() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<CalculatorData>({
    businessType: '',
    monthlyRevenue: 0,
    currentLeads: 0,
    conversionRate: 0,
    averageOrderValue: 0,
    email: '',
    name: ''
  });
  const [results, setResults] = useState<ROIResults | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateData = (field: keyof CalculatorData, value: string | number) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const calculateROI = (): ROIResults => {
    const businessMultiplier = businessTypes.find(bt => bt.value === data.businessType)?.multiplier || 2.3;
    
    // Current metrics
    const currentMonthlyRevenue = data.monthlyRevenue;
    const currentCustomers = data.currentLeads * (data.conversionRate / 100);
    
    // Projected improvements with our service
    const leadIncrease = 2.4; // 140% average increase
    const conversionImprovement = 1.3; // 30% improvement in conversion
    
    const newLeadsPerMonth = data.currentLeads * leadIncrease;
    const improvedConversionRate = Math.min(data.conversionRate * conversionImprovement, 25); // Cap at 25%
    const additionalCustomers = newLeadsPerMonth * (improvedConversionRate / 100) - currentCustomers;
    
    const monthlyIncrease = additionalCustomers * data.averageOrderValue;
    const projectedMonthlyRevenue = currentMonthlyRevenue + monthlyIncrease;
    const yearlyIncrease = monthlyIncrease * 12;
    
    // ROI calculation (assuming $349/month service cost)
    const serviceCost = 349 * 12; // Annual cost
    const roi = ((yearlyIncrease - serviceCost) / serviceCost) * 100;
    
    return {
      currentMonthlyRevenue,
      projectedMonthlyRevenue,
      monthlyIncrease,
      yearlyIncrease,
      roi,
      newLeadsPerMonth,
      additionalCustomers
    };
  };

  const handleCalculate = () => {
    const calculatedResults = calculateROI();
    setResults(calculatedResults);
    setStep(4);
  };

  const handleSubmitEmail = async () => {
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          business: data.businessType,
          service: 'ROI Calculator Results',
          message: `ROI Calculator submission:
            Business Type: ${data.businessType}
            Monthly Revenue: $${data.monthlyRevenue.toLocaleString()}
            Current Leads: ${data.currentLeads}/month
            Conversion Rate: ${data.conversionRate}%
            Average Order Value: $${data.averageOrderValue}
            
            Projected Results:
            Monthly Increase: $${results?.monthlyIncrease.toLocaleString()}
            Yearly Increase: $${results?.yearlyIncrease.toLocaleString()}
            ROI: ${results?.roi.toFixed(0)}%`,
          source: 'ROI Calculator',
          timestamp: new Date().toISOString()
        }),
      });
      setIsSubmitted(true);

      // Track ROI calculator completion
      // Analytics tracking removed
    } catch (error) {
      console.error('Failed to submit ROI calculator:', error);
    }
  };

  if (isSubmitted) {
    return (
      <section className="section-padding bg-gradient-to-br from-midnight via-navy-900 to-midnight">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Your Custom Strategy is On Its Way! 🚀
            </h3>
            <p className="text-white/80 mb-6">
              We're preparing a detailed action plan based on your ROI calculation. 
              Expect an email within 24 hours with specific recommendations for your business.
            </p>
            <Button
              onClick={() => {
                setStep(1);
                setIsSubmitted(false);
                setResults(null);
                setData({
                  businessType: '',
                  monthlyRevenue: 0,
                  currentLeads: 0,
                  conversionRate: 0,
                  averageOrderValue: 0,
                  email: '',
                  name: ''
                });
              }}
              variant="outline"
            >
              Calculate Another ROI
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-midnight via-navy-900 to-midnight">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-electric-500 to-sunset-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Calculate Your <span className="gradient-text">Revenue Growth</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            See exactly how much more revenue you could generate with a professional website and AI solutions
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Step {step} of 4</span>
            <span className="text-sm text-white/60">{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-electric-500 to-sunset-500 h-2 rounded-full"
              initial={{ width: '25%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Calculator Steps */}
        <div className="glass-card p-8">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-6">What type of business do you have?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => {
                      updateData('businessType', type.value);
                      setStep(2);
                    }}
                    className="p-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-electric-500/50 rounded-lg text-left transition-all group"
                  >
                    <div className="font-semibold text-white group-hover:text-electric-300 transition-colors">
                      {type.label}
                    </div>
                    <div className="text-sm text-white/60">
                      Avg. {type.multiplier}x revenue increase
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Tell us about your current business</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Monthly Revenue
                  </label>
                  <input
                    type="number"
                    value={data.monthlyRevenue || ''}
                    onChange={(e) => updateData('monthlyRevenue', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
                    placeholder="50000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Leads per Month
                  </label>
                  <input
                    type="number"
                    value={data.currentLeads || ''}
                    onChange={(e) => updateData('currentLeads', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Conversion Rate (%)
                  </label>
                  <input
                    type="number"
                    value={data.conversionRate || ''}
                    onChange={(e) => updateData('conversionRate', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
                    placeholder="15"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Average Order Value
                  </label>
                  <input
                    type="number"
                    value={data.averageOrderValue || ''}
                    onChange={(e) => updateData('averageOrderValue', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
                    placeholder="500"
                  />
                </div>
              </div>
              <Button
                onClick={() => setStep(3)}
                disabled={!data.monthlyRevenue || !data.currentLeads || !data.conversionRate || !data.averageOrderValue}
                size="lg"
                className="w-full group"
              >
                <span>Calculate My ROI</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Get your personalized results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => updateData('name', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => updateData('email', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
                    placeholder="john@business.com"
                  />
                </div>
              </div>
              <Button
                onClick={handleCalculate}
                disabled={!data.name || !data.email}
                size="lg"
                className="w-full group"
              >
                <span>Show My Results</span>
                <TrendingUp className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}

          {step === 4 && results && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">Your Revenue Growth Potential</h3>
                <p className="text-white/70">Based on our average client results</p>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-electric-500/20 to-sunset-500/20 border border-electric-500/30 rounded-lg p-6 text-center">
                  <DollarSign className="w-8 h-8 text-electric-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">
                    +${results.monthlyIncrease.toLocaleString()}
                  </div>
                  <div className="text-white/70">Additional Monthly Revenue</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/20 to-electric-500/20 border border-green-500/30 rounded-lg p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">
                    +${results.yearlyIncrease.toLocaleString()}
                  </div>
                  <div className="text-white/70">Additional Yearly Revenue</div>
                </div>
                
                <div className="bg-gradient-to-br from-sunset-500/20 to-purple-500/20 border border-sunset-500/30 rounded-lg p-6 text-center">
                  <Users className="w-8 h-8 text-sunset-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">
                    +{Math.round(results.additionalCustomers)}
                  </div>
                  <div className="text-white/70">New Customers/Month</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/20 to-electric-500/20 border border-purple-500/30 rounded-lg p-6 text-center">
                  <Calculator className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">
                    {results.roi.toFixed(0)}%
                  </div>
                  <div className="text-white/70">Return on Investment</div>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-white/10">
                <p className="text-white/80 mb-6">
                  Ready to turn these projections into reality? Let's create a custom strategy for your business.
                </p>
                <Button
                  onClick={handleSubmitEmail}
                  size="lg"
                  className="group"
                >
                  <span>Get My Custom Strategy</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

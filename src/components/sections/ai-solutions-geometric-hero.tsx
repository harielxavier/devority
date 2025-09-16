"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export function AIServicesGeometricHero() {
    return (
        <HeroGeometric
            badge="AI-Powered Solutions"
            title1="Intelligent Automation"
            title2="That Actually Works"
        />
    );
}

// Alternative: Custom AI-focused version
export function AIServicesCustomHero() {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    const aiFeatures = [
        {
            icon: Brain,
            title: "AI Chatbots",
            description: "Qualify leads 24/7",
            metric: "+42%"
        },
        {
            icon: Zap,
            title: "Automation",
            description: "Save 8+ hours/week",
            metric: "8hrs"
        },
        {
            icon: Target,
            title: "Analytics",
            description: "Predict & prevent",
            metric: "-28%"
        }
    ];

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-ink">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric-500/[0.08] via-transparent to-sunset-500/[0.08] blur-3xl" />
            
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-12 gap-4 h-full">
                    {[...Array(144)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="bg-electric-500/20 rounded-sm"
                            animate={{
                                opacity: [0.1, 0.3, 0.1],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-electric-500/20 mb-8"
                    >
                        <Brain className="h-4 w-4 text-electric-400 animate-pulse" />
                        <span className="text-sm text-electric-300 tracking-wide font-medium">
                            AI Solutions That Scale Your Business
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold mb-8 tracking-tight leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/90">
                                Stop Doing What
                            </span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-400 via-white/95 to-sunset-400">
                                AI Can Do Better
                            </span>
                        </h1>
                    </motion.div>

                    {/* AI Features Grid */}
                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    >
                        {aiFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                                className="glass-card p-6 hover:bg-white/10 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-2xl font-bold gradient-text mb-2">{feature.metric}</div>
                                <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                                <p className="text-sm text-white/70">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-lg sm:text-xl text-white/70 mb-12 leading-relaxed max-w-3xl mx-auto">
                            Our AI solutions handle the repetitive tasks so you can focus on growing your business. 
                            Real automation that saves time and increases revenue.
                        </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        custom={4}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button href="#ai-contact" size="xl" className="group text-lg px-8 py-4">
                            Get AI Consultation
                            <Zap className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                        </Button>
                        <Button href="#ai-features" variant="secondary" size="xl" className="text-lg px-8 py-4">
                            See AI in Action
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/80 pointer-events-none" />
        </div>
    );
}

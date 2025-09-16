"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function AIShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-electric-500/[0.15]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(10,104,154,0.2)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(10,104,154,0.3),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

export function DevorityGeometricHero() {
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

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-ink">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric-500/[0.08] via-transparent to-sunset-500/[0.08] blur-3xl" />

            {/* Floating AI Shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <AIShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-electric-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <AIShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-sunset-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <AIShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-orchid-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <AIShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-electric-400/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <AIShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-sunset-400/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    {/* AI Badge */}
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-electric-500/20 mb-8 md:mb-12"
                    >
                        <Sparkles className="h-4 w-4 text-electric-400 animate-pulse" />
                        <span className="text-sm text-electric-300 tracking-wide font-medium">
                            AI-Powered Business Solutions
                        </span>
                    </motion.div>

                    {/* Main Headlines */}
                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold mb-6 md:mb-8 tracking-tight leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/90">
                                AI That Actually
                            </span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-400 via-white/95 to-sunset-400">
                                Works for Business
                            </span>
                        </h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-lg sm:text-xl md:text-2xl text-white/70 mb-12 leading-relaxed font-light tracking-wide max-w-3xl mx-auto">
                            Transform your local business with intelligent automation that saves 8+ hours per week 
                            and increases revenue by 28% on average.
                        </p>
                    </motion.div>

                    {/* Key Benefits */}
                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
                    >
                        <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300">
                            <div className="text-3xl font-bold gradient-text mb-2">&lt;30</div>
                            <div className="text-white/80 text-sm">Day Launch</div>
                        </div>
                        <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300">
                            <div className="text-3xl font-bold gradient-text mb-2">+28%</div>
                            <div className="text-white/80 text-sm">Revenue Increase</div>
                        </div>
                        <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300">
                            <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
                            <div className="text-white/80 text-sm">AI Assistant</div>
                        </div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        custom={4}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
                    >
                        <Button href="/contact" size="xl" className="group text-lg px-8 py-4">
                            Get AI Consultation
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button href="/services/ai-solutions" variant="secondary" size="xl" className="text-lg px-8 py-4">
                            Explore AI Solutions
                        </Button>
                    </motion.div>

                    {/* Trust Signal */}
                    <motion.div
                        custom={5}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-sm text-white/50"
                    >
                        Trusted by 50+ local businesses • Built in Sparta, NJ • Serving nationwide
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/80 pointer-events-none" />
        </div>
    );
}

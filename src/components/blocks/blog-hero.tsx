'use client';
import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function BlogHero() {
    return (
        <section className="overflow-hidden">
            <div
                aria-hidden
                className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(180,100%,50%,.08)_0,hsla(180,100%,30%,.02)_50%,hsla(180,100%,20%,0)_80%)]" />
                <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(180,100%,50%,.06)_0,hsla(180,100%,30%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(180,100%,50%,.04)_0,hsla(180,100%,30%,.02)_80%,transparent_100%)]" />
            </div>
            <div className="relative pt-24 md:pt-36">
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            delayChildren: 1,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: 'spring',
                                            bounce: 0.3,
                                            duration: 2,
                                        },
                                    },
                                },
                            }}
                            className="absolute inset-0 -z-20">
                            <div className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block w-full h-full bg-gradient-to-br from-midnight via-ink to-midnight opacity-90" />
                        </AnimatedGroup>
                        <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    <Link
                                        href="/blog"
                                        className="hover:bg-white/10 bg-white/5 group mx-auto flex w-fit items-center gap-4 rounded-full border border-electric-500/20 p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 backdrop-blur-xl">
                                        <span className="text-white text-sm">Latest Insights & Trends</span>
                                        <span className="block h-4 w-0.5 border-l bg-electric-400"></span>

                                        <div className="bg-electric-500 group-hover:bg-electric-400 size-6 overflow-hidden rounded-full duration-500">
                                            <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3 text-white" />
                                                </span>
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3 text-white" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                        
                                    <h1
                                        className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem] text-white font-bold">
                                        AI-Powered <span className="gradient-text">Insights</span> for Modern Business
                                    </h1>
                                    <p
                                        className="mx-auto mt-8 max-w-2xl text-balance text-lg text-white/80">
                                        Discover the latest trends, strategies, and innovations in AI-powered web development, digital transformation, and business growth.
                                    </p>
                                </AnimatedGroup>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                    <div
                                        key={1}
                                        className="bg-electric-500/20 rounded-[14px] border border-electric-500/30 p-0.5">
                                        <Button
                                            asChild
                                            size="lg"
                                            variant="primary"
                                            className="rounded-xl px-5 text-base">
                                            <Link href="#latest-posts">
                                                <span className="text-nowrap">Explore Articles</span>
                                            </Link>
                                        </Button>
                                    </div>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="h-10.5 rounded-xl px-5 text-white hover:text-electric-300">
                                        <Link href="/contact">
                                            <span className="text-nowrap">Get Free Consultation</span>
                                        </Link>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b from-transparent from-35% to-midnight absolute inset-0 z-10"
                                />
                                <div className="glass-card relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-electric-500/20 p-4 shadow-lg shadow-electric-500/10">
                                    <img
                                        className="aspect-15/8 relative rounded-2xl"
                                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=2700&h=1440&fit=crop&crop=center"
                                        alt="AI and Technology Blog"
                                        width="2700"
                                        height="1440"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent rounded-2xl" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-electric-500 text-white text-xs font-medium rounded-full">
                                                Featured
                                            </span>
                                            <span className="text-white/70 text-sm">
                                                Latest Article
                                            </span>
                                        </div>
                                        <h3 className="text-white text-xl font-semibold mb-2">
                                            The Future of AI in Web Development
                                        </h3>
                                        <p className="text-white/80 text-sm">
                                            Discover how artificial intelligence is transforming the way we build and optimize websites for better user experiences.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
        </section>
    )
}

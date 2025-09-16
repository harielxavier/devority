"use client";

import {
  animate,
  MotionValue,
  useMotionValue,
  useTransform,
  motion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { IconArrowRight } from "@tabler/icons-react";

const items = [
  {
    title: "Product A",
    description: "Automate customer support with intelligent AI agents",
    image:
      "https://images.unsplash.com/photo-1603201667141-5a2d4c673378?q=80&w=2696&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Product B",
    description: "Scale operations seamlessly with cloud infrastructure",
    image:
      "https://images.unsplash.com/photo-1569144157591-c60f3f82f137?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Product C",
    description: "Advanced analytics to drive data-driven decisions",
    image:
      "https://images.unsplash.com/photo-1611348586804-61bf6c080437?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Product D",
    description: "Secure your digital assets with blockchain technology",
    image:
      "https://images.unsplash.com/photo-1514820720301-4c4790309f46?q=80&w=2632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Product E",
    description: "Real-time collaboration tools for remote teams",
    image:
      "https://images.unsplash.com/photo-1619951385606-3739fce3cdf4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Product F",
    description: "Custom machine learning models for your business",
    image:
      "https://images.unsplash.com/photo-1596510914965-9ae08acae566?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Card = ({ card }: { card: (typeof items)[0] }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="relative h-[400px] w-[350px] rounded-xl overflow-hidden cursor-pointer group"
      style={{
        backgroundImage: `url(${card.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-electric-400 transition-colors">
          {card.title}
        </h3>
        <p className="text-white/80 mb-4 line-clamp-2">
          {card.description}
        </p>
        <div className="flex items-center text-electric-400 font-medium">
          <span>Learn more</span>
          <IconArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

function InfiniteSlider() {
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const [mustFinish, setMustFinish] = useState(false);
  const [duration, setDuration] = useState(40);
  
  useEffect(() => {
    let controls;
    const gap = 20;
    const finalPosition = -width / 2 - gap;
    
    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }
    
    return () => controls?.stop();
  }, [xTranslation, width, duration, mustFinish]);
  
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover cutting-edge products designed to transform your business
          </p>
        </div>
      </div>
      
      <motion.div
        className="flex gap-5"
        style={{ x: xTranslation }}
        ref={ref}
        onHoverStart={() => {
          setMustFinish(true);
          setDuration(80);
        }}
        onHoverEnd={() => {
          setMustFinish(true);
          setDuration(40);
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <Card card={item} key={idx} />
        ))}
      </motion.div>
    </section>
  );
}

export default InfiniteSlider;
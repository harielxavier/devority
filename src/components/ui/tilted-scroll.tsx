"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const TiltedScroll = ({
  items,
  className,
}: {
  items: {
    id: number;
    name: string;
    description: string;
    icon: React.ReactNode;
  }[];
  className?: string;
}) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="flex animate-skew-scroll">
        {items.concat(items).map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="flex-shrink-0 px-8 py-6 mx-4"
          >
            <div className="glass-card p-6 w-80 h-48 flex flex-col justify-between hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-lg font-display font-semibold text-white group-hover:text-electric-300 transition-colors">
                  {item.name}
                </h3>
              </div>
              <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { cn } from '@/lib/utils';

interface LocalSEOBackgroundProps {
  className?: string;
}

export const LocalSEOBackground: React.FC<LocalSEOBackgroundProps> = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden opacity-5", className)}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        {/* Search Results Cards */}
        <g opacity="0.8">
          {/* First Search Result */}
          <rect x="100" y="150" width="300" height="80" rx="8" fill="currentColor" opacity="0.3"/>
          <rect x="120" y="170" width="200" height="8" rx="4" fill="currentColor" opacity="0.6"/>
          <rect x="120" y="185" width="150" height="6" rx="3" fill="currentColor" opacity="0.4"/>
          <rect x="120" y="200" width="180" height="6" rx="3" fill="currentColor" opacity="0.4"/>
          
          {/* Second Search Result */}
          <rect x="100" y="250" width="300" height="80" rx="8" fill="currentColor" opacity="0.4"/>
          <rect x="120" y="270" width="220" height="8" rx="4" fill="currentColor" opacity="0.7"/>
          <rect x="120" y="285" width="160" height="6" rx="3" fill="currentColor" opacity="0.5"/>
          <rect x="120" y="300" width="190" height="6" rx="3" fill="currentColor" opacity="0.5"/>
          
          {/* Third Search Result */}
          <rect x="100" y="350" width="300" height="80" rx="8" fill="currentColor" opacity="0.2"/>
          <rect x="120" y="370" width="180" height="8" rx="4" fill="currentColor" opacity="0.5"/>
          <rect x="120" y="385" width="140" height="6" rx="3" fill="currentColor" opacity="0.3"/>
          <rect x="120" y="400" width="170" height="6" rx="3" fill="currentColor" opacity="0.3"/>
        </g>

        {/* Map with Location Pins */}
        <g opacity="0.6">
          {/* Map Background */}
          <rect x="500" y="200" width="250" height="200" rx="12" fill="currentColor" opacity="0.2"/>
          
          {/* Location Pins */}
          <circle cx="580" cy="280" r="8" fill="currentColor" opacity="0.8"/>
          <path d="M580 272 L580 288 M572 280 L588 280" stroke="currentColor" strokeWidth="2" opacity="0.8"/>
          
          <circle cx="640" cy="320" r="8" fill="currentColor" opacity="0.6"/>
          <path d="M640 312 L640 328 M632 320 L648 320" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
          
          <circle cx="620" cy="350" r="8" fill="currentColor" opacity="0.7"/>
          <path d="M620 342 L620 358 M612 350 L628 350" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
        </g>

        {/* Analytics Charts */}
        <g opacity="0.5">
          {/* Bar Chart */}
          <rect x="800" y="180" width="15" height="40" fill="currentColor" opacity="0.6"/>
          <rect x="820" y="160" width="15" height="60" fill="currentColor" opacity="0.8"/>
          <rect x="840" y="140" width="15" height="80" fill="currentColor" opacity="0.7"/>
          <rect x="860" y="120" width="15" height="100" fill="currentColor" opacity="0.9"/>
          <rect x="880" y="100" width="15" height="120" fill="currentColor" opacity="0.8"/>
          
          {/* Trend Line */}
          <path 
            d="M800 300 Q820 280 840 260 Q860 240 880 220" 
            stroke="currentColor" 
            strokeWidth="3" 
            fill="none" 
            opacity="0.6"
          />
          
          {/* Data Points */}
          <circle cx="800" cy="300" r="4" fill="currentColor" opacity="0.8"/>
          <circle cx="820" cy="280" r="4" fill="currentColor" opacity="0.8"/>
          <circle cx="840" cy="260" r="4" fill="currentColor" opacity="0.8"/>
          <circle cx="860" cy="240" r="4" fill="currentColor" opacity="0.8"/>
          <circle cx="880" cy="220" r="4" fill="currentColor" opacity="0.8"/>
        </g>

        {/* Search Icons and Keywords */}
        <g opacity="0.4">
          {/* Search Magnifying Glass */}
          <circle cx="200" cy="100" r="20" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.6"/>
          <path d="M215 115 L225 125" stroke="currentColor" strokeWidth="3" opacity="0.6"/>
          
          {/* Keyword Bubbles */}
          <ellipse cx="300" cy="80" rx="40" ry="15" fill="currentColor" opacity="0.3"/>
          <ellipse cx="400" cy="100" rx="35" ry="12" fill="currentColor" opacity="0.4"/>
          <ellipse cx="350" cy="120" rx="45" ry="18" fill="currentColor" opacity="0.2"/>
        </g>

        {/* Mobile Device */}
        <g opacity="0.3">
          <rect x="950" y="300" width="80" height="140" rx="12" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="960" y="320" width="60" height="80" fill="currentColor" opacity="0.2"/>
          <circle cx="980" cy="420" r="8" stroke="currentColor" strokeWidth="1" fill="none"/>
        </g>

        {/* Connecting Lines/Network */}
        <g opacity="0.2">
          <path d="M400 300 Q500 250 600 300" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5"/>
          <path d="M600 300 Q700 280 800 300" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5"/>
          <path d="M300 200 Q400 150 500 200" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5"/>
        </g>

        {/* Ranking Numbers */}
        <g opacity="0.6">
          <circle cx="80" cy="180" r="15" fill="currentColor" opacity="0.8"/>
          <text x="80" y="185" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">1</text>
          
          <circle cx="80" cy="280" r="15" fill="currentColor" opacity="0.6"/>
          <text x="80" y="285" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">2</text>
          
          <circle cx="80" cy="380" r="15" fill="currentColor" opacity="0.4"/>
          <text x="80" y="385" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">3</text>
        </g>
      </svg>
    </div>
  );
};

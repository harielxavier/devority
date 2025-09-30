"use client";
import React, { useState, useEffect } from "react";

// Helper function to convert hex color to hue rotation value
function getHueRotation(hexColor: string): number {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  // Convert RGB to HSL to get hue
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  
  if (max !== min) {
    const d = max - min;
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return Math.round(h * 360);
}

const INTEGRATIONS = [
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/stripe.svg", name: "Stripe", color: "#635BFF" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/slack.svg", name: "Slack", color: "#4A154B" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googleanalytics.svg", name: "Google Analytics", color: "#E37400" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/hubspot.svg", name: "HubSpot", color: "#FF7A59" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/salesforce.svg", name: "Salesforce", color: "#00A1E0" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mailchimp.svg", name: "Mailchimp", color: "#FFE01B" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/calendly.svg", name: "Calendly", color: "#006BFF" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/quickbooks.svg", name: "QuickBooks", color: "#2CA01C" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/zapier.svg", name: "Zapier", color: "#FF4A00" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/zoom.svg", name: "Zoom", color: "#2D8CFF" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/paypal.svg", name: "PayPal", color: "#00457C" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/shopify.svg", name: "Shopify", color: "#7AB55C" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/square.svg", name: "Square", color: "#3E4348" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoft.svg", name: "Microsoft 365", color: "#0078D4" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twilio.svg", name: "Twilio", color: "#F22F46" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/airtable.svg", name: "Airtable", color: "#18BFFF" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazonaws.svg", name: "AWS", color: "#FF9900" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/firebase.svg", name: "Firebase", color: "#FFCA28" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vercel.svg", name: "Vercel", color: "#FFFFFF" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/notion.svg", name: "Notion", color: "#FFFFFF" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/asana.svg", name: "Asana", color: "#F06A6A" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/trello.svg", name: "Trello", color: "#0079BF" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/intercom.svg", name: "Intercom", color: "#1F8DED" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/zendesk.svg", name: "Zendesk", color: "#17494D" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg", name: "Discord", color: "#5865F2" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg", name: "GitHub", color: "#FFFFFF" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/figma.svg", name: "Figma", color: "#F24E1E" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/dropbox.svg", name: "Dropbox", color: "#0061FF" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googledrive.svg", name: "Google Drive", color: "#4285F4" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/wordpress.svg", name: "WordPress", color: "#21759B" },
];

function SemiCircleOrbit({ radius, centerX, centerY, count, iconSize, startIndex = 0, orbitIndex }: any) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <>
      {/* Orbit path visualization */}
      <svg
        className="absolute pointer-events-none"
        style={{
          left: centerX - radius,
          top: centerY - radius,
          width: radius * 2,
          height: radius * 2,
          zIndex: 1,
        }}
      >
        <path
          d={`M 0,${radius} A ${radius},${radius} 0 0,1 ${radius * 2},${radius}`}
          fill="none"
          stroke="url(#gradient-path)"
          strokeWidth="1"
          strokeDasharray="5, 10"
          opacity="0.1"
        />
        <defs>
          <linearGradient id="gradient-path" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Orbit icons */}
      {Array.from({ length: count }).map((_, index) => {
        const angle = (index / (count - 1)) * 180;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        const integrationIndex = (startIndex + index) % INTEGRATIONS.length;
        const integration = INTEGRATIONS[integrationIndex];
        
        // Animation delay based on position
        const animationDelay = index * 0.1;
        
        // Tooltip positioning
        const tooltipAbove = angle > 90;

        return (
          <div
            key={index}
            className="absolute flex flex-col items-center group"
            style={{
              left: `${centerX + x - iconSize / 2}px`,
              top: `${centerY - y - iconSize / 2}px`,
              zIndex: hoveredIndex === index ? 20 : 10,
              animation: `float ${3 + orbitIndex}s ease-in-out ${animationDelay}s infinite`,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at center, ${integration.color}40 0%, transparent 70%)`,
                filter: 'blur(20px)',
                transform: 'scale(2)',
              }}
            />
            
            {/* Icon container with gradient border */}
            <div 
              className="relative p-3 rounded-2xl transition-all duration-500 group-hover:scale-125 cursor-pointer"
              style={{
                background: hoveredIndex === index 
                  ? `linear-gradient(135deg, ${integration.color}20, ${integration.color}10)` 
                  : 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                boxShadow: hoveredIndex === index
                  ? `0 20px 40px -10px ${integration.color}50, 0 10px 20px -5px rgba(0,0,0,0.1)`
                  : '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid',
                borderColor: hoveredIndex === index ? `${integration.color}30` : 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Animated ring */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `conic-gradient(from 0deg, transparent, ${integration.color}40, transparent)`,
                  animation: 'spin 3s linear infinite',
                }}
              />
              
              <img
                src={integration.icon}
                alt={integration.name}
                width={iconSize}
                height={iconSize}
                className="relative z-10 object-contain transition-transform duration-500 group-hover:rotate-12"
                style={{ 
                  minWidth: iconSize, 
                  minHeight: iconSize,
                  filter: hoveredIndex === index 
                    ? `brightness(1.1) saturate(1.2) drop-shadow(0 0 8px ${integration.color}80)` 
                    : integration.color === '#FFFFFF' 
                      ? 'invert(1) brightness(0.9)' 
                      : `brightness(0) saturate(100%) invert(1) sepia(1) saturate(10000%) hue-rotate(${getHueRotation(integration.color)}deg) brightness(1.2)`,
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* Fallback placeholder */}
              <div
                className="hidden relative z-10 rounded-lg flex items-center justify-center text-xs font-semibold text-midnight-600 transition-transform duration-500 group-hover:rotate-12"
                style={{ 
                  width: iconSize, 
                  height: iconSize,
                  backgroundColor: integration.color + '20',
                  border: `2px solid ${integration.color}40`,
                }}
              >
                {integration.name.slice(0, 2).toUpperCase()}
              </div>
              
              {/* Pulse effect on hover */}
              {hoveredIndex === index && (
                <div
                  className="absolute inset-0 rounded-2xl animate-ping"
                  style={{
                    background: `${integration.color}20`,
                    animationDuration: '1.5s',
                  }}
                />
              )}
            </div>

            {/* Enhanced Tooltip */}
            <div
              className={`absolute ${
                tooltipAbove ? "bottom-[calc(100%+16px)]" : "top-[calc(100%+16px)]"
              } opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 pointer-events-none`}
              style={{
                background: `linear-gradient(135deg, ${integration.color}dd, ${integration.color}ff)`,
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                color: 'white',
                whiteSpace: 'nowrap',
                boxShadow: `0 8px 20px ${integration.color}40`,
                backdropFilter: 'blur(10px)',
              }}
            >
              {integration.name}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${
                  tooltipAbove ? "top-full -mt-1.5" : "bottom-full -mb-1.5"
                }`}
                style={{
                  background: `linear-gradient(135deg, ${integration.color}dd, ${integration.color}ff)`,
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function MultiOrbitSemiCircle() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const baseWidth = Math.min(size.width * 0.8, 600);
  const centerX = baseWidth / 2;
  const centerY = baseWidth * 0.45;

  const iconSize =
    size.width < 480
      ? Math.max(24, baseWidth * 0.045)
      : size.width < 768
      ? Math.max(32, baseWidth * 0.055)
      : Math.max(40, baseWidth * 0.065);

  // Parallax offset based on mouse position
  const parallaxX = (mousePosition.x - size.width / 2) * 0.02;
  const parallaxY = (mousePosition.y - size.height / 2) * 0.02;

  return (
    <section className="py-20 relative w-full overflow-hidden">
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-slate-900/50" />
      </div>

      <div className="relative flex flex-col items-center text-center z-10 max-w-6xl mx-auto px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full mb-6 border border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="text-sm font-medium text-white/80">50+ Integrations Available</span>
        </div>
        
        {/* Title with gradient animation */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-electric-400 via-magenta-400 to-sunset-400 bg-clip-text text-transparent animate-gradient-text">
            Seamless Integrations
          </span>
        </h2>
        <p className="mb-12 max-w-xl text-white/70 text-lg">
          Connect your favorite tools and supercharge your workflow with our extensive integration ecosystem
        </p>

        {/* Main orbit container with parallax */}
        <div
          className="relative transition-transform duration-300 ease-out"
          style={{ 
            width: baseWidth, 
            height: baseWidth * 0.5,
            transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          }}
        >
          {/* Central glow effect */}
          <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2">
            <div className="w-40 h-40 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" />
          </div>
          
          {/* Connection lines effect */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: baseWidth, height: baseWidth * 0.5 }}
          >
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
          
          <SemiCircleOrbit 
            radius={baseWidth * 0.22} 
            centerX={centerX} 
            centerY={centerY} 
            count={6} 
            iconSize={iconSize}
            startIndex={0}
            orbitIndex={0}
          />
          <SemiCircleOrbit 
            radius={baseWidth * 0.36} 
            centerX={centerX} 
            centerY={centerY} 
            count={8} 
            iconSize={iconSize}
            startIndex={6}
            orbitIndex={1}
          />
          <SemiCircleOrbit 
            radius={baseWidth * 0.5} 
            centerX={centerX} 
            centerY={centerY} 
            count={10} 
            iconSize={iconSize}
            startIndex={14}
            orbitIndex={2}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 text-center">
          <div className="group cursor-pointer">
            <div className="text-3xl font-bold bg-gradient-to-r from-electric-400 to-magenta-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              50+
            </div>
            <div className="text-sm text-white/60 mt-1">Integrations</div>
          </div>
          <div className="group cursor-pointer">
            <div className="text-3xl font-bold bg-gradient-to-r from-magenta-400 to-sunset-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              99.9%
            </div>
            <div className="text-sm text-white/60 mt-1">Uptime</div>
          </div>
          <div className="group cursor-pointer">
            <div className="text-3xl font-bold bg-gradient-to-r from-sunset-400 to-electric-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              Fast
            </div>
            <div className="text-sm text-white/60 mt-1">Support</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }
        
        @keyframes float-medium {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-30px, 30px) scale(1.1);
          }
        }
        
        @keyframes float-fast {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          25% {
            transform: translate(-45%, -55%) scale(1.05);
          }
          75% {
            transform: translate(-55%, -45%) scale(0.95);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            transform: translateX(0%);
          }
          50% {
            transform: translateX(-100%);
          }
        }
        
        @keyframes gradient-text {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        
        .animate-gradient-text {
          animation: gradient-text 3s ease infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

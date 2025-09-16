"use client";
import { cn } from "@/lib/utils";
import {
  Bot,
  Brain,
  FileText,
  TrendingUp,
} from "lucide-react";

export function FeatureSectionWithHoverEffects() {
  const features = [
    {
      title: "AI Chatbots & Virtual Assistants",
      description:
        "Intelligent chatbots that qualify leads 24/7, answer questions, and schedule appointments automatically. Never miss a potential client again.",
      icon: <Bot />,
      metric: "+42% qualified leads",
      industries: ["Attorneys", "Dentists", "Trades"],
    },
    {
      title: "Document & Process Automation",
      description:
        "Automate contract generation, intake forms, and workflow processes. From legal documents to service agreements, let AI handle the paperwork.",
      icon: <FileText />,
      metric: "8+ hours saved/week",
      industries: ["Legal", "Trades", "Real Estate"],
    },
    {
      title: "Predictive Analytics & Insights",
      description:
        "Machine learning algorithms that predict customer behavior, prevent no-shows, and identify upsell opportunities before they happen.",
      icon: <Brain />,
      metric: "-28% no-show rate",
      industries: ["Healthcare", "Service Providers"],
    },
    {
      title: "Proven ROI & Results",
      description:
        "Our clients see measurable results within 90 days. From increased conversions to time savings, we deliver ROI that justifies the investment.",
      icon: <TrendingUp />,
      metric: "340% average ROI",
      industries: ["All Industries"],
    },
  ];

  return (
    <section className="section-padding relative">
      <div className="max-w-container container-padding mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-section-title text-white mb-6">
            AI-Powered <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Discover the key advantages that make Devority the preferred choice for local businesses looking to leverage AI for growth and efficiency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  metric,
  industries,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  metric: string;
  industries: string[];
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col py-10 relative group/feature glass-card p-6 hover:bg-white/10 transition-all duration-500",
        "lg:border-r border-white/10",
        (index === 0 || index === 3) && "lg:border-l border-white/10",
        index < 3 && "lg:border-b border-white/10"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-electric-500/10 to-magenta-500/10 pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-electric-500/10 to-magenta-500/10 pointer-events-none" />
      )}
      
      <div className="mb-4 relative z-10 px-6">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-electric-500/20 to-magenta-500/20 flex items-center justify-center mb-4 group-hover/feature:scale-110 transition-transform duration-300">
          <div className="text-electric-400 group-hover/feature:text-electric-300 transition-colors w-6 h-6">
            {icon}
          </div>
        </div>
        
        {/* Metric Badge */}
        <div className="inline-flex items-center px-3 py-1 bg-gradient-brand rounded-full text-xs font-semibold text-white mb-4">
          {metric}
        </div>
      </div>
      
      <div className="text-lg font-bold mb-2 relative z-10 px-6">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 bg-electric-500 rounded-tr-full rounded-br-full transition-all duration-300 group-hover/feature:bg-gradient-to-b group-hover/feature:from-electric-400 group-hover/feature:to-magenta-400"></div>
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white group-hover/feature:text-electric-300">
          {title}
        </span>
      </div>
      
      <p className="text-sm text-white/70 max-w-xs relative z-10 px-6 mb-4 leading-relaxed group-hover/feature:text-white/90 transition-colors">
        {description}
      </p>
      
      {/* Industries */}
      <div className="px-6 relative z-10">
        <div className="text-xs text-white/50 mb-2">Perfect for:</div>
        <div className="flex flex-wrap gap-1">
          {industries.map((industry) => (
            <span
              key={industry}
              className="px-2 py-1 text-xs bg-white/10 text-white/60 rounded-full group-hover/feature:bg-electric-500/20 group-hover/feature:text-electric-300 transition-colors"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

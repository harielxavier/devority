import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

interface Blog7Props {
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  posts?: Post[];
}

const Blog7 = ({
  tagline = "Success Stories",
  heading = "Real Results for Local Businesses",
  description = "See how our AI-powered websites and automation have transformed local businesses. From increased leads to time savings, discover what's possible for your business.",
  buttonText = "View all success stories",
  buttonUrl = "/blog",
  posts = [
    {
      id: "post-1",
      title: "How AI Chatbots Increased This Law Firm's Leads by 45%",
      summary:
        "Morris & Associates Law implemented our AI chatbot system and saw a 45% increase in qualified consultations within 6 weeks. Learn how automated lead qualification transformed their practice.",
      label: "Case Study",
      author: "Devority Team",
      published: "15 Jan 2024",
      url: "/blog/law-firm-ai-chatbot-success",
      image: "/images/blog/law-firm-success.jpg",
    },
    {
      id: "post-2",
      title: "5 Ways Local SEO Transforms Small Business Revenue",
      summary:
        "Discover how local SEO optimization helped Precision HVAC increase their estimate conversion rate by 65% and generate an additional $45K in quarterly revenue.",
      label: "Local SEO",
      author: "Devority Team",
      published: "8 Jan 2024",
      url: "/blog/local-seo-revenue-transformation",
      image: "/images/blog/local-seo-success.jpg",
    },
    {
      id: "post-3",
      title: "Why Dentists Are Switching to AI-Powered Scheduling",
      summary:
        "Summit Dental Care reduced their no-show rate by 28% and increased monthly revenue by $15K using predictive analytics and automated reminder systems.",
      label: "Healthcare AI",
      author: "Devority Team",
      published: "22 Dec 2023",
      url: "/blog/dental-ai-scheduling-success",
      image: "/images/blog/dental-ai-success.jpg",
    },
  ],
}: Blog7Props) => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            {tagline}
          </Badge>
          <h2 className="mb-3 text-pretty text-3xl font-semibold text-white md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mb-8 text-white/80 md:text-base lg:max-w-2xl lg:text-lg">
            {description}
          </p>
          <Button variant="ghost" className="w-full sm:w-auto" asChild>
            <a href={buttonUrl}>
              {buttonText}
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden">
              <div className="aspect-[16/9] w-full overflow-hidden relative">
                <a
                  href={post.url}
                  className="block transition-opacity duration-200 hover:opacity-70 h-full w-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </a>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {post.label}
                  </Badge>
                  <span className="text-xs text-white/60">
                    {post.published}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white hover:text-electric-400 transition-colors md:text-xl">
                  <a href={post.url}>
                    {post.title}
                  </a>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-sm leading-relaxed">{post.summary}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span className="text-xs text-white/60">
                  By {post.author}
                </span>
                <a
                  href={post.url}
                  className="flex items-center text-electric-400 hover:text-electric-300 transition-colors text-sm font-medium"
                >
                  Read more
                  <ArrowRight className="ml-2 size-3" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog7 };

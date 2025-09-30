import { Metadata } from 'next';
import { AboutHero } from '@/components/sections/about-hero';
import { TeamSection } from '@/components/sections/team-section';
import { CompanyStory } from '@/components/sections/company-story';
import { ValuesSection } from '@/components/sections/values-section';
import { LocalRootsSection } from '@/components/sections/local-roots-section';

export const metadata: Metadata = {
  title: 'About Devority - Your Local New Jersey Web Design & AI Solutions Partner',
  description: 'Meet the team behind Devority. Based in Sparta, NJ, we help local businesses dominate online with custom websites and AI solutions. Learn our story.',
  keywords: [
    'about devority',
    'web design team new jersey',
    'sparta nj web design',
    'local business web design',
    'ai solutions team',
    'new jersey digital agency'
  ],
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyStory />
      <TeamSection />
      <ValuesSection />
      <LocalRootsSection />
    </>
  );
}
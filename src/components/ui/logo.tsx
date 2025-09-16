import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn('relative inline-block', className)}>
      <span
        className="font-display font-black text-2xl tracking-[0.15em] text-white lowercase select-none"
        style={{
          textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)',
          letterSpacing: '0.15em',
        }}
      >
        devority
      </span>
      <div 
        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white"
        style={{
          background: 'linear-gradient(90deg, transparent, white 20%, white 80%, transparent)',
          boxShadow: '0 0 10px rgba(255,255,255,0.8)',
        }}
      />
      <div className="absolute -inset-2 bg-white/5 blur-xl -z-10" />
    </div>
  );
}

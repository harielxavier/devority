import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'light' | 'dark';
}

export function Logo({ className, variant = 'default' }: LogoProps) {
  return (
    <div className={cn('flex items-center', className)}>
      {/* Logo Icon */}
      <div className="relative">
        <div
          className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-lg',
            {
              'bg-gradient-brand text-white': variant === 'default',
              'bg-white text-ink': variant === 'light',
              'bg-ink text-white border border-white/20': variant === 'dark',
            }
          )}
        >
          D
        </div>
      </div>

      {/* Logo Text */}
      <span
        className={cn(
          'ml-3 font-display font-bold text-xl tracking-tight',
          {
            'gradient-text': variant === 'default',
            'text-ink': variant === 'light',
            'text-white': variant === 'dark',
          }
        )}
      >
        Devority
      </span>
    </div>
  );
}

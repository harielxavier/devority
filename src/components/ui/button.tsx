import * as React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-electric-600 to-sunset-600 hover:from-electric-500 hover:to-sunset-500 text-white shadow-lg hover:shadow-xl hover:shadow-electric-500/25 transform hover:scale-105',
        secondary:
          'glass-card hover:bg-white/10 text-white border border-white/20 hover:border-white/30',
        ghost:
          'text-electric-400 hover:text-electric-300 hover:bg-electric-500/10',
        outline:
          'border border-electric-500 text-electric-400 hover:bg-electric-500 hover:text-white',
        destructive:
          'bg-ember-600 text-white hover:bg-ember-500 shadow-lg hover:shadow-xl hover:shadow-ember-500/25',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        default: 'h-11 px-6 py-3',
        lg: 'h-12 px-8 py-4 text-base',
        xl: 'h-14 px-10 py-5 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, children, ...props }, ref) => {
    if (href) {
      // Extract only the props that are valid for Link/anchor elements
      const { onClick, disabled, type, form, formAction, formEncType, formMethod, formNoValidate, formTarget, ...linkProps } = props;
      
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          {...(linkProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      );
    }

    const Comp = asChild ? 'span' : 'button';
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

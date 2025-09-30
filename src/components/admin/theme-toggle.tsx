"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ThemeToggle({ 
  className, 
  size = 'md', 
  showLabel = false 
}: ThemeToggleProps) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn(
        "animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700",
        size === 'sm' && "h-8 w-8",
        size === 'md' && "h-10 w-10",
        size === 'lg' && "h-12 w-12",
        className
      )} />
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return Sun;
      case 'dark':
        return Moon;
      default:
        return Monitor;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light Mode';
      case 'dark':
        return 'Dark Mode';
      default:
        return 'System Mode';
    }
  };

  const Icon = getIcon();

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const buttonSizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.button
        onClick={toggleTheme}
        className={cn(
          "relative rounded-lg border border-neutral-200 dark:border-neutral-700",
          "bg-white dark:bg-neutral-800 shadow-sm",
          "hover:bg-neutral-50 dark:hover:bg-neutral-700",
          "focus:outline-none focus:ring-2 focus:ring-electric-400 focus:ring-offset-2",
          "transition-all duration-200 ease-in-out",
          "flex items-center justify-center",
          buttonSizes[size]
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Icon 
              className={cn(
                iconSizes[size],
                "text-neutral-600 dark:text-neutral-300"
              )} 
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Theme indicator ring */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-lg border-2 border-transparent",
            currentTheme === 'light' && "border-yellow-400",
            currentTheme === 'dark' && "border-blue-400",
            theme === 'system' && "border-purple-400"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>
      
      {showLabel && (
        <motion.span
          key={theme}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {getLabel()}
        </motion.span>
      )}
    </div>
  );
}

// Compact version for tight spaces like sidebars
export function CompactThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("h-6 w-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700", className)} />
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800",
        "transition-colors duration-200",
        "text-neutral-600 dark:text-neutral-300",
        "focus:outline-none focus:ring-2 focus:ring-electric-400 focus:ring-offset-1",
        className
      )}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  );
}
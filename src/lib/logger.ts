/**
 * Simple logger utility for error tracking and debugging
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: any;
  stack?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(entry: LogEntry): string {
    const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;
    return `${prefix} ${entry.message}`;
  }

  private log(level: LogLevel, message: string, context?: any) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    // In production, you could send this to a service like Sentry or DataDog
    if (level === 'error' && context instanceof Error) {
      entry.stack = context.stack;
    }

    // Console output
    const formattedMessage = this.formatMessage(entry);
    
    switch (level) {
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formattedMessage, context || '');
        }
        break;
      case 'info':
        console.info(formattedMessage, context || '');
        break;
      case 'warn':
        console.warn(formattedMessage, context || '');
        break;
      case 'error':
        console.error(formattedMessage, context || '');
        // In production, send to error tracking service
        if (!this.isDevelopment && process.env.SENTRY_DSN) {
          // Sentry integration would go here
        }
        break;
    }

    // Store critical errors in database for review
    if (level === 'error' && !this.isDevelopment) {
      this.storeError(entry);
    }
  }

  private async storeError(entry: LogEntry) {
    try {
      // Store in database for admin review
      // This would connect to your error logging table
      const response = await fetch('/api/admin/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
      
      if (!response.ok) {
        console.error('Failed to store error log');
      }
    } catch (err) {
      // Fail silently to avoid recursive errors
      console.error('Error storing log:', err);
    }
  }

  debug(message: string, context?: any) {
    this.log('debug', message, context);
  }

  info(message: string, context?: any) {
    this.log('info', message, context);
  }

  warn(message: string, context?: any) {
    this.log('warn', message, context);
  }

  error(message: string, context?: any) {
    this.log('error', message, context);
  }

  // Helper for API routes
  apiError(endpoint: string, error: any, request?: Request) {
    const context = {
      endpoint,
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      url: request?.url,
      method: request?.method,
      timestamp: new Date().toISOString(),
    };
    
    this.error(`API Error: ${endpoint}`, context);
  }

  // Helper for database errors
  dbError(operation: string, error: any) {
    const context = {
      operation,
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    };
    
    this.error(`Database Error: ${operation}`, context);
  }

  // Performance logging
  performance(operation: string, duration: number) {
    if (duration > 1000) {
      this.warn(`Slow operation: ${operation}`, { duration: `${duration}ms` });
    } else if (this.isDevelopment) {
      this.debug(`Performance: ${operation}`, { duration: `${duration}ms` });
    }
  }
}

// Export singleton instance
export const logger = new Logger();
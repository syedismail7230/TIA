// ===================================================
// TIA BACKEND - PRODUCTION STRUCTURED LOGGER
// Structured JSON Logging with Context & Correlation
// ===================================================

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogContext {
  userId?: string;
  requestId?: string;
  route?: string;
  method?: string;
  statusCode?: number;
  durationMs?: number;
  ip?: string;
  error?: any;
  [key: string]: any;
}

class Logger {
  private isProduction = process.env.NODE_ENV === 'production';

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const entry = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message,
      environment: process.env.NODE_ENV || 'development',
      ...context,
    };

    if (entry.error && entry.error instanceof Error) {
      entry.error = {
        name: entry.error.name,
        message: entry.error.message,
        stack: this.isProduction ? undefined : entry.error.stack,
      };
    }

    if (this.isProduction) {
      return JSON.stringify(entry);
    }

    // Colorized developer-friendly output for local development
    const colorMap: Record<LogLevel, string> = {
      debug: '\x1b[36m', // Cyan
      info: '\x1b[32m',  // Green
      warn: '\x1b[33m',  // Yellow
      error: '\x1b[31m', // Red
    };
    const reset = '\x1b[0m';
    const color = colorMap[level] || '';
    const extra = context && Object.keys(context).length > 0 ? ` ${JSON.stringify(context)}` : '';
    return `${color}[${entry.timestamp}] [${level.toUpperCase()}]${reset} ${message}${extra}`;
  }

  debug(message: string, context?: LogContext) {
    if (process.env.DEBUG || !this.isProduction) {
      console.debug(this.formatMessage('debug', message, context));
    }
  }

  info(message: string, context?: LogContext) {
    console.info(this.formatMessage('info', message, context));
  }

  warn(message: string, context?: LogContext) {
    console.warn(this.formatMessage('warn', message, context));
  }

  error(message: string, context?: LogContext) {
    console.error(this.formatMessage('error', message, context));
  }
}

export const logger = new Logger();

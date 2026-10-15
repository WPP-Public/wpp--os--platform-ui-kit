import { TimeFormats } from './types';
/**
 * Format time in seconds to a string representation
 * @param format - 'default' returns time as 'MM:SS', 'extended' returns 'HH:MM:SS'
 * @param timeInSeconds - Time in seconds to format
 * @returns Formatted time string in 'MM:SS' or 'HH:MM:SS' format
 * @throws Error if timeInSeconds is negative
 */
export declare const formatTime: (format: TimeFormats | undefined, timeInSeconds: number) => string;
export declare const calculateBufferProgress: (videoPlayerRef: HTMLMediaElement) => number;

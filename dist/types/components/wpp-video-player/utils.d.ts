import { SplitTimeFormat, TimeFormats } from './types';
/**
 * Format time in seconds to a string representation
 * @param format - 'default' returns time as 'MM:SS', 'extended' returns 'HH:MM:SS'
 * @param timeInSeconds - Time in seconds to format
 * @param split - If true, the time will be split into hours, minutes and seconds. If false, the time will be formatted as 'MM:SS' or 'HH:MM:SS'
 * @returns Formatted time string in 'MM:SS' or 'HH:MM:SS' format
 * @throws Error if timeInSeconds is negative
 */
export declare const formatTime: (format: TimeFormats | undefined, timeInSeconds: number, split?: boolean) => string | SplitTimeFormat;
export declare const calculateBufferProgress: (videoPlayerRef: HTMLMediaElement) => number;

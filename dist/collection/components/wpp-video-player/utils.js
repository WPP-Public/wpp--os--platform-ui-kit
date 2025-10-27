const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;
const TIME_PADDING = 2;
const PADDING_CHAR = '0';
/**
 * Format time in seconds to a string representation
 * @param format - 'default' returns time as 'MM:SS', 'extended' returns 'HH:MM:SS'
 * @param timeInSeconds - Time in seconds to format
 * @param split - If true, the time will be split into hours, minutes and seconds. If false, the time will be formatted as 'MM:SS' or 'HH:MM:SS'
 * @returns Formatted time string in 'MM:SS' or 'HH:MM:SS' format
 * @throws Error if timeInSeconds is negative
 */
export const formatTime = (format = 'default', timeInSeconds, split = false) => {
  if (timeInSeconds < 0)
    throw new Error('Time cannot be negative');
  const formatTwoDigits = (value) => Math.floor(value).toString().padStart(TIME_PADDING, PADDING_CHAR);
  const hours = formatTwoDigits(timeInSeconds / SECONDS_IN_HOUR);
  const minutes = formatTwoDigits((timeInSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const seconds = formatTwoDigits(timeInSeconds % SECONDS_IN_MINUTE);
  if (split) {
    return format === 'extended' ? { hours, minutes, seconds } : { minutes, seconds };
  }
  return format === 'extended' ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};
export const calculateBufferProgress = (videoPlayerRef) => {
  if (!videoPlayerRef || videoPlayerRef.buffered.length === 0) {
    return 0;
  }
  const duration = videoPlayerRef.duration;
  const currentTime = videoPlayerRef.currentTime;
  if (isNaN(duration) || duration <= 0) {
    return 0;
  }
  // Find the appropriate buffered range that contains the current time
  let bufferedEnd = 0;
  let found = false;
  for (let i = 0; i < videoPlayerRef.buffered.length; i++) {
    const start = videoPlayerRef.buffered.start(i);
    const end = videoPlayerRef.buffered.end(i);
    // If current playback a position is within this buffer range
    if (currentTime >= start && currentTime <= end) {
      bufferedEnd = end;
      found = true;
      break;
    }
    // If we haven't found a range yet and this range is ahead of a current position
    if (!found && start > currentTime) {
      bufferedEnd = start; // We'll show progress up to the next buffered segment
      found = true;
      break;
    }
  }
  // If no relevant buffer found, use the furthest buffered point
  if (!found && videoPlayerRef.buffered.length > 0) {
    bufferedEnd = videoPlayerRef.buffered.end(videoPlayerRef.buffered.length - 1);
  }
  // Calculate percentage relative to total duration
  const loadedPercentage = Math.min((bufferedEnd / duration) * 100, 100);
  return Math.round(loadedPercentage * 100) / 100;
};

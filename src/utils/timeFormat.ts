/**
 * @returns Formatted time string (e.g., "5:30", "10:00")
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

/**
 * @returns Formatted time string with units (e.g., "5m 30s", "10m 0s")
 */
export const formatTimeWithUnits = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

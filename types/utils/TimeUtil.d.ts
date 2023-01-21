/**
 * Utility class to handle time related problems
 */
export declare class TimeUtil {
    static readonly oneHourAsSeconds = 3600;
    formatTime(date: Date): string;
    formatDate(date: Date): string;
    getDate(): string;
    getTime(): string;
    /**
     * Get timestamp in seconds
     * @returns
     */
    getTimestamp(): number;
    /**
     * mail in eft requires time be in a specific format
     * @returns current time in format: 00:00 (hh:mm)
     */
    getTimeMailFormat(): string;
    /**
     * Mail in eft requires date be in a specific format
     * @returns current date in format: 00.00.0000 (dd.mm.yyyy)
     */
    getDateMailFormat(): string;
    /**
     * Convert hours into seconds
     * @param hours hours to convert to seconds
     * @returns number
     */
    getHoursAsSeconds(hours: number): number;
}

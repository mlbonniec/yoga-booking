import { duration, utc } from 'moment';

/**
 * @description Convert string hour to seconds
 * @example
 * toSeconds('12:30'); // 43200
 */
export function toSeconds(hour: string): number {
    if(!hour) return 0;
    return duration(hour).asSeconds();
}

/**
 * @description Convert seconds to string hour
 * @example
 * toSeconds('43200'); // '12:30'
 */
export function toHour(seconds: number): string {
    if(!seconds) return '00:00';
    return utc(seconds * 1000).format('HH:mm');
}

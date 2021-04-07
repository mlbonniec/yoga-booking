import { duration, utc } from 'moment';

export function toSeconds(hour:string): number {
    if(!hour) return 0;
    return duration(hour).asSeconds();
}

export function toHour(seconds:number): string{
    if(!seconds) return '00:00';
    return utc(seconds * 1000).format('HH:mm');
}

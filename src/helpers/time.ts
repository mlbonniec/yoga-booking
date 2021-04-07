import { duration, utc } from "moment";

export function toSeconds(hour:string): number | null{
    if(!hour) return null
    return duration(hour).asSeconds();
}

export function toHour(seconds:number): string | null{
    if(!seconds) return null
    return utc(seconds * 1000).format('HH:mm');
}

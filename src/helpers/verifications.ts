import { Workshop } from "../@types/structures";
import { roomConflict } from "./conflict";

/**
 * @description Check if a string correspond to the correct syntax depending of a provided type.
 * @example
 * checkstring("time",bonjour) // false
 * checkstring("time",12h50) // true
 * checkstring("time",32h10) // false
 */
export function checkstring(type: string, value:string) : boolean{
    var decision = false;
    switch(type){
        case "email":
            decision = /^[^@\t\r\n\s]+@[^@\t\r\n\s]+\.[^@\t\r\n\s]+$/g.test(value);
            break
        case "time":
            decision = /^[0-2][0-9]\:[0-5][0-9]$/g.test(value);
            break
        case "name":
            decision = /^[A-zÀ-ú,.'-]{1,255}$/i.test(value)
            break
        case "phone":
            decision = /^([0-9]{2}\s){4}[0-9]{2}$/g.test(value)
            if(!decision) decision = /^([0-9]{2}){5}$/g.test(value)
            if(!decision) decision = /^\+([0-9]{2,3})+([0-9]{9})$/g.test(value)
            if(!decision) decision = /^\+([0-9]{2,3})\s([0-9]\s)([0-9]{2}\s){3}([0-9]{2})$/g.test(value)
            break
        default:
            decision = false;
    }
    return decision;
}

export function checkform(data: object ): Array<String>{
    var debug = [];
    console.log(data)
	for(const [key, value] of Object.entries(data)){
		
		/*if( key === "start" || key === "end"){
			if(!checkstring("time",value)){
				debug.push(key)
			}
		}*/
		if( key === "name" || key === "surname"){
			if(!checkstring("name",value)){
				debug.push(key)
			}
		}
		else if( key === "email"){
			if(!checkstring("email",value)){
				debug.push(key)
			}
		}else if( key === "phone"){
			if(!checkstring("phone",value)){
				debug.push(key)
			}
		}
		
	}
    if("start" === Object.keys(data)[0] && "end" === Object.keys(data)[1]){
        const data2 = data as Workshop
        if(data2.start > data2.end) debug.push("time conflict")
    }
    
    return debug;
}
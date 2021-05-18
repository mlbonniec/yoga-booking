export function checkstring(type: string, value:string) : boolean{
    var decision = false;
    switch(type){
        case "email":
            decision = /^[^@\t\r\n\s]+@[^@\t\r\n\s]+\.[^@\t\r\n\s]+$/g.test(value);
            break
        case "time":
            decision = /^[0-2][0-9]h[0-5][0-9]$/g.test(value);
            break
        case "name":
            decision = /^[A-zÀ-ú,.'-]{1,}$/i.test(value)
            break
        case "phone":
            decision = /^([0-9]{2}\s){4}[0-9]{2}$/g.test(value)
            if(!decision) decision = /^([0-9]{2}){5}$/g.test(value)
            break
        default:
            decision = false;
    }
    return decision;
}
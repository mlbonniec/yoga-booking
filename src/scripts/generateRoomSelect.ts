import { Room, Workshop } from "../@types/structures";
import { getQueryStringValue } from "../helpers/get-query-string-value";
import Store from "../helpers/store";

async function generateSelect(select:HTMLSelectElement, value:string = "0"){
    const rooms = new Store("rooms");
    const roomsList = await rooms.getItems<Room>();
    for(const room of roomsList){
        var option = document.createElement("option") as HTMLOptionElement;
        option.value = room.id +""
        option.innerHTML = room.name

        select.appendChild(option);
    }
    select.value = value;
}


async function launch(){
    const Select = document.getElementById("room") as HTMLSelectElement;
    const id = getQueryStringValue('id');
    
    if(!id ||!Select || typeof id !== 'number'){
        generateSelect(Select);
    } 
    else {
        const workshops = new Store("workshops")
        const workshop = await workshops.getItem<Workshop>(id); 
        if(workshop) generateSelect(Select, workshop.room+"")
    }
}


launch()
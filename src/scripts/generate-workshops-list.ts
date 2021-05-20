import { Workshop } from "../@types/structures";
import { workshopConflict } from "../helpers/conflict";
import { getSelectedWorkshop } from "../helpers/forms";
import { error, success } from "../helpers/notifications";
import Store from "../helpers/store";
import { toHour } from "../helpers/time";

function generateUI(e:HTMLDivElement){
    e.innerHTML = "";
    var h4 = document.createElement("h4") as HTMLElement;
    var textnde = document.createTextNode("Ateliers");
    h4.appendChild(textnde);
    e.appendChild(h4);
    (async () => {
        const workshops = new Store('workshops');
        const workshopsData = await workshops.getItems<Workshop>();
        for(const workshopData of workshopsData){
            var div = document.createElement("DIV") as HTMLDivElement;
            div.className = "workshop";

            var checkbox = document.createElement("INPUT") as HTMLInputElement;
            checkbox.type = "checkbox";
            checkbox.id = workshopData?.id+"";
            checkbox.value = "on"
            checkbox.addEventListener('click', () => {conflict(workshopData?.id)});

            var label = document.createElement("LABEL") as HTMLLabelElement;
            label.htmlFor = "scales";

            var textnode = document.createTextNode(workshopData?.name+" • "+toHour(workshopData?.start as number)+" • "+toHour(workshopData?.end as number)+" • "+workshopData?.room);
            
            label.appendChild(textnode);
            div.appendChild(checkbox);
            div.appendChild(label);
            e.appendChild(div);

        }
        
    })();
        
    
}



function conflict(id:number){
    (async () => {
        var array:Array<number> = getSelectedWorkshop();
        console.log(array)
        const bo = await workshopConflict(array);
        const checkbox = document.getElementById(""+id) as HTMLInputElement;
        if(bo) {
            checkbox.checked = false;
            error("Erreur : Conflit d'horaires", {showConfirmButton: true, position: 'center'});
        }else{
            success("Succes", {timer:2000});
        }
        
    })();
}

const workshopsDiv = document.getElementById('workshops') as HTMLDivElement;
generateUI(workshopsDiv);

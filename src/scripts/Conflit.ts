import type { Participant, Room, Speaker, Workshop } from '../@types/structures';
import Store from '../helpers/store';

async function conflit(id:number, debut:number, fin:number){

        const tableP= new Store('Participant');
        const tableW = new Store('Workshop');
        const ResultW = await tableP.getItem<Participant>(id);
        //{ clé: valeur } = condition
        if (ResultW == null){ return false }
        for (const element in ResultW.workshops) {
            const workshop = await tableW.getItem<Workshop>(element)
            if (workshop != null){
                const debutW = workshop.start
                const finW = workshop.end
                if ((debut >= debutW || debut <= finW) || (fin >= debutW || fin <= finW)){
                    return true
            }
            }
        }
        return false
}
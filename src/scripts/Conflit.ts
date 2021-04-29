import type { Participant, Room, Speaker, Workshop } from '../@types/structures';
import Store from '../helpers/store';

function conflit(id, atelier, horaire){
    (async () => {
        const tableP= new Store('Participant');
        const tableW = new Store('Workshop');
        const resultP = await tableP.getItems({ id: workshop });
        //{ clé: valeur } = condition
        }();
    )
}
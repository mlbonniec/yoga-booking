import type { Participant, Workshop } from '../@types/structures';
import Store from '../helpers/store';

export default async function conflict(id: number, debut: number, fin: number): Promise<boolean> {
    const tableP = new Store('Participant');
    const tableW = new Store('Workshop');
    
    // TODO: add Speaker type
    const ResultW = await tableP.getItem<Participant>(id);

    // { clé: valeur } = condition
    if (ResultW === null)
        return false;

    for (const element in ResultW.workshops) {
        const workshop = await tableW.getItem<Workshop>(element);
        if (workshop !== null) {
            const debutW = workshop.start;
            const finW = workshop.end;

            if ((debut >= debutW || debut <= finW) || (fin >= debutW || fin <= finW))
                return true;
        }
    }
    
    return false;
}

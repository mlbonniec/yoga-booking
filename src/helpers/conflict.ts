import type { Participant, Workshop } from '../@types/structures';
import Store from '../helpers/store';

/**
 * @description Check if there is a schedule conflict between participant workshops.
 * @example
 * const participant: Participant = { name: 'Jane', surname: 'DOE', phone: '+123456789', email: 'jane@doe.com', payed: false, workshops: [] };
 * const workshop: Workshop = { name: 'AlphaRoom', start: toSeconds('11:00'), end: toSeconds('12:00'), room: 1, speaker: 1 }
 * await participantConflict(participant, workshop); // false
 */
export default async function participantConflict(participant: Participant, workshop: Workshop): Promise<boolean> {
  const workshops = new Store('workshops');
  const { start, end } = workshop;

  for (const element of participant.workshops) {
    const participantWorkshop = await workshops.getItem<Workshop>(element);

    if (participantWorkshop) {
      const startW = participantWorkshop.start;
      const endW = participantWorkshop.end;

      if ((start >= startW || start <= endW) || (end >= startW || end <= endW))
        return true;
    }
  }
  
  return false;
}

export async function workshopConflict(clickedW:number,array:Array<number>): Promise<boolean> {
  const workshops = new Store('workshops');
  const participantWorkshop = await workshops.getItem<Workshop>(clickedW);
  if (participantWorkshop) {

  const startW = participantWorkshop.start;
  const endW = participantWorkshop.end;
  for(const work of array){
    const {start, end} = await workshops.getItem<Workshop>(work) as Workshop;
    if ((start >= startW && start < endW) || (end > startW && end <= endW))
      return true;
  }
  
  }
  return false;
}

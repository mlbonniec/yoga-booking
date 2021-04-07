import type { Participant, Room, Speaker, Workshop } from '../@types/structures';
import Store from '../helpers/store';
const data: Room[] = [
	{
		name: 'Jane',
	}
];
const data1: Participant[] = [
	{
		name: 'Jane',
		surname: 'DOE',
		phone: '+123456789',
		email: 'jane@doe.com',
		payed: false,
		workshops: []
	}
];
const data2: Speaker[] = [
	{
		name: 'Jane',
		surname: 'DOE',
		phone: '+123456789',
		email: 'jane@doe.com'
	}
];
const data3: Workshop[] = [
	{
		name: 'Foo',
		start: 0,
		end: 1,
		room: 0,
		speaker: 0
	}
];
(async () => {
	const participants = new Store('participants');
	const rooms = new Store('rooms');
	const speakers = new Store('speakers');
	const workshops = new Store('workshops');

	if(await rooms.length() == 0){
		for await (const d of data) {
			await rooms.setItem<Room>(d);
		}
	}
	if(await participants.length() == 0){
		for await (const d of data1) {
			await participants.setItem<Participant>(d);
		}
	}
	if(await speakers.length() == 0){
		for await (const d of data2) {
			await speakers.setItem<Speaker>(d);
		}
	}
	if(await workshops.length() == 0){
		for await (const d of data3) {
			await workshops.setItem<Workshop>(d);
		}
	}
	
})();

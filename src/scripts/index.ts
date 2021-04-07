import type { Participant, Room, Speaker } from '../@types/participant';
import Store from '../helpers/store';

const data: Room[] = [
	{
		name: 'Jane',
	},
	{
		name: 'John',
	}
];

(async () => {
	const participants = new Store('participants');
	const rooms = new Store('rooms');
	const speakers = new Store('speakers');
	// Foreach doesn't wait for promise, so we've to use a for loop
	for await (const d of data) {
		await rooms.setItem<Room>(d);
	}


})();

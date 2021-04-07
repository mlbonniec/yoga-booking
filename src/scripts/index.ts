import type { Participant, Room, Speaker } from '../@types/participant';
import { fillForm } from '../helpers/forms';
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

	const result = await participants.getItems<Participant>({ surname: 'doe' });
	console.log(result);

	const form = document.getElementById('form');
	if (form)
		fillForm<Participant & { id: number; payed: boolean; time: number }>(form as HTMLFormElement, {
			id: 2,
			time: 34200,
			payed: true,
			name: 'Jane',
			surname: 'DOE',
			phone: '+123456789',
			email: 'jane@doe.com'
		});

	for await (const d of data) {
		await rooms.setItem<Room>(d);
	}
})();

import type { Participant } from '../@types/participant';
import { fillForm } from '../helpers/forms';
import Store from '../helpers/store';

const data: Participant[] = [
	{
		name: 'Jane',
		surname: 'DOE',
		phone: '+123456789',
		email: 'jane@doe.com'
	},
	{
		name: 'John',
		surname: 'Applaaeseed',
		phone: '+012345678',
		email: 'john.appleseed@gmail.com'
	}
];

(async () => {
	const participants = new Store('participants');
	
	// Foreach doesn't wait for promise, so we've to use a for loop
	if (await participants.length() < 50) {
		for await (const d of data) {
			await participants.setItem<Participant>(d);
		}
	}

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
})();

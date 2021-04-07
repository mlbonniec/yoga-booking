import type { Participant } from '../@types/participant';
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
	for await (const d of data) {
		await participants.setItem<Participant>(d);
	}

	const result = await participants.getItems<Participant>({ surname: 'doe' });

	//console.log(result);
})();

import type { Participant, Room, Speaker, Workshop } from '../@types/structures';
import Store from '../helpers/store';
import { toHour } from '../helpers/time';

async function generateTable<T extends { [key: string]: any }>(table: HTMLTableElement | null, data: T[], redirectPage: string, order?: (keyof T)[]){
	if (!table || !data || data.length === 0)
		return console.error("Le tableau n'a pas pu se générer correctement. Vérifiez que les paramètres entrés ne sont pas <null>.");

	const heads = Object.keys(data[0]);

	// Delete empty message row
	table.querySelector('.empty')?.remove();

	for (const d of data) {
		const row = table.insertRow();
		// Add click event to redirect to specified page with parameter id
		row.addEventListener('click', () => window.location.href = `${redirectPage}.html?id=${d.id}`);

		for (const e of order || heads) {
			if (e === 'id')
				return;

			const cell = row.insertCell();
			
			if (e === 'start' || e === 'end') {
				cell.innerText = toHour(d[e]);
			} else if (e === 'workshops' || e === 'room') {
					const displayedNames = [];

					if (e === 'workshops') {
						const workshops = new Store('workshops');
						for (const item of d[e]) {
							const data: Workshop | null = await workshops.getItem<Workshop>(item);
							if (data)
								displayedNames.push(data.name);
						}	
					} else if (e === 'room') {
						const rooms = new Store('rooms');
						const data: Room | null = await rooms.getItem<Room>(d.id);
						if (data)
							displayedNames.push(data.name);
					}

					if (displayedNames.length > 0)
						cell.innerText = displayedNames.join(', ');
					else
						cell.innerText = '-'
			} else if (e === 'payed') {
				const div = document.createElement('div');
				const input = document.createElement('input');
				const label = document.createElement('label');
				
				if (d[e])
					input.checked = true;
				
				input.type = 'checkbox';
				input.disabled = true;
				label.innerText = 'Payé'
	
				div.append(input, label);
				cell.appendChild(div);
			} else if (e === 'speaker') {
				const speakers = new Store('speakers');
				const data: Speaker | null = await speakers.getItem<Speaker>(d.id);
				if (data)
					cell.innerText = data.name;
			} else {
				cell.innerText = d[e];
			}
		};
	};
}

(async () => {
	// Setup all stores
	// const rooms = new Store('rooms');
	const participants = new Store('participants');
	const speakers = new Store('speakers');
	const workshops = new Store('workshops');

	// Fill all tables
	// const roomsTable = document.getElementById('rooms') as HTMLTableElement;
	// const roomsData = await rooms.getItems<Room>();
	// generateTable(roomsTable, roomsData);
	
	const participantsTable = document.getElementById('participants') as HTMLTableElement;
	const participantsData = await participants.getItems<Participant>();
	await generateTable(participantsTable, participantsData, 'add-participant', ['payed', 'name', 'surname', 'email', 'phone', 'workshops']);

	const speakersTable = document.getElementById('speakers') as HTMLTableElement;
	const speakersData = await speakers.getItems<Speaker>();
	await generateTable(speakersTable, speakersData, 'add-speaker', ['name', 'surname', 'email', 'phone']);

	const workshopsTable = document.getElementById('workshops') as HTMLTableElement;
	const workshopsData = await workshops.getItems<Workshop>();
	await generateTable(workshopsTable, workshopsData, 'add-workshop', ['name', 'room', 'speaker', 'start', 'end']);
})();

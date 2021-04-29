import type { Participant, Room, Speaker, Workshop } from '../@types/structures';
import Store from '../helpers/store';
import { toHour } from '../helpers/time';

async function generateTable<T extends { [key: string]: any }>(table: HTMLTableElement | null, data: T[], order?: (keyof T)[]){
	/**
   * Create a table from a data set.
   * @param  {HTMLTableElement | null} table  table element of the page.
   * @param  {object} data   array of objects. 
   */
	// TODO: add parameter to order columns
	const heads = Object.keys(data[0]);
	if(table == null || data == null || !heads)
		return console.error("Le tableau n'a pas pu se générer correctement. Vérifiez que les paramètres entrés ne sont pas <null>.");
	
	// Delete empty message row
	table.querySelector('.empty')?.remove();

	for (const d of data) {
		const row = table.insertRow();

		for (const e of order || heads) {
			if (e === 'id')
				return;

			const cell = row.insertCell();
			
			if (e === 'start' || e === 'end') {
				cell.innerText = toHour(d[e]);
			} else if (e === 'workshops') {
					const workshops = new Store('workshops');
					const displayedWorkshops = [];
					
					for (const workshop of d[e]) {
						const data: Workshop | null = await workshops.getItem(workshop);
						if (data)
							displayedWorkshops.push(data.name)
						else
							// TODO: Remove this log message
							cell.innerText = `unexisting workshop with id ${workshop}`;
					}

					if (displayedWorkshops.length > 0)
						cell.innerText = displayedWorkshops.join(', ');
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
	await generateTable(participantsTable, participantsData, ['payed', 'name', 'surname', 'email', 'phone', 'workshops']);

	const speakersTable = document.getElementById('speakers') as HTMLTableElement;
	const speakersData = await speakers.getItems<Speaker>();
	await generateTable(speakersTable, speakersData, ['name', 'surname', 'email', 'phone']);

	const workshopsTable = document.getElementById('workshops') as HTMLTableElement;
	const workshopsData = await workshops.getItems<Workshop>();
	await generateTable(workshopsTable, workshopsData, ['name', 'room', 'speaker', 'start', 'end']);
})();
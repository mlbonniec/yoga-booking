import type { Participant, Room, Speaker, Workshop } from '../@types/structures';
import Store from '../helpers/store';
import { toHour } from '../helpers/time';

function generateTable<T extends { [key: string]: any }>(table: HTMLTableElement | null, data: T[]){
	/**
   * Create a table from a data set.
   * @param  {HTMLTableElement | null} table  table element of the page.
   * @param  {object} data   array of objects. 
   */
	const heads = Object.keys(data[0]);
	
	console.log(heads);
	
	if(table == null || data == null || !heads)
		return console.error("Le tableau n'a pas pu se générer correctement. Vérifiez que les paramètres entrés ne sont pas <null>.");

	// for loop -> create a row for each element and place a cell for each informations
	for (let element of data) {
		const row = table.insertRow();
		
		for (let key = 0; key<heads.length; key++) {
		  if (heads[key] === 'id') continue;
		  const cell = row.insertCell();

			console.log(heads[key]);
			
		  if (heads[key] === 'start' || heads[key] === 'end') {
				const text = document.createTextNode(toHour(element[heads[key]]));
				cell.appendChild(text);
			} else if (heads[key] === 'payed') {
				const div = document.createElement('div');
				const input = document.createElement('input');
				const label = document.createElement('label');
				
				input.type = 'checkbox';
				label.innerText = 'Payé'

				div.append(input, label);
				cell.appendChild(div);
		  } else {
				const text = document.createTextNode(element[heads[key]]);
				cell.appendChild(text);
		  }
		  
		}
		console.log();
	}
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
	generateTable(participantsTable, participantsData);

	const speakersTable = document.getElementById('speakers') as HTMLTableElement;
	const data2 = await speakers.getItems<Speaker>();
	generateTable(speakersTable, data2);

	const workshopsTable = document.getElementById('workshops') as HTMLTableElement;
	const workshopsData = await workshops.getItems<Workshop>();
	generateTable(workshopsTable, workshopsData);
})();

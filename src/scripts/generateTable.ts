import type { Participant, Room, Speaker } from '../@types/participant';
import Store from '../helpers/store';

function generateTableHead(table: HTMLTableElement | null, data:object){
	if(table == null || data == null){
		console.log(String(table) +" | "+ String(data))
		return;
	};
	let thead = table.createTHead();
	let row = thead.insertRow();
	for (let key in data) {
		let th = document.createElement("th");
		let text = document.createTextNode(key);
		th.appendChild(text);
		row.appendChild(th);
	  }
}

function generateTable<T extends { [key: string]: any }>(table: HTMLTableElement | null, data: T[]){
	if(table == null || data == null){
		console.log(String(table) +" | "+ String(data))
		return;
	};
	for (let element of data) {
		let row = table.insertRow();
		for (let key in element) {
		  let cell = row.insertCell();
		  let text = document.createTextNode(element[key]);
		  cell.appendChild(text);
		}
	  }
}

(async () => {
	const participants = new Store('participants');
 	const rooms = new Store('rooms');
 	const speakers = new Store('speakers');
	// Foreach doesn't wait for promise, so we've to use a for loop
	const data = await participants.getItems<Participant>();
	let table = document.getElementById("participants") as HTMLTableElement
	generateTableHead(table, data[0])
	generateTable(table, data)

	const data1 = await rooms.getItems<Room>();
	table = document.getElementById("rooms") as HTMLTableElement
	generateTableHead(table, data1[0])
	generateTable(table, data1)
	const data2 = await speakers.getItems<Speaker>();
	table = document.getElementById("speakers") as HTMLTableElement
	generateTableHead(table, data2[0])
	generateTable(table, data2)
})();

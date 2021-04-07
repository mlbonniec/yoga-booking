import type { Participant, Room, Speaker, Workshop } from '../@types/structures';
import Store from '../helpers/store';

function generateTableHead(table: HTMLTableElement | null, data:object){
	/**
   * create the table head from a data set.
   * @param  {HTMLTableElement | null} table  table element of the page.
   * @param  {object} data   an object. 
   * @return {boolean} default false
   */
	
	if(table == null || data == null) return true;
		
	let thead = table.createTHead();
	let row = thead.insertRow();
	//create a name for each parameters that the table will take
	for (let key in data) {
		if(key === "id") continue;
		let th = document.createElement("th");
		let text = document.createTextNode(key);
		th.appendChild(text);
		row.appendChild(th);
	  }
	  return false;
}

function generateTable<T extends { [key: string]: any }>(table: HTMLTableElement | null, data: T[]){
	/**
   * create a table from a data set.
   * @param  {HTMLTableElement | null} table  table element of the page.
   * @param  {object} data   array of objects. 
   */

	if(table == null || data == null || generateTableHead(table, data[0])){
		console.error("Le tableau n'a pas pu se générer correctement. Vérifiez que les paramètres entrés ne sont pas <null>.")
		return;
	};
	//for loop -> create a row for each element and place a cell for each informations
	for (let element of data) {
		let row = table.insertRow();
		for (let key in element) {
		  if(key === "id") continue;
		  let cell = row.insertCell();
		  let text = document.createTextNode(element[key]);
		  cell.appendChild(text);
		}
	  }
}

(async () => {
	//setup all stores
	const participants = new Store('participants');
 	const rooms = new Store('rooms');
 	const speakers = new Store('speakers');
	const workshops = new Store('workshops');
	//generate Participant's table
	const data = await participants.getItems<Participant>();
	let table = document.getElementById("participants") as HTMLTableElement
	generateTable(table, data)

	//generate Rooms' table
	const data1 = await rooms.getItems<Room>();
	table = document.getElementById("rooms") as HTMLTableElement
	generateTable(table, data1)

	//generate Speakers' table
	const data2 = await speakers.getItems<Speaker>();
	table = document.getElementById("speakers") as HTMLTableElement
	generateTable(table, data2)

	const data3 = await workshops.getItems<Workshop>();
	table = document.getElementById("workshops") as HTMLTableElement
	generateTable(table, data3)
})();

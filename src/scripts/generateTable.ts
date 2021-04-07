import type { Participant } from '../@types/participant';
import Store from '../helpers/store';


const participants = new Store('participants');
var data = participants.getItems();
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

function generateTable(table: HTMLTableElement | null, data:Array<object>){
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

let table = document.getElementById("table") as HTMLTableElement
generateTableHead(table, data[0])
generateTable(table, data)
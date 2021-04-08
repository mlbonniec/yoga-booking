import {toHour} from './time';
import type { Participant, Room, Speaker, Workshop } from '../@types/structures';
import Store from '../helpers/store';

export function fillForm<T extends { [key: string]: any }>(el: HTMLFormElement, data: T) {
	if (!el)
		throw new Error('You have to pass a form element in the fillForm function.');

	const inputs = Array.from(el.getElementsByTagName('input'));

	inputs.forEach(e => {
		const name = e.getAttribute('name');
		if (!name || !(name in data))
			return;
		
		const value = data[name];
		switch(e.type){
			case 'text':
				e.value = value;
				break; 
			case 'checkbox':
				e.checked = value;
				break; 
			case 'time':
				e.value = toHour(value);
				break;
		}
	});
}


export function getForms(form:HTMLFormElement): object{
	const inputs = Array.from(form.getElementsByTagName('input'));
	let ob = {

	}
	inputs.forEach(element => {
		if(element.getAttribute('name')){
			ob[element.getAttribute('name')] = element.value
		}
		
	});
	return ob;
}


export function addToDb(ob:object){
	
	if(ob["payed"] != undefined){
		if(ob["id"] !== undefined && ob["id"] !== ""){
			console.log(ob);
			let id = ob["id"]
			delete(ob["id"]);
			(async() =>{
				const participants = new Store("participants")
				await participants.updateItem<Participant>(id,ob as Participant);
			})();
		}else{
			(async() =>{
				delete(ob["id"]);
				const participants = new Store("participants")
				await participants.setItem<Participant>(ob as Participant)
			})();
		}
	}
	else if(ob["speaker"] != undefined){
		if(ob["id"] !== undefined && ob["id"] !== ""){
			let id = ob["id"]
			delete(ob["id"]);
			(async() =>{
				const participants = new Store("workshops")
				await participants.updateItem<Workshop>(id,ob as Workshop);
			})();
		}else{
			(async() =>{
				delete(ob["id"]);
				const participants = new Store("workshops")
				await participants.setItem<Workshop>(ob as Workshop)
			})();
		}
	}
	else if(ob["email"] != undefined){
		if(ob["id"] !== undefined && ob["id"] !== ""){
			let id = ob["id"]
			delete(ob["id"]);
			(async() =>{
				const participants = new Store("speakers")
				await participants.updateItem<Speaker>(id,ob as Speaker);
			})();
		}else{
			(async() =>{
				delete(ob["id"]);
				const participants = new Store("speakers")
				await participants.setItem<Speaker>(ob as Speaker)
			})();
		}
	}
	else if(ob["name"] != undefined){
		if(ob["id"] !== undefined && ob["id"] !== ""){
			let id = ob["id"]
			delete(ob["id"]);
			(async() =>{
				const participants = new Store("rooms")
				await participants.updateItem<Room>(id,ob as Room);
			})();
		}else{
			(async() =>{
				delete(ob["id"]);
				const participants = new Store("rooms")
				await participants.setItem<Room>(ob as Room)
			})();
		}
	}
	else{
		console.error("l'objet n'a pas pu être ajouter")
	}
}


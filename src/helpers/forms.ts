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
		ob = ob as Participant;
		if(ob["id"] !== undefined){
			let id = ob["id"]
			delete(ob["id"]);
			
			(async() =>{
				const participants = new Store("participants")
				// await participants.setItem<Participant>(obj)
			})();
		}else{
			(async() =>{
				const participants = new Store("participants")
				// await participants.setItem<Participant>(obj)
			})();
		}
	}
}

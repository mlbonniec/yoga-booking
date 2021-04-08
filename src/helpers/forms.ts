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
			default:
				e.value = "None"
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
		let obj = transform(ob,"Participant") as Participant;
		if(!obj) return;
		(async() =>{
			// const participants = new Store("participants")
			// await participants.setItem<Participant>(obj)


		})();
	}
}

function transform(ob:object, struc:string): object | null{
	switch(struc){
		case "Participant":
			for(let key in ob){
				switch (key) {
					case "name":
						if(typeof(ob[key]) !== typeof("")) return null
						break;
					case "surname":
						if(typeof(ob[key]) !== typeof("")) return null
						break;
					case "email":
						if(typeof(ob[key]) !== typeof("")) return null
						break;
					case "phone":
						if(typeof(ob[key]) !== typeof("")) return null
						break;
					case "payed":
						if(typeof(ob[key]) !== typeof("")) return null
						if(ob[key] === "on") ob[key] = true;
						else false;
						break;
					case "workshops":
						if(typeof(ob[key]) !== typeof(Array<number>())) return null
						console.log(ob[key])
						break;
					case "id":
						delete(ob[key])
						break;
					default:
						delete(ob[key])
						break;
				}
			}
			break
		case "Room":
			break
		case "Workshop":
			break
		case "Speaker":
			break
	}



	return ob;
}
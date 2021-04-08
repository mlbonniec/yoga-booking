import {toHour} from './time';
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


export function addToDb(ob:object, struct: string){
	const id = ob["id"];
	delete(ob["id"]);
	console.log(ob)
	if(id !== undefined && id !== ""){
		
		(async() =>{
			const participants = new Store(struct)
			await participants.updateItem(id,ob);
		})();
	}
	else{
		(async() =>{
			const participants = new Store(struct)
			await participants.setItem(ob);
			console.log("test");
		})();
	}
}

// const tonElement = document.getElementById('bouton') as HTMLButtonElement;
// tonElement.addEventListener('click', () => {
// 	const form = document.getElementById("form") as HTMLFormElement;
// 	addToDb(getForms(form), "participants")
// 	document.location.reload()
//   });
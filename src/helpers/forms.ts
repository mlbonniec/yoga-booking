import { toHour, toSeconds } from './time';
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
		switch(e.type) {
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

export function getForm(form: HTMLFormElement): object {
	const inputs = Array.from(form.getElementsByTagName('input'));
	const data: { [key: string]: any } = {};

	inputs.forEach(e => {
		const attr = e.getAttribute('name');
		if(!attr)
			return;

		switch(e.type) {
			case 'text':
				data[attr] = e.value;
				break; 
			case 'checkbox':
				data[attr] = e.checked;
				break; 
			case 'time':
				data[attr] = toSeconds(e.value);
				break;
		}
	});

	return data;
}

export async function addToDB(structure: string, data: object & { id?: number }) {
	const id = data.id;
	const store = new Store(structure);

	if(id) {
		delete(data.id);
		await store.updateItem(id, data);
	} else {
		await store.setItem(data);
	}
}

// const tonElement = document.getElementById('bouton') as HTMLButtonElement;
// tonElement.addEventListener('click', () => {
// 	const form = document.getElementById("form") as HTMLFormElement;
// 	addToDb("participants", getForm(form))
// 	document.location.reload()
//   });

import { utc } from 'moment';

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
				e.value = utc(value * 1000).format('HH:mm');
				break; 
			
		}
	});
}

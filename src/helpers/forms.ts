import { duration, utc } from 'moment';

export function fillForm<T extends { [key: string]: any }>(el: HTMLFormElement, data: T) {
	const m = duration('09:30').asSeconds()
	console.log(m);

	if (!el)
		throw new Error('You have to pass a form element in the fillForm function.');

	const inputs = Array.from(el.getElementsByTagName('input'));

	inputs.forEach(e => {
		const name = e.getAttribute('name');
		if (!name || !(name in data))
			return;

		const value = data[name];
		if (e.type === 'text')
			e.value = value;
		else if (e.type === 'checkbox')
			e.checked = value;
		else if (e.type === 'time')
			e.value = utc(value * 1000).format('HH:mm');
	});
}

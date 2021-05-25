import { toHour, toSeconds } from './time';
import Store from '../helpers/store';
import { Participant, Speaker, Workshop } from '../@types/structures';

/**
 * @description Fill a given form with given data.
 * @example <caption>Suppose the form has 2 text fields 'name' and 'email', and a 'payed' checkbox.</caption>
 * const form = document.getElementById('myform');
 * const data = { name: 'DOE', email: 'john.doe@domain.com', payed: true };
 * fillForm(form, data);
 */
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
			case 'email':
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

/**
 * @description Get and parses data from a given form. Returned keys correspond to the 'name' attributes of the inputs.
 * @example <caption>Suppose the form has 2 text fields 'name' and 'email', and a 'payed' checkbox.</caption>
 * const form = document.getElementById('myform');
 * getFormData(form); // { name: 'DOE', email: 'john.doe@domain.com', payed: true };
 */
export function getFormData(form: HTMLFormElement, hasWorkshops:boolean = false, isModif:boolean = false ): object {
	const inputs = Array.from(form.getElementsByTagName('input'));
	const select = form.getElementsByTagName("select")[0] as HTMLSelectElement;
	const data: { [key: string]: any } = {};

	inputs.forEach(e => {
		const attr = e.getAttribute('name');
		if(!attr)
			return;

		switch(e.type) {
			case 'text':
			case 'email':
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
	if(hasWorkshops){
		data["workshops"] = getSelectedWorkshop(undefined, isModif)
	}
	if(select) data["room"] = select.value
	return data;
}

/**
 * @description Add data to the storage. It automatically remove the 'id' key from data.
 * @example
 * const data = { name: 'DOE', surname: 'John', email: 'john.doe@domain.com', phone: '+33636291634' };
 * addToDB('speakers', data); // { name: 'DOE', surname: 'John', email: 'john.doe@domain.com', phone: '+33636291634' }
 */
export async function addToDB<T extends { id?: number, workshops?:Array<number>, speaker?:number}>(structure: string, data: T): Promise<T> {
	const id = data.id;
	const store = new Store(structure);
	if(structure === "workshops") if(!data.speaker){
		const workS = await store.getItem<Workshop>(""+id)
		data.speaker = workS?.speaker
	}
	if(id) {
		delete(data.id);

		if(structure === "speakers"){
			const workshops = data.workshops;
			const store2 = new Store("workshops");
			if(workshops)
			for(const work of workshops){
				var workshop = await store2.getItem<Workshop>(work);
				const checkbox = document.getElementById(""+work) as HTMLInputElement;
				if(workshop){
					if(checkbox.checked) workshop.speaker = id
					else workshop.speaker = -1
					addToDB("workshops", workshop);
				} 
			}
			delete(data.workshops)
		}

		return await store.updateItem<T>(id, data);
	} else {
		return await store.setItem<T>(data);
	}
}

// const tonElement = document.getElementById('bouton') as HTMLButtonElement;
// tonElement.addEventListener('click', () => {
// 	const form = document.getElementById("form") as HTMLFormElement;
// 	addToDb("participants", getFormData(form))
// 	document.location.reload()
//   });


export function getSelectedWorkshop(id:number = -1, isModif:boolean = false): Array<number>{
    var array = [] as Array<number>
    const workshopsDiv = document.getElementById('workshops') as HTMLDivElement;
    const sub = workshopsDiv.getElementsByTagName("div");
    for(var i = 0; i<sub.length; i++){
        const elem = sub[i] as HTMLDivElement;
        const checkbox = elem.getElementsByTagName("input")[0]
        if(isModif || (checkbox.checked &&  checkbox.id !== id+"")) array.push(parseInt(checkbox.id));

    }

    return array;
}

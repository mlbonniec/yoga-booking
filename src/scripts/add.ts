import { Workshop } from '../@types/structures';
import { roomConflict } from '../helpers/conflict';
import { addToDB, fillForm, getFormData } from '../helpers/forms';
import { getQueryStringValue } from '../helpers/get-query-string-value';
import { error, success } from '../helpers/notifications';
import Store from '../helpers/store';
import { checkform, checkstring } from '../helpers/verifications';

const form = document.querySelector('form') as HTMLFormElement | null;

function silentRedirection(url = window.location.pathname): void {
	return window.history.replaceState('', '', url);
}

document.addEventListener('DOMContentLoaded', async () => {
	const id = getQueryStringValue('id');
	const { storeName } = document.body.dataset;

	// Rewrite URL by removing parameters
	if (typeof id !== 'number' || !storeName || !form)
		return silentRedirection();

	const store = new Store(storeName);
	const data = await store.getItem(id);
	if (!data)
		return silentRedirection();

	fillForm(form, data);	
});

form?.addEventListener('submit', (e) => {
	e.preventDefault();
	var data: object & { id?: number , start?:number, end?:number, room?:string};
	const id = getQueryStringValue('id');
	var b = false;
	if (!id || typeof id !== 'number') b = false
	else b = true;
	

	if(form.id === "speakers" || form.id === "participants"){
		data = getFormData(form, true, b) ;
	}else{
		data = getFormData(form);
	}
	const debug = checkform(data)
	if(form.id === "workshops"){
		const {start, end, room} = data;
		if(typeof(room) === "string" && typeof(start) === "number" && typeof(end) === "number" && room !== "-1"){
			const boo = (async () => {
				const workshops = new Store('workshops');
				const roomWorkshops = await workshops.getItems<Workshop>();
				if(parseInt(room) === -1) return false;
				if (roomWorkshops) {
				for(const work of roomWorkshops){
					const startW = work.start
					const endW = work.end
					if ((startW >= start && startW < end) || (endW > start && endW <= end)){
						return true;
					}
					
					
				}
				
				}
				return false;
				
			})();
			if(boo) debug.push("room conflict")
		}
		
		
		
	}
	//fonctionnalités de sauvegarde
	if(debug.length === 0) {
		const id = getQueryStringValue('id');
		if (id && typeof id === 'number')
			data.id = id;

		const type = form.getAttribute('id');
		if (type)
			addToDB(type, data);
		success('Données ajoutées à la base de donnée.');	
	} else {
		error('Erreur : '+debug);
	}
});

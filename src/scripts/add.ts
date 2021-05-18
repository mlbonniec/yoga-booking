import { fillForm, getFormData } from '../helpers/forms';
import { getQueryStringValue } from '../helpers/get-query-string-value';
import { error } from '../helpers/notifications';
import Store from '../helpers/store';
import { checkstring } from '../helpers/verifications';

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

	console.log(data);
	fillForm(form, data);	
});

form?.addEventListener('submit', (e) => {
	e.preventDefault();
	
	const data = getFormData(form);
	
	console.log(data);
	for(const [key, value] of Object.entries(data)){
		
		if( key === "start" || key === "end"){
			console.log(key, checkstring("time",value))
		}
		else if( key === "name" || key === "room" || key === "surname"){
			console.log(key, checkstring("name",value))
		}
		else if( key === "email" || key === "room"){
			console.log(key, checkstring("name",value))
		}else if( key === "phone"){
			console.log(key, checkstring("phone",value))
		}
		
	}
	
	// + Ajouter les fonctionnalités de sauvegarde
	error('Il reste à sauvegarder ces données', { toast: true });
});

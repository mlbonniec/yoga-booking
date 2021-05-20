import { addToDB, fillForm, getFormData } from '../helpers/forms';
import { getQueryStringValue } from '../helpers/get-query-string-value';
import { error, success } from '../helpers/notifications';
import Store from '../helpers/store';
import { checkform, checkstring } from '../helpers/verifications';

const form = document.querySelector('form') as HTMLFormElement | null;

export function silentRedirection(url = window.location.pathname): void {
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
	var data = null;
	if(form.id === "speakers" || form.id === "participants"){
		data = getFormData(form, true);
	}else{
		data = getFormData(form);
	}
	
	const debug = checkform(data)
	//fonctionnalités de sauvegarde
	if(debug.length === 0){
		const type = form.getAttribute("id");
		if(type !== null) addToDB(type, data);
		success('Données ajoutées à la base de donnée.');
	}else{
		error('Erreur : '+debug);
	}
});

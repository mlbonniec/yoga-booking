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
	var data: object & { id?: number };
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

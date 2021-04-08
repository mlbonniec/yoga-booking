import { success, error } from '../helpers/notifications';

const form = document.getElementById('form');

form?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // + Ajouter les fonctionnalités de sauvegarde
    // success('Modification effectuée avec succès.');
    // error('Une erreur est survenue.')
});

import swal, { SweetAlertResult, SweetAlertOptions } from 'sweetalert2';

export function success(title: string, options?: Omit<SweetAlertOptions, 'title' | 'text' | 'toast' | 'icon'>): Promise<SweetAlertResult<typeof options>> {
	return swal.fire({
		toast: true,
		icon: 'success',
		showConfirmButton: false,
		timer: 8000,
  	position: 'bottom-end',
		...options,
		title
	});
}

export function error(title: string, options?: Omit<SweetAlertOptions, 'title' | 'toast' | 'icon'>): Promise<SweetAlertResult<typeof options>> {
	return swal.fire({
		icon: 'error',
		title,
		...options,
	})
}

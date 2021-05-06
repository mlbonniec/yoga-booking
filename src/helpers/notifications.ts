import swal, { SweetAlertResult, SweetAlertOptions } from 'sweetalert2';

/**
 * @description Display a success popup at the bottom right of the screen.
 * @example <caption>Example usage without options.</caption>
 * success('Operation successfully completed.');
 * @example <caption>Example usage with options.</caption>
 * success('Operation successfully completed.', { timer: 5000, showConfirmButton: true });
 */
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

/**
 * @description Display an error popup in the center of the screen.
 * @example <caption>Example usage without options.</caption>
 * success('The operation failed.');
 * @example <caption>Example usage with options.</caption>
 * success('The operation failed.', { timer: 5000, showConfirmButton: false });
 */
export function error(title: string, options?: Omit<SweetAlertOptions, 'title' | 'icon'>): Promise<SweetAlertResult<typeof options>> {
	return swal.fire({
		icon: 'error',
		title,
		...options,
	})
}

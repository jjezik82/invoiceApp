import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	const getUserInvoices = async (userId) => {
		try {
			const invoices = serializeNonPOJOs(
				await locals.pb.collection('invoices').getFullList(undefined, {
					sort: '-created',
					filter: `user="${userId}"`,
					expand: 'customer,company'
				})
			);
			return invoices;
		} catch (error) {
			console.log('Error:', error);
			throw error(error.status, error.message);
		}
	};

	return { invoices: getUserInvoices(locals.user.id) };
};

export const actions = {
	delete: async ({ request, locals }) => {
		const { invoiceId } = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('invoices').delete(invoiceId);
		} catch (error) {
			console.log('Error:', error);
			throw error(error.status, error.message);
		}

		return { success: true };
	},
	paid: async ({ request, locals }) => {
		const { invoiceId, isPaid } = Object.fromEntries(await request.formData());

		let invoicePaid;
		if (isPaid === 'false') {
			invoicePaid = true;
		}
		if (isPaid === 'true') {
			invoicePaid = false;
		}
		try {
			await locals.pb.collection('invoices').update(invoiceId, { is_paid: invoicePaid });
		} catch (error) {
			console.log('Error:', error);
			throw error(error.status, error.message);
		}
	}
};

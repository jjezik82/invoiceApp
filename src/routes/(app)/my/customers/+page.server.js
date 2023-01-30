import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	const getUserCustomers = async (userId) => {
		try {
			const customers = serializeNonPOJOs(
				await locals.pb
					.collection('customers')
					.getFullList(undefined, { filter: `user="${userId}"` })
			);
			return customers;
		} catch (error) {
			console.log('Error:', error);
			throw error(error.status, error.message);
		}
	};

	return {
		customers: getUserCustomers(locals.user.id)
	};
};

export const actions = {
	delete: async ({ request, locals }) => {
		const { customerId } = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('customers').delete(customerId);
		} catch (error) {
			console.log('Error:', error);
			throw error(error.status, error.message);
		}

		return { success: true };
	}
};

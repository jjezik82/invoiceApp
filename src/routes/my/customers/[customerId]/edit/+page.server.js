import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	try {
		const customer = serializeNonPOJOs(
			await locals.pb.collection('customers').getOne(params.customerId)
		);
		return { customer };
	} catch (error) {
		console.log('Error:', error);
		throw error(error.status, error.message);
	}
};

export const actions = {
	update: async ({ request, locals, params }) => {
		const formData = await request.formData();

		try {
			await locals.pb.collection('customers').update(params.customerId, formData);
		} catch (error) {
			console.log('Error:', error);
			throw error(error.status, error.message);
		}

		throw redirect(303, '/my/customers');
	}
};

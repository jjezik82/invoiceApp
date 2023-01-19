import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}
};

export const actions = {
	create: async ({ request, locals }) => {
		const formData = await request.formData();

		formData.append('user', locals.user.id);

		try {
			await locals.pb.collection('customers').create(formData);
		} catch (error) {
			console.log('Error:', error);
			throw error(error.status, error.message);
		}

		throw redirect(303, '/my/customers');
	}
};

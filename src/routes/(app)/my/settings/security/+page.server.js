import { redirect } from '@sveltejs/kit';

export const actions = {
	updatePassword: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('users').update(locals.user.id, data);
			locals.pb.authStore.clear();
		} catch (error) {
			console.log('Error:', error);
			throw error(error.status, error.message);
		}
		throw redirect(303, '/login');
	}
};

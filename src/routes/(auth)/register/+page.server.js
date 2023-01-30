import { redirect, error, fail } from '@sveltejs/kit';
import { registerUserSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';

export const actions = {
	register: async ({ locals, request }) => {
		const { formData, errors } = await validateData(await request.formData(), registerUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors
			});
		}

		let username = formData.name.split(' ').join('').toLowerCase();

		try {
			await locals.pb.collection('users').create({ username, ...formData });
			await locals.pb.collection('users').requestVerification(formData.email);
		} catch (err) {
			console.log('Error:', err);
			throw error(500, 'Something went wrong');
		}

		throw redirect(303, '/login');
	}
};

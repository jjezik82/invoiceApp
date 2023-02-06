import { error, fail } from '@sveltejs/kit';
import { customerSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}
};

export const actions = {
	create: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), customerSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors
			});
		}

		formData.user = locals.user.id;

		try {
			await locals.pb.collection('customers').create(formData);
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	}
};

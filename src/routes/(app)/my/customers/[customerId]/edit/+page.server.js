import { error, fail } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import { customerSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
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
		const { formData, errors } = await validateData(await request.formData(), customerSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors
			});
		}

		try {
			await locals.pb.collection('customers').update(params.customerId, formData);
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	}
};

import { error, fail } from '@sveltejs/kit';
import { companySchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { serializeNonPOJOs } from '$lib/utils';
import { serialize } from 'object-to-formdata';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	try {
		const company = serializeNonPOJOs(
			await locals.pb.collection('companies').getFirstListItem(`user="${locals.user.id}"`)
		);
		return { company };
	} catch (err) {
		console.log('Error:', err);
		throw error(err.status, err.message);
	}
};

export const actions = {
	update: async ({ request, locals }) => {
		const body = await request.formData();

		const sign = body.get('signature');
		const companyId = body.get('companyId');

		if (sign.size === 0) {
			body.delete('signature');
		}

		const { formData, errors } = await await validateData(body, companySchema);
		const { signature, ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: rest,
				errors
			});
		}
		try {
			await locals.pb.collection('companies').update(companyId, serialize(formData));
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	}
};

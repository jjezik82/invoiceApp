import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	try {
		const company = serializeNonPOJOs(
			await locals.pb.collection('companies').getFirstListItem(`user="${locals.user.id}"`)
		);
		return { company };
	} catch (error) {
		console.log('Error:', error);
		throw error(error.status, error.message);
	}
};

export const actions = {
	update: async ({ request, locals }) => {
		const formData = await request.formData();

		const signature = formData.get('signature');
		const companyId = formData.get('companyId');

		if (signature.size === 0) {
			formData.delete('signature');
		}

		try {
			await locals.pb.collection('companies').update(companyId, formData);
		} catch (error) {
			console.log('Error:', error);
			throw error(error.status, error.message);
		}
	}
};

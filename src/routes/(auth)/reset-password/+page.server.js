import { error, fail } from '@sveltejs/kit';
import { resetPasswordSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';

export const actions = {
	resetPassword: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), resetPasswordSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors
			});
		}

		try {
			await locals.pb.collection('users').requestPasswordReset(formData.email);
			return {
				success: true
			};
		} catch (err) {
			console.log(err);
			throw error(err.status, err.message);
		}
	}
};

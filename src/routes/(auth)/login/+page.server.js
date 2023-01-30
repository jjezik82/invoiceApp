import { redirect, error, fail } from '@sveltejs/kit';
import { loginUserSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';

export const actions = {
	login: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), loginUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors
			});
		}

		try {
			await locals.pb.collection('users').authWithPassword(formData.email, formData.password);
			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err) {
			if (err.data.code === 400) {
				return fail(400, {
					loginError: 'Nastala chyba pri prihlasovaní. Máte nesprávny email alebo heslo.'
				});
			}
			throw error(500, 'Niekde nastala chyba');
		}

		throw redirect(303, '/');
	}
};

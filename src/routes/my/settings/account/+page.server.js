export const actions = {
	updateEmail: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('users').requestEmailChange(data.email);
		} catch (error) {
			throw error(error.status, error.message);
		}

		return {
			success: true
		};
	},
	updateUsername: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('users').getFirstListItem(`username = "${data.username}"`);
		} catch (error) {
			if (error.status === 404) {
				try {
					const { username } = await locals.pb
						.collection('users')
						.update(locals.user.id, { username: data.username });
					locals.user.username = username;
					return { success: true };
				} catch (error) {
					console.log('Error:', error);
					throw error(error.status, error.message);
				}
			}
			console.log('Error', error);
			throw error(error.status, error.message);
		}
	}
};

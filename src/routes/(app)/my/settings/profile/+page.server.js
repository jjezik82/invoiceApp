export const actions = {
	updateProfile: async ({ request, locals }) => {
		let data = await request.formData();
		const userAvatar = data.get('avatar');

		if (userAvatar.size === 0) {
			data.delete('avatar');
		}

		try {
			const { name, avatar } = await locals.pb.collection('users').update(locals?.user?.id, data);

			locals.user.name = name;
			locals.user.avatar = avatar;
		} catch (error) {
			console.log('Error:', error);
			throw error(400, 'Something went wrong updating profile');
		}

		return {
			success: true
		};
	}
};

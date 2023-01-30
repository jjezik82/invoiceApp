import { redirect } from '@sveltejs/kit';
export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	if (locals.user) {
		const checkUserCompany = async (userId) => {
			try {
				await locals.pb.collection('companies').getFirstListItem(`user="${userId}"`);
			} catch (error) {
				if (error.status === 404) {
					const companyData = {
						user: userId
					};
					await locals.pb.collection('companies').create(companyData);
				}
			}
		};

		const checkUserCounters = async (userId) => {
			const year = new Date().getFullYear();

			try {
				await locals.pb
					.collection('counters')
					.getFirstListItem(`user="${userId}"`, { filter: `year=${year}` });
			} catch (error) {
				if (error.status === 404) {
					const counterData = {
						user: userId,
						year: year,
						number: 1
					};
					await locals.pb.collection('counters').create(counterData);
				}
			}
		};

		return {
			user: locals.user,
			company: checkUserCompany(locals.user.id),
			customers: checkUserCounters(locals.user.id)
		};
	}
	return {
		user: undefined
	};
};

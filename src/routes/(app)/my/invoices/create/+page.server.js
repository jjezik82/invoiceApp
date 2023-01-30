import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import { createInvoicePdf } from '$lib/generatePuppeteer';
import dayjs from 'dayjs';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	const getUserCompany = async (userId) => {
		try {
			const company = serializeNonPOJOs(
				await locals.pb.collection('companies').getFirstListItem(`user="${userId}"`)
			);
			return company;
		} catch (error) {
			console.log('Error:', error);
			throw error(error.status, error.message);
		}
	};

	const getUserCustomers = async (userId) => {
		try {
			const customers = serializeNonPOJOs(
				await locals.pb
					.collection('customers')
					.getFullList(undefined, { filter: `user="${userId}"` })
			);
			return customers;
		} catch (error) {
			console.log('Error:', error);
			throw error(error.status, error.message);
		}
	};

	const getUserCounter = async (userId) => {
		const year = new Date().getFullYear();

		try {
			const counter = serializeNonPOJOs(
				await locals.pb
					.collection('counters')
					.getFirstListItem(`user="${userId}"`, { filter: `year=${year}` })
			);
			return counter;
		} catch (error) {
			console.log('Error:', error);
			throw error(error.status, error.message);
		}
	};

	return {
		company: getUserCompany(locals.user.id),
		customers: getUserCustomers(locals.user.id),
		counter: getUserCounter(locals.user.id)
	};
};

export const actions = {
	create: async ({ request, locals }) => {
		const formData = await request.formData();

		const getUserCompany = async (companyId) => {
			try {
				const company = serializeNonPOJOs(
					await locals.pb.collection('companies').getOne(companyId)
				);
				return company;
			} catch (error) {
				console.log('Error:', error);
				throw error(error.status, error.message);
			}
		};
		const getUserCustomer = async (customerId) => {
			try {
				const customer = serializeNonPOJOs(
					await locals.pb.collection('customers').getOne(customerId)
				);
				return customer;
			} catch (error) {
				console.log('Error:', error);
				throw error(error.status, error.message);
			}
		};

		const pdfData = {
			form: {
				invoice: {
					vs: formData.get('variable_symbol'),
					date_now: formData.get('date'),
					date_payment: formData.get('date_payment'),
					items: formData.get('items'),
					total_price: formData.get('total_price')
				}
			},
			company: await getUserCompany(formData.get('companyId')),
			customer: await getUserCustomer(formData.get('customerId'))
		};

		const pdf = new Blob([await createInvoicePdf(pdfData)]);

		const counterId = formData.get('counterId');
		const counterData = {
			number: +formData.get('vs_counter') + 1
		};

		const datePayment = dayjs(formData.get('date_payment')).format('YYYY-MM-DD HH:mm:ss');

		const invoiceFD = new FormData();
		invoiceFD.append('date_payment', datePayment);
		invoiceFD.append('due_day', formData.get('due_day'));
		invoiceFD.append('items', formData.get('items'));
		invoiceFD.append('total_price', formData.get('total_price'));
		invoiceFD.append('variable_symbol', formData.get('variable_symbol'));
		invoiceFD.append('user', locals.user.id);
		invoiceFD.append('company', formData.get('companyId'));
		invoiceFD.append('customer', formData.get('customerId'));
		invoiceFD.append('invoice_pdf', pdf, 'invoice');

		try {
			await locals.pb.collection('invoices').create(invoiceFD);
		} catch (error) {
			console.log('Error:', error);
			throw error(error.status, error.message);
		}
		try {
			await locals.pb.collection('counters').update(counterId, counterData);
		} catch (error) {
			console.log('Error:', error);
			throw error(error.status, error.message);
		}

		throw redirect(303, '/my/invoices');
	}
};

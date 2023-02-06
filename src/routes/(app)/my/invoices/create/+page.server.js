import { error, fail } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import { createInvoicePdf } from '$lib/generatePuppeteer';
import { invoiceSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
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
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
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
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};

	const getUserCounter = async (userId) => {
		const year = new Date().getFullYear().toString();

		try {
			const counter = serializeNonPOJOs(
				await locals.pb.collection('counters').getFirstListItem(`user="${userId}" && year=${year}`)
			);
			return counter;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
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
		const { formData, errors } = await validateData(await request.formData(), invoiceSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors
			});
		}

		const getUserCompany = async (companyId) => {
			try {
				const company = serializeNonPOJOs(
					await locals.pb.collection('companies').getOne(companyId)
				);
				return company;
			} catch (err) {
				console.log('Error:', err);
				throw error(err.status, err.message);
			}
		};
		const getUserCustomer = async (customerId) => {
			try {
				const customer = serializeNonPOJOs(
					await locals.pb.collection('customers').getOne(customerId)
				);
				return customer;
			} catch (err) {
				console.log('Error:', err);
				throw error(err.status, err.message);
			}
		};

		const pdfData = {
			form: {
				invoice: {
					vs: formData.variable_symbol,
					date_now: formData.date,
					date_payment: formData.date_payment,
					items: formData.items,
					total_price: formData.total_price
				}
			},
			company: await getUserCompany(formData.companyId),
			customer: await getUserCustomer(formData.customerId)
		};

		const pdf = new Blob([await createInvoicePdf(pdfData)]);

		const counterId = formData.counterId;
		const counterData = {
			number: +formData.vs_counter + 1
		};
		const datePayment = dayjs(formData.date_payment).format('YYYY-MM-DD HH:mm:ss');

		const invoiceFD = new FormData();
		invoiceFD.append('variable_symbol', formData.variable_symbol);
		invoiceFD.append('date_payment', datePayment);
		invoiceFD.append('due_day', formData.due_day);
		invoiceFD.append('items', JSON.stringify(formData.items));
		invoiceFD.append('total_price', formData.total_price);
		invoiceFD.append('user', locals.user.id);
		invoiceFD.append('company', formData.companyId);
		invoiceFD.append('customer', formData.customerId);
		invoiceFD.append('invoice_pdf', pdf, 'invoice');

		try {
			await locals.pb.collection('invoices').create(invoiceFD);
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
		try {
			await locals.pb.collection('counters').update(counterId, counterData);
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	}
};

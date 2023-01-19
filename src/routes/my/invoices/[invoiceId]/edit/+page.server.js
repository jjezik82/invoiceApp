import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import { createInvoicePdf } from '$lib/generatePuppeteer';
import dayjs from 'dayjs';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	const getUserInvoice = async (invoiceId) => {
		try {
			const invoice = serializeNonPOJOs(
				await locals.pb.collection('invoices').getOne(invoiceId, {
					expand: 'company,customer'
				})
			);
			return invoice;
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

	return {
		invoice: getUserInvoice(params.invoiceId),
		customers: getUserCustomers(locals.user.id)
	};
};

export const actions = {
	update: async ({ request, locals, params }) => {
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
			await locals.pb.collection('invoices').update(params.invoiceId, invoiceFD);
		} catch (error) {
			console.log('Error:', error);
			throw error(error.status, error.message);
		}

		throw redirect(303, '/my/invoices');
	}
};

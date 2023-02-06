<script>
	import {
		Input,
		CustomerSelect,
		CompanyInfo,
		CustomerInfo,
		Select,
		DateInput,
		Repeater
	} from '$lib/components';
	import { activePageStore } from '$lib/store';
	import { enhance } from '$app/forms';
	import { invalidateAll, goto } from '$app/navigation';
	import { dayjs } from 'svelte-time';
	import toast from 'svelte-french-toast';

	export let data;
	export let form;
	let selectedCustomerId = data.invoice.expand.customer.id;
	let selectedCustomer;
	let paymentDay = data.invoice.due_day;
	let paymentDate = data.invoice.date_payment;
	let now = dayjs(data.invoice.created).format('YYYY-MM-DD');
	let days = [...Array(32).keys()].map((e) => ({
		value: e,
		title: e
	}));
	let totalPrice = data.invoice.total_price;
	let itemInputs = data.invoice.items;
	let items;
	let variableSymbol = data.invoice.variable_symbol;
	let loading = false;

	const submitUpdateInvoice = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					toast.success('Faktúra úspešne upravená.');
					goto('/my/invoices');
					break;
				case 'error':
					break;
				default:
					await update();
			}
			loading = false;
		};
	};

	activePageStore.update(() => {
		return 'invoices';
	});

	function addDays(date, days) {
		var result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	const findSelectedCustomer = (id) => {
		selectedCustomer = data.customers.find((item) => item.id === id);
	};
	const calculatePaymentDay = (days) => {
		paymentDate = addDays(now, days).toISOString().split('T')[0];
	};

	$: items = JSON.stringify(itemInputs);
	$: findSelectedCustomer(selectedCustomerId);
	$: calculatePaymentDay(paymentDay);
</script>

<div class="flex flex-col w-full h-full px-16">
	<div class="w-full">
		<form
			action="?/update"
			method="post"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			novalidate
			use:enhance={submitUpdateInvoice}
		>
			<div class="flex flex-row w-full flex-wrap justify-start pt-10 relative">
				<h3 class="text-3xl font-bold">Upraviť faktúru: #{variableSymbol}</h3>
				<div class="pt-3 absolute right-0 bottom-0">
					<button type="submit" class="btn btn-primary w-full max-w-lg">Upraviť</button>
				</div>
			</div>
			<div class="flex flex-row w-full flex-wrap justify-start py-10">
				<CompanyInfo company={data?.invoice?.expand?.company} />
				<div class="flex-auto w-1/2 px-3">
					<CustomerSelect
						bind:value={selectedCustomerId}
						error={form?.errors?.customerId}
						customers={data?.customers}
					/>
					<CustomerInfo {selectedCustomer} />
				</div>
			</div>
			<div class="divider" />
			<div class="flex flex-row w-full flex-wrap justify-start py-5">
				<input type="hidden" name="companyId" value={data.invoice.expand.company.id} />
				<div class="flex-auto w-1/4 px-3">
					<div class="form-control w-full mb-2">
						<label for="date" class="label font-medium pb-1">
							<span class="label-text">Dátum vystavenia</span>
						</label>
						<input
							class="input input-bordered w-full"
							type="date"
							id="date"
							name="date"
							bind:value={now}
							on:input={() => {
								calculatePaymentDay(paymentDay);
							}}
						/>
						{#if form?.errors?.date}
							<label for="date" class="label py-0 pt-1">
								<span class="label-text-alt text-error">
									{form?.errors?.date}
								</span>
							</label>
						{/if}
					</div>
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Select
						label={'Splatnosť (dni)'}
						id={'due_day'}
						bind:value={paymentDay}
						options={days}
						error={undefined}
					/>
				</div>
				<div class="flex-auto w-1/4 px-3">
					<DateInput
						readonly
						id="date_payment"
						label="Dátum splatnosti"
						value={paymentDate}
						error={form?.errors?.date_payment}
					/>
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input
						type="text"
						id="variable_symbol"
						label="Variabilný symbol"
						value={variableSymbol}
						error={form?.errors?.variable_symbol}
					/>
				</div>
			</div>
			<Repeater errors={form?.errors} {itemInputs} {totalPrice} />
			<div class="flex flex-row w-full justify-end flex-wrap pb-16">
				<div>
					<button type="submit" class="btn btn-primary w-full max-w-lg">Upraviť</button>
				</div>
			</div>
		</form>
	</div>
</div>

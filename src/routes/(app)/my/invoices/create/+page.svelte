<script>
	import {
		Input,
		CustomerSelect,
		CompanyInfo,
		CustomerInfo,
		Select,
		DateInput,
		Repeater,
		Modal
	} from '$lib/components';
	import { createVariableSymbol } from '$lib/utils';
	import { activePageStore } from '$lib/store';
	import { enhance } from '$app/forms';
	import { invalidateAll, goto } from '$app/navigation';
	import toast from 'svelte-french-toast';

	export let data;
	export let form;
	let selectedCustomerId;
	let selectedCustomer;
	let variableSymbol;
	let paymentDay = 14;
	let now = new Date().toISOString().split('T')[0];
	let paymentDate;
	let days = [...Array(32).keys()].map((e) => ({
		value: e,
		title: e
	}));
	let modalOpen;
	$: modalOpen = data?.company?.name === '' || (data?.company?.name === undefined && false);

	let loading = false;

	const submitCreateInvoice = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					toast.success('Nová faktúra úspešne vytvorená.');
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

	variableSymbol = createVariableSymbol(data.counter.year, data.counter.number).toString();

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

	$: findSelectedCustomer(selectedCustomerId);
	$: calculatePaymentDay(paymentDay);
</script>

<div class="flex flex-col w-full h-full px-16">
	<div class="w-full">
		<form
			action="?/create"
			method="post"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			novalidate
			use:enhance={submitCreateInvoice}
		>
			<div class="flex flex-row w-full flex-wrap justify-start pt-10 relative">
				<h3 class="text-3xl font-bold">Vytvoriť novú faktúru: #{variableSymbol}</h3>
				<div class="pt-3 absolute right-0 bottom-0">
					<button type="submit" class="btn btn-primary w-full max-w-lg">Vytvoriť</button>
				</div>
			</div>
			<div class="flex flex-row w-full flex-wrap justify-start py-10">
				<CompanyInfo company={data?.company} />
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
				<input type="hidden" name="companyId" value={data.company.id} />
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
					<input type="hidden" name="vs_counter" value={data.counter.number} />
					<input type="hidden" name="counterId" value={data.counter.id} />
				</div>
			</div>
			<Repeater errors={form?.errors} />
			<div class="flex flex-row w-full justify-end flex-wrap pb-16">
				<div>
					<button type="submit" class="btn btn-primary w-full max-w-lg">Vytvoriť</button>
				</div>
			</div>
		</form>
	</div>
</div>
<Modal label="companyExists" checked={modalOpen}>
	<div slot="heading">
		<h3 class="text-2xl break-normal">Nemáte kompletne vyplnené firemné údaje!</h3>
		<p class="text-base font-normal mt-2">Prosím doplňte si ich.</p>
	</div>
	<div class="flex w-full items-center justify-center space-x-2" slot="actions">
		<a href="/my/company" class="btn btn-error"> TU </a>
	</div>
</Modal>

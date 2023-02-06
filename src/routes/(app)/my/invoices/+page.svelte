<script>
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Time from 'svelte-time';
	import { Modal } from '$lib/components';
	import { getPDFURL } from '$lib/utils';
	import { Icon, Trash, Pencil, Check, Document } from 'svelte-hero-icons';
	import { activePageStore } from '$lib/store';
	import toast from 'svelte-french-toast';
	export let data;

	activePageStore.update(() => {
		return 'invoices';
	});
	let loading;
	// let modalOpen;
	// $: modalOpen = false;
	$: loading = false;

	const submitDeleteCustomer = () => {
		loading = true;
		// modalOpen = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					// modalOpen = false;
					toast.success('Faktúra bola úspešne vymazaná.');
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
	const submitPaidCustomer = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					toast.success('Akcia úspešne vykonaná');
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full px-16">
	<div class="w-full">
		<div class="flex flex-row w-full flex-wrap justify-center pt-10 relative">
			<h3 class="text-3xl font-bold">Vaše faktúry</h3>
			<div class="pt-3 absolute right-0 bottom-0">
				<a href="/my/invoices/create" class="btn btn-primary w-full max-w-lg">Nová faktúra</a>
			</div>
		</div>
		<div class="flex flex-col w-full pt-20">
			<div class="overflow-x-auto shadow-lg">
				<table class="table w-full">
					<!-- head -->
					<thead>
						<tr>
							<th>Zákazník</th>
							<th>Dátum vytvorenia</th>
							<th>Dátum splatnosti</th>
							<th>Variabilný symbol</th>
							<th>Cena</th>
							<th>Dokument</th>
							<th>Akcie</th>
						</tr>
					</thead>
					<tbody>
						{#if data.invoices.length === 0}
							<td colspan="6" class="text-center font-medium"
								>Zatiaľ ste nevytvorili žiadnu faktúru</td
							>
						{:else}
							{#each data.invoices as invoice}
								<tr class={`${invoice.is_paid ? 'bg-green-100' : 'bg-red-100'} transparent`}>
									<th>{invoice.expand.customer.name}</th>
									<th><Time timestamp={invoice.created} format="DD.MM.YYYY" /></th>
									<th><Time timestamp={invoice.date_payment} format="DD.MM.YYYY" /></th>
									<th>{invoice.variable_symbol}</th>
									<th>{invoice.total_price} €</th>
									<th
										><a
											href={getPDFURL(invoice.collectionId, invoice.id, invoice.invoice_pdf)}
											class="btn btn-info btn-sm"
											target="_blank"
											rel="noopener noreferrer"
										>
											<Icon src={Document} class="w-5 h-5 text-white" />
										</a></th
									>
									<th>
										<a
											href={`/my/invoices/${invoice.id}/edit`}
											class="btn btn-secondary btn-sm btn-circle"
										>
											<Icon src={Pencil} class="w-5 h-5 text-white" />
										</a>
										<form
											action="?/paid"
											method="post"
											class="inline"
											use:enhance={submitPaidCustomer}
										>
											<input type="hidden" name="invoiceId" value={invoice.id} />
											<input type="hidden" name="isPaid" value={invoice.is_paid} />
											<button
												type="submit"
												name=""
												class={`btn ${
													invoice.is_paid ? 'btn-success' : 'btn-warning'
												} btn-sm btn-circle`}
											>
												<Icon src={Check} class="w-5 h-5 text-white" />
											</button>
										</form>
										<Modal label={invoice.id} checked={false}>
											<span slot="trigger" class="btn btn-error btn-sm btn-circle">
												<Icon src={Trash} class="w-5 h-5 text-white" />
											</span>
											<div slot="heading">
												<h3 class="text-2xl">Vymazať faktúru {invoice.variable_symbol}</h3>
												<p class="text-base font-normal mt-2 whitespace-normal">
													Ste si istý, že chcece vymazať túto faktúru? Táto akcia je sa nedá vrátiť
													späť!
												</p>
											</div>
											<div class="flex w-full items-center justify-center space-x-2" slot="actions">
												<label for={invoice.id} class="btn btn-outline">Zrušiť</label>
												<form action="?/delete" method="post" use:enhance={submitDeleteCustomer}>
													<input type="hidden" name="invoiceId" value={invoice.id} />
													<button for={invoice.id} type="submit" class="btn btn-error">
														Vymazať
													</button>
												</form>
											</div>
										</Modal>
									</th>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<style>
	.transparent th {
		background: transparent;
	}
</style>

<script>
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Modal } from '$lib/components';
	import { Icon, Trash, Pencil } from 'svelte-hero-icons';

	export let data;
	let loading;
	let modalOpen;
	$: modalOpen = false;
	$: loading = false;

	const submitDeleteCustomer = () => {
		loading = true;
		modalOpen = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					modalOpen = false;
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
			<h3 class="text-3xl font-bold">Your Customers</h3>
			<div class="pt-3 absolute right-0 bottom-0">
				<a href="/my/customers/create" class="btn btn-primary w-full max-w-lg">New Customer</a>
			</div>
		</div>
		<div class="flex flex-col w-full pt-20">
			<div class="overflow-x-auto shadow-lg">
				<table class="table w-full">
					<!-- head -->
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Address</th>
							<th>Postcode</th>
							<th>City</th>
							<th>Country</th>
							<th>IČO</th>
							<th>DIČ</th>
							<th>IČ DPH</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{#if data.customers.length === 0}
							<td colspan="9" class="text-center font-medium">No customers found</td>
						{:else}
							{#each data.customers as customer}
								<tr>
									<th>{customer.name}</th>
									<th>{customer.email}</th>
									<th>{customer.address}</th>
									<th>{customer.postcode}</th>
									<th>{customer.city}</th>
									<th>{customer.country}</th>
									<th>{customer.ico}</th>
									<th>{customer.dic}</th>
									<th>{customer.ic_dph}</th>
									<th>
										<a
											href={`/my/customers/${customer.id}/edit`}
											class="btn btn-success btn-sm btn-circle"
										>
											<Icon src={Pencil} class="w-5 h-5 text-white" />
										</a>

										<Modal label={customer.id} checked={modalOpen}>
											<span slot="trigger" class="btn btn-error btn-sm btn-circle">
												<Icon src={Trash} class="w-5 h-5 text-white" />
											</span>
											<div slot="heading">
												<h3 class="text-2xl">Delete {customer.name}</h3>
												<p class="text-base font-normal mt-2 whitespace-normal">
													Are you sure you want to delete this customer? Once deleted, the customer
													cannot be restored.
												</p>
											</div>
											<div class="flex w-full items-center justify-center space-x-2" slot="actions">
												<label for={customer.id} class="btn btn-outline">Cancel</label>
												<form action="?/delete" method="post" use:enhance={submitDeleteCustomer}>
													<input type="hidden" name="customerId" value={customer.id} />
													<button type="submit" class="btn btn-error"> Delete </button>
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

<script>
	import { Input } from '$lib/components';
	import { Icon, Trash, Plus } from 'svelte-hero-icons';
	import { dayjs } from 'svelte-time';
	export let data;
	let selectedCustomerId = data.invoice.expand.customer.id;
	let selectedCustomer;
	let paymentDay = data.invoice.due_day;
	let paymentDate = data.invoice.date_payment;
	let now = dayjs(data.invoice.created).format('YYYY-MM-DD');
	let days = [...Array(31).keys()];
	let totalPrice = data.invoice.total_price;
	let itemInputs = data.invoice.items;
	let items;
	let variableSymbol = data.invoice.variable_symbol;

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
	function addItem() {
		itemInputs = itemInputs.concat({ title: '', count: 0, per_price: 0, price: 0 });
	}
	function removeItem(i) {
		itemInputs = itemInputs.filter((el, index) => index !== i);
		totalPrice = itemInputs.reduce(function (a, b) {
			return a + b['price'];
		}, 0);
	}

	function countPrice(i) {
		const item = itemInputs[i];
		itemInputs[i].price = item.count * item.per_price;
		totalPrice = itemInputs.reduce(function (a, b) {
			return a + b['price'];
		}, 0);
	}

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
		>
			<div class="flex flex-row w-full flex-wrap justify-start pt-10 relative">
				<h3 class="text-3xl font-bold">Update invoice #{variableSymbol}</h3>
				<div class="pt-3 absolute right-0 bottom-0">
					<button type="submit" class="btn btn-primary w-full max-w-lg">Update</button>
				</div>
			</div>
			<div class="flex flex-row w-full flex-wrap justify-start py-10">
				<div class="flex-auto w-1/2 px-3">
					<div class="card max-w-lg bg-base-100 shadow-xl">
						<div class="card-body">
							<div class="flex flex-row w-full flex-wrap">
								<div class="flex-auto w-full">
									<h2 class="card-title text-2xl">Company</h2>
								</div>
								<div class="flex-auto w-1/2">
									<p class="text-xl font-bold mt-2">{data.invoice.expand.company.name}</p>
									<p>{data.invoice.expand.company.address}</p>
									<p>{data.invoice.expand.company.postcode} {data.invoice.expand.company.city}</p>
									<p>{data.invoice.expand.company.country}</p>
									<p class="mt-2">Telefón: {data.invoice.expand.company.phone}</p>
									<p>Email: {data.invoice.expand.company.email}</p>
									<p>Vystavil: {data.invoice.expand.company.person}</p>
								</div>
								<div class="flex-auto w-1/2 pl-6">
									<p class="mt-8">IČO: {data.invoice.expand.company.ico}</p>
									<p>DIČ: {data.invoice.expand.company.dic}</p>
									{#if data.invoice.expand.company.ic_dph}
										<p>IČ DPH: {data.invoice.expand.company.ic_dph}</p>
									{:else}
										<p>Nie je platiteľ DPH</p>
									{/if}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex-auto w-1/2 px-3">
					<div class="w-full">
						<p class="text-2xl font-bold inline mr-3">Customer:</p>
						<select
							name="customerId"
							class="select select-bordered w-full max-w-xs select-sm"
							bind:value={selectedCustomerId}
						>
							<option disabled selected>Select</option>
							{#each data.customers as customer}
								<option value={customer.id}>{customer.name}</option>
							{/each}
						</select>
					</div>
					{#if selectedCustomer}
						<div class="card max-w-lg bg-base-100 shadow-xl mt-6">
							<div class="card-body">
								<div class="flex flex-row w-full flex-wrap">
									<div class="flex-auto w-1/2">
										<h2 class="card-title">{selectedCustomer?.name}</h2>
										<p>{selectedCustomer?.address}</p>
										<p>{selectedCustomer?.postcode} {selectedCustomer?.city}</p>
										<p>{selectedCustomer?.country}</p>
									</div>
									<div class="flex-auto w-1/2 pl-6">
										<p class="mt-2">IČO: {selectedCustomer?.ico}</p>
										<p>DIČ: {selectedCustomer?.dic}</p>
										{#if selectedCustomer?.ic_dph}
											<p>IČ DPH: {selectedCustomer?.ic_dph}</p>
										{:else}
											<p>Nie je platiteľ DPH</p>
										{/if}
									</div>
								</div>
							</div>
						</div>
					{/if}
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
					</div>
				</div>
				<div class="flex-auto w-1/4 px-3">
					<label for="due_day" class="label font-medium pb-1">
						<span class="label-text">Splatnosť (dni)</span>
					</label>
					<select
						name="due_day"
						id="due_day"
						class="select select-bordered w-full"
						bind:value={paymentDay}
					>
						<option disabled selected>Select</option>
						{#each days as day}
							<option value={day}>{day}</option>
						{/each}
					</select>
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input
						type="date"
						readonly
						id="date_payment"
						label="Dátum splatnosti"
						value={paymentDate}
					/>
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input
						type="text"
						id="variable_symbol"
						label="Variabilný symbol"
						value={variableSymbol}
					/>
				</div>
			</div>
			<div class="divider" />
			<input type="hidden" name="items" bind:value={items} />
			{#each itemInputs as item, i}
				<div class="flex flex-row w-full flex-wrap justify-start">
					<div class="flex-initial w-5/12 px-3">
						<div class="form-control w-full mb-2">
							<label for="title-{i}" class="label font-medium pb-1">
								<span class="label-text">Názov položky</span>
							</label>
							<input
								class="input input-bordered w-full"
								type="text"
								id="title-{i}"
								name="title-{i}"
								bind:value={item.title}
							/>
						</div>
					</div>
					<div class="flex-initial w-2/12 px-3">
						<div class="form-control w-full mb-2">
							<label for="count-{i}" class="label font-medium pb-1">
								<span class="label-text">Počet</span>
							</label>
							<input
								class="input input-bordered w-full"
								type="number"
								id="count-{i}"
								name="count-{i}"
								bind:value={item.count}
								step="0.01"
								min="0"
								on:input={(e) => countPrice(i)}
							/>
						</div>
					</div>
					<div class="flex-initial w-2/12 px-3">
						<div class="form-control w-full mb-2">
							<label for="per_price-{i}" class="label font-medium pb-1">
								<span class="label-text">Jedn.cena</span>
							</label>
							<input
								class="input input-bordered w-full"
								type="number"
								id="per_price-{i}"
								name="per_price-{i}"
								bind:value={item.per_price}
								step="0.01"
								min="0"
								on:input={(e) => countPrice(i)}
							/>
						</div>
					</div>
					<div class="flex-initial w-2/12 px-3">
						<div class="form-control w-full mb-2">
							<label for="price-{i}" class="label font-medium pb-1">
								<span class="label-text">Cena spolu (€)</span>
							</label>
							<input
								class="input input-bordered w-full"
								type="number"
								id="price-{i}"
								name="price-{i}"
								step="0.01"
								readonly
								bind:value={item.price}
							/>
						</div>
					</div>
					<div class="flex-initial w-1/12 flex items-end px-3">
						{#if i !== 0}
							<button
								type="button"
								id="trash-{i}"
								class="btn btn-error mb-2"
								on:click={() => removeItem(i)}
							>
								<Icon src={Trash} class="w-5 h-5 text-white" />
							</button>
						{/if}
					</div>
				</div>
			{/each}
			<div class="flex flex-row w-full flex-wrap justify-start">
				<div class="flex-auto flex items-end justify-center px-3 w-full">
					<button type="button" class="btn btn-success mb-2" on:click={addItem}>
						<Icon src={Plus} class="w-5 h-5 text-white" />
					</button>
				</div>
			</div>
			<div class="divider" />
			<div class="flex flex-row w-full justify-end flex-wrap pb-10">
				<input type="hidden" name="total_price" bind:value={totalPrice} />
				<h3 class="text-3xl font-bold mr-5">Total Price: {totalPrice} €</h3>
			</div>
			<div class="flex flex-row w-full justify-end flex-wrap pb-16">
				<div>
					<button type="submit" class="btn btn-primary w-full max-w-lg">Update</button>
				</div>
			</div>
		</form>
	</div>
</div>

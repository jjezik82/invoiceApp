<script>
	import { Icon, Trash, Plus } from 'svelte-hero-icons';
	export let itemInputs = [{ title: '', count: 0, per_price: 0, price: 0 }];
	export let totalPrice = 0;
	let finalItems;
	export let errors;

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
		if (itemInputs[i].price > 0) {
			removeError(i, 'price');
		}
		totalPrice = itemInputs.reduce(function (a, b) {
			return a + b['price'];
		}, 0);
	}

	function removeError(i, title) {
		if (errors) {
			errors[`items[${i}].${title}`] = null;
		}
	}

	$: finalItems = JSON.stringify(itemInputs);
</script>

<div class="divider" />
<input type="hidden" name="items" bind:value={finalItems} />
{#each itemInputs as item, i}
	<div class="flex flex-row w-full flex-wrap justify-start">
		<div class="flex-initial w-5/12 px-3">
			<div class="form-control w-full mb-2">
				<label for="title-{i}" class="label font-medium pb-1">
					<span class="label-text">Názov položky</span>
				</label>
				<input
					class={`input input-bordered w-full ${errors?.[`items[${i}].title`] && 'input-error'}`}
					type="text"
					id="title-{i}"
					name="title-{i}"
					bind:value={item.title}
					on:input={(e) => {
						removeError(i, 'title');
					}}
				/>
				{#if errors?.[`items[${i}].title`]}
					<label for="title-{i}" class="label py-0 pt-1">
						<span class="label-text-alt text-error">
							{errors?.[`items[${i}].title`]}
						</span>
					</label>
				{/if}
			</div>
		</div>
		<div class="flex-initial w-2/12 px-3">
			<div class="form-control w-full mb-2">
				<label for="count-{i}" class="label font-medium pb-1">
					<span class="label-text">Počet</span>
				</label>
				<input
					class={`input input-bordered w-full ${errors?.[`items[${i}].count`] && 'input-error'}`}
					type="number"
					id="count-{i}"
					name="count-{i}"
					bind:value={item.count}
					step="0.01"
					min="0"
					on:input={(e) => {
						countPrice(i);
						removeError(i, 'count');
					}}
				/>
				{#if errors?.[`items[${i}].count`]}
					<label for="count-{i}" class="label py-0 pt-1">
						<span class="label-text-alt text-error">
							{errors?.[`items[${i}].count`]}
						</span>
					</label>
				{/if}
			</div>
		</div>
		<div class="flex-initial w-2/12 px-3">
			<div class="form-control w-full mb-2">
				<label for="per_price-{i}" class="label font-medium pb-1">
					<span class="label-text">Jedn.cena</span>
				</label>
				<input
					class={`input input-bordered w-full ${
						errors?.[`items[${i}].per_price`] && 'input-error'
					}`}
					type="number"
					id="per_price-{i}"
					name="per_price-{i}"
					bind:value={item.per_price}
					step="0.01"
					min="0"
					on:input={(e) => {
						countPrice(i);
						removeError(i, 'per_price');
					}}
				/>
				{#if errors?.[`items[${i}].per_price`]}
					<label for="per_price-{i}" class="label py-0 pt-1">
						<span class="label-text-alt text-error">
							{errors?.[`items[${i}].per_price`]}
						</span>
					</label>
				{/if}
			</div>
		</div>
		<div class="flex-initial w-2/12 px-3">
			<div class="form-control w-full mb-2">
				<label for="price-{i}" class="label font-medium pb-1">
					<span class="label-text">Cena spolu (€)</span>
				</label>
				<input
					class={`input input-bordered w-full ${errors?.[`items[${i}].price`] && 'input-error'}`}
					type="number"
					id="price-{i}"
					name="price-{i}"
					step="0.01"
					readonly
					bind:value={item.price}
				/>
				{#if errors?.[`items[${i}].price`]}
					<label for="price-{i}" class="label py-0 pt-1">
						<span class="label-text-alt text-error">
							{errors?.[`items[${i}].price`]}
						</span>
					</label>
				{/if}
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
	<h3 class="text-3xl font-bold mr-5">Cena spolu: {totalPrice} €</h3>
</div>

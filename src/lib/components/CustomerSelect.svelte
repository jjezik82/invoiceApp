<script>
	export let error;
	export let value;
	export let customers;
</script>

<div class="w-full">
	<p class="text-2xl font-bold inline mr-3">Zákazník:</p>
	<select
		name="customerId"
		class={`select select-bordered w-full max-w-xs select-sm ${error && 'select-error'}`}
		bind:value
		on:change={() => {
			error = undefined;
		}}
	>
		<option disabled selected>Select</option>
		{#each customers as customer}
			<option value={customer.id}>{customer.name}</option>
		{/each}
	</select>
	{#if error}
		<label for="customerId" class="label py-0 pt-1">
			<span class="label-text-alt text-error ml-[125px]">
				{error}
			</span>
		</label>
	{/if}
</div>

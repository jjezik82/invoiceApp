<script>
	export let value;
	export let id;
	export let label;
	export let options;
	export let error;
</script>

<div class="form-control w-full max-w-lg mb-2">
	<label for="due_day" class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>
	<select
		name={id}
		{id}
		class={`select select-bordered w-full ${error && 'select-error'}`}
		bind:value
	>
		<option disabled selected>Vybrať</option>
		{#each options as option}
			<option value={option.value}>{option.title}</option>
		{/each}
	</select>
	{#if error}
		<label for="customerId" class="label py-0 pt-1">
			<span class="label-text-alt text-error">
				{error}
			</span>
		</label>
	{/if}
</div>

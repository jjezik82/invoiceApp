<script>
	export let value = '';
	export let placeholder = '';
	export let id;
	export let label;
	export let type = 'text';
	export let readonly = null;
	export let step = null;
	export let disabled = null;
	export let required = null;

	export let error;
</script>

<div class="form-control w-full max-w-lg mb-2">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>
	<input
		class={`input input-bordered w-full max-w-lg ${error && 'input-error'}`}
		{type}
		{placeholder}
		{required}
		{disabled}
		{id}
		name={id}
		{value}
		{step}
		{readonly}
		on:keydown={() => {
			error = undefined;
		}}
	/>
	{#if error}
		<label for={id} class="label py-0 pt-1">
			<span class="label-text-alt text-error">
				{error}
			</span>
		</label>
	{/if}
</div>

<script>
	import Portal from 'svelte-portal';
	export let label;
	export let checked;
</script>

<label for={label}>
	<slot name="trigger" />
</label>

<Portal target="#modals">
	<input type="checkbox" id={label} class="modal-toggle" {checked} />
	<label for={label} class="modal modal-bottom sm:modal-middle">
		<labe for="" class="modal-box">
			<div class="font-bold text-xl text-center break-all">
				<slot name="heading" />
			</div>
			<div class="my-2">
				<slot />
			</div>
			<div class="modal-action justify-center">
				<slot name="actions" />
			</div>
		</labe>
	</label>
</Portal>

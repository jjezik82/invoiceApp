<script>
	export let selectedCustomer;
</script>

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

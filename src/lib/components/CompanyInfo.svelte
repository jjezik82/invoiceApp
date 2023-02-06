<script>
	export let company;
</script>

<div class="flex-auto w-1/2 px-3">
	<div class="card max-w-lg bg-base-100 shadow-xl">
		<div class="card-body">
			<div class="flex flex-row w-full flex-wrap">
				<div class="flex-auto w-full">
					<h2 class="card-title text-2xl">Firemné údaje:</h2>
				</div>
				<div class="flex-auto w-1/2">
					<p class="text-xl font-bold mt-2">{company.name}</p>
					<p>{company.address}</p>
					<p>{company.postcode} {company.city}</p>
					<p>{company.country}</p>
					<p class="mt-2">Telefón: {company.phone}</p>
					<p>Email: {company.email}</p>
					<p>Vystavil: {company.person}</p>
				</div>
				<div class="flex-auto w-1/2 pl-6">
					<p class="mt-8">IČO: {company.ico}</p>
					<p>DIČ: {company.dic}</p>
					{#if company.ic_dph}
						<p>IČ DPH: {company.ic_dph}</p>
					{:else}
						<p>Nie je platiteľ DPH</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

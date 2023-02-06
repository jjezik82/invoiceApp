<script>
	import { enhance } from '$app/forms';
	import { invalidateAll, goto } from '$app/navigation';
	import { Input } from '$lib/components';
	import { activePageStore } from '$lib/store';
	import toast from 'svelte-french-toast';

	export let form;

	activePageStore.update(() => {
		return 'customers';
	});

	let loading = false;

	const submitCreateCompany = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					toast.success('Nový zákazník bol úspešne pridaný.');
					goto('/my/customers');
					break;
				case 'error':
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full px-16">
	<div class="w-full">
		<form
			action="?/create"
			method="post"
			class="flex flex-col space-y-2 w-full items-center"
			novalidate
			use:enhance={submitCreateCompany}
		>
			<div class="flex flex-row w-full flex-wrap justify-center pt-10 relative">
				<h3 class="text-3xl font-bold">Vytvoriť nového zákazníka</h3>
				<div class="pt-3 absolute right-0 bottom-0">
					<button type="submit" class="btn btn-primary w-full max-w-lg">Vytvoriť</button>
				</div>
			</div>
			<div class="flex flex-row w-full flex-wrap justify-start pt-10">
				<div class="flex-auto w-1/3 px-3">
					<Input id="name" label="Názov firmy" error={form?.errors?.name} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="email" label="Email" error={form?.errors?.email} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="address" label="Adresa" error={form?.errors?.address} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="postcode" label="PSČ" error={form?.errors?.postcode} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="city" label="Mesto" error={form?.errors?.city} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="country" label="Krajina" error={form?.errors?.country} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="ico" label="IČO" error={form?.errors?.ico} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="dic" label="DIČ" error={form?.errors?.dic} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="ic_dph" label="IČ DPH" />
				</div>
			</div>
		</form>
	</div>
</div>

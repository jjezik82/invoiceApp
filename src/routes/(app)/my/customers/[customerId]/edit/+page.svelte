<script>
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll, goto } from '$app/navigation';
	import { Input } from '$lib/components';
	import { activePageStore } from '$lib/store';
	import toast from 'svelte-french-toast';
	export let data;
	export let form;

	activePageStore.update(() => {
		return 'customers';
	});

	let loading;

	$: loading = false;

	const submitUpdateCustomer = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					toast.success('Údaje zákazníka boli úspešne uložené.');
					goto('/my/customers');
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
		<form
			action="?/update"
			method="post"
			class="flex flex-col space-y-2 w-full items-center"
			use:enhance={submitUpdateCustomer}
		>
			<div class="flex flex-row w-full flex-wrap justify-center pt-10 relative">
				<h3 class="text-3xl font-bold">Upraviť firmu: {data?.customer?.name}</h3>
				<div class="pt-3 absolute right-0 bottom-0">
					<button type="submit" class="btn btn-primary w-full max-w-lg">Upraviť</button>
				</div>
			</div>
			<div class="flex flex-row w-full flex-wrap justify-start pt-10">
				<div class="flex-auto w-1/3 px-3">
					<Input
						id="name"
						label="Názov firmy"
						error={form?.errors?.name}
						value={form?.data?.name ?? data?.customer?.name}
					/>
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input
						id="email"
						label="Email"
						error={form?.errors?.email}
						value={form?.data?.email ?? data?.customer?.email}
					/>
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input
						id="address"
						label="Adresa"
						error={form?.errors?.address}
						value={form?.data?.address ?? data?.customer?.address}
					/>
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input
						id="postcode"
						label="PSČ"
						error={form?.errors?.postcode}
						value={form?.data?.postcode ?? data?.customer?.postcode}
					/>
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="city" label="Mesto" error={form?.errors?.city} value={data?.customer?.city} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input
						id="country"
						label="Krajina"
						error={form?.errors?.country}
						value={form?.data?.country ?? data?.customer?.country}
					/>
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input
						id="ico"
						label="IČO"
						error={form?.errors?.ico}
						value={form?.data?.ico ?? data?.customer?.ico}
					/>
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input
						id="dic"
						label="DIČ"
						error={form?.errors?.dic}
						value={form?.data?.dic ?? data?.customer?.dic}
					/>
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="ic_dph" label="IČ DPH" value={form?.data?.ic_dph ?? data?.customer?.ic_dph} />
				</div>
			</div>
		</form>
	</div>
</div>

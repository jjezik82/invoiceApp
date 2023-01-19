<script>
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input } from '$lib/components';
	export let data;
	let loading;

	$: loading = false;

	const submitUpdateCustomer = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
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
				<h3 class="text-3xl font-bold">Update {data?.customer?.name}</h3>
				<div class="pt-3 absolute right-0 bottom-0">
					<button type="submit" class="btn btn-primary w-full max-w-lg">Update</button>
				</div>
			</div>
			<div class="flex flex-row w-full flex-wrap justify-start pt-10">
				<div class="flex-auto w-1/3 px-3">
					<Input id="name" label="Company name" value={data?.customer?.name} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="email" label="Email" value={data?.customer?.email} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="address" label="Address" value={data?.customer?.address} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="postcode" label="Postcode" value={data?.customer?.postcode} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="city" label="City" value={data?.customer?.city} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="country" label="Country" value={data?.customer?.country} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="ico" label="IČO" value={data?.customer?.ico} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="dic" label="DIČ" value={data?.customer?.dic} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="ic_dph" label="IČ DPH" value={data?.customer?.ic_dph} />
				</div>
			</div>
		</form>
	</div>
</div>

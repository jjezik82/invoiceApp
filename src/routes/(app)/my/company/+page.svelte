<script>
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	import { activePageStore } from '$lib/store';
	import toast from 'svelte-french-toast';
	export let data;
	export let form;

	activePageStore.update(() => {
		return 'company';
	});

	let loading = false;

	const submitUpdateCompany = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					toast.success('Firemné údaje boli úspešne uložené.');
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};

	const showPreview = (event) => {
		const target = event.target;
		const files = target.files;
		form.errors.signature = undefined;

		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('signature-preview');
			preview.src = src;
		}
	};
</script>

<div class="flex flex-col w-full h-full px-16">
	<div class="w-full">
		<form
			action="?/update"
			method="post"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			novalidate
			use:enhance={submitUpdateCompany}
		>
			<div class="flex flex-row w-full flex-wrap justify-center pt-10 relative">
				<h3 class="text-3xl font-bold">Vaše firemné údaje</h3>
				<div class="pt-3 absolute right-0 bottom-0">
					<button type="submit" class="btn btn-primary w-full max-w-lg">Upraviť</button>
				</div>
			</div>
			<input name="companyId" value={data?.company?.id} hidden />
			<div class="flex flex-row w-full flex-wrap justify-start pt-10">
				<div class="flex-auto w-1/4 px-3">
					<Input
						id="name"
						label="Meno firmy"
						value={form?.data?.name ?? data?.company?.name}
						error={form?.errors?.name}
					/>
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input
						id="email"
						label="Email"
						value={form?.data?.email ?? data?.company?.email}
						error={form?.errors?.email}
					/>
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input
						id="person"
						label="Zodpovedná osoba"
						value={form?.data?.person ?? data?.company?.person}
						error={form?.errors?.person}
					/>
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input
						id="phone"
						label="Telefón"
						value={form?.data?.phone ?? data?.company?.phone}
						error={form?.errors?.phone}
					/>
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input
						id="address"
						label="Adresa"
						value={form?.data?.address ?? data?.company?.address}
						error={form?.errors?.address}
					/>
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input
						id="postcode"
						label="PSČ"
						value={form?.data?.postcode ?? data?.company?.postcode}
						error={form?.errors?.postcode}
					/>
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input
						id="city"
						label="Mesto"
						value={form?.data?.city ?? data?.company?.city}
						error={form?.errors?.city}
					/>
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input
						id="country"
						label="Krajina"
						value={form?.data?.country ?? data?.company?.country}
						error={form?.errors?.country}
					/>
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input
						id="ico"
						label="IČO"
						value={form?.data?.ico ?? data?.company?.ico}
						error={form?.errors?.ico}
					/>
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input
						id="dic"
						label="DIČ"
						value={form?.data?.dic ?? data?.company?.dic}
						error={form?.errors?.dic}
					/>
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input
						id="ic_dph"
						label="IČ DPH"
						value={form?.data?.ic_dph ?? data?.company?.ic_dph}
						error={form?.errors?.ic_dph}
					/>
				</div>

				<div class="flex-initial w-1/3 px-3">
					<Input
						id="iban"
						label="IBAN"
						value={form?.data?.iban ?? data?.company?.iban}
						error={form?.errors?.iban}
					/>
				</div>
				<div class="flex-initial w-1/3 px-3">
					<Input
						id="swift"
						label="SWIFT"
						value={form?.data?.swift ?? data?.company?.swift}
						error={form?.errors?.swift}
					/>
				</div>
				<div class="flex-initial w-1/3 px-3">
					<div class="form-control w-full max-w-lg">
						<label for="signature" class="label font-medium pb-1">
							<span class="label-text">Podpis</span>
						</label>
						<input
							type="file"
							name="signature"
							id="signature"
							class={`file-input file-input-bordered w-full max-w-lg ${
								form?.errors?.signature && 'input-error'
							}`}
							accept="image/*"
							on:change={showPreview}
						/>
						<input
							type="checkbox"
							name="check_signature"
							hidden
							checked={data?.company?.signature ? false : true}
						/>
						<label for="signature" class="label py-0 pt-1">
							<span class="label-text-alt text-error">
								{form?.errors?.signature === undefined ? '' : form?.errors?.signature}
							</span>
						</label>
						<label for="signature" class="avatar w-full h-40 hover:cursor-pointer mt-3">
							<div class="w-full h-40 rounded border">
								<img
									src={data?.company?.signature
										? getImageURL(
												data?.company?.collectionId,
												data?.company?.id,
												data?.company?.signature,
												'100x80'
										  )
										: 'https://via.placeholder.com/500x300?text=Váš+Podpis'}
									alt="company-logo"
									id="signature-preview"
								/>
							</div>
						</label>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>

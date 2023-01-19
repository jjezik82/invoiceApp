<script>
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	export let data;
	let loading;

	$: loading = false;

	const showPreview = (event) => {
		const target = event.target;
		const files = target.files;

		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('signature-preview');
			preview.src = src;
		}
	};

	const submitUpdateCompany = () => {
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
			enctype="multipart/form-data"
			use:enhance={submitUpdateCompany}
		>
			<div class="flex flex-row w-full flex-wrap justify-center pt-10 relative">
				<h3 class="text-3xl font-bold">Update your company details</h3>
				<div class="pt-3 absolute right-0 bottom-0">
					<button type="submit" class="btn btn-primary w-full max-w-lg">Update Company</button>
				</div>
			</div>
			<input name="companyId" value={data?.company?.id} hidden />
			<div class="flex flex-row w-full flex-wrap justify-start pt-10">
				<div class="flex-auto w-1/4 px-3">
					<Input id="name" label="Company name" value={data?.company?.name} />
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input id="email" label="Email" value={data?.company?.email} />
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input id="person" label="Person" value={data?.company?.person} />
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input id="phone" label="Phone" value={data?.company?.phone} />
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input id="address" label="Address" value={data?.company?.address} />
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input id="postcode" label="Postcode" value={data?.company?.postcode} />
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input id="city" label="City" value={data?.company?.city} />
				</div>
				<div class="flex-auto w-1/4 px-3">
					<Input id="country" label="Country" value={data?.company?.country} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="ico" label="IČO" value={data?.company?.ico} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="dic" label="DIČ" value={data?.company?.dic} />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="ic_dph" label="IČ DPH" value={data?.company?.ic_dph} />
				</div>

				<div class="flex-initial w-1/3 px-3">
					<Input id="iban" label="IBAN" value={data?.company?.iban} />
				</div>
				<div class="flex-initial w-1/3 px-3">
					<Input id="swift" label="SWIFT" value={data?.company?.swift} />
				</div>
				<div class="flex-initial w-1/3 px-3">
					<div class="form-control w-full max-w-lg">
						<label for="signature" class="label font-medium pb-1">
							<span class="label-text">Signature</span>
						</label>
						<input
							type="file"
							name="signature"
							id="signature"
							class="file-input file-input-bordered w-full max-w-lg"
							accept="image/*"
							on:change={showPreview}
						/>
						<label for="signature" class="avatar w-full h-40 hover:cursor-pointer mt-3">
							<div class="w-full h-40 rounded border">
								<img
									src={data.company.signature
										? getImageURL(
												data?.company?.collectionId,
												data?.company?.id,
												data?.company?.signature,
												'100x80'
										  )
										: 'https://via.placeholder.com/500x300?text=Your+Signature'}
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

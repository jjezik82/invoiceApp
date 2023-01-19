<script>
	import { Input } from '$lib/components';
</script>

<div class="flex flex-col w-full h-full px-16">
	<div class="w-full">
		<form action="?/create" method="post" class="flex flex-col space-y-2 w-full items-center">
			<div class="flex flex-row w-full flex-wrap justify-center pt-10 relative">
				<h3 class="text-3xl font-bold">Create a new customer</h3>
				<div class="pt-3 absolute right-0 bottom-0">
					<button type="submit" class="btn btn-primary w-full max-w-lg">Create</button>
				</div>
			</div>
			<div class="flex flex-row w-full flex-wrap justify-start pt-10">
				<div class="flex-auto w-1/3 px-3">
					<Input id="name" label="Company name" />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="email" label="Email" />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="address" label="Address" />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="postcode" label="Postcode" />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="city" label="City" />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="country" label="Country" />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="ico" label="IČO" />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="dic" label="DIČ" />
				</div>
				<div class="flex-auto w-1/3 px-3">
					<Input id="ic_dph" label="IČ DPH" />
				</div>
			</div>
		</form>
	</div>
</div>

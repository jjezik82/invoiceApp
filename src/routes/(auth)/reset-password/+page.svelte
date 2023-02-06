<script>
	import { enhance, applyAction } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Input } from '$lib/components';
	import toast from 'svelte-french-toast';
	export let form;
	let loading;
	$: loading = false;

	const submitReset = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Odoslali sme Vám email pre obnovu hesla', {
						duration: 6000
					});
					goto('/login');
					break;
				case 'error':
					toast.error(result.error.message, { duration: 6000 });
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<div class="hero-content flex-col lg:flex-row-reverse">
	<div class="text-center lg:text-left">
		<h1 class="text-5xl font-bold text-white">Obnovte si svoje heslo</h1>
		<p class="py-6 text-white">Pošleme vám email s linkom na obnovu hesla.</p>
	</div>
	<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
		<div class="card-body">
			<form
				action="?/resetPassword"
				method="post"
				class="flex flex-col items-center space-y-2 w-full pt-4"
				novalidate
				use:enhance={submitReset}
			>
				<Input
					type="email"
					id="email"
					label="Email"
					value={form?.data?.email ?? ''}
					error={form?.errors?.email}
				/>
				<div class="w-full max-w-lg pt-2">
					<button type="submit" class="btn btn-primary w-full">Požiadať o obnovu hesla</button>
				</div>
			</form>
		</div>
	</div>
</div>

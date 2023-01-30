<script>
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input } from '$lib/components';
	import toast from 'svelte-french-toast';

	export let form;
	let loading;
	$: loading = false;

	const submitLogin = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				case 'failure':
					toast.error(result.data.loginError, { duration: 6000 });
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col items-center h-full w-full mt-32">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Prihláste sa do svojho účtu.
	</h2>
	<p class="text-center mt-1">
		Alebo sa{' '}
		<a href="/register" class="text-primary font-medium hover:cursor-pointer hover:underline">
			registrujte
		</a>{' '}
		ak ešte nemáte vytvorený účet.
	</p>
	<form
		action="?/login"
		method="post"
		class="flex flex-col items-center space-y-2 w-full pt-4"
		novalidate
		use:enhance={submitLogin}
	>
		<Input
			type="email"
			id="email"
			label="Email"
			value={form?.data?.email ?? ''}
			error={form?.errors?.email}
		/>
		<Input type="password" id="password" label="Heslo" error={form?.errors?.password} />
		<div class="w-full max-w-lg">
			<a
				href="/reset-password"
				class="font-medium text-primary hover:cursor-pointer hover:underline">Zabudnuté heslo?</a
			>
		</div>
		<div class="w-full max-w-lg pt-2">
			<button type="submit" class="btn btn-primary w-full">Prihlásiť sa</button>
		</div>
		{#if form?.notVerified}
			<div class="alert alert-error shadow-lg w-full max-w-lg">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>Musíte si overiť svoj účet pred tým ako sa môžete prihlásiť.</span>
				</div>
			</div>
		{/if}
	</form>
</div>

<script>
	import { Input } from '$lib/components';
	export let form;
</script>

<div class="flex flex-col items-center h-full w-full mt-32">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Zaregistrujte si nový účet
	</h2>
	<p class="text-center mt-1">
		Alebo sa{' '}
		<a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline">
			prihláste
		</a>{' '}
		ak už máte účet vytvorený.
	</p>
	<form
		action="?/register"
		method="post"
		class="flex flex-col items-center space-y-2 w-full pt-4"
		novalidate
	>
		<Input
			type="text"
			id="name"
			label="Meno"
			value={form?.data?.name ?? ''}
			error={form?.errors?.name}
		/>
		<Input
			type="email"
			id="email"
			label="Email"
			value={form?.data?.email ?? ''}
			error={form?.errors?.email}
		/>
		<Input type="password" id="password" label="Heslo" error={form?.errors?.password} />
		<Input
			type="password"
			id="passwordConfirm"
			label="Overiť heslo"
			error={form?.errors?.passwordConfirm}
		/>
		<div class="w-full max-w-lg pt-2">
			<button type="submit" class="btn btn-primary w-full">Registrovať</button>
		</div>
	</form>
</div>

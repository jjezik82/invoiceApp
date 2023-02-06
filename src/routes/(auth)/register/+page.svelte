<script>
	import { Input } from '$lib/components';
	import { enhance } from '$app/forms';

	export let form;
</script>

<div class="hero-content flex-col lg:flex-row-reverse">
	<div class="text-center lg:text-left">
		<h1 class="text-5xl font-bold text-white">Zaregistrujte si nový účet</h1>
		<p class="py-6 text-white">
			alebo sa{' '}
			<a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline">
				prihláste
			</a>{' '}
			ak už máte účet vytvorený.
		</p>
	</div>
	<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
		<div class="card-body">
			<form
				action="?/register"
				method="post"
				class="flex flex-col items-center space-y-2 w-full pt-4"
				novalidate
				use:enhance
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
	</div>
</div>

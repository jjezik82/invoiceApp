<script>
	import { activePageStore } from '$lib/store';

	activePageStore.update(() => {
		return 'home';
	});
</script>

<div
	class="hero h-full relative"
	style="background: rgb(102,204,138);
background: linear-gradient(121deg, rgba(102,204,138,1) 0%, rgba(34,34,34,1) 42%);"
>
	<img class="max-h-40 absolute bottom-32 right-32" src="/fakturista.png" alt="logo" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md">
			<h1 class="mb-5 text-2xl font-bold">Vitajte v aplikácií</h1>
			<h1 class="mb-5 text-5xl font-bold">FAKTURISTA</h1>
			<p class="mb-5">V tejto aplikácií si môžete vytvárať jednoduché faktúry.</p>
			<a href="/my/company" class="btn btn-primary">Začnite tu</a>
		</div>
	</div>
</div>

<script>
	import { page } from '$app/stores';
	import { activePageStore } from '$lib/store';

	activePageStore.update(() => {
		return 'settings';
	});
	const navigation = [
		{
			title: 'Profil',
			href: '/my/settings/profile'
		},
		{
			title: 'Heslá',
			href: '/my/settings/security'
		}
	];
</script>

<div class="w-full px-2 pt-5">
	<h3 class="text-2xl font-medium">Nastavenia</h3>
	<div class="divider" />
</div>
<div class="flex w-full h-full space-x-4">
	<ul class="menu bg-base-100 w-56 p-2 rounded-box">
		{#each navigation as navItem}
			<li>
				<a
					href={navItem.href}
					class="font-medium {$page.url.pathname === navItem.href ? 'active' : ''}"
					>{navItem.title}</a
				>
			</li>
		{/each}
	</ul>
	<div class="w-full">
		<slot />
	</div>
</div>

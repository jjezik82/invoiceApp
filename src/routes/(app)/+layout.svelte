<script>
	import { getImageURL } from '$lib/utils';
	import { page } from '$app/stores';
	import '../../app.postcss';
	import { Toaster } from 'svelte-french-toast';
	import { activePageStore } from '$lib/store';

	let activePage;
	activePageStore.subscribe((data) => {
		activePage = data;
	});

	export let data;

	const navigation = [
		{
			title: 'Domov',
			href: '/',
			id: 'home'
		},
		{
			title: 'Firemné údaje',
			href: '/my/company',
			id: 'company'
		},
		{
			title: 'Zákazníci',
			href: '/my/customers',
			id: 'customers'
		},
		{
			title: 'Faktúry',
			href: '/my/invoices',
			id: 'invoices'
		},
		{
			title: 'Nastavenia',
			href: '/my/settings',
			id: 'settings'
		}
	];
</script>

<Toaster />
<div class="min-h-full">
	<nav class="navbar bg-base-100 border-b">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">
				<img class="max-h-12" src="/fakturista.png" alt="logo" />
				<h2 class="text-2xl">FAKTURISTA</h2>
			</a>
		</div>
		<div class="flex-none">
			{#if !data.user}
				<div class="dropdown dropdown-end">
					<a href="/login" class="btn btn-primary">Login</a>
					<a href="/register" class="btn btn-secondary">Register</a>
				</div>
			{:else}
				<div class="dropdown dropdown-end">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn-btn-ghost btn-circle avatar">
						<div class="rounded-full">
							<img
								src={data.user?.avatar
									? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
									: `https://ui-avatars.com/api/?name={data.user?.name}`}
								alt="user avatar"
							/>
						</div>
					</label>
					<ul
						class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						{#each navigation as navItem}
							<li>
								<a href={navItem.href} class="justify-between">{navItem.title}</a>
							</li>
						{/each}
						<li>
							<form action="/logout" method="post">
								<button type="submit" class="w-full text-start">Odhlásiť sa</button>
							</form>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</nav>

	<div class="drawer drawer-mobile app-height">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content flex flex-col items-center justify-start">
			<slot />
			<label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
		</div>
		<div class="drawer-side border-r">
			<label for="my-drawer-2" class="drawer-overlay" />
			<ul class="menu p-4 w-80 bg-base-100 text-base-content">
				<!-- Sidebar content here -->
				{#each navigation as navItem}
					<li>
						<a href={navItem.href} class="font-medium {activePage === navItem.id ? 'active' : ''}"
							>{navItem.title}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
<footer class="footer footer-center p-4 bg-gray-600 text-white">
	<div>
		<p>Copyright © 2023 - All right reserved by Fakturista</p>
	</div>
</footer>
<div id="modals" />

<style>
	.app-height {
		max-height: calc(100vh - 123px);
	}
</style>

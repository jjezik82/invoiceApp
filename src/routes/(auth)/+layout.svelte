<script>
	import '../../app.postcss';
	import { Toaster } from 'svelte-french-toast';
</script>

<Toaster />
<div class="min-h-full">
	<div
		class="hero min-h-screen bg-black relative"
		style="background: rgb(102,204,138);
background: linear-gradient(121deg, rgba(102,204,138,1) 0%, rgba(34,34,34,1) 42%);"
	>
		<img class="max-h-40 absolute bottom-32 right-32" src="/fakturista.png" alt="logo" />
		<slot />
	</div>
</div>

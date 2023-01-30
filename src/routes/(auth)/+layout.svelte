<script>
	import '../../app.postcss';
	import { Toaster } from 'svelte-french-toast';
</script>

<Toaster />
<div class="min-h-full">
	<slot />
</div>

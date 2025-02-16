<script>
	import { useProviders } from '$lib/use-providers';
	import '../app.css';

	let { children } = $props();

	useProviders();
</script>

{@render children()}

<nav class="flex gap-3 justify-center mt-5">
	<a href="/">Home</a>
	<a href="/about">About</a>
</nav>

<script>
	import { usePlugins } from '$lib/use-plugins';
	import '../app.css';

	let { children } = $props();

	usePlugins();
</script>

{@render children()}

<nav class="flex gap-3 justify-center mt-5">
	<a href="/">Home</a>
	<a href="/about">About</a>
</nav>

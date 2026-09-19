<script lang="ts">
	import { page } from '$app/state';
</script>

<main class="flex flex-col items-center gap-3 p-5 text-center">
	<h1 class="text-3xl font-semibold">{page.status === 404 ? 'Page not found' : 'Something went wrong'}</h1>
	<p>{page.error?.message}</p>
	<a href="/" class="text-blue-600 underline">Go home</a>
</main>

<script lang="ts">
	import Todos from '@components/todos.svelte';
	import Profile from '@components/profile.svelte';
	import { loginWithGoogle, logout, setUser } from '$lib/auth.svelte';

	const user = setUser();

	const title = 'SvelteKit Firebase Todo App';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1 class="my-3 text-3xl font-semibold text-center">
	{title}
</h1>

<section class="flex flex-col items-center gap-3 p-5">
	{#if user.value.data}
		<Profile />
		<button
			class="p-3 font-semibold text-white bg-blue-600 border rounded-lg w-fit"
			onclick={logout}
		>
			Logout
		</button>
		<hr />
		<Todos />
	{:else if user.value.loading}
		<p>Loading...</p>
	{:else}
		<button class="p-2 font-semibold text-white bg-red-600" onclick={loginWithGoogle}>
			Signin with Google
		</button>
	{/if}
</section>

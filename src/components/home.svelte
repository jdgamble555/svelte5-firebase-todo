<script lang="ts">
	import Todos from '@components/todos.svelte';
	import Profile from '@components/profile.svelte';
	import { loginWithGoogle, logout, setUser } from '$lib/auth.svelte';

	const user = setUser();
	let actionError = $state<string | null>(null);

	async function signIn() {
		const result = await loginWithGoogle();
		actionError = result.error;
	}

	async function signOut() {
		const result = await logout();
		actionError = result.error;
	}

	const title = 'SvelteKit Firebase Todo App';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1 class="my-3 text-3xl font-semibold text-center">
	{title}
</h1>

<section class="flex flex-col items-center gap-3 p-5">
	{#if actionError}
		<p role="alert" class="text-red-600">{actionError}</p>
	{/if}
	{#if user.value.data}
		<Profile />
		<button
			class="p-3 font-semibold text-white bg-blue-600 border rounded-lg w-fit"
			onclick={signOut}
		>
			Logout
		</button>
		<hr />
		<Todos />
	{:else if user.value.loading}
		<p>Loading...</p>
	{:else}
		<button class="p-2 font-semibold text-white bg-red-600" onclick={signIn}>
			Signin with Google
		</button>
	{/if}
</section>

<script lang="ts">
	import { loginWithGoogle, logout } from '$lib/user.svelte';
	import Todos from '@components/todos.svelte';
	import Profile from '@components/profile.svelte';
	import { useUser } from '$lib/user.svelte';

	const user = useUser();
</script>

<h1 class="my-3 text-3xl font-semibold text-center">Svelte 5 Firebase Todo App</h1>

<section class="flex flex-col items-center gap-3 p-5">
	{#if user.value.data}
		<Profile />
		<button
			class="p-3 font-semibold text-white bg-blue-600 border rounded-lg w-fit"
			on:click={logout}
		>
			Logout
		</button>
		<hr />
		<Todos />
	{:else if user.value.loading}
		<p>Loading...</p>
	{:else if user.value.error}
		<p class="text-red-500">Error: {user.value.error}</p>
	{:else}
		<button class="p-2 font-semibold text-white bg-red-600" on:click={loginWithGoogle}>
			Signin with Google
		</button>
	{/if}
</section>

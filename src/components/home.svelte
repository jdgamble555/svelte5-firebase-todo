<script lang="ts">
	import Todos from '@components/todos.svelte';
	import Profile from '@components/profile.svelte';
	import { useAuth, useUser } from '$lib/use-user';

	const _user = useUser();
	const user = $derived(_user.value);

	const { loginWithGoogle, logout } = useAuth();
</script>

<h1 class="my-3 text-3xl font-semibold text-center">Svelte 5 Firebase Todo App</h1>

<section class="flex flex-col items-center gap-3 p-5">
	{#if user.data}
		<Profile />
		<button
			class="p-3 font-semibold text-white bg-blue-600 border rounded-lg w-fit"
			onclick={logout}
		>
			Logout
		</button>
		<hr />
		<Todos />
	{:else if user.loading}
		<p>Loading...</p>
	{:else if user.error}
		<p class="text-red-500">Error: {user.error}</p>
	{:else}
		<button class="p-2 font-semibold text-white bg-red-600" onclick={loginWithGoogle}>
			Signin with Google
		</button>
	{/if}
</section>

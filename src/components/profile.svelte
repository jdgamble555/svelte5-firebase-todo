<script lang="ts">
	import { useUser } from '$lib/user.svelte';

	const user = useUser();

	const userData = $derived(user.value.data);
</script>

{#if userData}
	<div class="flex flex-col justify-center items-center gap-3">
		<h3 class="text-2xl font-bold">Hi {userData.displayName}!</h3>

		{#if userData.photoURL}
			<img src={userData.photoURL} height="100" width="100" alt="user avatar" />
		{/if}
		<p>Your userID is {userData.uid}</p>
	</div>
{/if}

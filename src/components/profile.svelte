<script lang="ts">
	import { useUser } from '$lib/user.svelte';

	const user = useUser();
</script>

{#if user.value}
	<div class="flex flex-col justify-center items-center gap-3">
		<h3 class="text-2xl font-bold">Hi {user.value.displayName}!</h3>

		{#if user.value.photoURL}
			<img src={user.value.photoURL} height="100" width="100" alt="user avatar" />
		{/if}
		<p>Your userID is {user.value.uid}</p>
	</div>
{/if}

<script lang="ts">
	import { useUser } from '$lib/user.svelte';

	const user = useUser();
</script>

{#if user.value.data}
	<div class="flex flex-col justify-center items-center gap-3">
		<h3 class="text-2xl font-bold">Hi {user.value.data.displayName}!</h3>

		{#if user.value.data.photoURL}
			<img src={user.value.data.photoURL} height="100" width="100" alt="user avatar" />
		{/if}
		<p>Your userID is {user.value.data.uid}</p>
	</div>
{/if}

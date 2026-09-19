<script lang="ts">
	import { addTodo, generateText } from "$lib/todos.svelte";

	let text = $state(generateText());
	let trimmedText = $derived(text.trim());
	let error = $state<string | null>(null);

	async function add(e: Event) {
		e.preventDefault();
		if (!trimmedText) return;
		const result = await addTodo(trimmedText);
		error = result.error;
		if (error) return;
		text = generateText();
	}
</script>

<form onsubmit={add}>
	<input class="border p-2 rounded-lg" bind:value={text} aria-label="Task" />
	<button class="border p-2 rounded-lg bg-purple-600 text-white font-semibold" type="submit" disabled={!trimmedText}>
		Add Task
	</button>
	{#if error}<p role="alert" class="text-red-600">{error}</p>{/if}
</form>

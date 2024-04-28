<script lang="ts">
	import { addTodo, genText } from '$lib/todos.svelte';

    let text = genText();

	function add() {
		addTodo(text);
		text = genText();
	}
</script>

<form on:submit|preventDefault={add}>
	<input class="border p-2 rounded-lg" bind:value={text} />
	<button class="border p-2 rounded-lg bg-purple-600 text-white font-semibold" type="submit">
		Add Task
	</button>
</form>

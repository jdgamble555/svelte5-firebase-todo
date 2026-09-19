<script lang="ts">
	import { addTodo, generateText } from "$lib/todos.svelte";

	let text = $state(generateText());

	function add(e: Event) {
		e.preventDefault();
		addTodo(text);
		text = generateText();
	}
</script>

<form onsubmit={add}>
	<input class="border p-2 rounded-lg" bind:value={text} />
	<button class="border p-2 rounded-lg bg-purple-600 text-white font-semibold" type="submit">
		Add Task
	</button>
</form>

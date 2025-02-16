<script lang="ts">
	import { useAddTodo, useGenerateText } from '$lib/use-todos.svelte';

	const { addTodo } = useAddTodo();

	const { generateText } = useGenerateText();

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

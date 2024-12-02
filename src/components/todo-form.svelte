<script lang="ts">
	import { preventDefault } from '$lib/form-utils';
	import { useAddTodo, useGenerateText } from '$lib/use-todos.svelte';

	const { addTodo } = useAddTodo();

	const { generateText } = useGenerateText();

	let text = $state(generateText());

	function add() {
		addTodo(text);
		text = generateText();
	}
</script>

<form onsubmit={preventDefault(add)}>
	<input class="border p-2 rounded-lg" bind:value={text} />
	<button class="border p-2 rounded-lg bg-purple-600 text-white font-semibold" type="submit">
		Add Task
	</button>
</form>

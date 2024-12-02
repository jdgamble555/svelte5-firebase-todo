<script lang="ts">
	import { preventDefault } from '$lib/form-utils';
	import { useDeleteTodo, useUpdateTodo } from '$lib/use-todos.svelte';

	let { todo }: { todo: Todo } = $props();

	const { deleteTodo } = useDeleteTodo();
	const { updateTodo } = useUpdateTodo();

	function remove() {
		deleteTodo(todo.id);
	}

	function toggleStatus() {
		updateTodo(todo.id, !todo.complete);
	}
</script>

<span class={todo.complete ? 'text-green-600 line-through' : ''}>
	{todo.text}
</span>
<span class={todo.complete ? 'text-green-600 line-through' : ''}>
	{todo.id}
</span>

{#if todo.complete}
	<button type="button" onclick={preventDefault(toggleStatus)}> ✔️ </button>
{:else}
	<button type="button" onclick={preventDefault(toggleStatus)}> ❌ </button>
{/if}

<button type="button" onclick={preventDefault(remove)}> 🗑 </button>

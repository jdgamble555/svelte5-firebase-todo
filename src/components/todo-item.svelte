<script lang="ts">
	import { deleteTodo, updateTodo } from '$lib/use-todos.svelte';

	let { todo }: { todo: Todo } = $props();

	function remove(e: Event) {
		e.preventDefault();
		deleteTodo(todo.id);
	}

	function toggleStatus(e: Event) {
		e.preventDefault();
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
	<button type="button" onclick={toggleStatus}> ✔️ </button>
{:else}
	<button type="button" onclick={toggleStatus}> ❌ </button>
{/if}

<button type="button" onclick={remove}> 🗑 </button>

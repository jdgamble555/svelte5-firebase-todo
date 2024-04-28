<script lang="ts">
	import { deleteTodo, updateTodo } from '$lib/todos.svelte';

	export let todo: Todo;

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
	<button on:click={toggleStatus}> ✔️ </button>
{:else}
	<button on:click={toggleStatus}> ❌ </button>
{/if}

<button on:click={remove}> 🗑 </button>

<script lang="ts">
	import { deleteTodo, updateTodo } from '$lib/todos.svelte';

	let { todo }: { todo: TodoDoc } = $props();
	let error = $state<string | null>(null);

	async function toggleStatus() {
		const result = await updateTodo(todo.id, !todo.complete);
		error = result.error;
	}

	async function remove() {
		const result = await deleteTodo(todo.id);
		error = result.error;
	}
</script>

<span class={todo.complete ? 'text-green-600 line-through' : ''}>
	{todo.text}
</span>
<span class={todo.complete ? 'text-green-600 line-through' : ''}>
	{todo.id}
</span>

<button type="button" onclick={toggleStatus} aria-label={todo.complete ? 'Mark task incomplete' : 'Mark task complete'}>
	{todo.complete ? '✔️' : '❌'}
</button>

<button type="button" onclick={remove} aria-label="Delete task"> 🗑 </button>
{#if error}<p role="alert" class="text-red-600">{error}</p>{/if}

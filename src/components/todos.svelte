<script lang="ts">
	import { fly } from 'svelte/transition';
	import { useTodos } from '$lib/use-todos.svelte';
	import TodoItem from '@components/todo-item.svelte';
	import TodoForm from './todo-form.svelte';

	const _todos = useTodos();
	const todos = $derived(_todos.value);
</script>

{#if todos.data?.length}
	<div
		class="grid grid-cols-[auto,auto,auto,auto] gap-3 justify-items-start"
		in:fly={{ x: 900, duration: 500 }}
	>
		{#each todos.data || [] as todo (todo.id)}
			<TodoItem {todo} />
		{/each}
	</div>
{:else if todos.loading}
	<p>Loading...</p>
{:else if todos.error}
	<p class="text-red-500">{todos.error}</p>
{:else}
	<p><b>Add your first todo item!</b></p>
{/if}

<TodoForm />

<script lang="ts">
	import { fly } from 'svelte/transition';
	import { useTodos } from '$lib/todos.svelte';
	import TodoItem from '@components/todo-item.svelte';
	import TodoForm from './todo-form.svelte';

	const todos = useTodos();
</script>

{#if todos.value.data?.length}
	<div
		class="grid grid-cols-[auto,auto,auto,auto] gap-3 justify-items-start"
		in:fly={{ x: 900, duration: 500 }}
	>
		{#each todos.value.data || [] as todo (todo.id)}
			<TodoItem {todo} />
		{/each}
	</div>
{:else}
	<p><b>Add your first todo item!</b></p>
{/if}

<TodoForm />

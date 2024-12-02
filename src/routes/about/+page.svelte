<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex items-center justify-center my-5">
	<div class="border w-[400px] p-5 flex flex-col gap-3">
		<h1 class="text-3xl font-semibold">{data.about.name}</h1>
		<p>{data.about.description}</p>
	</div>
</div>

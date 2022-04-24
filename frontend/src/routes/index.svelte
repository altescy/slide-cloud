<script lang="ts">
	import { onMount } from 'svelte';
	import 'codemirror/lib/codemirror.css';
	import 'codemirror/theme/monokai.css';

	let CodeMirror;
	export let editor;

	let element: HTMLElement;

	onMount(async () => {
		const codemirror = await import('codemirror');
		await import('codemirror/mode/markdown/markdown');
		CodeMirror = codemirror.default;

		const config = {
			mode: 'markdown',
			theme: 'monokai',
			lineNumbers: true
		};

		editor = CodeMirror(element, config);
		// editor.on('change', () => {
		// 	console.log(editor.getValue());
		// });
	});
</script>

<div bind:this={element} />

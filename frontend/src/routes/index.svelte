<script lang="ts">
	import { onMount } from 'svelte';
	import 'codemirror/lib/codemirror.css';
	import 'codemirror/theme/monokai.css';

	export let editor;

	let CodeMirror;
	let element: HTMLElement;

	const importCodeMirror = async () => {
		const [module] = await Promise.all([
			import('codemirror'),
			import('codemirror/keymap/vim'),
			import('codemirror/mode/markdown/markdown')
		]);
		return module.default;
	};

	onMount(async () => {
		CodeMirror = await importCodeMirror();

		const config = {
			mode: 'markdown',
			theme: 'monokai',
			lineNumbers: true,
			keyMap: 'vim'
		};

		editor = CodeMirror(element, config);
		// editor.on('change', () => {
		// 	console.log(editor.getValue());
		// });
	});
</script>

<div bind:this={element} />

<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import '@fontsource-variable/fira-code';
	import '@fontsource-variable/public-sans';
	import '@fontsource/fira-sans';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$src/components/Header.svelte';
	let { children } = $props();
</script>

<div class="wrapper">
	<ModeWatcher lightClassNames={['light']} />
	<ParaglideJS {i18n}>
		<div class="greenball">
			<div class="grain">
				<Header />
				{@render children()}
			</div>
		</div>
	</ParaglideJS>
</div>

<style>
	.wrapper {
		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.greenball,
	.grain {
		position: absolute;
		height: 100%;
		width: 100%;
	}
	.greenball::before {
		content: '';
		background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuZGV2L3N2Z2pzIiB2aWV3Qm94PSIwIDAgODAwIDQ1MCIgb3BhY2l0eT0iMSI+PGRlZnM+PGZpbHRlciBpZD0iYmJibHVycnktZmlsdGVyIiB4PSItMTAwJSIgeT0iLTEwMCUiIHdpZHRoPSI0MDAlIiBoZWlnaHQ9IjQwMCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgcHJpbWl0aXZlVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgoJPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNzgiIHg9IjAlIiB5PSIwJSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgaW49IlNvdXJjZUdyYXBoaWMiIGVkZ2VNb2RlPSJub25lIiByZXN1bHQ9ImJsdXIiPjwvZmVHYXVzc2lhbkJsdXI+PC9maWx0ZXI+PC9kZWZzPjxnIGZpbHRlcj0idXJsKCNiYmJsdXJyeS1maWx0ZXIpIj48ZWxsaXBzZSByeD0iMTg2LjUiIHJ5PSI4OC41IiBjeD0iNjAxLjE0ODI1OTYwNDI1NjUiIGN5PSIyNTEuNzA4NzAyMjEyODkwNTYiIGZpbGw9ImhzbGEoMTUyLCA1MiUsIDI4JSwgMS4wMCkiPjwvZWxsaXBzZT48ZWxsaXBzZSByeD0iMTg2LjUiIHJ5PSI4OC41IiBjeD0iNjE5LjQ2OTMwMDYxODgzNzciIGN5PSIyMzEuNzA2OTIxODMzNjEzOTMiIGZpbGw9ImhzbGEoMTUzLCA5MiUsIDI3JSwgMC42NykiPjwvZWxsaXBzZT48L2c+PC9zdmc+');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 120dvh;
		opacity: 0.5;
		z-index: -3;
	}

	.greenball::after {
		/*Grain (Noise Gradient) Mask*/
		content: '';
		background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuZGV2L3N2Z2pzIiB2aWV3Qm94PSIwIDAgNzAwIDcwMCIgd2lkdGg9IjcwMCIgaGVpZ2h0PSI3MDAiPjxkZWZzPjxmaWx0ZXIgaWQ9Im5ubm9pc2UtZmlsdGVyIiB4PSItMjAlIiB5PSItMjAlIiB3aWR0aD0iMTQwJSIgaGVpZ2h0PSIxNDAlIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHByaW1pdGl2ZVVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJsaW5lYXJSR0IiPgoJPGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuMTg4IiBudW1PY3RhdmVzPSI0IiBzZWVkPSIxNSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgeD0iMCUiIHk9IjAlIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiByZXN1bHQ9InR1cmJ1bGVuY2UiPjwvZmVUdXJidWxlbmNlPgoJPGZlU3BlY3VsYXJMaWdodGluZyBzdXJmYWNlU2NhbGU9IjYiIHNwZWN1bGFyQ29uc3RhbnQ9IjIuMiIgc3BlY3VsYXJFeHBvbmVudD0iMjAiIGxpZ2h0aW5nLWNvbG9yPSIjNzk1N0E4IiB4PSIwJSIgeT0iMCUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGluPSJ0dXJidWxlbmNlIiByZXN1bHQ9InNwZWN1bGFyTGlnaHRpbmciPgogICAgCQk8ZmVEaXN0YW50TGlnaHQgYXppbXV0aD0iMyIgZWxldmF0aW9uPSIxMDAiPjwvZmVEaXN0YW50TGlnaHQ+CiAgCTwvZmVTcGVjdWxhckxpZ2h0aW5nPgogIDxmZUNvbG9yTWF0cml4IHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiIHg9IjAlIiB5PSIwJSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgaW49InNwZWN1bGFyTGlnaHRpbmciIHJlc3VsdD0iY29sb3JtYXRyaXgiPjwvZmVDb2xvck1hdHJpeD4KPC9maWx0ZXI+PC9kZWZzPjxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iNzAwIiBmaWxsPSJ0cmFuc3BhcmVudCI+PC9yZWN0PjxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iNzAwIiBmaWxsPSIjNzk1N2E4IiBmaWx0ZXI9InVybCgjbm5ub2lzZS1maWx0ZXIpIj48L3JlY3Q+PC9zdmc+');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center left;
		position: absolute;
		top: 0;
		right: 0;
		width: 50%;
		height: 100%;
		opacity: 0.13;
		z-index: -2;
		-webkit-mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 70%);
		mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 70%);
	}

	.grain:before {
		content: '';
		background-image: var(--bg-grain);
		background-repeat: repeat;
		background-size: 185px;
		opacity: 0.05;
		top: 0;
		left: 0;
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
</style>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
	<RouterView />
</template>

<style>
* {
	padding: 0;
	margin: 0;
	color: var(--text);
}

p {
	color: var(--secondary-text);
}

:root {
	--accent: #CD5C5C;
	--text: #222222;
	--secondary-text: #777777;
	--prim: #FFFFFF;
	--sec: #dddddd;
}

.form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.margins {
	width: min(90%, 600px);
	margin: auto;
}

.icon-button {
	background: none;
	border: none;
	cursor: pointer;
	font-size: 1.2rem;
	color: var(--secondary-text)
}

i {
	color: inherit;
}

</style>

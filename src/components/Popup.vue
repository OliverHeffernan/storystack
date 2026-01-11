<template>
	<div class="popup-overlay" @click.self="$emit('close')">
		<div class="popup-content margins">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

// Emit close event for clicking outside
defineEmits<{
	(e: 'close'): void;
}>();

// Prevent body scroll when popup is open
onMounted(() => {
	document.body.style.overflow = 'hidden';
	document.body.style.position = 'fixed';
	document.body.style.width = '100%';
});

onUnmounted(() => {
	document.body.style.overflow = '';
	document.body.style.position = '';
	document.body.style.width = '';
});
</script>
<style scoped>
.popup-content {
	background: white;
	padding: 20px;
	border-radius: 8px;
	max-width: 100vw;
	max-height: 100vh;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	overscroll-behavior: contain;
}

.popup-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1001; /* Higher than bottom nav */
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	padding: 20px;
	box-sizing: border-box;
	overscroll-behavior: contain;
}

@media (max-width: 768px) {
	.popup-overlay {
		align-items: flex-start;
		padding: 0;
		background: white;
		/* Account for bottom navigation height (80px) plus safe area */
		padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px));
	}
	
	.popup-content {
		width: 100%;
		max-width: none;
		margin: 0;
		border-radius: 0;
		height: 100vh;
		max-height: calc(100vh - 80px - env(safe-area-inset-bottom, 0px));
		padding: 20px;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		overscroll-behavior: contain;
	}
}
</style>

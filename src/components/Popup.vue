<template>
	<div class="popup-overlay">
		<div class="popup-content margins">
			<slot></slot>
		</div>
	</div>
</template>
<style scoped>
.popup-content {
	background: white;
	padding: 20px;
	border-radius: 8px;
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
	z-index: 1000;
}
</style>

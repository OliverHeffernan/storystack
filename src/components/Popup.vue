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
	max-width: 100vw;
	max-height: 100vh;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
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
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	padding: 20px;
	box-sizing: border-box;
}

@media (max-width: 768px) {
	.popup-overlay {
		align-items: flex-start;
		padding: 0;
		background: white;
	}
	
	.popup-content {
		width: 100%;
		max-width: none;
		margin: 0;
		border-radius: 0;
		height: 100vh;
		max-height: 100vh;
		padding: 20px;
		display: flex;
		flex-direction: column;
	}
}
</style>

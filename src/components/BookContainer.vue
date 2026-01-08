<script setup lang="ts">
import BookEdit from "./BookEdit.vue";
import Book from "../classes/Book";
import { ref, Ref, onMounted } from "vue";

const deleted: Ref<boolean> = ref<boolean>(false);

const props = defineProps<{
	book: Book;
}>();

const _book: Ref<Book> = ref<Book>(props.book);

const editing: Ref<boolean> = ref<boolean>(false);
</script>

<template>
	<BookEdit
		v-if="editing && !deleted"
		:book="_book"
		:editing="editing"
		@close="editing = false"
		@update="(updatedBook: Book) => { _book = updatedBook; editing = false; }"
		@delete="(bookId: string) => { }"
	/>
	<div class="book-container" v-if="!deleted">
		<img :src="_book.getImageUrl()" alt="Book Cover" class="book-cover" style="width: 130px; height:
			auto;" />
		<div class="book-details">
			<h2 class="book-title">{{ _book.getTitle() }}</h2>
			<p class="book-author">by {{ _book.getAuthor() }}</p>
			<p class="book-status">Status: {{ _book.getStatus() }}</p>
			<p class="book-dates" v-if="_book.getStartDate() || _book.getEndDate()">
				<span v-if="_book.getStartDate()">Started: {{ _book.getStartDate() }}</span>
				<span v-if="_book.getEndDate()"> | Finished: {{ _book.getEndDate() }}</span>
			</p>
			<button @click="editing = true" class="icon-button bottom-right"><i class="fa-solid fa-pen-to-square"></i></button>
		</div>
	</div>
</template>
<style scoped>
h2 {
	width: fit-content;
	border-bottom: 2px solid var(--accent);
}

.book-container {
	display: flex;
	position: relative;
	gap: 20px;
	margin: 20px 0;
	padding: 10px;
	border-bottom: 1px var(--accent) solid;
}

.bottom-right {
	position: absolute;
	bottom: 10px;
	right: 10px;
}
</style>

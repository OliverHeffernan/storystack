<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { supabase } from '../lib/supabase';
import Book from '../classes/Book';
import BookContainer from '../components/BookContainer.vue';
import Selector from '../components/Selector.vue';
import type Option from '../interfaces/Option.ts';
import { ref, type Ref } from 'vue';

const books: Ref<Book[]> = ref([]);
const filterStatus: Ref<string> = ref<string>('all');
const viewMode: Ref<string> = ref<string>('list');

const viewOptions: Option[] = [
	{ label: '<i class="fas fa-list"></i>', value: 'list' },
	{ label: '<i class="fas fa-th-large"></i>', value: 'card' }
];

supabase.from('books').select('*').then(({ data, error }) => {
	if (error) {
		console.error('Error fetching books:', error);
	}
	for (const item of data || []) {
		item.start_date = item.start_date ? new Date(item.start_date) : null;
		item.end_date = item.end_date ? new Date(item.end_date) : null;
		books.value.push(new Book(item) as Book);
	}
});
</script>
<template>
	<div class="margins">
		<div class="page-header">
			<h2>My Books</h2>
			<RouterLink :to="{ name: 'Add Book' }" class="router-link">Add Book</RouterLink>
		</div>
		
		<div class="controls">
			<Selector
				:options="[
					{ label: 'All', value: 'all' },
					{ label: 'Want to Read', value: 'want-to-read' },
					{ label: 'Reading', value: 'reading' },
					{ label: 'Read', value: 'read' }
				] as Option[]"
				@select="(value: string) => { filterStatus = value }"
			/>
			
			<Selector
				:options="viewOptions"
				:use-html="true"
				@select="(value: string) => { viewMode = value }"
			/>
		</div>
		
		<div v-if="viewMode === 'card'" class="books-grid">
			<BookContainer 
				v-for="book in books.filter((book: Book) => filterStatus == 'all' || book.getStatus() == filterStatus)" 
				:key="book.getUid() || ''"
				:book="book" 
				view-mode="card"
			/>
		</div>
		
		<div v-else class="books-list">
			<BookContainer 
				v-for="book in books.filter((book: Book) => filterStatus == 'all' || book.getStatus() == filterStatus)" 
				:key="book.getUid() || ''"
				:book="book" 
				view-mode="list"
			/>
		</div>
	</div>
</template>

<style scoped>
.page-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;
	flex-wrap: wrap;
	gap: 16px;
}

.page-header h2 {
	margin: 0;
}

.controls {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;
	gap: 16px;
	flex-wrap: wrap;
}

.books-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
	gap: 16px;
	justify-items: center;
}

.books-list {
	display: flex;
	flex-direction: column;
}

@media (max-width: 768px) {
	.controls {
		flex-direction: column;
		align-items: stretch;
	}
	
	.books-grid {
		justify-content: center;
	}
}
</style>

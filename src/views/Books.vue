<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { supabase } from '../lib/supabase';
import Book from '../classes/Book';
import BookContainer from '../components/BookContainer.vue';
import Selector from '../components/Selector.vue';
import Option from '../interfaces/Option.ts';
import { ref, Ref } from 'vue';

const books: Ref<Book[]> = ref<Book[]>([]);
const filterStatus: Ref<string> = ref<string>('all');

supabase.from('books').select('*').then(({ data, error }) => {
	console.log(data);
	if (error) {
		console.error('Error fetching books:', error);
	}
	for (const item of data) {
		console.log(typeof item.start_date);
		item.start_date = item.start_date ? new Date(item.start_date) : null;
		item.end_date = item.end_date ? new Date(item.end_date) : null;
		books.value.push(new Book(item));
		console.log(item);
	}
});
</script>
<template>
	<div class="margins">
		<RouterLink :to="{ name: 'Add Book' }">Add Book</RouterLink>
		<RouterLink :to="{ name: 'Import Books' }" >Import Books From Goodreads</RouterLink>
		<Selector
			:options="[
				{ label: 'All', value: 'all' },
				{ label: 'Want to Read', value: 'want-to-read' },
				{ label: 'Reading', value: 'reading' },
				{ label: 'Read', value: 'read' }
			] as Option[]"
			@select="(value: string) => { filterStatus = value }"
		/>
		<div v-for="book in books.filter((book: Book) => filterStatus == 'all' || book.getStatus() == filterStatus)" :key="book.id">
			<BookContainer :book="book" />
		</div>
	</div>
</template>

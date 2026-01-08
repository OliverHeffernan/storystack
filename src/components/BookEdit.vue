<script setup lang="ts">
const props = defineProps<{
	book: Book;
	editing: boolean;
}>();

import Popup from './Popup.vue';
import Button from './Button.vue';

import { ref, onMounted } from 'vue';
import Book from '../classes/Book.ts';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase.ts';
const titleRef = ref('');
const authorRef = ref('');
const imgUrlRef = ref('');
const pagesRef = ref<number>(0);
const startDateRef = ref('');
const endDateRef = ref('');
const includeStartDateRef = ref(false);
const includeEndDateRef = ref(false);
const statusRef = ref('want-to-read');

const emit = defineEmits<{
	(e: 'close'): void;
	(e: 'update', book: Book): void;
	(e: 'delete', bookId: string): void;
}>();

onMounted(() => {
	titleRef.value = props.book.getTitle();
	authorRef.value =  props.book.getAuthor();
	imgUrlRef.value = props.book.getImageUrl();
	pagesRef.value = props.book.getPages();
	const startDate: Date | null = props.book.getStartDate();
	console.log(typeof startDate);
	console.log(startDate);
	if (startDate !== null) {
		console.log(startDate);
		includeStartDateRef.value = true;
		startDateRef.value = startDate.toISOString().substring(0, 10);
	}
	const endDate: Date | null = props.book.getEndDate();
	if (endDate) {
		includeEndDateRef.value = true;
		endDateRef.value = endDate.toISOString().substring(0, 10);
	}
	statusRef.value = props.book.getStatus();
})

async function removeBook() {
	const error: PostgrestError | string | null = await props.book.delete();
	if (error) {
		alert('Error deleting book: ' + (typeof error === 'string' ? error : error.message));
		return;
	}
	emit('delete', props.book.getUid());
}

async function updateBook() {
	const title = titleRef.value;
	const author = authorRef.value;
	const image_url = imgUrlRef.value;
	const start_date = new Date(startDateRef.value);
	const end_date = new Date(endDateRef.value);

	const updatedBook: Book = props.book;
	updatedBook.setTitle(title);
	updatedBook.setAuthor(author);
	updatedBook.setImageUrl(image_url);
	if (includeStartDateRef.value) {
		updatedBook.setStartDate(newDate(start_date));
	} else {
		updatedBook.setStartDate(null);
	}
	if (includeEndDateRef.value) {
		updatedBook.setEndDate(newDate(end_date));
	} else {
		updatedBook.setEndDate(null);
	}
	updatedBook.setStatus(statusRef.value);
	const error = await updatedBook.save();
	if (error) {
		alert('Error updating book: ' + error.message);
	} else {
		emit('update', updatedBook);
	}
}

function newDate(dateStr: string): Date {
	if (!dateStr) return null;
	console.log(dateStr);
	const date = new Date(dateStr);
	if (isNaN(date.getTime())) {
		return new Date(Date.now());
	}
	return date;
}

</script>
<template>
	<Popup>
		<button class="icon-button top-4 right-4 text-red" @click="emit('close')">
			<i class="fa-solid fa-xmark"></i>
		</button>
		<table class="form">
			<tr>
				<td>Author:</td>
				<input v-model="authorRef" type="text" placeholder="Author" />
			</tr>
			<tr>
				<td>Title:</td>
				<td><input v-model="titleRef" type="text" placeholder="Book Title" /></td>
			</tr>
			<tr>
				<td>Image URL:</td>
				<td>
					<img :src="imgUrlRef" alt="Book Cover Preview" style="max-height: 150px; max-width: 100px; display: block; margin-bottom: 10px;" />
					<input v-model="imgUrlRef" type="text" placeholder="Image URL" />
				</td>
			</tr>
			<tr>
				<td>Pages:</td>
				<td><input v-model="pagesRef" type="number" placeholder="Number of Pages" /></td>
			</tr>
			<tr>
				<td>Include Start Date:</td>
				<td><input v-model="includeStartDateRef" type="checkbox" /></td>
			</tr>
			<tr v-if="includeStartDateRef">
				<td>Start Date:</td>
				<td><input v-model="startDateRef" type="date" placeholder="Start Date" /></td>
			</tr>
			<tr>
				<td>Include End Date:</td>
				<td><input v-model="includeEndDateRef" type="checkbox" /></td>
			</tr>
			<tr v-if="includeEndDateRef">
				<td>End Date:</td>
				<td><input v-model="endDateRef" type="date" placeholder="End Date" /></td>
			</tr>
			<tr>
				<td>Status:</td>
				<td>
					<select name="status" v-model="statusRef">
						<option value="want-to-read">Want to Read</option>
						<option value="reading">Reading</option>
						<option value="read">Read</option>
					</select>
				</td>
			</tr>
			<Button @click="updateBook()">Save Changes</Button>
			<Button @click="removeBook()">Remove Book</Button>
		</table>
	</Popup>
</template>

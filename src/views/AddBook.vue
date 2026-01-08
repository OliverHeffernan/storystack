<template>
	<div class="margins">
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
				<td><input v-model.number="pagesRef" type="number" placeholder="Number of Pages" /></td>
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
			<tr><button @click="addBook()">Add Book</button></tr>
		</table>
	</div>
	<div v-if="err">
		Error adding book: {{ err.message }}
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Book from '../classes/Book.ts';
import { BookInterface } from '../classes/Book.ts';
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

const err = ref<PostgrestError | null>(null);

async function addBook() {
	const title = titleRef.value;
	const author = authorRef.value;
	const image_url = imgUrlRef.value;
	const start_date = new Date(startDateRef.value);
	const end_date = new Date(endDateRef.value);
	const pages = pagesRef.value;

	const newBook: BookInterface = {
		title,
		author,
		image_url,
		start_date,
		end_date,
		id: null,
		pages,
	};

	const book: Book = new Book(newBook);

	const error: PostgrestError | null = await book.save();
	err.value = error;
	if (err.value) {
		console.error('Error adding book:', err.value);
		return;
	}
	console.log('Book added successfully');

}

</script>

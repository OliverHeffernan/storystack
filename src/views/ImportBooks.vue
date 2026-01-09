<template>
	<div class="margins">
		<h1>Import Books From Goodreads</h1>
		<p>
			To import your books from Goodreads, please follow these steps:
		</p>
		<ol>
			<li>
				Go to your Goodreads account and navigate to the "My Books" section.
			</li>
			<li>
				Click on the "Import & Export" link located at the bottom of the left sidebar.
			</li>
			<li>
				In the "Export Your Books" section, click on the "Export Library" button to download your book data as a CSV file.
			</li>
			<li>
				Once you have downloaded the CSV file, return to this page and use the form below to upload it.
			</li>
		</ol>
		<label for="file">Choose CSV File:</label>
		<input type="file" id="file" ref="fileInput" accept=".csv" required />
		<button @click="importBooks">Import Books</button>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '../lib/supabase';
// get uploaded file as a string
const fileInput = ref<HTMLInputElement | null>(null);
const importBooks = async () => {
	if (!fileInput.value || !fileInput.value.files || fileInput.value.files.length === 0) {
		alert('Please select a file to upload.');
		return;
	}
	const file = fileInput.value.files[0];
	if (!file) {
		alert('No file selected.');
		return;
	}
	const reader = new FileReader();
	reader.readAsText(file);
	const text = await new Promise<string>((resolve, reject) => {
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = () => reject(reader.error);
	});
	if (!text) {
		alert('Failed to read the file.');
		return;
	}
	const { data: { session }} = await supabase.auth.getSession();
	if (!session) {
		alert('You must be logged in to import books.');
		return;
	}
	const { data, error } = await supabase.functions.invoke('good_reads_upload', {
		headers: {
			'Authorization': `Bearer ${session.access_token}`,
			'Content-Type': 'application/json',
		},
		body: { data: text },
	});

	if (error) {
		console.error('Error invoking function:', error);
		alert(`Failed to import books: ${error.message}`);
		return;
	}

	if (data?.success) {
		alert(`Successfully imported ${data.inserted} out of ${data.total} books.`);
		if (data.errors && data.errors.length > 0) {
			console.warn('Some books failed to import:', data.errors);
		}
	} else {
		alert('Import completed with unknown status');
	}
};
</script>

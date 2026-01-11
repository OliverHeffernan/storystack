import { supabase } from '../lib/supabase'
import { PostgrestError } from '@supabase/supabase-js';
export interface BookInterface {
	id: string | null;
	title: string;
	author: string;
	start_date: Date | string | null;
	end_date: Date | string | null;
	creation_date?: Date | null;
	image_url: string | null;
	status: string;
	pages: number | string;
}

export default class Book {
	public id: string | null;
	public title: string;
	public author: string;
	public start_date: Date | null;
	public end_date: Date | null
	public image_url: string | null;
	public status: string;
	public pages: number;
	public creation_date: Date | null;

	public static parseDate(date: Date | string | null): Date | null {
		if (date === null) {
			return null;
		}
		if (date instanceof Date) {
			return date;
		}
		const parsedDate = new Date(date);
		return isNaN(parsedDate.getTime()) ? null : parsedDate;
	}

	public constructor(book: BookInterface) {
		this.id = book.id;
		this.title = book.title;
		this.author = book.author;
		this.start_date = Book.parseDate(book.start_date);
		this.end_date = Book.parseDate(book.end_date);
		this.creation_date = Book.parseDate(book.creation_date || null);
		this.image_url = book.image_url;
		this.status = book.status;
		if (typeof book.pages === 'string') {
			this.pages = parseInt(book.pages, 10);
		} else {
			this.pages = book.pages;
		}
	}

	public async delete(): Promise<PostgrestError | string | null> {
		if (this.id === null) {
			console.error('Cannot delete a book without an ID.');
			return 'Cannot delete a book without an ID.';
		}

		const { error } = await supabase.from('books').delete().eq('id', this.id);
		if (error) {
			console.error('Error deleting book:', error);
			return error;
		}
		return null;
	}

	public async save(): Promise<PostgrestError | null> {
		var errorA;
		if (this.id === null) {
			const { error } = await supabase.from('books').insert({
				title: this.title,
				author: this.author,
				start_date: this.start_date,
				end_date: this.end_date,
				image_url: this.image_url,
				status: this.status,
				pages: this.pages,
			});
			errorA = error;
		} else {
			const { error } = await supabase.from('books').update({
				id: this.id,
				title: this.title,
				author: this.author,
				start_date: Book.getDateISOString(this.start_date),
				end_date: Book.getDateISOString(this.end_date),
				image_url: this.image_url,
				status: this.status,
				pages: this.pages,
			}).eq('id', this.id);
			errorA = error;
		}

		if (errorA) {
			console.error('Error saving book:', errorA);
			return errorA;
		}
		return null;
	}

	public static getDateISOString(date: Date | null): string | null {
		return date ? date.toISOString() : null;
	}

	// basic getters
	public getUid(): string | null { return this.id; }
	public getTitle(): string { return this.title; }
	public getAuthor(): string { return this.author; }
	public getStartDate(): Date | null { return this.start_date; }
	public getEndDate(): Date | null { return this.end_date; }
	public getCreationDate(): Date | null { return this.creation_date; }
	public getImageUrl(): string | null {
		return this.image_url;
	}
	public getPages(): number { return this.pages; }
	public getStatus(): string { return this.status; }

	// basic setters

	public setTitle(title: string): void { this.title = title; }
	public setAuthor(author: string): void { this.author = author; }
	public setStartDate(start_date: Date | null): void { this.start_date = start_date; }
	public setEndDate(end_date: Date | null): void { this.end_date = end_date; }
	public setImageUrl(image_url: string | null): void { this.image_url = image_url; }
	public setStatus(status: string): void { this.status = status; }
	public setPages(pages: number | string): void {
		if (typeof pages === 'string') {
			this.pages = parseInt(pages, 10);
		} else {
			this.pages = pages;
		}
	}
}

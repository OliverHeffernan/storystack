import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import EmailConfirmation from '../views/EmailConfirmation.vue'
import Home from '../views/Home.vue'
import Books from '../views/Books.vue'
import AddBook from '../views/AddBook.vue'
import ImportBooks from '../views/ImportBooks.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: 'Home',
			path: '/app',
			component: Home,
		},
		{
			name: 'Sign In',
			path: '/signin',
			component: SignIn,
		},
		{
			name: 'Sign Up',
			path: '/signup',
			component: SignUp,
		},
		{
			name: 'Email Confirmation',
			path: '/confirm-email',
			component: EmailConfirmation,
		},
		{
			name: 'Books',
			path: '/app/books',
			component: Books,
		},
		{
			name: 'Add Book',
			path: '/app/books/add',
			component: AddBook,
		},
		{
			name: 'Import Books',
			path: '/app/books/import',
			component: ImportBooks,
		}
	],
})

export default router

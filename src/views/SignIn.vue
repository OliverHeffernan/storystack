<template>
	<div class="sign-in">
		<h2>Sign In</h2>
		<form @submit.prevent="handleSignIn">
			<div>
				<label for="email">Email:</label>
				<input type="email" v-model="emailRef" id="email" required />
			</div>
			<div>
				<label for="password">Password:</label>
				<input type="password" v-model="passwordRef" id="password" required />
			</div>
			<button type="submit">Sign In</button>
		</form>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { supabase } from '../lib/supabase.ts';

const router = useRouter();

const emailRef = ref('');
const passwordRef = ref('');

function handleSignIn() {
	const email = emailRef.value;
	const password = passwordRef.value;

	supabase.auth.signInWithPassword({ email, password })
		.then(({ error }) => {
			if (error) {
				alert('Error signing in: ' + error.message);
			} else {
				router.push({ name: 'Home' });
			}
		});
}
</script>

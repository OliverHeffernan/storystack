<!-- Sign in page. -->
<script lang="ts" setup >
// imports

import { useRouter, RouterLink  } from 'vue-router';
import { ref, Ref } from 'vue';
import { supabase } from '../lib/supabase';

const router = useRouter();

const email: Ref<string> = ref<string>('');
const password: Ref<string> = ref<string>('');
const displayname: Ref<string> = ref<string>('');
const inputRefs = ref<Array<HTMLElement>>([]);

const setInputRef = (el: HTMLElement) => {
	if (el && !inputRefs.value.includes(el)) {
		inputRefs.value.push(el);
	}
};

function handleEnter(index: number) {
	if (index < inputRefs.value.length - 1) {
		inputRefs.value[index + 1].focus();
	} else {
		handleSignIn();
	}
}

const errorMsg: Ref<string | null> = ref<string | null>(null);

const loading: Ref<boolean> = ref<boolean>(false);
const success: Ref<boolean> = ref<boolean>(false);


/**
 * Handle user sign-in.
 * If successful, redirect to home page.
 */
async function signUpWithEmail() {
	try {
		loading.value = true;
		const { error } = await supabase.auth.signUp({
			email: email.value,
			password: password.value,
			options: {
				data: {
					display_name: displayname.value,
					emailRedirectTo: "https://storystack.olihef.com/email-confirmed"
				},
			},
		});
		if (error) throw error;
		router.push({ name: 'Email Confirmation' });
	} catch (error) {
		errorMsg.value = error.message;
	} finally {
		loading.value = false;
	}
}


</script>

<template>
	<div class="margins">
		<h2>Sign Up</h2>
		<h3>Email</h3>
		<input v-model="email" :ref="setInputRef" @keyup.enter="handleEnter(0)" type="email" placeholder="Enter your email.">
		<h3>Display name</h3>
		<input v-model="displayname" :ref="setInputRef" @keyup.enter="handleEnter(1)" type="text" placeholder="Enter your display name.">
		<h3>Password</h3>
		<input v-model="password" :ref="setInputRef" @keyup.enter="handleEnter(2)" type="password" placeholder="Enter the password you would like to use.">
		<button @click="signUpWithEmail()">Sign Up</button>

		<div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>
		<br>
		<br>
		<RouterLink :to="{ name: 'Sign In' }">Already have an account? Sign in here.</RouterLink>
	</div>
</template>

<style scoped>
input {
	width: 100%;
}

.bubbleButton {
	margin-top: 10px;
}
</style>

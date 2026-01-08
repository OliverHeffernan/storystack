<script setup lang="ts">
import { supabase } from '../lib/supabase';
import { ref, onMounted } from 'vue';

const user = ref(null);

onMounted(async () => {
	const { data: { user: currentUser } } = await supabase.auth.getUser();
	user.value = currentUser;
	console.log(currentUser);
});
</script>
<template>
	<h1>Welcome </h1>
</template>

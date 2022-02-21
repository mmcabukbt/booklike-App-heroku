<template>
	<div class="flex">
		<router-link
			:to="{ name: 'LoginPage' }"
			class="flex bg-cyan-900 hover:bg-cyan-700 text-white px-3 py-1 rounded-sm text-sm items-center mr-2"
		>Giriş yap</router-link>
		<router-link
			:to="{ name: 'RegisterPage' }"
			class="flex bg-blue-900 hover:bg-blue-700 text-white px-3 py-1 rounded-sm text-sm items-center mr-2"
		>Kayıt ol</router-link>
	</div>
</template>
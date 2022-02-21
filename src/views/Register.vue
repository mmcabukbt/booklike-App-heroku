<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import CryptoJS from "crypto-js"

const router = useRouter();
const AppAxios = inject('AppAxios');
const userData = {
	email: null,
	fullname: null,
	password: null,
}

const onSubmit = () => {
	const derPassword = CryptoJS.PBKDF2(userData.password, import.meta.env.VITE_PBKDF2_SALT, {
		keySize: import.meta.env.VITE_PBKDF2_KEY_SIZE,
		iterations: import.meta.env.VITE_PBKDF2_ITERATION
	}).toString();
	const userSaveData = {
		...userData,
		password: derPassword,
		added_at: Date.now(),
	}
	// console.log('userSaveData==> ', userSaveData);
	AppAxios.post("/users", userSaveData).then(user => {
		return router.push({ name: "LoginPage" })
	}).catch(e => console.err('error: ', e));
}
const info = () => alert("Üzgünüz, bu linke erişim üzerine çalışmalar halen sürmekte...")
</script>

<template>
	<div class="w-full h-full flex items-center justify-center">
		<div class="w-[27.5rem] mx-auto px-12 py-14 bg-white shadow-lg rounded-md flex flex-col">
			<router-link
				:to="{ name: 'HomePage' }"
				href="#"
				class="my-10 text-4xl text-center text-slate-800"
			>booklike</router-link>

			<button
				@click="info"
				class="flex h-12 mb-4 px-4 text-gray-600 items-center justify-center border border-gray-300 rounded-md transition-all hover:bg-gray-50"
			>
				<svg class="mr-auto" width="18" height="18" viewBox="0 0 18 18">
					<path
						d="M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z"
						fill="#4285F4"
					/>
					<path
						d="M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z"
						fill="#34A853"
					/>
					<path
						d="M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z"
						fill="#FBBC05"
					/>
					<path
						d="M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z"
						fill="#EA4335"
					/>
				</svg>
				<span class="mr-auto">Google hesabı ile Kayıt ol</span>
			</button>

			<div class="border-b border-gray-200 flex justify-center mb-10">
				<span class="bg-white px-4 text-gray-300 relative top-3">ya da</span>
			</div>
			<form @submit.prevent="onSubmit">
				<ul class="grid gap-y-8">
					<li class="flex flex-col text-xs text-gray-500">
						<label for="fname">Tam adınız</label>
						<input
							v-model="userData.fullname"
							type="text"
							name="fname"
							id="fname"
							autocomplete="name"
							minlength="3"
							required
							class="mt-2 h-9 border border-gray-300 rounded outline-none px-3 text-black focus:border-gray-400"
						/>
					</li>
					<li class="flex flex-col text-xs text-gray-500">
						<label for="email">Email adresi</label>
						<input
							v-model="userData.email"
							type="email"
							name="email"
							id="email"
							autocomplete="email"
							required
							class="mt-2 h-9 border border-gray-300 rounded outline-none px-3 text-black focus:border-gray-400"
						/>
					</li>
					<li class="flex flex-col text-xs text-gray-500">
						<label for="password">Şifre</label>
						<input
							v-model="userData.password"
							type="password"
							name="password"
							id="password"
							minlength="8"
							autocomplete="new-password"
							required
							class="mt-2 h-9 border border-gray-300 rounded outline-none px-3 text-black focus:border-gray-400"
						/>
						<div class="mt-2">
							<span class="text-red-400">Şifreniz enaz 8 karakterden oluşmalıdır</span>
						</div>
					</li>
					<li>
						<button
							class="w-full h-9 flex items-center justify-center rounded text-sm text-white bg-slate-800 hover:bg-slate-900 focus:bg-slate-900 active:bg-black hover:shadow-md"
						>
							Kayıt
							ol
						</button>
					</li>
					<li class="text-sm text-center text-gray-500">
						Zaten bir hesabınız mı var?
						<router-link :to="{ name: 'LoginPage' }" class="text-blue-400 hover:underline">Giriş yap</router-link>
					</li>
				</ul>
			</form>
		</div>
	</div>
</template>
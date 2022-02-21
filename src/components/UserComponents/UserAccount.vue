<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import CryptoJS from "crypto-js"

const router = useRouter();
const { getters, commit } = useStore();
const AppAxios = inject('AppAxios');
const editProfile = ref(true);
const userData = {
	email: getters.getUser_.email,
	fullname: getters.getUser_.fullname,
	password: null,
}
const cPassword = {
	password: null,
}
const onSubmit = () => {
	const curPassword = CryptoJS.PBKDF2(cPassword.password, import.meta.env.VITE_PBKDF2_SALT, {
		keySize: import.meta.env.VITE_PBKDF2_KEY_SIZE,
		iterations: import.meta.env.VITE_PBKDF2_ITERATION
	}).toString();
	if (getters.getUser_.password !== curPassword) return alert("⛔ Geçersiz şifre girdiniz!")
	const derPassword = CryptoJS.PBKDF2(userData.password, import.meta.env.VITE_PBKDF2_SALT, {
		keySize: import.meta.env.VITE_PBKDF2_KEY_SIZE,
		iterations: import.meta.env.VITE_PBKDF2_ITERATION
	}).toString();
	const userSaveData = {
		...userData,
		password: derPassword,
	}
	AppAxios.patch(`/users/${getters.getUser_.id}`, userSaveData).then(user => {
		const userId = user.data.email.split('@')[0];
		commit("LOGIN_USER", { ...user.data, userId });
		router.push({ path: `/users/${getters.getUserId_}` })
		return alert("ℹ Değişiklikler başarıyla kaydedildi. ✔");
	}).catch(e => console.err('error: ', e));
}

</script>

<template>
	<div class="absolute left-40">
		<div v-if="editProfile" class="m-5 flex flex-col w-full">
			<h3 class="text-2xl mb-5">Hesabım - Profilim</h3>
			<label>
				Tam Adınız:
				<input disabled :placeholder="getters.getUser_.fullname" class="input mb-3" />
			</label>
			<label>
				E-posta Adresiniz:
				<input disabled :placeholder="getters.getUser_.email" class="input mb-3" />
			</label>
			<button @click="editProfile = !editProfile" class="default-button">Düzenle</button>
		</div>
		<div v-else class="m-5 flex flex-col w-full">
			<h3 class="text-2xl mb-5">Profilimi Düzenle</h3>
			<form @submit.prevent="onSubmit">
				<ul class="grid gap-y-8">
					<li class="flex flex-col text-gray-500">
						<label for="fname">Tam adınız</label>
						<input
							v-model="userData.fullname"
							type="text"
							name="fname"
							id="fname"
							autocomplete="name"
							minlength="3"
							required
							class="mt-1 h-9 border border-gray-300 rounded outline-none px-3 text-black focus:border-gray-400"
						/>
					</li>
					<li class="flex flex-col text-gray-500">
						<label for="email">Email adresi</label>
						<input
							v-model="userData.email"
							type="email"
							name="email"
							id="email"
							autocomplete="email"
							required
							class="mt-1 h-9 border border-gray-300 rounded outline-none px-3 text-black focus:border-gray-400"
						/>
					</li>
					<li class="flex flex-col text-gray-500">
						<label for="password">Yeni Şifreniz</label>
						<input
							v-model="userData.password"
							type="password"
							name="password"
							id="password"
							minlength="8"
							autocomplete="new-password"
							required
							class="mt-1 h-9 border border-gray-300 rounded outline-none px-3 text-black focus:border-gray-400"
						/>
						<div>
							<span class="text-xs text-red-400">Şifreniz enaz 8 karakterden oluşmalıdır</span>
						</div>
					</li>
					<li class="flex flex-col text-gray-500">
						<hr />
						<div>
							<span
								class="text-lg mt-5 text-red-400"
							>Değişiklikleri kaydedebilmek için Geçerli Şifrenizi giriniz</span>
							<hr />
						</div>
						<label for="cpassword">Geçerli Şifreniz</label>
						<input
							v-model="cPassword.password"
							type="password"
							name="cpassword"
							id="cpassword"
							minlength="8"
							autocomplete="current-password"
							required
							class="mt-1 h-9 border border-gray-300 rounded outline-none px-3 text-black focus:border-gray-400"
						/>
					</li>
					<li>
						<button
							class="w-full h-9 flex items-center justify-center rounded text-sm text-white bg-slate-800 hover:bg-slate-900 focus:bg-slate-900 active:bg-black hover:shadow-md"
						>Değiştir</button>
					</li>
				</ul>
			</form>
		</div>
	</div>
</template>
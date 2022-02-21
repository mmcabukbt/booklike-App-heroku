import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router';
import store from './store';
import AppHeader from './components/AppComponents/AppHeader.vue';
import AppSidebar from './components/AppComponents/AppSidebar.vue';
import NewBookmarkModal from './components/Modals/NewBookmarkModal.vue'
import EditBookmarkModal from './components/Modals/EditBookmarkModal.vue'
import { axiosBase } from './services/axios';
import prepareSocket from './services/socket';

const app = createApp(App);
const socket = prepareSocket(store);

app.use(store);
app.use(router);
app.provide("AppAxios", axiosBase);
app.provide("socket", socket);
app.component('AppHeader', AppHeader);
app.component('AppSidebar', AppSidebar);
app.component('NewBookmarkModal', NewBookmarkModal);
app.component('EditBookmarkModal', EditBookmarkModal);
app.mount('#app');
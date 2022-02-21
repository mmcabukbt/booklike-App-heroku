<script setup>
import { useStore } from "vuex";

const { dispatch } = useStore();
dispatch("fetchCategories");
</script>

<template>
	<router-view></router-view>
</template>

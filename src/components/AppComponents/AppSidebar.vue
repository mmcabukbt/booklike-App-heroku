<script setup>
defineProps({
	menuItems: Array,
	selectedMenu: Object
})

</script>

<template>
	<aside class="sidebar">
		<div v-for="menuItem in menuItems" :key="menuItem.id">
			<input
				type="radio"
				class="radio"
				name="opts"
				:id="`menuItem_${menuItem.id}`"
				:value="menuItem.id"
				v-model="selectedMenu.id"
			/>
			<label :for="`menuItem_${menuItem.id}`" class="sidebar-item">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="fill-current mr-3"
					height="24"
					viewBox="0 0 24 24"
					width="24"
				>
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path
						d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"
					/>
				</svg>
				{{ menuItem.name_ }}
			</label>
		</div>
	</aside>
</template>
<script>
	import { onMount } from 'svelte';
	import { checkLoggedIn } from './services/auth';
	import { groceryStoreData } from './services/db';
	import Alert from './components/Alert.svelte';
	import GroceryList from "./components/GroceryList.svelte";
  	import NavBar from './components/NavBar.svelte';

	onMount(async () => {
		checkLoggedIn();
	})
</script>

<NavBar />

{#await groceryStoreData then groceryStoreData}
	<Alert />
	<GroceryList {groceryStoreData} />	
{:catch error}
	<p>uh oh, couldn't get data... please refresh page</p>
{/await}

<style global lang="postcss">
	@import "./main.css";
</style>
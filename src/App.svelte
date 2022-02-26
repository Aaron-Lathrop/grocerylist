<script>
	import { onDestroy, onMount } from 'svelte';
	import { checkLoggedIn } from './services/auth';
	import { getGroceryItems, getGroceryStores } from './services/db';
	import { groceryStore, groceryItems, user } from './store/stores';
	import Alert from './components/Alert.svelte';
	import GroceryList from "./components/GroceryList.svelte";
	import GroceryStoreForm from './components/GroceryStoreForm.svelte';
  	import NavBar from './components/NavBar.svelte';

	$: dataCalls = $user.uid && fetchData();

	async function fetchData() {
		const hasLocalGroceryStore = ($groceryStore && $groceryStore.length);
		const hasLocalGroceryItems = ($groceryItems && $groceryItems.length);
		if (hasLocalGroceryStore || hasLocalGroceryItems) return [$groceryStore, $groceryItems];
		const data = await Promise.all([
			getGroceryStores($user),
			getGroceryItems($user)
		]);
		return data;
	}

	function updateDb() {
		groceryItems.updateDb();
	}
	onMount(async () => {
		await checkLoggedIn();
		//setInterval(updateDb, 15000)
	})
	onDestroy(() => {
		//clearInterval(updateDb);
	})
</script>

<NavBar />

{#if $user.uid}
	{#await dataCalls then [stores, items]}
		{#if stores.length}
			<Alert />
			<GroceryList />
		{:else}
			<GroceryStoreForm />
		{/if}	
	{:catch error}
		<p>{error}</p>
		<p>uh oh, couldn't get data... please refresh page</p>
	{/await}
{/if}

<style global lang="postcss">
	@import "./main.css";
</style>
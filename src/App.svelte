<script>
	import { onDestroy, onMount } from 'svelte';
	import { checkLoggedIn } from './services/auth';
	import { getGroceryItems, getGroceryStores } from './services/db';
	import { groceryStore, groceryItems, user } from './store/stores';
	import Alert from './components/Alert.svelte';
	import GroceryList from "./components/GroceryList.svelte";
	import GroceryStoreForm from './components/GroceryStoreForm.svelte';
  	import NavBar from './components/NavBar.svelte';
	import SignUpForm from './components/SignUpForm.svelte'; 

	$: dataCalls = $user.uid && fetchData();

	async function fetchData() {
		const data = await Promise.all([
			getGroceryStores($user),
			getGroceryItems($user)
		]);
		const [stores, items] = data;
		groceryStore.syncWithDb(stores);
		groceryItems.syncWithDb(items);
		return data;
	}
</script>

<NavBar />

{#await checkLoggedIn() then _}
	{#if $user.uid}
		{#await dataCalls then [stores, items]}
			{#if stores.length}
				<Alert />
				<GroceryList />
			{:else}
				<GroceryStoreForm />
			{/if}	
		{:catch error}
			{console.error(error) || ''}
			<p>uh oh, couldn't get data... please refresh page</p>
		{/await}
	{:else}
		<h2>Sign up now and get started on your grocery list!</h2>
		<ol>
			<li>Create a grocery store</li>
			<li>Add which items are in each aisle</li>
			<li>Add items to your list in any order</li>
			<li>Shop with a list organized by where each item is</li>
		</ol>
		<SignUpForm />
	{/if}
{/await}
<style global lang="postcss">
	@import "./main.css";
</style>
<script>
	import { groceryStoreData } from './services/firebase';
	import Alert from './components/Alert.svelte';
	import GroceryList from "./components/GroceryList.svelte";
</script>

{#await groceryStoreData}
	<p>...loading</p>
{:then groceryStoreData} 
	<Alert />
	<GroceryList {groceryStoreData} />	
{:catch error}
	<p>uh oh, couldn't get data... please refresh page</p>
{/await}

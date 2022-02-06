<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import GroceryItem from './GroceryItem.svelte';

    export let sectionName = '';
    export let items = [];

</script>

<div class="mx-auto max-w-3xl">
    <div class='bg-white w-100 m-8 p-3 rounded-md shadow-lg'>
        <h2 class='text-xl font-bold pb-2'>{sectionName}</h2>
        {#each items as item}
            <GroceryItem {item} on:itemClicked={() => dispatch('itemClick', item)} on:deleteItem={() => dispatch('itemDelete', item)} />
        {/each}
    </div>
</div>
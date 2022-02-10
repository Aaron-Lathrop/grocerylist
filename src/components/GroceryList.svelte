<script>
    import { fade } from 'svelte/transition';
    import { groceryStore, groceryItems } from '../store/stores';
    import TypeAhead from './TypeAhead.svelte';
    import GrocerySection from './GrocerySection.svelte';

    export let groceryStoreData = {};

    $: {
        try {
            $groceryStore = groceryStoreData.docs[0].data();
        } catch (error) {
            $groceryStore = {};
            console.log(error);
        }
    }
    $: normalizedGroceryItems = $groceryItems.map(i => ({ name: i.name.toLowerCase(), gotIt: i.gotIt }));
    $: normalizedItemNames = normalizedGroceryItems.map(i => i.name);
    $: allItemsInStore = $groceryStore.sections.flatMap(x => x.items.map(i => i.toLowerCase()))
    $: itemsInEachSection = $groceryStore.sections
            .filter(section => section.items.some(item => normalizedItemNames.includes(item)))
            .map(section => ({ 
                name: section.name, 
                items: normalizedGroceryItems.filter(i => section.items.includes(i.name)) 
            }));
    $: itemsNotInStore = $groceryItems.filter(i => !allItemsInStore.includes(i.name.toLowerCase()));

    const handleItemClick = item => {
        $groceryItems = $groceryItems.map(s => {
            if (s.name == item.name) {
                s.gotIt = !s.gotIt;
            }
            return s;
        });
    }

    const handleItemDelete = item => {
        groceryItems.remove(item);
    }

    const clearList = () => {
        if (confirm("Confirm clearing grocery list")) {
            groceryItems.clear();
        }
    }
</script>

<TypeAhead placeholder='Add items to list' options={allItemsInStore} />
<h1 class='m-4 font-bold text-2xl text-center'>{$groceryStore.name}</h1>
{#each itemsInEachSection as s}
    <GrocerySection bind:sectionName={s.name} bind:items={s.items} 
        on:itemClick={e => handleItemClick(e.detail)} on:itemDelete={e => handleItemDelete(e.detail)} 
    />
{/each}
{#if itemsNotInStore.length}
<GrocerySection sectionName="Not in store" bind:items={itemsNotInStore} 
    on:itemClick={e => handleItemClick(e.detail)} on:itemDelete={e => handleItemDelete(e.detail)} 
/>
{/if}

{#if $groceryItems.length}
<div transition:fade class="text-center">
    <button type="button" class="text-lg p-5 w-1/2 rounded-md bg-red-300 shadow-md hover:bg-red-400 hover:shadow-lg" 
    on:click={clearList}>
        Clear all
    </button>
</div>
{:else}
<p transition:fade class="text-center text-lg">Your list is empty</p>
{/if}
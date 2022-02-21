<script>
    import { fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let item = {}
</script>

<label transition:fade class:line-through={item.gotIt} class='text-xl inline-block w-3/4 pb-4 cursor-pointer hover:bg-green-100 select-none'>
    <input type='checkbox' checked={item.gotIt} on:click={() => dispatch('itemClicked')} 
        class='mr-2 default:ring-2 checked:bg-blue-500 cursor-pointer' />
    { item.name } 
</label>
<button on:click={() => dispatch('deleteItem')} 
    class="float-right cursor-pointer border-red-300 border-2 px-3 py-1 mb-2 bg-red-100 hover:bg-red-200"
>x</button>
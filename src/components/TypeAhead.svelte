<script>
    import { alert, groceryItems } from '../store/stores'
    export let placeholder = ''
    export let options = []
    
    let value = '';
    $: foundOption = options.some(o => value !== '' && o.includes(value.toLowerCase()))
    $: filteredOptions = ( foundOption && options.filter(o => o.includes(value.toLowerCase())) ) || []

    const selectOption = option => {
        if ($groceryItems.some(i => i.name == option)) {
            $alert = `"${option}" is already on the list`;
        } else {
            groceryItems.add(option);
        }
        value = '';
    }
</script>

<div class="text-center">
    <input type="search"
            list='options' 
            placeholder={placeholder}
            class='text-lg border-2 w-11/12 p-3 mx-4 mt-4'
            bind:value={value}
            on:keydown={e => e.key == 'Enter' && selectOption(value)}
    />
    <datalist id="options">
        {#each filteredOptions as option}
            <option value={option}>{option}</option>
        {/each}
    </datalist>
    {#if value}
        <div class="text-center">
            <button type="submit" class="text-lg border rounded-md shadow-md bg-green-300 hover:bg-green-400 hover:shadow-lg py-3 w-3/4 my-5"
            on:click={() => selectOption(value)}>
                Add
            </button>
        </div>
    {/if}
</div>
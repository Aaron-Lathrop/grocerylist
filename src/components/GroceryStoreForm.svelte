<script>
    import { groceryStore, user } from '../store/stores';
    import { addGroceryStore, withTimestamp } from '../services/db';

    $: inputs = {
        storeName: { placeholder: 'Store name', value: '' },
        numberOfAisles: { 
            placeholder: 'Number of Aisles', 
            pattern: '\\d*', 
            title: 'Use numbers only', 
            value: '' 
        }
    };
    $: aisles = generateAisles(inputs.numberOfAisles.value);
    $: items = {};

    function getAisleKeyFromIndex(index) {
        return `Aisle ${index + 1}`;
    }

    function generateAisles(numberOfAisles) {
        const quantity = parseInt(numberOfAisles) || 0;
        return [...Array(quantity).keys()].map(getAisleKeyFromIndex);
    }

	async function add() {
        const store = { 
            name: inputs.storeName.value, 
            sections: aisles.map((name, i) => {
                const normalizedItems = items[i] && items[i].split(',').map(item => item.trim());
                return {
                    name,
                    items: normalizedItems || []
                }
            })
        };
        $groceryStore = [...$groceryStore, withTimestamp(store)];
        await addGroceryStore($user, store);
        inputs.storeName.value = '';
        inputs.numberOfAisles.value = '';
	}
</script>

<form on:submit|preventDefault={add} class='bg-white text-center'>
	<legend class="mx-auto text-xl font-bold">
        Add Grocery Store
    </legend>
	<fieldset class='p-5'>
        {#each Object.entries(inputs) as [name, props], i }
            <label class={`block mt-3 text-lg`} for={name + i}>
                <input 
                    class={`p-2 border-2 ${name}`}
                    placeholder={props.placeholder}
                    type='text'
                    name={name + i}
                    id={name + i}
                    pattern={props.pattern || '\.*'}
                    title={props.title || ''}
                    required
                    bind:value={props.value}
                />
            </label>
        {/each}

        {#if aisles && aisles.length}
            <strong>
                Add items found in each aisle separated with commas (example: "apples, oranges, pears")
            </strong>
        {/if}
        {#each aisles as aisle, i }
            <label class={`block mt-3 text-lg`} for={aisle}>
                {aisle}: 
                <input 
                    class={`p-2 border-2`}
                    type='text'
                    name={aisle}
                    id={aisle}
                    bind:value={items[i]}
                />
            </label>
        {/each}

		<input
			class={`
            mx-auto 
            inline-block 
            mt-3 py-3 px-5 
            rounded-lg shadow-lg 
            bg-green-300 cursor-pointer hover:bg-green-400
            `}
			type='submit'
            value='Add Store'
		/>
	</fieldset>
</form>
<script>
    import { groceryStore, user } from '../store/stores';
    import { addGroceryStore } from '../services/db';

    let storeName = '';
    
	export async function add() {
        await addGroceryStore($user, groceryStore, { name: storeName, sections: [] }) 
        storeName = '';
	}
</script>

<form on:submit|preventDefault={add} class='bg-white text-center'>
	<legend class="mx-auto text-xl font-bold">
        Add Grocery Store
    </legend>
	<fieldset class='p-5'>
		<label class='block mt-3 text-lg' for='storeName'>
			<input 
				class='p-2 border-2'
				placeholder='Store name'
                type='text'
                name='storeName'
                id='storeName'
                required
				bind:value={storeName}
			/>
		</label>

		<input
			class={`
            mx-auto 
            inline-block 
            mt-3 py-3 px-5 
            rounded-lg shadow-lg 
            bg-green-300 cursor-pointer hover:bg-green-400
            `}
			type='submit'
            value='Add'
		/>
	</fieldset>
</form>
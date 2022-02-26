<script>
    import { logInUser } from '../services/auth';

    let email = '';
	let password = '';
    
	export async function login() {
        await logInUser(email, password) 
        email = '';
        password = '';
	}
</script>

<form on:submit|preventDefault={login} class='bg-white text-center'>
	<legend class="mx-auto pt-2 text-xl font-bold">
        Log in
    </legend>
	<fieldset class='p-5'>
		<label class='block mt-3 text-lg' for='email'>
			<input 
				class='p-2 border-2'
				placeholder='Email'
				autocomplete='email'
                type='email'
                name='email'
                id='email'
                required
				bind:value={email}
			/>
		</label>

		<label class='block mt-3 text-lg' for='password'>
			<input
				class='p-2 border-2'
				placeholder='Password'
				autocomplete='new-password'
				minlength="8"
				type='password'
                name='password'
                id='password'
                required
                bind:value={password}
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
            value='Log in'
		/>
	</fieldset>
</form>
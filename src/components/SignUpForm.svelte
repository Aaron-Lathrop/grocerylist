<script>
    import { createUser } from '../services/auth';
	import { user } from '../store/stores';

    let email = '';
	let password = '';
    let confirmPassword = '';
    let message = '';
    $: passwordMismatch = password && password != confirmPassword;
    $: passwordMatch = password && password == confirmPassword;
    
	export async function signUp() {
        if (passwordMismatch) {
            message = `Passwords don't match`;
            return;
        }

        const createdUser = await createUser(email, password) 
        $user = createdUser;
        email = '';
        password = '';
        confirmPassword = '';
	}
</script>

<form on:submit|preventDefault={signUp} class='bg-white text-center absolute right-0'>
	<legend class="mx-auto mt-2 text-xl font-bold">
        Sign up
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
                class:border-green-500={passwordMatch}
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

        <label class='block mt-3 text-lg' for='confirmPassword'>
			<input 
                class:border-green-500={passwordMatch}
                class:border-red-500={passwordMismatch}
				class='p-2 border-2'
				placeholder='Confirm Password'
                autocomplete='new-password'
				minlength="8"
				type='password'
                name='confirmPassword'
                id='confirmPassword'
                required
                bind:value={confirmPassword}
			/>
		</label>

        <p>{message}</p>
		<input
			class={`
            mx-auto 
            inline-block 
            mt-3 py-3 px-5 
            rounded-lg shadow-lg 
            bg-green-300 cursor-pointer hover:bg-green-400
            `}
            class:bg-red-300={passwordMismatch}
            class:hover:bg-red-400={passwordMismatch}
			type='submit'
            value='Sign up'
		/>
	</fieldset>
</form>
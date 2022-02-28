<script>
	import { logOutUser } from '../services/auth';
	import { checkedForLogin, user } from '../store/stores';
	import LoginForm from './LoginForm.svelte';
	import SignUpForm from './SignUpForm.svelte';

	let showSignUpForm = false;
	let showLoginForm = false;

	$: links = $user.uid
	? [ {label: 'Log out', onClick: logOutUser } ]
	: [
		{ label: 'Sign up', onClick: toggleShowSignUp },
		{ label: 'Log in', onClick: toggleLoginForm }
	];

	function toggleShowSignUp() {
		showSignUpForm = !showSignUpForm;
		showLoginForm = false;
	}
	function toggleLoginForm() {
		showLoginForm = !showLoginForm;
		showSignUpForm = false;
	}
</script>

<nav class='bg-blue-700 text-white text-right'>
	<ul class='list-none inline-block'>
		{#if $checkedForLogin}
			{#each links as link}
				<li class='inline-block'>
					<button
						tabindex="0"
						class='p-3 cursor-pointer hover:bg-blue-500 focus:bg-blue-500' 
						on:click={link.onClick}>
						{link.label}
					</button>
				</li>
			{/each}
		{/if}
	</ul>
</nav>

{#if !$user.uid}
<div class='absolute right-0'>
	{#if showSignUpForm}
		<SignUpForm />
	{/if}
	{#if showLoginForm}
		<LoginForm />
	{/if}
</div>
{/if}
<script>
    import { fly } from 'svelte/transition';
    import { onDestroy } from 'svelte';
    import { alert } from '../store/stores';

    export let ms = 3000;
    let visible;
    let timeout;

    const onMessageChange = (message, ms) => {
        clearTimeout(timeout);
        if(!message) {
            visible = false;
        } else {
            visible = true;
            if (ms > 0) timeout = setTimeout(() => {
                visible = false;
                $alert = '';
            }, ms);
        }
    }
    $: onMessageChange($alert, ms);

    onDestroy(() => clearTimeout(timeout));
</script>

{#if visible}
    <div role="alert" on:click={() => visible = false}
        transition:fly="{{delay: 250, duration: 300, x: 0, y: -100, opacity: 0.5}}"
        class="fixed flex right-0 bg-green-700 p-5 w-1/2"
    >
        <p class="text-white">{$alert}</p>
    </div>
{/if}

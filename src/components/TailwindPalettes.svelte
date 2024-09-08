<script lang="ts">
	import { createEventDispatcher } from 'svelte'

  export let id: string = '1'
  // export let color: string = 'transparent'

  const dispatch = createEventDispatcher()

  const onclick = () => {
    dispatch('select', {
      text: id
    });
  }

</script>

<div data-id={id} class="swatch" on:click={onclick}></div>

<style>
	.swatch {
    display: flex;
    width: 20px;
    height: 20px;
		border-radius: 2px;
		margin: 0 2px 2px 0;
    background-color: var(--color, transparent);
	}
</style>
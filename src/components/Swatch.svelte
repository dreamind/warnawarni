<script lang="ts">
  import { type ColorType } from '$lib/types'
	import { createEventDispatcher } from 'svelte'

  // export let id: string = '1'
  export let content: string = ''
  export let color: ColorType = { name: 'transparent', code: 'transparent' };
  // export let color: string = 'transparent'

  const dispatch = createEventDispatcher()

  const onclick = () => {
    dispatch('select', {
      name: color.name
    });
  }

</script>

<div
  class="swatch content-center"
  on:click={onclick}
  style="background-color: {color.code}"
>
  {content}
  <slot></slot>
</div>

<style>
	.swatch {
    width: 80px;
    height: 80px;
		border-radius: 4px;
		margin: 0 2px 2px 0;
	}
</style>
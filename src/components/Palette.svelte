<script lang="ts">
  import { type PaletteType } from '$lib/common'
	import { createEventDispatcher } from 'svelte'
  import Swatch from './Swatch.svelte'

  // export let id: string = '1'
  export let palette: PaletteType = {
    name: 'test',
    type: 'test',
    colors: [
      {
        name: 'red',
        code: 'red',
      },
      {
        name: 'blue',
        code: 'blue',
      }
    ]
  }

  const dispatch = createEventDispatcher()

  const onselect = (event: CustomEvent) => {
    dispatch('select', {
      paletteName: palette.name,
      colorName: event.detail.name
    });
  }

</script>

<div class='palette'>
	{#each palette.colors as color}
    <Swatch color={color} on:select={onselect}>
      <div class="font-sans text-xs" style="color: {color.hsl?.l < 50 ? 'white' : 'black' }">
        <div class="font-bold">{ color.name }</div>
        <div>{ color.code?.toUpperCase() }</div>  
      </div>
    </Swatch>
	{/each}  
  
</div>

<style>
	.palette {
    display: flex;
    flex-direction: row;
	}
</style>
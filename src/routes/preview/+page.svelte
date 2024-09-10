<script lang="ts">
import "./app.css";
import { colord, extend }  from 'colord'
import Palette from '@components/Palette.svelte'
import { Slider } from '$lib/components/ui/slider'
import * as Select from '$lib/components/ui/select'
import ColorPicker from 'svelte-awesome-color-picker'
import getPalette from 'tailwindcss-palette-generator'
// import { Colors } from "tailwind-color-utilities";
import { generateConfigWithColors } from "tailwindcss-custom-colors"

import { generators, LINEAR_GEN, TW_TYPES } from '$lib/common/palette'
import { type PaletteType, type ColorType } from '$lib/types'
import a11yPlugin from 'colord/plugins/a11y'

import {type PaletteConfig } from '$lib/tints/types'
import { DEFAULT_STOPS } from '$lib/tints/constants'
import { createSwatches } from '$lib/tints/createSwatches'

import { shadesModel as rawShadesModel } from '$lib/models/shadesModel'
import {  nextModel as rawNextModel } from '$lib/models/nextModel'
import modelWrapper from '$lib/models/wrapper/wrapper'
  import { Label } from "bits-ui";

extend([a11yPlugin]);

const color = '#ff0000'
let hex = "#f3fe96"
let historyHex = [
  hex
]

let selectedType = {
  label: TW_TYPES[LINEAR_GEN],
  value: TW_TYPES[LINEAR_GEN]
}

export let history: PaletteType[] = [];
export let currentPalette: PaletteType = {
  name: 'test',
  type: 'test',
  colors: generators[selectedType.value](hex)
}

const twTypes = Object.keys(TW_TYPES).map(t => ({
  label: t,
  value: t
}))

const generate = () => {
  const colors = generators[selectedType.value](hex)
  if (currentPalette) {
    history = [...history, { ...currentPalette }]
  }
  currentPalette.colors = colors
}

</script>

<main>
  <div class='palette-history'>
    {#each history as palette}
      <Palette palette={palette} />
    {/each}    
  </div>

  <ColorPicker
    bind:hex
    position="responsive"
    isAlpha={false}
    isTextInput={true}
    on:input={(event) => {
      if (event?.detail?.hex) {
        historyHex = [...historyHex, event.detail.hex];
      }
    }}  
    />
    <Select.Root
      selected={selectedType}
      onSelectedChange={(v) => {
        if (v) {
          selectedType = {
            value: v.value,
            label: v.value
          }
        }
      }}      
    >
      <Select.Trigger class="w-[180px]">
        <Select.Value placeholder="Select generator" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          {#each twTypes as t}
            <Select.Item value={t.value} label={t.label}
              >{t.label}</Select.Item
            >
          {/each}
        </Select.Group>
      </Select.Content>
      <!-- <Select.Input name="selectedType" /> -->
    </Select.Root>
    <button on:click={generate}>Generate</button>
  <Palette palette={currentPalette}/>
</main>

<style lang="postcss">

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }

</style>
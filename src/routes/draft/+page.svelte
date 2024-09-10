<script lang="ts">
import "./app.css";
import { colord, extend }  from 'colord'
import Palette from '@components/Palette.svelte'
import { Slider } from '$lib/components/ui/slider'
import ColorPicker from 'svelte-awesome-color-picker'
import getPalette from 'tailwindcss-palette-generator'
// import { Colors } from "tailwind-color-utilities";
import { generateConfigWithColors } from "tailwindcss-custom-colors"

import { type PaletteType, type ColorType } from '$lib/types'
import a11yPlugin from 'colord/plugins/a11y'

import {type PaletteConfig } from '$lib/tints/types'
import { DEFAULT_STOPS } from '$lib/tints/constants'
import { createSwatches } from '$lib/tints/createSwatches'

import { shadesModel as rawShadesModel } from '$lib/models/shadesModel'
import {  nextModel as rawNextModel } from '$lib/models/nextModel'
import modelWrapper from '$lib/models/wrapper/wrapper'

extend([a11yPlugin]);

let nextModel = modelWrapper(rawNextModel);
let shadesModel = modelWrapper(rawShadesModel);

const config: PaletteConfig = {
  id: 'yn41mK6tynJeaFW1kpV8G',
  name: "",
  value: ``,
  valueStop: 100,
  swatches: [],
  h: 0,
  s: 0,
  lMin: 0,
  lMax: 100,
  useLightness: true,
  mode: 'hex',
}


const color = '#ff0000'
let hex = "#f3fe96"
let historyHex = [
  hex
]

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

export let palette2: PaletteType = {
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

export let palette3: PaletteType = {
  name: 'test',
  type: 'test',
  colors: []
}

export let palette4: PaletteType = {
  name: 'test',
  type: 'test',
  colors: []
}

export let palette5: PaletteType = {
  name: 'test',
  type: 'test',
  colors: []
}



const generatePalette = (code: string) => {
  const { h, s } = colord(code).toHsl()
  const p: ColorType[] = []
  for (let i = 1; i < 10; i++) {
    let l = i * 100;
    const name = l + ''
    l = (1000 - l) / 10.0
    const obj = colord({ h, s, l });
    const code = obj.toHex();
    p.push({
      name,
      code,
      obj,
      hsl: { h, s, l }
    })
  }
  palette.colors = p
  //console.log(p)
  const stringPalette = getPalette(hex);
  
  const p2 = []
  for (let i = 100; i <= 900; i += 100) {
    const name = i + ''
    const code = stringPalette.primary[name]
    const obj = colord(code);
    p2.push({
      name,
      code,
      obj,
      hsl: obj.toHsl()
    })
  }  
  palette2.colors = p2
  const c3 = generateConfigWithColors({
    color: hex,
    name: "primary"
  });

  const p3 = []
  for (let i = 100; i <= 900; i += 100) {
    const name = i + ''
    const r = c3.primary[name]    
    const x = r.match(/(rgb.+)\//)
    let obj
    if (x) {
      obj = colord(x[1].trim() + ')');
    } else {
      obj = colord('#7f7f7f')
    }    
    const code = obj.toHex()
    p3.push({
      name,
      code,
      obj,
      hsl: obj.toHsl()
    })
  }  
  palette3.colors = p3

  const p4: any[] = []
  config.value = hex.slice(1).toUpperCase()
  const luminance = 1000 - (colord(hex).luminance() * 1000);
  // map to 10 - 1000
  let valueStop = [...DEFAULT_STOPS].sort( (a, b) => Math.abs(luminance - a) - Math.abs(luminance - b) )[0]  
  if (valueStop === 1000) {
    valueStop = 950
  }
  if (valueStop === 0) {
    valueStop = 50
  }
  // config.valueStop = 400
  config.valueStop = valueStop
  // console.log(JSON.stringify(config, null, 2))
  const c4 = createSwatches(config);
  // const c4map = c4.reduce((acc: any, c: any) => {
  //   acc[c.stop] = c.hex
  //   return acc
  // }, {})
  // console.log(c4)

  for (let i = 2; i <= 10; i += 1) {
    const name = (i-1) * 100 + ''
    const code = c4[i].hex
    const obj = colord(code)
    p4.push({
      name,
      code,
      obj,
      hsl: obj.toHsl()
    })
  }  
  palette4.colors = p4


  const c5 = shadesModel(hex)  

  const p5 = []
  for (let i = 1; i <= 9; i += 1) {
    const name = i * 100 + ''
    const r = c5['r' + i] * 255
    const g = c5['g' + i] * 255
    const b = c5['b' + i] * 255
    const obj = colord({ r, g, b });
    const code = obj.toHex()
    p5.push({
      name,
      code,
      obj,
      hsl: obj.toHsl()
    })
  }  
  palette5.colors = p5  
}  

$: generatePalette(hex)

</script>

<main>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src="{viteLogo}" class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src="{svelteLogo}" class="logo svelte" alt="Svelte Logo" />
    </a>
  </div> -->
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
  <Palette palette={palette} on:select={() => alert('red')} />
  <Palette palette={palette2} on:select={() => alert('red')} />
  <Palette palette={palette3} on:select={() => alert('red')} />
  <Palette palette={palette4} on:select={() => alert('red')} />
  <Palette palette={palette5} on:select={() => alert('red')} />
  <!-- <div class="card">
    <Counter></Counter>
  </div>
  <Slider value={[33]} max={100} step={1} />
  <h1 class="text-3xl font-bold underline">
  Hello world!
</h1> -->

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
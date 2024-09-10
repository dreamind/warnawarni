import { colord, extend }  from 'colord'
import Palette from '@components/Palette.svelte'
import { Slider } from '$lib/components/ui/slider'
import ColorPicker from 'svelte-awesome-color-picker'
import getPalette from 'tailwindcss-palette-generator'
// import { Colors } from "tailwind-color-utilities";
import { generateConfigWithColors } from "tailwindcss-custom-colors"

import { type PaletteType, type ColorType } from '$lib/common'
import a11yPlugin from 'colord/plugins/a11y'

import {type PaletteConfig } from '$lib/tints/types'
import { DEFAULT_STOPS } from '$lib/tints/constants'
import { createSwatches } from '$lib/tints/createSwatches'

import { shadesModel as rawShadesModel } from '$lib/models/shadesModel'
import {  nextModel as rawNextModel } from '$lib/models/nextModel'
import modelWrapper from '$lib/models/wrapper/wrapper'

const nextModel = modelWrapper(rawNextModel);
const shadesModel = modelWrapper(rawShadesModel);


export const LINEAR_GEN = 'linear-generator'
export const TW_PALETTE_GEN = 'tailwindcss-palette-generator'
export const TW_CUSTOM_COLORS = 'tailwindcss-custom-colors'
export const TINTS_DEV = 'tints-dev'
export const TW_INK = 'tailwindink'

export const TW_TYPES = {
  [LINEAR_GEN]: LINEAR_GEN,
  [TW_PALETTE_GEN]: TW_PALETTE_GEN,
  [TW_CUSTOM_COLORS]: TW_CUSTOM_COLORS,
  [TINTS_DEV]: TINTS_DEV,
  [TW_INK]: TW_INK
}

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

export const generators = {
  [LINEAR_GEN]: (hex: string): ColorType[] => {
    const { h, s } = colord(hex).toHsl()
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
    return p
  },
  [TW_PALETTE_GEN]:  (hex: string): ColorType[] => {
    const palette = getPalette(hex);
  
    const colors = []
    for (let i = 100; i <= 900; i += 100) {
      const name = i + ''
      const code = palette.primary?.[name]
      const obj = colord(code);
      colors.push({
        name,
        code,
        obj,
        hsl: obj.toHsl()
      })
    }
    return colors 
  },
  [TW_CUSTOM_COLORS]:  (hex: string): ColorType[] => {
    const palette = generateConfigWithColors({
      color: hex,
      name: "primary"
    });
  
    const colors = []
    for (let i = 100; i <= 900; i += 100) {
      const name = i + ''
      const r = palette.primary[name]    
      const x = r.match(/(rgb.+)\//)
      let obj
      if (x) {
        obj = colord(x[1].trim() + ')');
      } else {
        obj = colord('#7f7f7f')
      }    
      const code = obj.toHex()
      colors.push({
        name,
        code,
        obj,
        hsl: obj.toHsl()
      })
    }  
    return colors 
  },
  [TINTS_DEV]:  (hex: string): ColorType[] => {
    const colors: any[] = []
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
    config.valueStop = valueStop
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
      colors.push({
        name,
        code,
        obj,
        hsl: obj.toHsl()
      })
    }  
    return colors
  },
  [TW_INK]:  (hex: string): ColorType[] => {
    const c5 = shadesModel(hex)  

    const colors = []
    for (let i = 1; i <= 9; i += 1) {
      const name = i * 100 + ''
      const r = c5['r' + i] * 255
      const g = c5['g' + i] * 255
      const b = c5['b' + i] * 255
      const obj = colord({ r, g, b });
      const code = obj.toHex()
      colors.push({
        name,
        code,
        obj,
        hsl: obj.toHsl()
      })
    }    
    return colors  
  }
}

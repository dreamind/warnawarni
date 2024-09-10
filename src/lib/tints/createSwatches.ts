import {DEFAULT_PALETTE_CONFIG} from './constants'
import {
  clamp,
  hexToHSL,
  HSLToHex,
  lightnessFromHSLum,
  luminanceFromHex,
  unsignedModulo,
} from './helpers'
import {createDistributionValues, createHueScale, createSaturationScale} from './scales'
import type {PaletteConfig} from './types'

export function createSwatches(palette: PaletteConfig) {
  // palette.swatches = []
  // palette.value = '2580b5'
  // palette.valueStop = 400
  // palette.name = ''
  // palette.lMin = 0
  console.log(JSON.stringify(palette, null, 2))

  let {value, valueStop} = palette

  // Tweaks may be passed in, otherwise use defaults
  const useLightness = palette.useLightness ?? DEFAULT_PALETTE_CONFIG.useLightness
  const h = palette.h ?? DEFAULT_PALETTE_CONFIG.h
  const s = palette.s ?? DEFAULT_PALETTE_CONFIG.s
  let lMin = palette.lMin ?? DEFAULT_PALETTE_CONFIG.lMin
  const lMax = palette.lMax ?? DEFAULT_PALETTE_CONFIG.lMax

  // Create hue and saturation scales based on tweaks
  const hueScale = createHueScale(h, valueStop)
  const saturationScale = createSaturationScale(s, valueStop)
  // Get the base hex's H/S/L values
  const {h: valueH, s: valueS, l: valueL} = hexToHSL(value)

  // Create lightness scales based on tweak + lightness/luminance of current value
  const lightnessValue = useLightness ? valueL : luminanceFromHex(value)
  console.log(lMin, lMax, lightnessValue, valueStop)
  const distributionScale = createDistributionValues(lMin, lMax, lightnessValue, valueStop)
  // console.log(JSON.stringify(hueScale, null, 2))
  // console.log(JSON.stringify(saturationScale, null, 2))
  console.log(
    JSON.stringify(
      distributionScale.map((d: any) => d.tweak),
      null,
      2,
    ),
  )

  const swatches = hueScale.map(({stop}, stopIndex) => {
    const newH = unsignedModulo(valueH + hueScale[stopIndex].tweak, 360)
    const newS = clamp(valueS + saturationScale[stopIndex].tweak, 0, 100)
    const newL = useLightness
      ? distributionScale[stopIndex].tweak
      : lightnessFromHSLum(newH, newS, distributionScale[stopIndex].tweak)

    const newHex = HSLToHex(newH, newS, newL)

    return {
      stop,
      // Sometimes the initial value is changed slightly during conversion,
      // overriding that with the original value
      hex: stop === valueStop ? `#${value.toUpperCase()}` : newHex.toUpperCase(),
      // Used in graphs
      h: newH,
      hScale: ((unsignedModulo(hueScale[stopIndex].tweak + 180, 360) - 180) / 180) * 50,
      s: newS,
      sScale: newS - 50,
      l: newL,
    }
  })
  console.log(swatches)
  return swatches
}

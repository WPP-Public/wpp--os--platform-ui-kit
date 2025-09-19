import React, { useEffect, useState } from 'react'

import { WppInput, WppTypography } from '@platform-ui-kit/components-library-react'
import { InputChangeEventDetail } from '@platform-ui-kit/components-library'
import ColorAPI from 'color'

import generator from 'colors-generator'

import './ColorsGenerator.scss'

const ColorBlock = ({ color, text }: { color: string; text?: string }) => (
  <div className="color-block" style={{ backgroundColor: color }}>
    <WppTypography>{text}</WppTypography>
    <WppTypography>{color}</WppTypography>
  </div>
)

const ColorsListSection = ({ colors, title }: { colors: string[]; title: string }) => (
  <div className="colors-list-section">
    <WppTypography type="xl-heading">{title}</WppTypography>
    <div className="colors-list">
      {colors.map((color, index) => (
        <ColorBlock color={color} key={color + index} />
      ))}
    </div>
  </div>
)

interface ColorParams {
  darken: string | undefined
  lighten: string | undefined
  lightness: string | undefined
  saturate: string | undefined
  desaturate: string | undefined
  fade: string | undefined
  opaquer: string | undefined
}

const initialColorParams = {
  darken: undefined,
  lighten: undefined,
  lightness: undefined,
  saturate: undefined,
  desaturate: undefined,
  fade: undefined,
  opaquer: undefined,
}

export const ColorsGenerator = () => {
  const [color, setColor] = useState<string>('#5e00b5')
  const [transformedColor, setTransformedColor] = useState<string>('#5e00b5')
  const [generatedColors, setGeneratedColors] = useState([])
  const [mainPaletteColors, setMainPaletteColors] = useState<string[]>([])
  const [mainPaletteLightness, setMainPaletteLightness] = useState<string[]>([])

  const [colorParams, setColorParams] = useState<ColorParams>(initialColorParams)

  const generateMainPallete = (color: string) => {
    if (color.length === 7) {
      const left = []
      const right = []

      const newColor = ColorAPI(color)

      const step = 0.1
      const itemsNumber = 4

      for (let i = 0; i < itemsNumber; i++) {
        left.push(newColor.lighten((itemsNumber - i) * step).hex() as string)
        right.push(newColor.darken(step * i).hex() as string)
      }

      setMainPaletteColors([...left, ...right])

      const palleteBasedOnLightness: string[] = []

      for (let i = 0; i < itemsNumber * 2; i++) {
        palleteBasedOnLightness.push(newColor.lightness((itemsNumber * 2 - i) * 10).hex())
      }
      setMainPaletteLightness([...palleteBasedOnLightness])
    }
  }

  const handleColorChange = (color: string) => {
    setColor(color)
    setTransformedColor(color)

    setColorParams(initialColorParams)

    generateMainPallete(color)
  }

  const handleColorChangeByText = (event: CustomEvent<InputChangeEventDetail>) => {
    handleColorChange(event.detail.value || '')
  }

  const handleColorParamsChange = (keyName: string) => (event: CustomEvent<InputChangeEventDetail>) =>
    setColorParams({
      ...colorParams,
      [keyName]: event.detail.value,
    })

  useEffect(() => {
    if (transformedColor && transformedColor.length === 7) {
      // @ts-ignore typings
      setGeneratedColors([...(generator.generate(transformedColor, 10).get() as string[])])
    }
  }, [transformedColor])

  useEffect(() => {
    if (color.length === 7) {
      const transformations = Object.fromEntries(Object.entries(colorParams).filter(([, v]) => v !== undefined))

      let newColor = ColorAPI(color)

      Object.keys(transformations).forEach(transformation => {
        // @ts-ignore typings
        newColor = newColor[transformation](transformations[transformation])
      })

      setTransformedColor(newColor.hex())
    }

    generateMainPallete(transformedColor)
  }, [colorParams])

  return (
    <div className="colors-generator">
      <div className="tools">
        <WppTypography type="xl-heading">Tools Used</WppTypography>
        <a href="https://github.com/Qix-/color" target="_blank">
          color (color manipulation etc.)
        </a>
        <a href="https://github.com/zenxds/colors-generator" target="_blank">
          colors-generator (generating palette)
        </a>
      </div>

      <div className="input-info">
        <div className="left">
          <WppTypography type="xl-heading">Base Color Input</WppTypography>

          <WppInput
            type="text"
            placeholder="Enter color hex (#5e00b5)"
            onWppChange={handleColorChangeByText}
            value={color}
            labelConfig={{ text: 'Base color (#5e00b5)' }}
            required
          />
          <br />

          <input value={color} type="color" onChange={event => handleColorChange(event.target.value)} />

          <div className="colors">
            <ColorBlock color={color} text={'Initial'} />
            <ColorBlock color={transformedColor} text={'Manipulated'} />
          </div>
        </div>
        <div className="right">
          <WppTypography type="xl-heading">Base color manipulation</WppTypography>
          <div className="manipulation-list">
            {Object.keys(colorParams).map((param, index) => (
              <WppInput
                key={param + index}
                type="text"
                placeholder={`${param} ${param === 'lightness' ? '[0, 100]' : '[0, 1]'}`}
                onWppChange={handleColorParamsChange(param)}
                value={colorParams[param as keyof ColorParams]}
                labelConfig={{ text: `${param} ${param === 'lightness' ? '[0, 100]' : '[0, 1]'}` }}
              />
            ))}
          </div>
        </div>
      </div>

      <ColorsListSection colors={generatedColors} title={'Generated colors'} />
      <ColorsListSection colors={mainPaletteColors} title={'Primary Palette'} />
      <ColorsListSection colors={mainPaletteLightness} title={'Primary Palette Based on Lightness (step = 10)'} />
    </div>
  )
}

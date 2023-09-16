// theme.ts

// 1. import `extendTheme` function
import { ThemeConfig, extendTheme, withDefaultColorScheme, withDefaultVariant } from '@chakra-ui/react'
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
// import { ComponentStyleConfig } from '@chakra-ui/react'

// define the base component styles
const baseStyle = {
  borderRadius: 'md', // add a border radius
  fontWeight: 'normal', // change the font weight
  border: '1px solid', // add a border
}

export const tooltipTheme = defineStyleConfig({ baseStyle })

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

// 3. extend the theme

const themeGreen = extendTheme(
  {
    components: {
      Tooltip: tooltipTheme
    }
  }
  , withDefaultColorScheme({ colorScheme: 'green', components: ['Button', 'Link'], })
  , withDefaultVariant({ variant: 'outline', components: ['Button'] })
  , config
)

export default themeGreen
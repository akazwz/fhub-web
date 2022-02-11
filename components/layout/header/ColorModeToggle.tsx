import {
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { Sun, Moon } from '@icon-park/react'

export const ColorModeToggle = () => {
  const { toggleColorMode } = useColorMode()
  const fillColor = useColorModeValue('black', 'white')
  const text = useColorModeValue('dark', 'light')
  let themeColor = useColorModeValue('#1A202C', '#ffffff',)
  const SwitchIcon = useColorModeValue(
    <Moon theme="outline" size="24" fill={fillColor}/>,
    <Sun theme="outline" size="24" fill={fillColor}/>
  )
  const handleToggleColorMode = () => {
    toggleColorMode()
    let themeColorMeta = document.querySelector('meta[name="theme-color"]')
    if (!themeColorMeta) {
      let newThemeColorMeta = document.createElement('meta')
      newThemeColorMeta.setAttribute('name', 'theme-color')
      newThemeColorMeta.content = themeColor
      document.getElementsByTagName('head')[0].appendChild(newThemeColorMeta)
      return
    }
    themeColorMeta.setAttribute('content', themeColor)
  }

  return (
    <>
      <IconButton
        aria-label={`Switch to ${text} mode`}
        variant="ghost"
        color="current"
        onClick={handleToggleColorMode}
        icon={SwitchIcon}
        rounded={'full'}
      />
    </>
  )
}


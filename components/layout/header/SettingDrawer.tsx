import { useRef } from 'react'
import {
  Box,
  Flex,
  Text,
  IconButton,
  CloseButton,
  DrawerContent,
  DrawerOverlay,
  useColorModeValue,
  useDisclosure,
  Drawer,
  BoxProps,
} from '@chakra-ui/react'
import { SettingTwo } from '@icon-park/react'

interface IProps extends BoxProps {
  onClose: () => void;
}

const SettingContent = ({ onClose, ...rest }: IProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      transition="3s ease"
      pos="fixed"
      borderLeftWidth="1px"
      borderLeftColor={useColorModeValue('gray.200', 'gray.700')}
      w="full"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
      >
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Setting
        </Text>
        <CloseButton onClick={onClose}/>
      </Flex>
    </Box>
  )
}

const SettingDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  return (
    <Box bg={useColorModeValue('grey.100', 'grey.700')}>
      <IconButton
        ref={btnRef}
        aria-label={''}
        icon={<SettingTwo theme="outline" size="24"/>}
        variant="ghost"
        rounded={'full'}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        size={'md'}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay/>
        <DrawerContent>
          <SettingContent onClose={onClose}/>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default SettingDrawer

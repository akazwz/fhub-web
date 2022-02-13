import {
  Box, Button,
  Drawer,
  DrawerContent,
  DrawerOverlay, HStack,
  IconButton,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { useRef } from 'react'
import { FolderPlus, Plus, UploadOne } from '@icon-park/react'

export const MobileFileOption = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  return (
    <Box
      bg={useColorModeValue('grey.100', 'grey.700')}
      pos={'fixed'}
      bottom={'10vh'}
      right={'10vw'}
      display={{ base: 'flex', md: 'none' }}
    >
      <IconButton
        ref={btnRef}
        aria-label={''}
        icon={<Plus theme="outline" size="24"/>}
        rounded={'full'}
        size="lg"
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="bottom"
        size={'xs'}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay/>
        <DrawerContent bg={'transparent'}>
          <HStack
            minH={'30vh'}
            bg={useColorModeValue('blue.200', 'blue.800')}
            rounded={'lg'}
            m={7}
            justifyContent={'center'}
            spacing={7}
          >
            <Button
              leftIcon={<UploadOne/>}
              colorScheme={'blue'}
            >
              Upload
            </Button>
            <Button
              leftIcon={<FolderPlus/>}
            >
              New Folder
            </Button>
          </HStack>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
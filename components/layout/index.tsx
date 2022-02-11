import { ReactNode } from 'react'
import {
  Box,
  Drawer, DrawerContent,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { Header } from './header'
import { Sidebar } from './sidebar'

interface IProps {
  children: ReactNode
}

export const Layout = ({ children }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      {/* md sidebar */}
      <Sidebar onClose={onClose} display={{ base: 'none', md: 'block' }}/>
      {/* drawer sidebar */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose}/>
        </DrawerContent>
      </Drawer>
      <Header onOpen={onOpen}/>
      <Box minH="100%" ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}
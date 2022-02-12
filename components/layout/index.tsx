import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
  Drawer,
} from '@chakra-ui/react'
import { Header } from './header'
import { Sidebar } from './sidebar'
import { useUser } from '../../src/hooks/useUser'
import { LoadingPage } from '../loading'

interface IProps {
  children: ReactNode
}

export const Layout = ({ children }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('gray.100', 'gray.900')

  const router = useRouter()
  const { user, isError, isLoading } = useUser()

  /* 获取用户信息失败， 重新登录 */
  if (isError) {
    setTimeout(() => {
      router.push('/login', undefined, { locale: router.locale }).then()
    }, 3000)
  }

  /*if (isLoading) {
    return <LoadingPage/>
  }*/

  return (
    <Box minH="100vh" bg={bg}>
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
      <Header onOpen={onOpen} user={user}/>
      <Box minH="100%" ml={{ base: 0, md: 60 }} p="4">
        {isLoading ? <LoadingPage/> : children}
      </Box>
    </Box>
  )
}
import { ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Flex,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { Sidebar } from './sidebar'
import { useUser } from '../../src/hooks/useUser'
import { LoadingPage } from '../loading'
import { LayoutIcon, LayoutIconLeft, LayoutIconRight } from './LayoutIcon'

interface IProps {
  children: ReactNode
}

export const Layout = ({ children }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const [isHover, setIsHover] = useState<boolean>(false)
  const bg = useColorModeValue('gray.100', 'rgb(17, 17, 19)')

  const router = useRouter()
  const { user, isUserError, isUserLoading } = useUser()

  /* 获取用户信息失败， 重新登录 */
  if (isUserError) {
    setTimeout(() => {
      router.push('/login', undefined, { locale: router.locale }).then()
    }, 3000)
  }

  const hoverIcon = isOpen
    ? <LayoutIconLeft width={'30px'} height={'42px'} onClick={onClose}/>
    : <LayoutIconRight width={'30px'} height={'42px'} onClick={onOpen}/>

  return (
    <Box minH="100vh" bg={bg}>
      <Sidebar isOpen={isOpen}/>
      <Flex
        transition="all .3s ease"
        alignItems="center"
        pos="fixed"
        h="full"
        left={isOpen ? '240px' : 0}
        w={'30px'}
      >
        <Box
          onMouseEnter={() => {setIsHover(true)}}
          onMouseLeave={() => {setIsHover(false)}}
        >
          {isHover
            ? hoverIcon
            : <LayoutIcon width={'30px'} height={'42px'}/>
          }
        </Box>
      </Flex>
      {isUserLoading
        ? <LoadingPage/>
        : <Box
          transition="all .3s ease"
          ml={isOpen ? '240px' : 0}
          bg={bg}
          h={'100vh'}
          p={'28px'}
        >
          {children}
        </Box>
      }
    </Box>
  )
}
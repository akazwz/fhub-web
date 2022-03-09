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
import { FileBreadCrumb } from '../file/FileBreadCrumb'
import BreadCrumbHeader from '../drive/BreadCrumbHeader'
import FileOptionLayoutBar from '../drive/FileOptionLayoutBar'

interface IProps {
  children: ReactNode
}

interface InterfaceLeftSideBar {
  isOpen: boolean
}

const LeftSideBar = (props: InterfaceLeftSideBar) => {
  return (
    <>
      {/* sider */}
      <Box
        w={props.isOpen ? '240px' : 0}
        opacity={1}
        bg={useColorModeValue('', 'rgb(34, 34, 38)')}
        flex="none"
        position="relative"
        height="100%"
        transition={'width .66s cubic-bezier(0.66, 0, 0.01, 1)'}
        willChange="width"
        overflow="hidden"
      >
        {/* sider-wraper */}
        <Flex
          position="relative"
          flex="none"
          flexDirection="column"
          height="100%"
          width="240px"
        >
          {/* scroll container */}
          <Box
            position="relative"
            width="100%"
            height="100%"
            overflow="hidden"
          >
            {/* simplebar container wrapper */}
            <Box
              scrollBehavior="auto"
              outline="none"
            >
              {/* scroll wrapper */}
              <Flex
                width="100%"
                flexDirection="column"
                alignItems="stretch"
                justifyContent="space-between"
                minHeight="100%"
              >
                <Sidebar/>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  )
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
    ? <LayoutIconLeft width={'24px'} height={'42px'} onClick={onClose}/>
    : <LayoutIconRight width={'24px'} height={'42px'} onClick={onOpen}/>

  return (
    /* body */
    <Box
      display="flex"
      flexDirection="column"
      position="absolute"
      h="100vh"
      w="100vw"
      bg={bg}
    >
      <Flex
        id="layout"
        flexDirection="row"
        minH={0}
        overflow="hidden"
        flexGrow={1}
        flexShrink={1}
        flexBasis="0%"
      >
        <LeftSideBar isOpen={isOpen}/>
        {/* content */}
        <Box
          paddingTop="28px"
          flexGrow={1}
          flexShrink={1}
          flexBasis="0%"
          position="relative"
          height="100%"
          backgroundColor={useColorModeValue('', 'rgb(17, 17, 19)')}
          overflow="hidden"
        >
          {children}
          {/* sider control */}
          <Flex
            position="absolute"
            top="50%"
            left={0}
            width="32px"
            height="100px"
            justifyContent="center"
            alignItems="center"
            transform={'translateY(-50%)'}
            transition={'opacity .3s ease'}
          >
            <Flex
              width="100%"
              height="50px"
              alignItems="center"
              justifyContent="flex-start"
              paddingLeft="4px"
              cursor="pointer"
              onMouseEnter={() => {setIsHover(true)}}
              onMouseLeave={() => {setIsHover(false)}}
            >
              {isHover
                ? hoverIcon
                : <LayoutIcon width={'24px'} height={'42px'} onClick={() => {
                  if (isOpen) {
                    onClose()
                  } else {
                    onOpen()
                  }
                }}/>
              }
            </Flex>
          </Flex>
        </Box>
      </Flex>
      {/*<Sidebar isOpen={isOpen}/>
      <Flex
        transition="all .3s ease"
        alignItems="center"
        pos="fixed"
        h="full"
        left={isOpen ? '240px' : 0}
      >
        <Box
          onMouseEnter={() => {setIsHover(true)}}
          onMouseLeave={() => {setIsHover(false)}}
        >
          {isHover
            ? hoverIcon
            : <LayoutIcon width={'24px'} height={'42px'}/>
          }
        </Box>
      </Flex>
      {isUserLoading
        ? <LoadingPage/>
        : <Flex
          transition="all .3s ease"
          ml={isOpen ? '240px' : 0}
          bg={'red.500'}
          w="100%"
          h="full"
          pt="28px"
          pos="relative"
          overflow="scroll"

        >
          {children}
        </Flex>
      }*/}
    </Box>
  )
}
import {
  Box,
  Flex,
  Text,
  Spacer,
  HStack,
  useColorModeValue,
  BoxProps,
} from '@chakra-ui/react'
import { CloudStorage } from '@icon-park/react'
import { NavItems } from './NavItems'
import UserProfileSideBar from './UserProfileSideBar'

interface SidebarProps extends BoxProps {
  isOpen: boolean;
}

const SidebarTop = () => {
  return (
    <Flex
      h="5rem"
      alignItems="center"
      mx="8"
      justifyContent="space-between"
    >
      <HStack
        spacing={3}
      >
        <CloudStorage
          theme="two-tone"
          size="37px"
          fill={[useColorModeValue('black', 'white'), '#2F88FF']
          }
        />
        <Text
          bgGradient="linear(to-r,  #FF0080, #00B0FF)"
          bgClip="text"
          fontSize="3xl"
          fontWeight="extrabold"
        >
          FHub
        </Text>
      </HStack>
    </Flex>
  )
}

export const Sidebar = ({ isOpen, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="all .3s ease"
      bg={useColorModeValue('white', 'gray.800')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={isOpen ? '240px' : 0}
      pos="fixed"
      h="full"
      overflow="scroll"
      css={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
      {...rest}
    >
      <Flex
        direction="column"
        h="full"
      >
        <SidebarTop/>
        <NavItems/>
        <Spacer/>
        <UserProfileSideBar/>
      </Flex>
    </Box>
  )
}
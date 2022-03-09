import {
  Box,
  Flex,
  Text,
  Spacer,
  HStack,
  useColorModeValue,
  BoxProps, Divider,
} from '@chakra-ui/react'
import { CloudStorage } from '@icon-park/react'
import { NavItems } from './NavItems'
import UserProfileSideBar from './UserProfileSideBar'

interface SidebarProps extends BoxProps {
}

const SidebarTop = () => {
  return (
    <Flex
      alignItems="center"
      mx="24px"
      pt="36px"
      pb="36px"
      justifyContent="space-between"
    >
      <HStack
        spacing={3}
        h="24px"
      >
        <CloudStorage
          theme="two-tone"
          size="21px"
          fill={[useColorModeValue('black', 'white'), '#2F88FF']
          }
        />
        <Text
          bgGradient="linear(to-r,  #FF0080, #00B0FF)"
          bgClip="text"
          fontSize="21px"
          fontWeight="extrabold"
        >
          FHub
        </Text>
      </HStack>
    </Flex>
  )
}

export const Sidebar = ({ ...rest }: SidebarProps) => {
  return (
    <Box
      transition="all .3s ease"
      bg={useColorModeValue('white', 'rgb(34, 34, 38)')}
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
        <Divider/>
        <UserProfileSideBar/>
      </Flex>
    </Box>
  )
}
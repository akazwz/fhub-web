import { ReactText } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Flex,
  Link,
  useColorModeValue,
  FlexProps, Text,
} from '@chakra-ui/react'
import IconPark from '@icon-park/react/lib/all'

interface LinkItemProps {
  name: string
  routeName: string
  iconName: string
}

const LinkItems: Array<LinkItemProps> = [
  { name: '文件', routeName: 'drive', iconName: 'FileSuccess' },
  { name: '相册', routeName: 'album', iconName: 'Picture' },
  { name: '收藏夹', routeName: 'image', iconName: 'Like' },
  { name: '保险箱', routeName: 'music', iconName: 'Strongbox' },
  { name: '订阅', routeName: 'star', iconName: 'Rss' },
  { name: '回收站', routeName: 'star', iconName: 'Delete' },
]

interface NavItemProps extends FlexProps {
  routeName: string
  iconName: string
  children: ReactText
}

const NavItem = ({ iconName, routeName, children, ...rest }: NavItemProps) => {
  const router = useRouter()
  const bg = useColorModeValue('blue.200', 'rgba(132,133,141,0.24)')
  return (
    <Link href={'/' + routeName} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        w="216px"
        alignItems="center"
        p="12px"
        mx="12px"
        mb="1"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={'/' + routeName === router.asPath ? bg : 'transparent'}
        _hover={{
          bg: useColorModeValue('blue.100', 'rgba(132,133,141,0.12)'),
        }}
        {...rest}
      >
        {iconName && (
          <Box mr="3">
            <IconPark
              type={iconName}
              size="21px"
            />
          </Box>
        )}
        <Text fontSize="14px">
          {children}
        </Text>
      </Flex>
    </Link>
  )
}

export const NavItems = () => {
  const list = LinkItems.map((link) => (
    <NavItem
      key={link.name}
      routeName={link.routeName}
      iconName={link.iconName}
    >
      {link.name}
    </NavItem>
  ))
  return <Box>{list}</Box>
}
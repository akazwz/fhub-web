import {
  Text,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  FlexProps,
} from '@chakra-ui/react'
import { CloudStorage, HamburgerButton, } from '@icon-park/react'
import { ColorModeToggle } from './ColorModeToggle'
import SettingDrawer from './SettingDrawer'
import { ProfileMenu } from './ProfileMenu'
import { IUser } from '../../../src/hooks/useUser'

interface IProps extends FlexProps {
  onOpen: () => void;
  user: IUser
}

export const Header = ({ onOpen, user, ...rest }: IProps) => {
  return (
    <Flex
      transition="1s ease"
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        aria-label={'open menu'}
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        icon={<HamburgerButton/>}
      />

      <HStack
        spacing={3}
        display={{ base: 'flex', md: 'none' }}
      >
        <CloudStorage
          theme="two-tone"
          size="30px"
          fill={[useColorModeValue('black', 'white'), '#2F88FF']
          }
        />
        <Text
          bgGradient="linear(to-r,  #FF0080, #00B0FF)"
          bgClip="text"
          fontSize="xl"
          fontWeight="extrabold"
        >
          FHub
        </Text>
      </HStack>
      <HStack spacing={{ base: 1, md: 6 }}>
        <ColorModeToggle/>
        <SettingDrawer/>
        <ProfileMenu
          username={user.username}
          email={user.email}
          phone={user.phone}
          gender={user.gender}
          role={user.role}
          avatar={user.avatar}
          createAt={user.createAt}
        />
      </HStack>
    </Flex>
  )
}
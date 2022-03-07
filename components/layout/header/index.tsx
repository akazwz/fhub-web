import {
  Menu,
  Flex,
  HStack,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,
  FlexProps,
} from '@chakra-ui/react'
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons'
import { FolderPlus, UploadOne } from '@icon-park/react'
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
      px={3}
      height="5rem"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        aria-label={'open menu'}
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="ghost"
        icon={<HamburgerIcon/>}
        size="sm"
      />
      <HStack spacing={{ base: 1, md: 6 }}>
        <Menu >
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<AddIcon/>}
            variant="ghost"
            size="sm"
            colorScheme="blue"
          />
          <MenuList bg={useColorModeValue('white', 'gray.800')}>
            <MenuItem icon={<UploadOne/>}>
              New File
            </MenuItem>
            <MenuItem icon={<FolderPlus/>}>
              New Folder
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}
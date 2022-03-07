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
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  user: IUser
}

export const Header = ({ isOpen, onOpen, onClose, user, ...rest }: IProps) => {
  return (
    <Flex
      transition="1s ease"
      ml={isOpen ? 60 : 0}
      px={3}
      height="5rem"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      justifyContent="space-between"
      {...rest}
    >
      <IconButton
        aria-label={'open menu'}
        onClick={isOpen ? onClose : onOpen}
        variant="ghost"
        icon={<HamburgerIcon/>}
        size="sm"
      />
      <HStack spacing={{ base: 1, md: 6 }}>
        <Menu>
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
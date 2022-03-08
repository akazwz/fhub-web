import {
  Box,
  Menu,
  HStack,
  Spacer,
  MenuItem,
  MenuList,
  MenuGroup,
  IconButton,
  MenuButton,
  useColorModeValue, useDisclosure,
} from '@chakra-ui/react'
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import { FolderPlus, UploadOne } from '@icon-park/react'
import { FileBreadCrumb } from '../file/FileBreadCrumb'
import CreateFolderModel from './CreateFolderModel'

const BreadCrumbHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <HStack h="40px" mb="24px" spacing="24px" pr="40px">
      <FileBreadCrumb/>
      <Spacer/>
      <IconButton
        aria-label={'search'}
        rounded="full"
        variant="ghost"
        size="sm"
        icon={<SearchIcon fontSize="1rem"/>}
      />
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            rounded="full"
            variant="ghost"
            size="sm"
            bg="linear-gradient(129.12deg, #365bde 0%, #526efa 100%)"
            icon={<AddIcon fontSize="1rem"/>}
          />
          <MenuList
            display="flex"
            flexDirection="column"
            alignContent="flex-start"
            minW="167px"
            bg={useColorModeValue('white', 'rgb(49, 49, 54)')}
            border="none"
            pl="5px"
            pr="5px"
          >
            <MenuGroup title="添加到文件" fontSize="12px" fontWeight="300">
              <MenuItem icon={<UploadOne/>} rounded="md">
                <Box fontSize="14px" fontWeight="400">
                  上传文件
                </Box>
              </MenuItem>
              <MenuItem icon={<FolderPlus/>} rounded="md" onClick={onOpen}>
                <Box fontSize="14px" fontWeight="400">
                  新建文件夹
                </Box>
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
        <CreateFolderModel isOpen={isOpen} onClose={onClose}/>
      </Box>
    </HStack>
  )
}

export default BreadCrumbHeader
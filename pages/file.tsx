import { MouseEvent, useRef, useState } from 'react'
import { NextPage } from 'next'
import {
  Box,
  Grid,
  Button,
  HStack,
  Breadcrumb,
  IconButton,
  DrawerOverlay,
  DrawerContent,
  BreadcrumbLink,
  BreadcrumbItem,
  useColorModeValue,
  useDisclosure,
  Drawer, Menu, MenuButton, MenuList, MenuItem,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { FolderPlus, Plus, Refresh, UploadOne } from '@icon-park/react'
import { Layout } from '../components/layout'
import FileCard, { ICloudFile } from '../components/file/FileCard'

const OptionBar = () => {
  return (
    <HStack
      p={3}
      spacing={7}
      display={{ base: 'none', md: 'flex' }}
    >
      <Button
        leftIcon={<UploadOne/>}
        colorScheme={'blue'}
      >
        Upload
      </Button>
      <Button
        leftIcon={<FolderPlus/>}
      >
        New Folder
      </Button>
      <IconButton
        aria-label={''}
        icon={<Refresh/>}
        rounded="full"
      />
    </HStack>
  )
}

const MobileOption = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  return (
    <Box
      bg={useColorModeValue('grey.100', 'grey.700')}
      pos={'fixed'}
      bottom={'10vh'}
      right={'10vw'}
      display={{ base: 'flex', md: 'none' }}
    >
      <IconButton
        ref={btnRef}
        aria-label={''}
        icon={<Plus theme="outline" size="24"/>}
        rounded={'full'}
        size="lg"
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="bottom"
        size={'xs'}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay/>
        <DrawerContent bg={'transparent'}>
          <HStack
            minH={'30vh'}
            bg={useColorModeValue('blue.200', 'blue.800')}
            rounded={'lg'}
            m={7}
            justifyContent={'center'}
            spacing={7}
          >
            <Button
              leftIcon={<UploadOne/>}
              colorScheme={'blue'}
            >
              Upload
            </Button>
            <Button
              leftIcon={<FolderPlus/>}
            >
              New Folder
            </Button>
          </HStack>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

const FileBreadCrumb = () => {
  return (
    <Breadcrumb
      separator={<ChevronRightIcon color="gray.500"/>}
      fontWeight="medium"
      fontSize="md"
      p="3"
    >
      <BreadcrumbItem>
        <BreadcrumbLink>
          Root
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>
          Folder
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

const File: NextPage = () => {
  const files: ICloudFile[] = [
    { file: true, fileName: 'test.txt', fileSize: 3004 },
    { file: true, fileName: 'test.doc', fileSize: 30040 },
    { file: true, fileName: 'test.mp4', fileSize: 324234 },
    { file: true, fileName: 'test.png', fileSize: 2342 },
    { file: false, fileName: 'test', fileSize: 3004 },
  ]

  const [pos, setPos] = useState<[number, number]>([0, 0])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setPos([e.pageX, e.pageY])
    onOpen()
  }
  return (
    <Layout>
      <OptionBar/>
      <Box minH={'75vh'} onContextMenu={handleContextMenu}>
        <FileBreadCrumb/>
        <Grid
          templateColumns={'repeat(auto-fill, minmax(100px, 1fr))'}
          autoRows={'minmax(100px, auto)'}
          gap="3"
          padding="3"
        >
          {files.map((file, index) => (
            <FileCard key={index} fileName={file.fileName} fileSize={file.fileSize} file={file.file}/>
          ))}
        </Grid>
      </Box>
      <Menu isOpen={isOpen} offset={pos} onClose={onClose}>
        <MenuButton position={'absolute'} top={0} left={0}/>
        <MenuList>
          <MenuItem icon={<UploadOne/>}>Upload File</MenuItem>
          <MenuItem icon={<FolderPlus/>}>New Folder</MenuItem>
          <MenuItem icon={<Refresh/>}>Refresh</MenuItem>
        </MenuList>
      </Menu>
    </Layout>
  )
}

export default File
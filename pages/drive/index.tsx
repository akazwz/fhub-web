import { MouseEvent, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  Box,
  Grid,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Flex,
  Spacer,
  Divider,
  Text,
  HStack,
  IconButton,
  background,
  MenuGroup,
  Radio,
  Checkbox, Button, MenuOptionGroup, MenuItemOption, MenuDivider,
} from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AddIcon, SearchIcon, HamburgerIcon } from '@chakra-ui/icons'
import { FolderPlus, Check, SortThree, SortTwo, UploadOne } from '@icon-park/react'
import Lightbox from 'react-image-lightbox'
import { Layout } from '../../components/layout'
import FileCard, { CloudFile, getFileExtension, isImageFile, isVideoFile } from '../../components/file/FileCard'
import { FileOptionBar } from '../../components/file/FileOptionBar'
import { FileBreadCrumb } from '../../components/file/FileBreadCrumb'
import { MobileFileOption } from '../../components/file/MobileFileOption'
import { useAuth } from '../../src/hooks/useAuth'
import { GetFileList, GetFileURI } from '../../src/api/file'
import { prefixDirState, shouldGetFileListState } from '../../src/state/file'
import { FileListSkeleton } from '../../components/file/FileListSkeleton'
import 'react-image-lightbox/style.css'
import { NavItems } from '../../components/layout/sidebar/NavItems'
import UserProfileSideBar from '../../components/layout/sidebar/UserProfileSideBar'

const Index: NextPage = () => {
  const { token } = useAuth()
  const [prefixDir, setPrefix] = useRecoilState(prefixDirState)
  const shouldGetFileList = useRecoilValue(shouldGetFileListState)
  const [isFileListLoading, setIsFileListLoading] = useState<boolean>(true)
  const [isImageLightBoxOpen, setIsImageLightBoxOpen] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')
  const [fileList, setFileList] = useState<CloudFile[]>([])

  const router = useRouter()

  useEffect(() => {
    if (!token) return
    setIsFileListLoading(true)
    GetFileList(token, prefixDir)
      .then((res) => {
        if (res.status !== 200) {
          alert('error')
          return
        }
        res.json().then((resData) => {
          const { data } = resData
          setFileList(data)
          setIsFileListLoading(false)
        })
      })
  }, [prefixDir, token, shouldGetFileList])

  const [pos, setPos] = useState<[number, number]>([0, 0])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setPos([e.pageX, e.pageY])
    onOpen()
  }

  /* 文件卡片点击 */
  const handleFileCardClick = (file: CloudFile) => {
    /* 文件夹 */
    if (!file.file) {
      setPrefix('0/' + file.file_name)
      return
    }

    if (isImageFile(file.file_name)) {
      setIsImageLightBoxOpen(true)
    }

    /* 文件 */
    if (!token) return
    GetFileURI(token, file.fid).then((res) => {
      if (!res.ok) {
        alert('error')
        return
      }
      res.json().then((resData) => {
        const { data } = resData
        const { uri } = data
        if (isImageFile(file.file_name)) {
          setImageSrc(uri)
          return
        }
        router.push(`${uri}`).then()
      })
    }).catch((e) => {
      console.log(e)
      alert('error')
    })
  }

  return (
    <Layout>
      <Flex
        direction="column"
        h="full"
        transition="all .3s ease"
      >
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
                <MenuItem icon={<FolderPlus/>} rounded="md">
                  <Box fontSize="14px" fontWeight="400">
                    新建文件夹
                  </Box>
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </HStack>
        <HStack
          h="28px"
          pr="40px"
          spacing="12px"
        >
          <Checkbox/>
          <Text
            fontSize="12px"
            lineHeight="1.6"
            fontWeight="500"
          >
            共37项
          </Text>
          <Spacer/>
          <Menu>
            <MenuButton
              as={Button}
              aria-label="Options"
              rounded="md"
              fontSize="12"
              fontWeight="300"
              lineHeight="1.6"
              variant="ghost"
              size="xs"
              leftIcon={<SortTwo/>}
            >
              按修改时间排序
            </MenuButton>
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
              <MenuOptionGroup defaultValue="update-time">
                <MenuItemOption icon={<Check fill="rgb(97, 122, 250)" size="1rem"/>} value="name" rounded="md"
                                fontSize="14">名称</MenuItemOption>
                <MenuItemOption icon={<Check fill="rgb(97, 122, 250)" size="1rem"/>} value="create-time" rounded="md"
                                fontSize="14">创建时间</MenuItemOption>
                <MenuItemOption icon={<Check fill="rgb(97, 122, 250)" size="1rem"/>} value="update-time" rounded="md"
                                fontSize="14">修改时间</MenuItemOption>
                <MenuItemOption icon={<Check fill="rgb(97, 122, 250)" size="1rem"/>} value="size" rounded="md"
                                fontSize="14">文件大小</MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider color={useColorModeValue('', 'rgba(132, 133, 141, 0.12)')} ml="4px" mr="4px"/>
              <MenuOptionGroup defaultValue="down">
                <MenuItemOption icon={<Check fill="rgb(97, 122, 250)" size="1rem"/>} value="up" rounded="md"
                                fontSize="14">升序</MenuItemOption>
                <MenuItemOption icon={<Check fill="rgb(97, 122, 250)" size="1rem"/>} value="down" rounded="md"
                                fontSize="14">降序</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <IconButton
            aria-label={'layout'}
            rounded="md"
            size="xs"
            variant="ghost"
            icon={<HamburgerIcon/>}
          />
          {/*<AllApplication theme="outline" size="14" fill="#000000"/>*/}
        </HStack>
      </Flex>
      {/* <FileBreadCrumb/>
      <Box
        onContextMenu={handleContextMenu}
        overflow={'scroll'}
        overflowX="hidden"
        css={{
          '&::-webkit-scrollbar': {
          },
        }}
      >
        {isFileListLoading
          ? <FileListSkeleton/>
          : <Grid
            templateColumns={'repeat(auto-fill, minmax(100px, 1fr))'}
            autoRows={'minmax(100px, auto)'}
            gap="3"
            padding="3"
          >
            {fileList.map((file, index) => (
              <FileCard
                key={'file-card-' + index}
                cloudFile={file}
                onClick={handleFileCardClick}
              />
            ))}
          </Grid>
        }
      </Box>
      <MobileFileOption/>
       context menu
      <Menu isOpen={isOpen} offset={pos} onClose={onClose}>
        <MenuButton position={'absolute'} top={0} left={0}/>
        <MenuList>
          <MenuItem icon={<UploadOne/>}>Upload File</MenuItem>
          <MenuItem icon={<FolderPlus/>}>New Folder</MenuItem>
          <MenuItem icon={<Refresh/>}>Refresh</MenuItem>
        </MenuList>
      </Menu>
      {isImageLightBoxOpen
        ? (
          <Lightbox
            mainSrc={imageSrc}
            onCloseRequest={() => {
              setIsImageLightBoxOpen(false)
              setImageSrc('')
            }}
          />
        )
        : null
      }*/}
    </Layout>
  )
}

export default Index
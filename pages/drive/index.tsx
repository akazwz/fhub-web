import { MouseEvent, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  Box,
  Grid,
  Flex,
  Text,
  HStack,
  useDisclosure,
} from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import Lightbox from 'react-image-lightbox'
import { Layout } from '../../components/layout'
import FileCard, { CloudFile, isImageFile } from '../../components/file/FileCard'
import { useAuth } from '../../src/hooks/useAuth'
import { GetFileList, GetFileURI } from '../../src/api/file'
import { prefixDirState, shouldGetFileListState } from '../../src/state/file'
import { FileListSkeleton } from '../../components/file/FileListSkeleton'
import 'react-image-lightbox/style.css'
import BreadCrumbHeader from '../../components/drive/BreadCrumbHeader'
import FileOptionLayoutBar from '../../components/drive/FileOptionLayoutBar'

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
      {/* page content */}
      <Flex
        fontSize="14px"
        lineHeight="1.5"
        position="relative"
        height="100%"
        flexDirection="column"
        alignItems="stretch"
        justifyContent="flex-start"
        css={{
          '&::-webkit-scrollbar': {},
        }}
      >
        <BreadCrumbHeader/>
        <FileOptionLayoutBar count={fileList.length}/>
        {/* node list */}
        <Box
          position="relative"
          overflow="hidden"
          flexGrow={1}
          display="none"
        >
          <HStack pl="32px" pr="32px" fontSize="12px" h="40px" whiteSpace="nowrap">
            <Flex minW="160px" ml="32px" fontWeight="200" flexGrow={1}>
              <Text>
                名称
              </Text>
            </Flex>
            <Flex w="200px" fontWeight="200" pl="24px">
              <Text>
                修改时间
              </Text>
            </Flex>
            <Flex w="160px" fontWeight="200" pl="24px">
              <Text>
                大小
              </Text>
            </Flex>
          </HStack>
        </Box>
        {/* node list */}
        <Box
          position="relative"
          maxHeight="100%"
          height="100%"
          overflow="hidden"
        >
          {/* grid scroll */}
          <Box
            position="relative"
            w="100%"
            h="100%"
            overflow="auto"
          >
            <Box
              onContextMenu={handleContextMenu}
            >
              {isFileListLoading
                ? <FileListSkeleton/>
                : <Grid
                  position="relative"
                  maxHeight="100%"
                  height="100%"
                  overflow="hidden"
                  templateColumns={'repeat(auto-fill, minmax(215px, 1fr))'}
                  autoRows={'minmax(215px, auto)'}
                  paddingLeft="40px"
                  paddingRight="40px"
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
          </Box>
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
          }
        </Box>
      </Flex>
      {/*<Flex
        flexDirection="column"
      >
        <BreadCrumbHeader/>
        <FileOptionLayoutBar/>
      </Flex>*/}
      {/*<Box
        transition="all .3s ease"
        bg="red.500"
        pl={"40px"}
        h="100%"
      >
        <BreadCrumbHeader/>
        <FileOptionLayoutBar/>
        <Box
          onContextMenu={handleContextMenu}
          overflowY={'scroll'}
          h="100%"
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
        }
      </Box>*/}
    </Layout>
  )
}

export default Index
import { MouseEvent, useEffect, useState } from 'react'
import { NextPage } from 'next'
import {
  Box,
  Grid,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import { FolderPlus, Refresh, UploadOne } from '@icon-park/react'
import { Layout } from '../components/layout'
import FileCard, { IFileListItem } from '../components/file/FileCard'
import { FileOptionBar } from '../components/file/FileOptionBar'
import { FileBreadCrumb } from '../components/file/FileBreadCrumb'
import { MobileFileOption } from '../components/file/MobileFileOption'
import { useAuth } from '../src/hooks/useAuth'
import { GetFileList } from '../src/api/file'
import {  prefixDirState, shouldGetFileListState } from '../src/state/file'
import { FileListSkeleton } from '../components/file/FileListSkeleton'

const File: NextPage = () => {
  const { token } = useAuth()
  const prefixDir = useRecoilValue(prefixDirState)
  const shouldGetFileList = useRecoilValue(shouldGetFileListState)
  const [isFileListLoading, setIsFileListLoading] = useState(true)

  const [fileList, setFileList] = useState<IFileListItem[]>([])

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

  return (
    <Layout>
      <FileOptionBar/>
      <Box minH={'75vh'} onContextMenu={handleContextMenu}>
        <FileBreadCrumb/>
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
                key={file.sha256}
                file_name={file.file_name}
                size={file.size}
                file={file.file}
                sha256={file.sha256}
              />
            ))}
          </Grid>
        }
      </Box>
      <MobileFileOption/>
      {/* context menu */}
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
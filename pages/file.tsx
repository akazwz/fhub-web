import { MouseEvent, useState } from 'react'
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
import { FolderPlus, Refresh, UploadOne } from '@icon-park/react'
import { Layout } from '../components/layout'
import FileCard, { ICloudFile } from '../components/file/FileCard'
import { FileOptionBar } from '../components/file/FileOptionBar'
import { FileBreadCrumb } from '../components/file/FileBreadCrumb'

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
      <FileOptionBar/>
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
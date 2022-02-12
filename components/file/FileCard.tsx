import { ReactElement } from 'react'
import {
  Box,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { VideoIcon } from './icons/VideoIcon'
import { MusicIcon } from './icons/MusicIcon'
import { ImageIcon } from './icons/ImageIcon'
import { DocIcon } from './icons/DocIcon'
import { ExcelIcon } from './icons/ExcelIcon'
import { PptIcon } from './icons/PptIcon'
import { PdfIcon } from './icons/PdfIcon'
import { TextIcon } from './icons/TextIcon'
import { OtherIcon } from './icons/OtherIcon'
import { FolderIcon } from './icons/FolderIcon'

export interface ICloudFile {
  fileName: string,
  fileSize: number,
  file: boolean,
}

const getFileExtension = (fileName: string): string => {
  const index = fileName.lastIndexOf('.')
  return fileName.slice(index + 1)
}

const isVideoFile = (fileName: string): boolean => {
  const videoExtensions = ['mp4', 'mov', 'avi', 'flv', 'wmv', 'mpg', 'mkv', 'f4v', 'rmvb', 'rm', '3gb']
  const ext = getFileExtension(fileName).toLowerCase()
  return videoExtensions.indexOf(ext) !== -1
}

const isAudioFile = (fileName: string): boolean => {
  const audioExtensions = ['mp3', 'aac', 'wav', 'cda', 'wma', 'mid', 'aif', 'aiff', 'mid', 'ra', 'vqf', 'ape']
  const ext = getFileExtension(fileName).toLowerCase()
  return audioExtensions.indexOf(ext) !== -1
}

const isImageFile = (fileName: string): boolean => {
  const imageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff']
  const ext = getFileExtension(fileName).toLowerCase()
  return imageExtensions.indexOf(ext) !== -1
}

const isDocFile = (fileName: string): boolean => {
  const docExtensions = ['doc', 'docx']
  const ext = getFileExtension(fileName).toLowerCase()
  return docExtensions.indexOf(ext) !== -1
}

const isExcelFile = (fileName: string): boolean => {
  const excelExtensions = ['xls', 'xlsx']
  const ext = getFileExtension(fileName).toLowerCase()
  return excelExtensions.indexOf(ext) !== -1
}

const isPptFile = (fileName: string): boolean => {
  const pptExtensions = ['ppt', 'pptx']
  const ext = getFileExtension(fileName).toLowerCase()
  return pptExtensions.indexOf(ext) !== -1
}

const isPdfFile = (fileName: string): boolean => {
  const pdfExtensions = ['pdf']
  const ext = getFileExtension(fileName).toLowerCase()
  return pdfExtensions.indexOf(ext) !== -1
}

const isTextFile = (fileName: string): boolean => {
  const textExtensions = ['txt']
  const ext = getFileExtension(fileName).toLowerCase()
  return textExtensions.indexOf(ext) !== -1
}

const fileIcon = (fileName: string): ReactElement => {
  switch (true) {
    case isVideoFile(fileName):
      return <VideoIcon fontSize={37}/>
    case isAudioFile(fileName):
      return <MusicIcon fontSize={37}/>
    case isImageFile(fileName):
      return <ImageIcon fontSize={37}/>
    case isDocFile(fileName):
      return <DocIcon fontSize={37}/>
    case isExcelFile(fileName):
      return <ExcelIcon fontSize={37}/>
    case isPptFile(fileName):
      return <PptIcon fontSize={37}/>
    case isPdfFile(fileName):
      return <PdfIcon fontSize={37}/>
    case isTextFile(fileName):
      return <TextIcon fontSize={37}/>
    default:
      return <OtherIcon fontSize={37}/>
  }
}

const fileName = (fileName: string) => {
  return (
    <Text fontSize={'sm'}>
      {fileName}
    </Text>
  )
}

const folderName = (fileName: string) => {
  return (
    <Text fontSize={'sm'}>
      {fileName}
    </Text>
  )
}

const fileSize = (size: number) => {
  let value: string
  switch (true) {
    /*kb*/
    case size > 1024 && size < 1024 * 1024:
      value = (size / 1024).toFixed(2) + 'K'
      break
    /*mb*/
    case size > 1024 * 1024 && size < 1024 * 1024 * 1024:
      value = (size / 1024 / 1024).toFixed(2) + 'M'
      break
    /*gb*/
    case size > 1024 * 1024 * 1024 && size < 1024 * 1024 * 1024 * 1024:
      value = (size / 1024 / 1024 / 1024).toFixed(2) + 'G'
      break
    default:
      value = size.toFixed(2) + 'b'
  }
  return (
    <Text fontWeight={'light'} fontSize={'smaller'}>
      {value}
    </Text>
  )
}

const FileCard = (cloudFile: ICloudFile) => {
  return (
    <Box
      w="100px"
      bg={useColorModeValue('blue.100', 'blue.900')}
      rounded="md"
      p="3"
    >
      {cloudFile.file
        ? <VStack spacing={1}>
          {fileIcon(cloudFile.fileName)}
          {fileName(cloudFile.fileName)}
          {fileSize(cloudFile.fileSize)}
        </VStack>
        :
        <VStack spacing={3}>
          <FolderIcon fontSize={55}/>
          {folderName(cloudFile.fileName)}
        </VStack>
      }
    </Box>
  )
}

export default FileCard
import {
  Text,
  Flex,
  Image,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'

export interface FileItem {
  cloudFile: CloudFile,
  onClick: (file: CloudFile) => void,
}

export interface CloudFile {
  fid: string,
  file_name: string,
  size: number,
  file: boolean,
  sha256: string,
}

const getFileName = (filePath: string): string => {
  const index = filePath.lastIndexOf('.')
  return filePath.slice(0, index)
}

export const getFileExtension = (fileName: string): string => {
  const index = fileName.lastIndexOf('.')
  return fileName.slice(index + 1)
}

export const isVideoFile = (fileName: string): boolean => {
  const videoExtensions = ['mp4', 'mov', 'avi', 'flv', 'wmv', 'mpg', 'mkv', 'f4v', 'rmvb', 'rm', '3gb']
  const ext = getFileExtension(fileName).toLowerCase()
  return videoExtensions.indexOf(ext) !== -1
}

const isAudioFile = (fileName: string): boolean => {
  const audioExtensions = ['mp3', 'aac', 'wav', 'cda', 'wma', 'mid', 'aif', 'aiff', 'mid', 'ra', 'vqf', 'ape']
  const ext = getFileExtension(fileName).toLowerCase()
  return audioExtensions.indexOf(ext) !== -1
}

export const isImageFile = (fileName: string): boolean => {
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
  const excelExtensions = ['xls', 'xlsx', 'csv']
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

const ImageSrc = (fileName: string): string => {
  switch (true) {
    case isVideoFile(fileName):
      return 'https://img.hellozwz.com/video.png'
    case isAudioFile(fileName):
      return 'https://img.hellozwz.com/audio.png'
    case isImageFile(fileName):
      return 'https://img.hellozwz.com/image.png'
    case isDocFile(fileName):
      return 'https://img.hellozwz.com/other.png'
    case isExcelFile(fileName):
      return 'https://img.hellozwz.com/xls.png'
    case isPptFile(fileName):
      return 'https://img.hellozwz.com/other.png'
    case isPdfFile(fileName):
      return 'https://img.hellozwz.com/other.png'
    case isTextFile(fileName):
      return 'https://img.hellozwz.com/txt.png'
    default:
      return 'https://img.hellozwz.com/other.png'
  }
}

const fileName = (fileName: string) => {
  let showName = fileName
  if (fileName.length > 5) {
    showName =
      fileName.slice(0, 2)
      + '...'
      + getFileName(fileName).slice(-1)
      + '.'
      + getFileExtension(fileName).slice(0, 5)
  }
  return (
    <Tooltip label={fileName}>
      <Text fontSize="14px" textAlign="center">
        {showName}
      </Text>
    </Tooltip>
  )
}

const folderName = (fileName: string) => {
  return (
    <Text fontSize={'sm'}>
      {fileName.slice(0, fileName.length - 1)}
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

const FileCard = (fileItem: FileItem) => {
  const bg = useColorModeValue('', 'rgba(132,133,141,0.12)')
  return (
    <Flex
      w="215px"
      h="207px"
      mb="12px"
      mx="auto"
      onClick={() => {fileItem.onClick(fileItem.cloudFile)}}
    >
      {fileItem.cloudFile.file
        ? <Flex
          w="123px"
          h="162.19px"
          _hover={{
            bg: bg,
          }}
          rounded="lg"
          flexDirection="column"
          mx="auto"
          pt="10px"
        >
          <Image
            alt="folder"
            src={ImageSrc(fileItem.cloudFile.file_name)}
            w="70px"
            h="70px"
            mx="auto"
            mb="30px"
          />
          {fileName(fileItem.cloudFile.file_name)}
        </Flex>
        :
        <Flex
          w="123px"
          h="162.19px"
          _hover={{
            bg: bg,
          }}
          rounded="lg"
          flexDirection="column"
          mx="auto"
          pt="10px"
        >
          <Image
            alt="folder"
            src="https://img.hellozwz.com/folder.png"
            w="115px"
            h="90px"
            mx="auto"
            mb="10px"
          />
          <Text textAlign="center" fontSize="14px">
            {folderName(fileItem.cloudFile.file_name)}
          </Text>
        </Flex>
      }
    </Flex>
  )
}

export default FileCard
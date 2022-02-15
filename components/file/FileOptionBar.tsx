import {
  HStack,
  IconButton, Progress, Stack,
} from '@chakra-ui/react'
import { Refresh } from '@icon-park/react'
import { useFileList } from '../../src/hooks/useFileList'
import { CreateFolderModal } from './CreateFolderModal'
import { UploadFileModal } from './UploadFileModal'
import { UploadFileProgress } from './UploadFileProgress'

export const FileOptionBar = () => {
  const { refresh } = useFileList()
  return (
    <HStack
      p={3}
      spacing={7}
      display={{ base: 'none', md: 'flex' }}
    >
      <UploadFileModal/>
      <CreateFolderModal/>
      <IconButton
        aria-label={''}
        icon={<Refresh/>}
        rounded="full"
        onClick={refresh}
      />
      <UploadFileProgress/>
    </HStack>
  )
}
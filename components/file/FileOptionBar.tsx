import { Button, HStack, IconButton } from '@chakra-ui/react'
import { FolderPlus, Refresh, UploadOne } from '@icon-park/react'

export const FileOptionBar = () => {
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
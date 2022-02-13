import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Button, HStack, IconButton, Text } from '@chakra-ui/react'
import { FolderPlus, Refresh, UploadOne } from '@icon-park/react'
import { GetUploadToken } from '../../src/api/file'
import { useAuth } from '../../src/hooks/useAuth'
import { UploadStatus, useQiniuUpload } from '../../src/hooks/useQiniuUpload'

export const FileOptionBar = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [chosenFile, setChosenFile] = useState<File | null>(null)
  const [uptoken, setUptoken] = useState<string | null>(null)

  const handleFileInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    /* single file */
    const file = event.target.files[0]
    setChosenFile(file)
  }

  const { token, isAuthLoading } = useAuth()
  const { startUpload, uploadState, uploadError } = useQiniuUpload(chosenFile, uptoken)

  useEffect(() => {
    if (!chosenFile) return
    if (isAuthLoading) return
    if (!token) return
    GetUploadToken(token).then((res) => {
      if (res.status !== 200) {
        alert('get upload token error')
        return
      }
      res.json().then((dataRes) => {
        const { data } = dataRes
        const { token } = data
        setUptoken(token)
      })
    })
  }, [chosenFile, isAuthLoading, token])

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <HStack
      p={3}
      spacing={7}
      display={{ base: 'none', md: 'flex' }}
    >
      <Button
        leftIcon={<UploadOne/>}
        colorScheme={'blue'}
        onClick={handleUploadClick}
      >
        Upload
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileInputOnChange}
        hidden
      />
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
      <Text>
        {chosenFile?.name}
      </Text>
      <Button
        disabled={!chosenFile || !uptoken}
        onClick={startUpload}
      >
        Start
      </Button>
    </HStack>
  )
}
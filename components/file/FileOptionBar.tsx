import { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  Button, FormControl, FormLabel,
  HStack,
  IconButton, Input,
  Modal,
  ModalBody,
  ModalCloseButton, ModalFooter, ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { FolderPlus, Refresh, UploadOne } from '@icon-park/react'
import { useFileHashCode } from 'use-hashcode'
import { GetUploadToken, UploadFileToServerApi } from '../../src/api/file'
import { useAuth } from '../../src/hooks/useAuth'
import { useQiniuUpload } from '../../src/hooks/useQiniuUpload'
import { useRecoilValue } from 'recoil'
import { prefixDirState } from '../../src/state/file'
import { useFileList } from '../../src/hooks/useFileList'
import { CreateFolderModal } from './CreateFolderModal'

export const FileOptionBar = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [chosenFile, setChosenFile] = useState<File | null>(null)
  const [uptoken, setUptoken] = useState<string | null>(null)

  const prefix = useRecoilValue(prefixDirState)
  const { refresh } = useFileList()
  const { token } = useAuth()
  const { startUpload, Qkey } = useQiniuUpload(chosenFile, uptoken)
  const { sha256 } = useFileHashCode(chosenFile)

  const { isOpen, onOpen, onClose } = useDisclosure()

  /* 获取上传凭证 */
  useEffect(() => {
    if (!sha256) return
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
  }, [sha256, token])

  /* 文件信息保存到服务器 */
  useEffect(() => {
    if (!Qkey) return
    if (!sha256) return
    if (!token) return
    if (!chosenFile) return
    UploadFileToServerApi(token, {
      cid: '',
      file: true,
      filename: chosenFile.name,
      prefix_dir: prefix,
      qkey: Qkey,
      sha256: sha256,
      size: chosenFile.size,
    }).then((res) => {
      if (res.status !== 201) {
        alert('error')
        return
      }
      refresh()
    })
  }, [Qkey, chosenFile, sha256, prefix, token])

  /* 选择文件 */
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    /* 单个文件 */
    const file = event.target.files[0]
    setChosenFile(file)
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
      <CreateFolderModal/>
      <IconButton
        aria-label={''}
        icon={<Refresh/>}
        rounded="full"
        onClick={refresh}
      />
      <Button
        disabled={!chosenFile || !uptoken || !sha256}
        onClick={startUpload}
      >
        Start
      </Button>

    </HStack>
  )
}
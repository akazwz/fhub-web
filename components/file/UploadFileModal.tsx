import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  Text,
  Modal,
  Center,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useFileHashCode } from 'use-hashcode'
import { UploadOne } from '@icon-park/react'
import { useAuth } from '../../src/hooks/useAuth'
import { fileUploadProgressState, prefixDirState } from '../../src/state/file'
import { useFileList } from '../../src/hooks/useFileList'
import { GetUploadToken, UploadFileToServerApi } from '../../src/api/file'
import { useQiniuUpload } from '../../src/hooks/useQiniuUpload'

export const UploadFileModal = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [chosenFile, setChosenFile] = useState<File | null>(null)
  const [uptoken, setUptoken] = useState<string | null>(null)
  const { startUpload, Qkey, progress } = useQiniuUpload(chosenFile, uptoken)
  const { sha256 } = useFileHashCode(chosenFile)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { token } = useAuth()
  const prefixDir = useRecoilValue(prefixDirState)
  const [, setFileUploadProgress] = useRecoilState(fileUploadProgressState)
  const { refresh } = useFileList()

  const handleFileInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    /* 单个文件 */
    const file = event.target.files[0]
    setChosenFile(file)
  }

  /* 更新文件上传进度 */
  useEffect(() => {
    setFileUploadProgress(progress)
  }, [progress])

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
      prefix_dir: prefixDir,
      qkey: Qkey,
      sha256: sha256,
      size: chosenFile.size,
    }).then((res) => {
      if (res.status !== 201) {
        alert('error')
        onClose()
        return
      }
      setUptoken(null)
      setChosenFile(null)
      setFileUploadProgress(null)
      onClose()
      refresh()
    })
  }, [Qkey, chosenFile, sha256, prefixDir, token])

  return (
    <>
      <Button
        leftIcon={<UploadOne/>}
        colorScheme={'blue'}
        onClick={onOpen}
      >
        Upload
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalCloseButton/>
          <ModalHeader>
            Upload File
          </ModalHeader>
          <ModalBody>
            <Center
              p={10}
              rounded={'lg'}
              borderWidth={'3px'}
              borderStyle={'dotted'}
              onClick={() => {fileInputRef.current?.click()}}
            >
              <Text>{chosenFile ? chosenFile.name : 'Choose File'}</Text>
            </Center>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileInputOnChange}
              hidden
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              disabled={!token || !chosenFile || !uptoken}
              onClick={startUpload}
            >
              Start Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
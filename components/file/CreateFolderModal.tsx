import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  Input,
  Modal,
  Button,
  ModalBody,
  FormLabel,
  ModalFooter,
  ModalHeader,
  FormControl,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { FolderPlus } from '@icon-park/react'
import { useAuth } from '../../src/hooks/useAuth'
import { prefixDirState } from '../../src/state/file'
import { CreateFolderApi } from '../../src/api/file'
import { useFileList } from '../../src/hooks/useFileList'

export const CreateFolderModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [folderName, setFolderName] = useState<string>('')
  const [btnLoading, setBtnLoading] = useState<boolean>(false)

  const { token } = useAuth()
  const prefixDir = useRecoilValue(prefixDirState)
  const { refresh } = useFileList()

  const handleSaveFolder = () => {
    if (folderName === '') return
    if (folderName.length > 77) return
    if (!token) return
    setBtnLoading(true)
    CreateFolderApi(token, { folder_name: folderName + '/', prefix_dir: prefixDir })
      .then((res) => {
        setBtnLoading(false)
        if (res.status !== 201) {
          alert('error')
          return
        }
        onClose()
        refresh()
      })
      .catch(() => {
        setBtnLoading(false)
        alert('error')
      })
  }

  return (
    <>
      <Button
        leftIcon={<FolderPlus/>}
        onClick={onOpen}
      >
        New Folder
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalCloseButton/>
          <ModalHeader>
            New Folder
          </ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Folder Name</FormLabel>
              <Input
                placeholder="folder name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              disabled={!token}
              isLoading={btnLoading}
              onClick={handleSaveFolder}
            >
              Save
            </Button>
            <Button onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
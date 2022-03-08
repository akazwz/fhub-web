import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalCloseButton, Image, Input, Box,
} from '@chakra-ui/react'

interface InterfaceCreatFolderModal {
  isOpen: boolean
  onClose: () => void
}

const CreateFolderModel = (props: InterfaceCreatFolderModal) => {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay/>
        <ModalContent bg={'rgb(49, 49, 54)'} w="340px" mt="100px">
          <ModalHeader fontSize="16px" fontWeight="500">新建文件夹</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Box
              w="160px"
              h="126px"
              mx="auto"
              mb="36px"
              display="flex"
              alignItems="center"
            >
              <Image
                alt={'folder'}
                src="https://img.hellozwz.com/folder.png"
                w="115px"
                h="90px"
                mx="auto"
                draggable={false}
              />
            </Box>
            <Input
              w="full"
              value={'新建文件夹'}
              bg={'rgba(132, 133, 141, 0.12)'}
              fontSize="14px"
              variant="ghost"
              _hover={{
                boxShadow: '0 0 0 1px rgb(112, 136, 255)'
              }}
              _focus={{
                boxShadow: '0 0 0 1px rgb(112, 136, 255)'
              }}
              autoFocus
            />
          </ModalBody>
          <ModalFooter>
            <Button
              bg={'rgb(112, 136, 255)'}
              _hover={{ backgroundColor: 'rgb(138, 157, 255)' }}
              size="sm"
              fontSize="14px"
            >
              确定
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateFolderModel
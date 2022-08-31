import {
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	Input,
	Center,
	useColorModeValue,
} from '@chakra-ui/react'

import { FolderIcon } from '../file/icons/FolderIcon'

interface InterfaceCreatFolderModal{
	isOpen: boolean
	onClose: () => void
}

const CreateFolderModel = (props: InterfaceCreatFolderModal) => {
	return (
		<>
			<Modal isOpen={props.isOpen} onClose={props.onClose}>
				<ModalOverlay />
				<ModalContent w="340px" mt="100px" bg={useColorModeValue('white', 'black')}>
					<ModalHeader fontSize="16px" fontWeight="700">New Folder</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Center
							w="160px"
							h="126px"
							mx="auto"
							mb="36px"
						>
							<FolderIcon fontSize="100" />
						</Center>
						<Input
							w="full"
							placeholder={'New Folder'}
							fontSize="14px"
							autoFocus
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							size="sm"
							fontSize="14px"
							colorScheme="blue"
						>
							OK
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default CreateFolderModel
import { ChangeEvent, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
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
import { prefixDirState } from '../../src/state/file'
import { useFileList } from '../../src/hooks/useFileList'

export const UploadModel = () => {
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const [chosenFile, setChosenFile] = useState<File | null>(null)
	const [uptoken, setUptoken] = useState<string | null>(null)
	const { sha256 } = useFileHashCode(chosenFile)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { token } = useAuth()
	const prefixDir = useRecoilValue(prefixDirState)
	const { refresh } = useFileList()

	const handleFileInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return
		/* 单个文件 */
		const file = event.target.files[0]
		setChosenFile(file)
	}

	return (
		<>
			<Button
				leftIcon={<UploadOne />}
				colorScheme={'blue'}
				onClick={onOpen}
			>
				Upload
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
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
						>
							Start Upload
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
import {
	HStack,
	IconButton,
} from '@chakra-ui/react'
import { Refresh } from '@icon-park/react'
import { useFileList } from '../../src/hooks/useFileList'
import { CreateFolderModal } from './CreateFolderModal'
import { UploadModel } from './UploadModel'

export const FileOptionBar = () => {
	const { refresh } = useFileList()
	return (
		<HStack
			p={3}
			spacing={7}
			display={{ base: 'none', md: 'flex' }}
		>
			<UploadModel />
			<CreateFolderModal />
			<IconButton
				aria-label={''}
				icon={<Refresh />}
				rounded="full"
				onClick={refresh}
			/>
		</HStack>
	)
}
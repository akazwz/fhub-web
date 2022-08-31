import {
	Box,
	Flex,
	Menu,
	HStack,
	MenuItem,
	MenuList,
	MenuGroup,
	IconButton,
	MenuButton,
	useColorModeValue,
	useDisclosure, Spacer,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { FolderPlus, UploadOne } from '@icon-park/react'

import { FileBreadCrumb } from '../file/FileBreadCrumb'
import CreateFolderModel from './CreateFolderModel'

const BreadCrumbHeader = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<Flex
			alignItems="center"
			flex={1}
			px={3}
		>
			<FileBreadCrumb />
			<Spacer />
			<HStack spacing="18px">
				<Box>
					<Menu>
						<MenuButton
							as={IconButton}
							aria-label="Options"
							rounded="full"
							size="sm"
							colorScheme="blue"
							icon={<AddIcon fontSize="1rem" fill="blue.500" />}
						/>
						<MenuList
							display="flex"
							flexDirection="column"
							alignContent="flex-start"
							minW="167px"
							bg={useColorModeValue('white', 'rgb(49, 49, 54)')}
							border="none"
							pl="5px"
							pr="5px"
						>
							<MenuGroup title="File" fontSize="12px" fontWeight="500">
								<MenuItem icon={<UploadOne />} rounded="md">
									<Box fontSize="14px" fontWeight="400">
										Upload
									</Box>
								</MenuItem>
								<MenuItem icon={<FolderPlus />} rounded="md" onClick={onOpen}>
									<Box fontSize="14px" fontWeight="400">
										New Folder
									</Box>
								</MenuItem>
							</MenuGroup>
						</MenuList>
					</Menu>
					<CreateFolderModel isOpen={isOpen} onClose={onClose} />
				</Box>
			</HStack>
		</Flex>
	)
}

export default BreadCrumbHeader
import { ReactNode } from 'react'
import { useRecoilState } from 'recoil'
import {
	Box,
	VStack,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	HStack,
	useColorModeValue,
	useDisclosure,
	Drawer,
} from '@chakra-ui/react'

import { isMiniState } from '../../src/state'
import { NavLinks, Sidebar } from './sidebar'
import { DashboardHeader } from './header'
import { ColorModeToggle } from '../../components/color-mode-toggle'

export interface LayoutProps{
	children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const drawerBgColor = useColorModeValue('white', 'black')
	const [mini, setMini] = useRecoilState(isMiniState)

	return (
		<Box minH="100vh">
			<Sidebar
				onClose={onClose}
				mini={mini}
				setMini={setMini}
				display={{ base: 'none', md: 'block' }}
			/>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				size={'full'}
				placement={'left'}
			>
				<DrawerContent backgroundColor={drawerBgColor}>
					<DrawerHeader>
						<DrawerCloseButton />
					</DrawerHeader>
					<DrawerBody>
						<VStack>
							<HStack>
								<ColorModeToggle />
							</HStack>
							<NavLinks mini={false} />
						</VStack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			<DashboardHeader
				onOpen={onOpen}
				mini={mini}
				height={'6vh'}
			/>
			<Box as="main" ml={{ base: 0, md: mini ? 20 : 60 }} p={3}>
				{children}
			</Box>
		</Box>
	)
}
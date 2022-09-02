import { useRecoilState } from 'recoil'
import {
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
} from '@chakra-ui/react'
import { Right } from '@icon-park/react'

import { prefixDirState } from '../../src/state/file'

export const FileBreadCrumb = () => {
	const [prefix, setPrefix] = useRecoilState(prefixDirState)
	const folders = prefix.trim().split('/')

	return (
		<Breadcrumb
			separator={folders.length === 2 ? <></> : <Right />}
			fontWeight="medium"
			fontSize="md"
		>
			{folders.map((folder, index) => {
				if (folder === '') folder = 'Drive'
				return (
					<BreadcrumbItem
						key={folders.slice(0, index + 1).toString()}
						onClick={() => {
							const folder = folders.slice(0, index + 1).join('/') + '/'
							setPrefix(folder)
						}}
					>
						<BreadcrumbLink
							_hover={{
								textDecoration: 'none'
							}}
						>
							<Box fontSize="lg" fontWeight="600" lineHeight="1.4" whiteSpace="nowrap">
								{folder}
							</Box>
						</BreadcrumbLink>
					</BreadcrumbItem>
				)
			})}
		</Breadcrumb>
	)
}
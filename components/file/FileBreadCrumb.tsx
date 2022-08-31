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
	const folders = prefix.slice(1).trim().split('/')
	folders.unshift('Drive')

	return (
		<Breadcrumb
			separator={folders.length === 1 ? <></> : <Right />}
			fontWeight="medium"
			fontSize="md"
		>
			{folders.map((folder, index) => {
				return (
					<BreadcrumbItem
						key={folders.slice(0, index + 1).toString()}
						onClick={() => {
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
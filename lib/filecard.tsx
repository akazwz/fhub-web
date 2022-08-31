import React from 'react'
import { Box, Text, Tooltip } from '@chakra-ui/react'

import { FolderIcon } from '../components/file/icons/FolderIcon'
import { ImageIcon } from '../components/file/icons/ImageIcon'
import { useRecoilState } from 'recoil'
import { prefixDirState } from '../src/state/file'

interface FileProps{
	type: string
	name: string
	size: number
}

export const FileCard = (file: FileProps) => {
	const Content = () => {
		switch (file.type) {
			case 'folder':
				return <Folder name={file.name} />
			case 'image':
				return <Image name={file.name} size={file.size} />
			default:
				return <></>
		}
	}

	return (
		<Content />
	)
}

const Folder = ({ name }: { name: string }) => {
	const filename = name.length > 10 ? name.slice(0, 7) + '...' : name

	const [prefixDir, setPrefixDir] = useRecoilState(prefixDirState)

	return (
		<Box
			width="8.7rem"
			p={3}
			m={3}
			borderWidth={1}
			rounded="lg"
			mx="auto"
			overflow="hidden"
			textAlign="center"
			onClick={() => setPrefixDir('/dog')}
		>
			<FolderIcon fontSize="90" />
			<Tooltip label={name}>
				<Text fontWeight="500" whiteSpace="nowrap" maxWidth="100px">{filename}</Text>
			</Tooltip>
			<Text mb="20px">{''}</Text>
		</Box>
	)
}

const Image = ({ name, size }: { name: string, size: number }) => {
	const filename = name.length > 10 ? name.slice(0, 7) + '...' : name
	return (
		<Box
			width="8.7rem"
			p={3}
			m={3}
			borderWidth={1}
			rounded="lg"
			mx="auto"
			overflow="hidden"
			textAlign="center"
		>
			<ImageIcon fontSize="90" />
			<Tooltip label={name}>
				<Text fontWeight="500" whiteSpace="nowrap" maxWidth="100px">{filename}</Text>
			</Tooltip>
			<Text fontWeight="300" fontSize="13px">{size}</Text>
		</Box>
	)
}
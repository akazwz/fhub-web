import React from 'react'
import { useRecoilState } from 'recoil'
import { Box, Text, Tooltip } from '@chakra-ui/react'

import { FolderIcon } from '../components/file/icons/FolderIcon'
import { ImageIcon } from '../components/file/icons/ImageIcon'
import { prefixDirState } from '../src/state/file'
import Image from 'next/image'

interface FileProps{
	type: string
	name: string
	size: number
}

export const FileCard = (file: FileProps) => {
	const Content = () => {
		switch (file.type) {
			case 'folder':
				return <FolderCard name={file.name} />
			case 'image':
				return <ImageCard name={file.name} size={file.size} />
			default:
				return <></>
		}
	}

	return (
		<Content />
	)
}

const FolderCard = ({ name }: { name: string }) => {
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
			onClick={() => setPrefixDir('/dog/')}
		>
			<FolderIcon fontSize="90" />
			<Tooltip label={name}>
				<Text fontWeight="500" whiteSpace="nowrap" maxWidth="100px">{filename}</Text>
			</Tooltip>
			<Text mb="20px">{''}</Text>
		</Box>
	)
}

const ImageCard = ({ name, size }: { name: string, size: number }) => {
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
			{/*<ImageIcon fontSize="90" />*/}
			<Image src={'https://img.pexni.com/dog.png'} objectFit={'contain'} width={100} height={85} draggable={false} />
			<Tooltip label={name}>
				<Text fontWeight="500" whiteSpace="nowrap" maxWidth="100px">{filename}</Text>
			</Tooltip>
			<Text fontWeight="300" fontSize="13px">{size}</Text>
		</Box>
	)
}
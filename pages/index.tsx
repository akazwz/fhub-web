import { Grid, GridProps } from '@chakra-ui/react'

import { FileCard } from '../lib/filecard'

const FileGrid = (props: GridProps) => {
	return (
		<Grid
			boxSizing="border-box"
			gridTemplateColumns="repeat(auto-fill, 9rem)"
			justifyContent="space-between"
			alignItems="flex-end"
			{...props}
		/>
	)
}

const FilePage = () => {
	return (
		<FileGrid>
			<FileCard type={'folder'} name={'dog'} size={300} />
			<FileCard type={'image'} name={'dog.png'} size={300} />
			<FileCard type={'image'} name={'dog.png'} size={300} />
			<FileCard type={'folder'} name={'dog.png'} size={300} />
			<FileCard type={'image'} name={'dog.png'} size={300} />
			<FileCard type={'folder'} name={'dog.png'} size={300} />
			<FileCard type={'folder'} name={'dog.png'} size={300} />
			<FileCard type={'folder'} name={'dog.png'} size={300} />
			<FileCard type={'folder'} name={'dog.png'} size={300} />
		</FileGrid>
	)
}

export default FilePage

import { HStack, Progress, Text } from '@chakra-ui/react'

interface UploadProgressProps{
	value: number
}

export const UploadProgress = ({ value }: UploadProgressProps) => {
	return (
		<HStack>
			<Progress
				w={'100px'}
				hasStripe
				colorScheme="blue"
				value={value}
				size="md"
			/>
			<Text>{value}</Text>
		</HStack>
	)
}
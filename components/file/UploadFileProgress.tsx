import { HStack, Progress, Text } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import { fileUploadProgressState } from '../../src/state/file'

export const UploadFileProgress = () => {
  const progress = useRecoilValue(fileUploadProgressState)
  if (!progress) {
    return null
  }
  return (
    <HStack>
      <Progress
        w={'100px'}
        hasStripe
        colorScheme="blue"
        value={progress.total.percent}
        size="md"
      />
      <Text>{progress.total.percent.toFixed(2)}</Text>
    </HStack>
  )
}
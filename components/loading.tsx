import { Center, Spinner } from '@chakra-ui/react'

export const LoadingPage = () => {
  return (
    <Center h={'80vh'}>
      <Spinner size="xl"/>
    </Center>
  )
}
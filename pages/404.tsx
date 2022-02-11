import { NextPage } from 'next'
import {
  Link,
  Image,
  Button,
  Center,
  VStack,
  Heading,
} from '@chakra-ui/react'

const NotFound: NextPage = () => {
  return (
    <Center w={'100%'} h={'100vh'}>
      <VStack spacing={7}>
        <Heading>404 Page Not Found</Heading>
        <Button
          colorScheme="blue"
          as={Link}
          href={'/'}
        >
          Go to Home
        </Button>
        <Image
          src={'page_not_found.svg'}
          alt={'404'}
        />
      </VStack>
    </Center>
  )
}

export default NotFound
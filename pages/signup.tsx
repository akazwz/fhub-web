import { NextPage } from 'next'
import {
  Flex,
  Text,
  Link,
  Image,
  Input,
  Stack,
  Button,
  VStack,
  HStack,
  Heading,
  useToast,
  FormLabel,
  FormControl,
  useColorModeValue,
} from '@chakra-ui/react'

const SignUp: NextPage = () => {
  const toast = useToast()

  const handleSignUpClick = () => {
    toast({
      title: 'Sign Up Success',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column-reverse', md: 'row' }}>
      <Flex
        flex={1}
      >
        <Image
          alt={'Login Image'}
          objectFit={'contain'}
          src={'welcome_cats.svg'}
        />
      </Flex>
      <VStack
        p={8}
        flex={1}
        align={'center'}
        justify={'center'}
      >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          p={{ base: 5, md: 10 }}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'lg'}
        >
          <Heading size={'lg'} textAlign={'center'}>
            Sign Up
          </Heading>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input type="username"/>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password"/>
          </FormControl>
          <Stack spacing={6}>
            <Button
              colorScheme={'blue'}
              variant={'solid'}
              onClick={handleSignUpClick}
            >
              Sign up
            </Button>
            <HStack spacing="1" justify="center">
              <Text>Already have an account?</Text>
              <Link href={'/login'} color={'blue.500'}>
                Sign in
              </Link>
            </HStack>
          </Stack>
        </Stack>
      </VStack>
    </Stack>
  )
}

export default SignUp
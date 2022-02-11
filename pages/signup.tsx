import { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
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
import { SignUpByUsernamePwdAPI } from '../src/api/user'

const SignUp: NextPage = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const toast = useToast()
  const router = useRouter()

  const handleSignUpClick = () => {
    /* button loading */
    setLoading(true)
    SignUpByUsernamePwdAPI({ username: username, password: password })
      .then((res) => {
        /* judge status code sign up error */
        if (res.status !== 201) {
          toast({
            title: 'Sign Up Error',
            status: 'error',
            position: 'top',
            duration: 3000,
            isClosable: true,
          })
          /* button loading */
          setLoading(false)
          return
        }
        /* sign up success */
        toast({
          title: 'Sign Up Success, Redirecting to login page.',
          status: 'success',
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
        /* button loading */
        setLoading(false)
        /* redirect to login page */
        setTimeout(() => {
          router.push('/login', undefined, { locale: router.locale }).then()
        }, 3000)
      })
      .catch((err) => {
        /* button loading */
        setLoading(false)
        toast({
          title: err.toString(),
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column-reverse', md: 'row' }}>
      <Flex flex={1}>
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
            <Input type="username" onChange={(e) => {setUsername(e.target.value)}}/>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
          </FormControl>
          <Stack spacing={6}>
            <Button
              colorScheme={'blue'}
              variant={'solid'}
              onClick={handleSignUpClick}
              isLoading={loading}
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
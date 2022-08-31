import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Flex,
  Link,
  Text,
  Input,
  Image,
  Stack,
  Button,
  HStack,
  VStack,
  Heading,
  Checkbox,
  FormLabel,
  FormControl,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { SignInByUsernamePwdAPI } from '../src/api/user'
import { isRememberState } from '../src/state/user'
import { useAuth } from '../src/hooks/useAuth'

const Login = () => {
  const [isRemember, setIsRemember] = useRecoilState(isRememberState)

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const toast = useToast()
  const router = useRouter()
  const { setStateLogin } = useAuth()

  const handleSignInClick = () => {
    /* button loading */
    setLoading(true)
    SignInByUsernamePwdAPI({ username: username, password: password })
      .then((res) => {
        /* judge status code sign in error */
        if (res.status !== 201) {
          toast({
            title: 'Sign In Error',
            status: 'error',
            position: 'top',
            duration: 3000,
            isClosable: true,
          })
          /* button loading */
          setLoading(false)
          return
        }
        /* sign in success */

        res.json().then((resData) => {
          const { data } = resData
          const { token } = data
          setStateLogin(token)
          toast({
            title: 'Sign In Success, Redirecting to dashboard.',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true,
          })

          /* button loading */
          setLoading(false)

          /* redirect to dashboard */
          setTimeout(() => {
            router.push('/', undefined, { locale: router.locale }).then()
          }, 3000)
        })

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
      <Flex
        flex={1}
      >
        <Image
          alt={'Login Image'}
          objectFit={'contain'}
          src={'sign_in.svg'}
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
            Sign In
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
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox
                isChecked={isRemember}
                onChange={() => {
                  setIsRemember(!isRemember)
                  /* store in local storage */
                  if (isRemember) {
                    localStorage.setItem('isRemember', 'no')
                  } else {
                    localStorage.setItem('isRemember', 'yes')
                  }
                }}
              >
                Remember me
              </Checkbox>
              <Link href={'/password_reset'} color={'blue.500'}>Forgot password?</Link>
            </Stack>
            <Button
              colorScheme={'blue'}
              variant={'solid'}
              onClick={handleSignInClick}
              isLoading={loading}
            >
              Sign in
            </Button>
            <HStack spacing="1" justify="center">
              <Text>Don&apos;t have an account?</Text>
              <Link href={'/signup'} color={'blue.500'}>
                Sign Up
              </Link>
            </HStack>
          </Stack>
        </Stack>
      </VStack>
    </Stack>
  )
}

export default Login
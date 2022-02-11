import { NextPage } from 'next'
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
} from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { isRememberState } from '../src/state/is_remember'

const Login: NextPage = () => {
  const [isRemember, setIsRemember] = useRecoilState(isRememberState)

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
            <Input type="username"/>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password"/>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox
                isChecked={isRemember}
                onChange={() => {setIsRemember(!isRemember)}}
              >
                Remember me
              </Checkbox>
              <Link href={'/password_reset'} color={'blue.500'}>Forgot password?</Link>
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'}>
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
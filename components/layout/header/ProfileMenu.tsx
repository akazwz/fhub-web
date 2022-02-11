import { useRouter } from 'next/router'
import {
  Box,
  Text,
  Flex,
  Image,
  Stack,
  Button,
  Center,
  Avatar,
  Heading,
  Popover,
  IconButton,
  AvatarBadge,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  Portal,
} from '@chakra-ui/react'
import { useAuth } from '../../../src/hooks/useAuth'
import { IUser } from '../../../src/hooks/useUser'

interface IProfileCard {
  username: string,
  avatar: string,
  gender: number,
  role: string,
}

const ProfileCard = ({ username, avatar, gender, role }: IProfileCard) => {
  const { setStateLogout } = useAuth()

  const router = useRouter()

  const handleLogout = () => {
    setStateLogout()
    router.push('/login', undefined, { locale: router.locale }).then()
  }

  return (
    <Center>
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          alt={''}
          objectFit={'cover'}
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={avatar}
            css={{
              border: '2px solid white',
            }}
          >
            <AvatarBadge
              borderWidth={3}
              boxSize={'0.7em'}
              bg={gender === 1 ? 'pink.500' : 'blue.500'}
            />
          </Avatar>
        </Flex>
        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {username}
            </Heading>
            <Text color={'gray.500'}>{role}</Text>
          </Stack>
          <Button
            w={'full'}
            mt={8}
            rounded={'md'}
            colorScheme={'blue'}
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Box>
      </Box>
    </Center>
  )
}

export const ProfileMenu = (userProfile: IUser) => {
  return (
    <Popover
      placement="bottom-start"
    >
      {() => (
        <>
          <PopoverTrigger>
            <IconButton
              aria-label={userProfile.username}
              rounded={'full'}
            >
              <Avatar
                name={userProfile.username}
                src={userProfile.avatar}
                size={'sm'}
              />
            </IconButton>
          </PopoverTrigger>
          <Portal>
            <PopoverContent p={0} m={0}>
              <ProfileCard
                username={userProfile.username}
                avatar={userProfile.avatar}
                gender={userProfile.gender}
                role={userProfile.role}
              />
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  )
}



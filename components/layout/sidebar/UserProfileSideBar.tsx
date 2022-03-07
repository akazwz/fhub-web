import {
  Text,
  Spacer,
  Avatar,
  HStack,
  IconButton, useColorModeValue,
} from '@chakra-ui/react'
import { More } from '@icon-park/react'

const UserProfileSideBar = () => {
  return (
    <>
      <HStack
        p={3}
        spacing={5}
        h="75px"
        _hover={{ backgroundColor: useColorModeValue('blue.100', 'rgba(132,133,141,0.12)') }}
      >
        <Avatar size="sm"/>
        <Text>akazwz</Text>
        <Spacer/>
        <IconButton
          aria-label={'more'}
          icon={<More/>}
          variant="ghost"
          size="sm"
        />
      </HStack>
    </>
  )
}

export default UserProfileSideBar
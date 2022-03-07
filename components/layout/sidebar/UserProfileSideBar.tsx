import {
  Text,
  Spacer,
  Avatar,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import { More } from '@icon-park/react'

const UserProfileSideBar = () => {
  return (
    <>
      <HStack p={3} spacing={5}>
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
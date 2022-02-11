import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'

export const AlertUsernameError = () => {
  return (
    <Alert
      status={'error'}
      rounded={'md'}
    >
      <AlertIcon/>
      <Box>
        <AlertTitle>
          Username error
        </AlertTitle>
      </Box>
    </Alert>
  )
}
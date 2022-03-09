import { Box, Grid, Skeleton } from '@chakra-ui/react'

export const FileListSkeleton = () => {
  const lists = []
  for (let i = 0; i < 100; i++) {
    lists.push(
      <Skeleton key={'file-list-skeleton' + i.toString()} w={'123px'} h={'162.19px'} rounded={'lg'}/>
    )
  }
  return (
    <Box>
      <Grid
        templateColumns={'repeat(auto-fill, minmax(215px, 1fr))'}
        autoRows={'minmax(215px, auto)'}
        overflow="hidden"
        paddingLeft="40px"
        paddingRight="40px"
      >
        {lists}
      </Grid>
    </Box>
  )
}
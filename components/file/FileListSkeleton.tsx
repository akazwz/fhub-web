import { Grid, Skeleton } from '@chakra-ui/react'

export const FileListSkeleton = () => {
  const lists = []
  for (let i = 0; i < 100; i++) {
    lists.push(
      <Skeleton w={'100px'} h={'110px'} rounded={'lg'}/>
    )
  }
  return (
    <Grid
      templateColumns={'repeat(auto-fill, minmax(100px, 1fr))'}
      autoRows={'minmax(100px, auto)'}
      maxH={'72vh'}
      gap="3"
      padding="3"
      overflow="hidden"
    >
      {lists}
    </Grid>
  )
}
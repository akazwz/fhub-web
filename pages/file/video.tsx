import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AspectRatio, Center } from '@chakra-ui/react'
import VideoPlayer from '../../components/file/VideoPlayer'

const VideoPreview = () => {
  const [playerUrl, setUrl] = useState<string>('')
  const router = useRouter()
  useEffect(() => {
    if (!router.isReady) return
    const { url } = router.query
    if (typeof url === 'string') {
      console.log(url)
      setUrl(url)
    }
  }, [router.isReady, router.query])

  return (
    <Center minH={'100vh'} bg={'gray.900'}>
      <video src={playerUrl}/>
      {/*<AspectRatio ratio={16 / 9} w={{ base: '100%', md: '60%' }}>
        <VideoPlayer
          url={playerUrl}
        />
      </AspectRatio>*/}
    </Center>
  )
}
export default VideoPreview
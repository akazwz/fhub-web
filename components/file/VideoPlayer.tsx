import ReactPlayer from 'react-player'
import { Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'

interface IVideoPreview {
  url: string
}

const VideoPlayer = (props: IVideoPreview) => {
  /*useEffect(() => {
    if (props.url.length < 1) return
    if (!ReactPlayer.canPlay(props.url)) {
      alert('can not play this')
    }
  }, [props.url])*/
  return (
    <ReactPlayer
      url={props.url}
      width="100%"
      height="100%"
      controls={true}
      light={true}
      config={{
        file: {
          forceVideo: true
        }
      }}
      fallback={<Spinner/>}
      onError={(err) => {
        /*console.log(err)
        alert(err)*/
      }}
    />
  )
}
export default VideoPlayer
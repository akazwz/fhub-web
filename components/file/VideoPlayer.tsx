import ReactPlayer from 'react-player'
import { Spinner } from '@chakra-ui/react'

interface VideoPlayerProps{
	url: string
}

const VideoPlayer = ({ url }: VideoPlayerProps) => {
	return (
		<ReactPlayer
			url={url}
			width="100%"
			height="100%"
			controls={true}
			light={true}
			config={{
				file: {
					forceVideo: true
				}
			}}
			fallback={<Spinner />}
			onError={(err) => {
				console.log(err)
			}}
		/>
	)
}

export default VideoPlayer
import { RecoilRoot } from 'recoil'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import theme from '../src/theme'
import { Layouts } from '../lib/layout'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<RecoilRoot>
			<ChakraProvider theme={theme}>
				<Layouts>
					<Component {...pageProps} />
				</Layouts>
			</ChakraProvider>
		</RecoilRoot>
	)
}

export default App

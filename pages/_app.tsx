import { RecoilRoot } from 'recoil'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import theme from '../src/theme'
import { Layout } from '../lib/layout'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<RecoilRoot>
			<ChakraProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</RecoilRoot>
	)
}

export default App

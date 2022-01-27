import { ChakraProvider } from '@chakra-ui/react'
import { CookiesProvider } from "react-cookie"
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ChakraProvider>
  )
}

export default MyApp

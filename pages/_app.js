import { ChakraProvider } from '@chakra-ui/react'
import { CookiesProvider } from "react-cookie"
import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <CookiesProvider>
        <Head><title>SelfRemind</title></Head>
        <Component {...pageProps} />
      </CookiesProvider>
    </ChakraProvider>
  )
}

export default MyApp

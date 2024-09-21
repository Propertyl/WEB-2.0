import "@/styles/globals.css"
import "@/styles/main.css"
import "@/styles/news.css"
import "@/styles/locations.css"
import "@/styles/characters.css"
import type { AppProps } from "next/app";
import { Raleway } from 'next/font/google'

const rale = Raleway({subsets:['latin','cyrillic']})


export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
    <style jsx global>{`
      html {
        font-family: ${rale.style.fontFamily};
      }
    `}</style>
    <Component {...pageProps} />
    </>
  )
}

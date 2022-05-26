import 'normalize.css/normalize.css';
import '../src/styles/global.css';

import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { pageview, optimizeCallback, snippet } from '../src/lib/gtm_utils'
import { GaProvider } from '../src/lib/optimize';

function throwIfSSR() {
  throw new Error('Using GA during SSR is not allowed')
}

function gaHandler() {
  const dataLayer = (window.dataLayer =
    window.dataLayer || [])

  dataLayer.push(arguments)
}


function App({ Component, pageProps }) {
  const ga = typeof window === 'undefined' ? throwIfSSR : gaHandler
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    // optimizeCallback();

    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])

  return (
    <>
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: snippet,
        }}
      />
      <GaProvider value={ga}>
        <Component {...pageProps} />
      </GaProvider>
    </>
  )
}

export default App
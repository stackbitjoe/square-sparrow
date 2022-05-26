
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { gtagScript } from '../src/lib/gtm_utils'

export default class WebDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <noscript>
            <iframe
              src={gtagScript}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
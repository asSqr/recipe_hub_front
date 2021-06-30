import React from 'react'
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from 'next/document'
import { RenderPageResult } from 'next/dist/next-server/lib/utils'
import { ServerStyleSheet } from 'styled-components'
import { ServerStyleSheets as MaterialServerStyleSheets } from '@material-ui/core'

import { appOrigin } from '../utils/constants';

export default class MyDocument extends NextDocument {
  static async getInitialProps(
    ctx
  ) {
    const styledComponentsSheet = new ServerStyleSheet()
    const materialUiSheets = new MaterialServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => props => {
            return styledComponentsSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />)
            )
          }
        })

      const initialProps = await NextDocument.getInitialProps(ctx)
      
      return {
        ...initialProps,
        styles: (
          <React.Fragment key="styles">
            {initialProps.styles}
            {styledComponentsSheet.getStyleElement()}
            {materialUiSheets.getStyleElement()}
          </React.Fragment>
        )
      }
    } finally {
      styledComponentsSheet.seal()
    }
  }

  render() {
    return (
      <Html lang="ja-JP">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <style>{`.container {
  min-height: 100vh;
  padding: 0 0.5rem;
  height: 100vh;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
  letter-spacing: 1px;
}

.footer {
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer a {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.title a {
  color: #0070f3;
  text-decoration: none;
}

.title a:hover,
.title a:focus,
.title a:active {
  text-decoration: underline;
}

.title {
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
}

.title,
.description {
  text-align: center;
}

.description {
  line-height: 1.5;
  font-size: 1.5rem;
}

.code {
  background: #fafafa;
  border-radius: 5px;
  padding: 0.75rem;
  font-size: 1.1rem;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace;
}

.grid {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin-top: 3rem;
}

.card {
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 45%;
}

.card:hover,
.card:focus,
.card:active {
  color: #0070f3;
  border-color: #0070f3;
}

.card h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.card p {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.5;
}

.logo {
  height: 1em;
  margin-left: 0.5rem;
}

@media (max-width: 600px) {
  .grid {
    width: 100%;
    flex-direction: column;
  }
}
.header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #3f51b5;
  box-shadow: 0 10px 15px rgba(10, 10, 10, 0.3);
  display: flex;
  justify-content: space-between;
  z-index: 100;
  padding-left: 20px;
  padding-right: 20px;
  vertical-align: center;
}

.header a {
  text-decoration: none;
  color: white;
}

.header a:hover {
  text-decoration: none;
  color: white;
  text-shadow: rgba(255, 255, 255, 0.8) 1px 0 5px;
}

.menu {
  display: flex;
  justify-content: flex-end;
  width: 40%;
  color: white;
}

.menu-item {
  margin-right: 40px;
  margin-top: auto;
  margin-bottom: auto;
  vertical-align: middle;
}

.menu-item-user {
  margin-right: 40px;
  margin-top: auto;
  margin-bottom: auto;
  vertical-align: middle;
  width: max-content;
}

.menu-item-user img {
  width: 32px;
  border-radius: 30px;
  margin-right: 10px;
}
`}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
import '../styles/globals.css'
import '../styles/RichText.css'
import '../styles/github-markdown.css'
import '../styles/login.css'
import '@draft-js-plugins/image/lib/plugin.css'
import React, { useEffect } from 'react'

import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import {
  ThemeProvider as MaterialUIThemeProvider,
  StylesProvider
} from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from '../styles/theme'

import { AuthProvider } from '../utils/auth';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  return (
    <AuthProvider>
      <StylesProvider injectFirst>
        <MaterialUIThemeProvider theme={theme}>
          <StyledComponentsThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </StyledComponentsThemeProvider>
        </MaterialUIThemeProvider>
      </StylesProvider>
    </AuthProvider>
  )
}

export default MyApp;

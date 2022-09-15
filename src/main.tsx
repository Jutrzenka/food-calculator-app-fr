import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import {BrowserRouter} from "react-router-dom";
import {themeConfig} from './config/themeConfig';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ChakraProvider theme={themeConfig}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </ChakraProvider>
  </React.StrictMode>
)

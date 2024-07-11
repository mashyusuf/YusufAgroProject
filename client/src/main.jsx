import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast'
import './index.css'
import {

  RouterProvider,
} from "react-router-dom"
import { router } from './Router/Router'
import AuthProvider from './Router/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
 <HelmetProvider>
   <React.StrictMode>
    <QueryClientProvider client={queryClient}>
     <AuthProvider>
     <RouterProvider router={router} />
     </AuthProvider>
     <Toaster />
     </QueryClientProvider>
  </React.StrictMode>
 </HelmetProvider>,
)

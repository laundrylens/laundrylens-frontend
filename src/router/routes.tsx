import type { RouteObject } from 'react-router-dom'
import { Layout } from '../components/layout'
import { Home, Symbols, Analyze, Guide, Login, AuthCallback, NotFound } from '../pages'

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/symbols',
        element: <Symbols />,
      },
      {
        path: '/analyze',
        element: <Analyze />,
      },
      {
        path: '/guide',
        element: <Guide />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/auth/callback/:provider',
        element: <AuthCallback />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]

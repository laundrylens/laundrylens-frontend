import type { RouteObject } from 'react-router-dom'
import { Layout } from '../components/layout'
import { Home, Symbols, Analyze, Guide, Login, NotFound } from '../pages'

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
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]

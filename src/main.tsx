import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'

import {store} from 'src/store'
import './sass/main.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import {
  BrowserRouter,
  HashRouter,
  RouteObject,
  RouterProvider,
  useRoutes
} from 'react-router-dom'
import {AuthProvider} from './app/routing'
import {Router, router} from './app/routing/routes'
import {SideNav} from './app/routing/sideNav/sidenav.component'
import {Toaster} from 'react-hot-toast'
import {Sample} from './app/pages'

const MemoChild = () => {
  return (
    <AuthProvider>
      <SideNav />
      <App />
    </AuthProvider>
  )
}

const App = () => {
  let routes: RouteObject[] = [
    {
      path: '/',
      element: <Sample />
    }
  ]

  return (
    <div>
      {useRoutes(Router)}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <Provider store={store}>
      <MemoChild />
    </Provider>
  </HashRouter>
)

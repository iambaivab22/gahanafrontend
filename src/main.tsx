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
import {AuthProvider, USER_ROLES} from './app/routing'
import {Router, router} from './app/routing/routes'
import {SideNav} from './app/routing/sideNav/sidenav.component'
import {Toaster} from 'react-hot-toast'
import {Sample} from './app/pages'
import {Header, TopHeader} from './app/components/header'
import {CompWrapper} from './app/common'
// import Sidebar from './app/components/headerDrawer/headerDrawer.component'
import {Sidebar} from './app/components/headerDrawer/headerDrawer.component'
import {CategoryContainer, MainCarousel, ProductSection} from './app/components'
import {ProductCard} from './app/components/productCard/productCard.component'
import {Footer} from './app/components/footer/footer.component'
import {getCookie} from './helpers'
import {useEffect, useMemo} from 'react'

const MemoChild = () => {
  const roles = getCookie('userRoles')

  const sideNavData = useMemo(() => {
    console.log('hello memo')
    return roles === 'ADMIN' ? <SideNav /> : <></>
  }, [getCookie('userRoles')])

  console.log(roles, 'roles')
  return (
    <AuthProvider>
      {sideNavData}
      <div>
        <App />
      </div>
    </AuthProvider>
  )
}

const App = () => {
  let routes: RouteObject[] = [
    {
      path: '/'
      // element: <Header />
    }
  ]

  return (
    <div
      style={{
        position: 'absolute',
        // right: '10px',
        width: getCookie('userRoles') !== 'ADMIN' ? '100vw' : '75vw',
        marginTop: '40px',
        left: getCookie('userRoles') !== 'ADMIN' ? '0vw' : '20vw'
      }}
    >
      {getCookie('userRoles') !== 'ADMIN' && (
        <>
          <TopHeader></TopHeader>
          <Header></Header>
        </>
      )}

      {useRoutes(Router)}

      {/* <MainCarousel></MainCarousel> */}
      {/* <CompWrapper>
        <CategorryContainer></CategorryContainer>
      </CompWrapper> */}

      {/* <CompWrapper>
        <ProductSection
          header="Best Selling"
          isProfilePage={true}
        ></ProductSection>
      </CompWrapper> */}

      {getCookie('userRoles') !== 'ADMIN' && <Footer></Footer>}

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

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
import {Header, TopHeader} from './app/components/header'
import {CompWrapper} from './app/common'
// import Sidebar from './app/components/headerDrawer/headerDrawer.component'
import {Sidebar} from './app/components/headerDrawer/headerDrawer.component'
import {
  CategorryContainer,
  MainCarousel,
  ProductSection
} from './app/components'
import {ProductCard} from './app/components/productCard/productCard.component'
import {Footer} from './app/components/footer/footer.component'

const MemoChild = () => {
  return (
    <AuthProvider>
      {/* <SideNav /> */}
      <div style={{width: '100%'}}>
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
    <div style={{width: '100vw !important'}}>
      {/* <CompWrapper> */}
      <TopHeader></TopHeader>
      {/* </CompWrapper> */}
      <Header></Header>
      {useRoutes(Router)}

      <MainCarousel></MainCarousel>
      <CompWrapper>
        <CategorryContainer></CategorryContainer>
      </CompWrapper>

      <CompWrapper>
        <ProductSection
          header="Best Selling"
          isProfilePage={true}
        ></ProductSection>
      </CompWrapper>
      <Footer></Footer>

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

// import {BusinessDetailPage, Sample} from 'src/app/pages'
import {ProtectedAuth, PublicAuth} from './ProtectedRoutes.app'
import {CompWrapper} from 'src/app/common'
import {RouteObject, createBrowserRouter} from 'react-router-dom'
import {ROLES} from '../roles'
import {ProductListPage} from 'src/app/pages/products'
import ProductDetailsPage from 'src/app/pages/products/view/[productId]/productId.page'
import {AddProductPage} from 'src/app/pages/products/add/addProduct.page'
// import {CategoryListPage} from 'src/app/pages/category/category.page'
import CategoryDetailPage from 'src/app/pages/category/view/[categoryId]/categoryId.page'
import {CategoryListPage} from 'src/app/pages/category/category.page'
import {CartPage, ProductListForWeb} from 'src/app/pages/web'
// import {BestSellingPage} from 'src/app/pages/bestSelling'
import {
  Banners,
  BestSellingPage,
  NewArrivalListPage,
  OrderListPage,
  RegisterPage,
  ReturnPolicy,
  ShippingPolicy,
  Testimonial
  // ProductWebSample
} from 'src/app/pages'
import {AddCategoryPage} from 'src/app/pages/category'
import {Sample, SubCategoryListPage, LoginPage} from 'src/app/pages'
import {AddSubCategoryPage} from 'src/app/pages/subCategory/add'
import {ProductWebDetail} from 'src/app/pages/web'
import {HomePage} from 'src/app/pages/web/home/home.component'
import {AddTestimonialPage} from 'src/app/pages/testimonial/add/addTestimonial.component'
import {ShopByBudget} from 'src/app/pages/shopByBudget/shopByBudget.component'
import {AddShopByBudget} from 'src/app/pages/shopByBudget/add/addShopByBudget.component'
import {CartCard} from 'src/app/components'

// import LoginPage from 'src/app/pages/login/login.page'

export const Router: RouteObject[] = [
  {
    path: '/product',

    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <ProductWebDetail />
      },
      {
        path: 'add',
        element: <AddProductPage />
      },
      {
        path: 'update/:productId',
        element: <AddProductPage />
      },
      {
        path: 'view/:productId',
        element: <ProductWebDetail />
      }
    ]
  },

  {
    path: '/home',
    // element: <PublicAuth />,/

    element: <HomePage />
  },
  {
    path: '/login',
    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <LoginPage />
      }
    ]
  },

  {
    path: '/register',
    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <RegisterPage />
      }
    ]
  },

  {
    path: '/sample',
    // element: <Sample />
    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <Sample />
      }
    ]
  },
  {
    path: '/return-policy',
    // element: <Sample />
    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <ReturnPolicy />
      }
    ]
  },

  {
    path: '/shipping-policy',
    // element: <Sample />
    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <ShippingPolicy />
      }
    ]
  },
  {
    path: '/products',

    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <ProductListForWeb />
      }
    ]
  },

  {
    path: '/dash-product',

    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <ProductListPage />
      },
      {
        path: 'add',
        element: <AddProductPage />
      },
      {
        path: 'update/:productId',
        element: <AddProductPage />
      },
      {
        path: 'view/:productId',
        element: <ProductDetailsPage />
      }
    ]
  },

  {
    path: '/new-arrivals',

    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <NewArrivalListPage />
      }
    ]
  },

  {
    path: '/best-selling',

    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <BestSellingPage />
      }
    ]
  },
  {
    path: '/category',

    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <CategoryListPage />
      },
      {
        path: 'add',
        element: <AddCategoryPage />
      },
      {
        path: 'update/:categoryId',
        element: <AddCategoryPage />
      },
      {
        path: 'view/:categoryId',
        element: <CategoryDetailPage />
      }
    ]
  },

  {
    path: '/subCategory',

    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <SubCategoryListPage />
      },
      {
        path: 'add',
        element: <AddSubCategoryPage />
      },
      {
        path: 'update/:subCategoryId',
        element: <AddSubCategoryPage />
      },
      {
        path: 'view/:subCategoryId',
        element: <CategoryDetailPage />
      }
    ]
  },
  {
    path: '/banners',

    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <Banners />
      },
      {
        path: 'add',
        element: <AddSubCategoryPage />
      },
      {
        path: 'update/:subCategoryId',
        element: <AddSubCategoryPage />
      },
      {
        path: 'view/:subCategoryId',
        element: <CategoryDetailPage />
      }
    ]
  },

  {
    path: '/testimonial',

    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <Testimonial />
      },
      {
        path: 'add',
        element: <AddTestimonialPage />
      },
      {
        path: 'update/:testimonialId',
        element: <AddTestimonialPage />
      },
      {
        path: 'view/:subCategoryId',
        element: <CategoryDetailPage />
      }
    ]
  },

  {
    path: '/shopByBudget',

    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <ShopByBudget />
      },
      {
        path: 'add',
        element: <AddShopByBudget />
      },
      {
        path: 'update/:subCategoryId',
        element: <AddSubCategoryPage />
      },
      {
        path: 'view/:subCategoryId',
        element: <CategoryDetailPage />
      }
    ]
  },
  {
    path: '/cart',

    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <CartPage />
      }
    ]
  },

  {
    path: '/orders',

    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <OrderListPage />
      }
    ]
  },

  {
    path: '/jobs',
    element: <ProtectedAuth />,
    children: []
  },
  {
    path: '/report-complains',

    element: <ProtectedAuth />,
    children: [
      {
        path: ''
      }
    ]
  },
  {
    path: '/claim-request',

    element: <ProtectedAuth />,
    children: []
  },
  {
    path: '/user-management',

    element: <ProtectedAuth />,
    children: []
  },
  {
    path: '*',
    element: (
      <CompWrapper>
        <div>Not found</div>
      </CompWrapper>
    )
  },
  {
    path: '/denied',
    element: (
      <CompWrapper>
        <div>denied</div>
      </CompWrapper>
    )
  }
]

export const router = createBrowserRouter([
  {
    path: '/'
    // element: <Sample />
  },
  {
    path: '/sample'
    // element: <Sample />
    // loader: rootLoader,
    // children: [
    //   {
    //     path: "team",
    //     element: <Team />,
    //     loader: teamLoader,
    //   },
    // ],
  }
])

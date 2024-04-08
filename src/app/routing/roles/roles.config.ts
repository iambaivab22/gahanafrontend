export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN'
}

type UserRoles = {
  [key: string]: {
    access: string[]
  }
}

export const USER_ROLES: UserRoles = {
  ADMIN: {
    access: [
      '/login',
      '/products/*',
      '/category/*',
      '/subCategory/*',
      '/new-arrivals/*',
      '/best-selling/*',
      '/banners/*',
      '/dash-product/*',
      '/sample',
      '/product/*',
      './home/*',
      '/testimonial/*',
      '/shopByBudget/*',
      '/cart/*',
      '/orders/*',
      '/product/*'
    ]
  },
  USER: {
    access: [
      '/login',
      '/sample',
      '/business/*',
      '/home/*',
      '/banners/*',
      '/testimonial/*',
      '/shopByBudget/*',
      '/cart/*',
      '/orders/*',
      '/dash-product/*',
      '/product/*'
    ]
  }
}

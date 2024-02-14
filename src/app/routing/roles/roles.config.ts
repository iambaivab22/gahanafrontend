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

      '/sample',
      '/product/*',
      './home/*',
      '/testimonial/*',
      '/shopByBudget/*',
      '/cart/*'
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
      '/cart/*'
    ]
  }
}

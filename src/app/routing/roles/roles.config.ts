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
      '/products/*',
      '/category/*',
      '/subCategory/*',
      '/new-arrivals/*',
      '/best-selling/*'
    ]
  },
  USER: {
    access: ['/home', '/sample', '/business/*']
  }
}

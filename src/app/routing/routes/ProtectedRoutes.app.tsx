import {useLocation, Navigate, Outlet, matchPath} from 'react-router-dom'
// import {CompWrapper} from 'src/api/components/compWrapper'

import {useMemo} from 'react'
import {useAuth} from '../hooks'
import {USER_ROLES} from '../roles'
import {CompWrapper} from 'src/app/common'

type allowedRolesProps = {
  allowedRoles?: string[]
}

const ProtectedAuth = ({allowedRoles}: allowedRolesProps) => {
  const {auth} = useAuth()
  const location = useLocation()
  const canAccess = useCanAccessRoute()
  return auth?.isLoggedin ? (
    canAccess?.length > 0 ? (
      <CompWrapper>
        <Outlet />
      </CompWrapper>
    ) : (
      <Navigate to="/" state={{from: location}} replace />
    )
  ) : (
    <Navigate to="/login" state={{from: location}} replace />
  )
}

export const useCanAccessRoute = (url?: string) => {
  const {auth} = useAuth()
  const location = useLocation()

  const testRoutes = useMemo(
    () => (auth.role ? USER_ROLES[auth.role]?.access : []),
    [auth.role]
  )

  const canAccess = testRoutes.filter((path: any) => {
    // console.log('path', path)
    return matchPath({path: path}, url ?? location.pathname)
  })
  return canAccess
}

const PublicAuth = () => {
  const {auth} = useAuth()
  const location = useLocation()

  const canAccess = useCanAccessRoute()
  const testRoutes = useMemo(
    () => (auth.role ? USER_ROLES[auth.role]?.access : []),
    [auth.role]
  )
  return auth?.isLoggedin ? (
    <Navigate to={testRoutes[0]} state={{from: location}} replace />
  ) : canAccess ? (
    <Outlet />
  ) : (
    <Navigate to={'/denied'} state={{from: location}} replace />
  )
}

export {ProtectedAuth, PublicAuth}

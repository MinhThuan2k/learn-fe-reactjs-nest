import { useSelector } from 'react-redux'
import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RootStateRedux } from '@/core/redux/store'
import { userService } from '@/services/user.service'
import { useReduxDispatch } from '@/core/redux/hooks'
import { loginSuccess, logout } from '@/core/redux/actions/authActions'
import { OverlayLoading } from '@/components/ui/loading/OverlayLoading'

interface Props {
  children: ReactNode
}

export const AuthMiddleware = ({ children }: Props) => {
  const dispatch = useReduxDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(
    (state: RootStateRedux) => state.auth.isAuthenticated
  )
  const [isChecking, setIsChecking] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      userService
        .profile()
        .then((user) => {
          dispatch(loginSuccess({ user, token }))
        })
        .catch(() => {
          dispatch(logout())
          navigate('/', { replace: true })
        })
        .finally(() => {
          setIsChecking(false)
        })
    } else {
      dispatch(logout())
      setIsChecking(false)
      navigate('/', { replace: true })
    }
  }, [dispatch, navigate])

  if (isChecking || !isAuthenticated) {
    return <OverlayLoading />
  }

  return children
}

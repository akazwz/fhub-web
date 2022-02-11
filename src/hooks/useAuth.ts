import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isAuthState, isRememberState, tokenState } from '../state/user'

export function useAuth () {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [token, setToken] = useRecoilState(tokenState)
  const [isRemember, setIsRemember] = useRecoilState(isRememberState)
  const isAuth = useRecoilValue(isAuthState)

  useEffect(() => {
    const isRemember = localStorage.getItem('isRemember')
    if (isRemember === 'yes') {
      setIsRemember(true)
    }

    let tokenStore
    if (isRemember === 'yes') {
      tokenStore = localStorage.getItem('f-token')
    } else {
      tokenStore = sessionStorage.getItem('f-token')
    }
    setToken(tokenStore)
    setIsLoading(false)
  }, [setIsRemember, setToken])

  useEffect(() => {
    if (!isAuth) return
  }, [isAuth])

  const setStateLogout = () => {
    if (isRemember) {
      localStorage.removeItem('f-token')
    } else {
      sessionStorage.removeItem('f-token')
    }
    setToken(null)
  }

  const setStateLogin = (token: string) => {
    if (isRemember) {
      localStorage.setItem('f-token', token)
    } else {
      sessionStorage.setItem('f-token', token)
    }
    setToken(token)
  }

  return {
    isLoading,
    isAuth,
    isRemember,
    token,
    setStateLogin,
    setStateLogout,
  }
}
import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import { GetUserProfileAPI } from '../api/user'

export interface IUser {
  username: string,
  email: string,
  phone: string,
  gender: number,
  role: string,
  avatar: string,
  createAt: string,
}

export const useUser = () => {
  const [user, setUser] = useState<IUser>({
    username: '',
    email: '',
    phone: '',
    gender: 0,
    role: '',
    avatar: '',
    createAt: '',
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const { token, isLoading, } = useAuth()

  useEffect(() => {
    /* 获取 token 中 */
    if (isLoading) return
    /* token 为空 */
    if (!token) {
      setIsError(true)
      return
    }
    GetUserProfileAPI(token)
      .then((res) => {
        if (res.status !== 200) {
          return
        }
        res.json().then((resData) => {
          const { data } = resData
          const { username, email, phone, gender, role, avatar, created_at } = data
          let roleStr = ''
          switch (role.toString()) {
            case '1' : {
              roleStr = 'user'
              break
            }
            case '0' : {
              roleStr = 'admin'
              break
            }
          }
          setUser({
            username: username,
            email: email,
            phone: phone,
            gender: gender,
            role: roleStr,
            avatar: avatar,
            createAt: created_at,
          })
          setLoading(false)
        })
      })
      .catch(() => {
        setIsError(true)
      })
  }, [isLoading, token])

  return {
    user,
    isLoading: loading,
    isError
  }
}
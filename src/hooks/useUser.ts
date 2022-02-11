import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import { GetUserProfileAPI } from '../api/user'

interface IUser {
  username: string,
  email: string,
  phone: string,
  gender: string,
  role: string,
  avatar: string,
  createAt: string,
}

export const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const { token } = useAuth()

  useEffect(() => {
    if (!token) return
    GetUserProfileAPI(token)
      .then((res) => {
        if (res.status !== 200) {
          return
        }
        res.json().then((resData) => {
          const { data } = resData
          const { username, email, phone, gender, role, avatar, created_at } = data
          setUser({
            username: username,
            email: email,
            phone: phone,
            gender: gender,
            role: role,
            avatar: avatar,
            createAt: created_at,
          })
          setLoading(false)
        })
      })
      .catch(() => {
        setIsError(true)
      })
  }, [token])

  return {
    user,
    isLoading: loading,
    isError
  }
}
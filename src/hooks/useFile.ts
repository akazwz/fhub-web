import { useRecoilState } from 'recoil'
import { prefixDirState } from '../state/file'
import { useAuth } from './useAuth'
import { useEffect, useState } from 'react'

export const useFile = () => {
  const { token, isAuthLoading } = useAuth()
  const [isFileLoading, setIsLoading] = useState<boolean>(true)
  const [isFileError, setIsError] = useState<boolean>(false)
  const [prefixDir, setPrefixDir] = useRecoilState(prefixDirState)

  useEffect(() => {
    if (isAuthLoading) return
    if (!token) {
      setIsError(true)
      return
    }
    setIsLoading(false)
  }, [isAuthLoading, token])

  return {
    isFileLoading,
    isFileError,
    prefixDir,
    setPrefixDir,
  }
}
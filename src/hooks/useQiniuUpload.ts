import { useEffect, useMemo, useRef, useState } from 'react'
import { upload } from 'qiniu-js'
import { UploadProgress } from 'qiniu-js/esm/upload'

export enum UploadStatus {
  NotReady,
  Ready,
  Processing,
  Success,
  Error,
  Cancel,
}

export function useQiniuUpload (file: File | null, token: string | null) {
  const startTimeRef = useRef<number | null>(null)
  const [uploadState, setUploadState] = useState<UploadStatus>(UploadStatus.NotReady)
  const [uploadError, setUploadError] = useState<Error | null>(null)
  const [speedPeak, setSpeedPeak] = useState<number | null>(null)
  const [Qkey, setQKey] = useState<string | null>(null)
  const [progress, setProgress] = useState<UploadProgress | null>(null)
  const [observable, setObservable] = useState<ReturnType<typeof upload> | null>(null)
  const subscribeRef = useRef<ReturnType<ReturnType<typeof upload>['subscribe']> | null>(null)

  /* when file and token is ready */
  useEffect(() => {
    if (!file) return
    if (!token) return
    setUploadState(UploadStatus.Ready)
    setObservable(upload(file, null, token))
  }, [token, file])

  /* 错误，取消上传 */
  useEffect(() => {
    if (uploadState === UploadStatus.Error) {
      const subscribe = subscribeRef.current
      if (!subscribe) return
      subscribe.unsubscribe()
    }
  }, [uploadState])

  // start to upload file
  const startUpload = () => {
    startTimeRef.current = Date.now()
    if (!observable) return
    subscribeRef.current = observable.subscribe({
      error: (newError) => {
        setUploadState(UploadStatus.Error)
        setUploadError(newError)
      },
      next: (newProgress) => {
        setUploadState(UploadStatus.Processing)
        setProgress(newProgress)
      },
      complete: (newInfo) => {
        setUploadState(UploadStatus.Success)
        const {hash, key} = newInfo
        setQKey(key)
      }
    }) || null
  }

  // stop upload file
  const stopUpload = () => {
    const subscribe = subscribeRef.current
    if (uploadState === UploadStatus.Processing && subscribe && !subscribe.closed) {
      setUploadState(UploadStatus.Cancel)
      subscribe.unsubscribe()
    }
  }

  // get upload speed
  const speed = useMemo(() => {
    if (progress == null || progress.total == null || progress.total.loaded == null) return 0
    const duration = (Date.now() - (startTimeRef.current || 0)) / 1000

    if (Array.isArray(progress.chunks)) {
      const size = progress.chunks.reduce(((acc, cur) => (
        !cur.fromCache ? cur.loaded + acc : acc
      )), 0)

      return size > 0 ? Math.floor(size / duration) : 0
    }

    return progress.total.loaded > 0
      ? Math.floor(progress.total.loaded / duration)
      : 0
  }, [progress])

  useEffect(() => {
    if (speed == null) {
      setSpeedPeak(0)
      return
    }

    if (speed > (speedPeak || 0)) {
      setSpeedPeak(speed)
    }
  }, [speed, speedPeak])

  return {
    startUpload,
    stopUpload,
    uploadState,
    progress,
    uploadError,
    Qkey,
    speed,
    speedPeak,
  }
}

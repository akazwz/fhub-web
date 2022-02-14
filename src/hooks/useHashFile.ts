import { useEffect, useRef, useState } from 'react'
import CryptoJs from 'crypto-js'
import encHex from 'crypto-js/enc-hex'
import type WordArray from 'crypto-js/lib-typedarrays'

export interface Hasher {
  reset (): void;

  update (messageUpdate: WordArray | string): this;

  finalize (messaegUpdate?: WordArray | string): WordArray;
}

/**
 * hash文件
 * @param file 需要计算的文件
 * @param hashAlgo hash 计算的算法 'md5' |'sha1'| 'sha256'  默认为 sha256
 * @param chunkSizeCustom   分块大小 默认为 10M
 */
export const useHashFile = (file: File | null, hashAlgo?: 'md5' | 'sha1' | 'sha256', chunkSizeCustom?: number) => {
  const startTimeRef = useRef<number | null>(null)
  const [isHashLoading, setIsHashLoading] = useState<boolean>(true)
  const [isHashError, setIsHashError] = useState<boolean>(false)
  const [sha256, setSha256] = useState<string | null>(null)
  const [sha1, setSha1] = useState<string | null>(null)
  const [md5, setMd5] = useState<string | null>(null)
  const [timeSpend, setTimeSpend] = useState<number | null>(null)

  useEffect(() => {
    if (!file) return
    /* 记录开始计算时间 */
    startTimeRef.current = Date.now()

    const hashFileInternal = (file: File, alog: Hasher) => {
      let chunkSize = 1024 * 1024 * 10
      /* 自定义分块大小 */
      if (chunkSizeCustom) {
        chunkSize = chunkSizeCustom
      }
      let promise = Promise.resolve()
      for (let index = 0; index < file.size; index += chunkSize) {
        promise = promise.then(() => hashBlob(file.slice(index, index + chunkSize)))
      }

      /* arraybuffer 转 word array */
      function arrayBufferToWordArray (ab: ArrayBuffer) {
        const i8a = new Uint8Array(ab)
        const a = []
        for (let i = 0; i < i8a.length; i += 4) {
          a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3])
        }
        return CryptoJs.lib.WordArray.create(a, i8a.length)
      }

      /* hash blob */
      const hashBlob = (blob: Blob) => {
        return new Promise<void>((resolve) => {
          const reader = new FileReader()
          reader.onload = ({ target }) => {
            if (!target!.result) return
            if (typeof target!.result === 'string') return
            const wordArray = arrayBufferToWordArray(target!.result)
            // 增量更新计算结果
            alog.update(wordArray)
            resolve()
          }
          reader.readAsArrayBuffer(blob)
        })
      }

      return promise.then(() => encHex.stringify(alog.finalize()))
    }

    const hashFileSha256 = () => {
      hashFileInternal(file, CryptoJs.algo.SHA256.create()).then((sha256) => {
        setSha256(sha256)
        if (startTimeRef.current) {
          const t = Date.now() - startTimeRef.current
          setTimeSpend(t)
        }
      }).catch(() => {
        setIsHashError(true)
        setIsHashLoading(false)
      })
    }

    switch (hashAlgo) {
      case 'md5':
        hashFileInternal(file, CryptoJs.algo.MD5.create()).then((md5) => {
          setMd5(md5)
          if (startTimeRef.current) {
            const t = Date.now() - startTimeRef.current
            setTimeSpend(t)
          }
        }).catch(() => {
          setIsHashError(true)
          setIsHashLoading(false)
        })
        break
      case 'sha1':
        hashFileInternal(file, CryptoJs.algo.SHA1.create()).then((sha1) => {
          setSha1(sha1)
          if (startTimeRef.current) {
            const t = Date.now() - startTimeRef.current
            setTimeSpend(t)
          }
        }).catch(() => {
          setIsHashError(true)
          setIsHashLoading(false)
        })
        break
      case 'sha256':
        hashFileSha256()
        break
      default:
        hashFileSha256()
    }
  }, [chunkSizeCustom, file, hashAlgo])

  return {
    isHashLoading,
    isHashError,
    sha256,
    sha1,
    md5,
    timeSpend,
  }
}



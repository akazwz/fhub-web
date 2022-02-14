import CryptoJs from 'crypto-js'
import encHex from 'crypto-js/enc-hex'
import { useEffect, useState } from 'react'

export const useHashFile = (file: File | null) => {
  const [isHashLoading, setIsHashLoading] = useState<boolean>(true)
  const [isHashError, setIsHashError] = useState<boolean>(false)
  const [hash, setHash] = useState<string | null>(null)

  useEffect(() => {
    if (!file) return

    const sha256 = CryptoJs.algo.SHA256.create()

    const hashFile = (file: File) => {
      const chunkSize = 1024
      let promise = Promise.resolve()
      for (let index = 0; index < file.size; index += chunkSize) {
        promise = promise.then(() => hashBlob(file.slice(index, index + chunkSize)))
      }

      function arrayBufferToWordArray (ab: ArrayBuffer) {
        const i8a = new Uint8Array(ab)
        const a = []
        for (let i = 0; i < i8a.length; i += 4) {
          a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3])
        }
        return CryptoJs.lib.WordArray.create(a, i8a.length)
      }

      const hashBlob = (blob: Blob) => {
        return new Promise<void>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = ({ target }) => {
            if (!target!.result) return
            if (typeof target!.result === 'string') return
            const wordArray = arrayBufferToWordArray(target!.result)
            // 增量更新计算结果
            sha256.update(wordArray)
            resolve()
          }
          reader.readAsArrayBuffer(blob)
        })
      }

      return promise.then(() => encHex.stringify(sha256.finalize()))
    }

    hashFile(file).then((sha256Hash) => {
      setHash(sha256Hash)
    })
  }, [file])

  return {
    isHashLoading,
    isHashError,
    hash
  }
}



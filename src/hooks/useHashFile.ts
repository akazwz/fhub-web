import CryptoJs from 'crypto-js'
import encHex from 'crypto-js/enc-hex'
import { useState } from 'react'

export const useHashFile = (file: File) => {
  const [isHashLoading, setIsHashLoading] = useState<boolean>(true)
  const [isHashError, setIsHashError] = useState<boolean>(false)
  const [hash, setHash] = useState<string | null>(null)

  hashFileSha256(file).then((hashSha256) => {
    setHash(hashSha256)
    setIsHashLoading(false)
  }).catch(() => {
    setIsHashError(true)
  })

  return {
    isHashLoading,
    isHashError,
    hash
  }
}

const sha256 = CryptoJs.algo.SHA256.create()

const hashFileSha256 = (file: File) => {
  const chunkSize = 20 * 1024 * 1024

  let promise = Promise.resolve<unknown>(undefined)

  for (let index = 0; index < file.size; index += chunkSize) {
    promise = promise.then(() => hashBlob(file.slice(index, index + chunkSize)))
  }

  function hashBlob (blob: Blob) {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = ({ target }) => {
        if (target!.result) {
          sha256.update(target!.result!.toString())
          resolve()
        } else {
          reject()
        }
      }
      reader.readAsArrayBuffer(blob)
    })
  }

  return promise.then(() => encHex.stringify(sha256.finalize()))
}

import { atom } from 'recoil'
import { UploadProgress } from 'qiniu-js/src/upload/base'

/* record if user choose to remember me checkbox */
export const prefixDirState = atom<string>({
  key: 'prefixDir',
  default: '0/',
})

export const shouldGetFileListState = atom<number>({
  key: 'shouldGetFileListState',
  default: 0,
})

export const fileUploadProgressState = atom<UploadProgress | null>({
  key: 'fileUploadProgress',
  default: null,
})
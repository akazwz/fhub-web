import { atom } from 'recoil'

/* record if user choose to remember me checkbox */
export const prefixDirState = atom<string>({
  key: 'prefixDir',
  default: '0/',
})
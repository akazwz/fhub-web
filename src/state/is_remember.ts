import { atom } from 'recoil'

/* record if user choose to remember me checkbox */
export const isRememberState = atom<boolean>({
  key: 'isRemember',
  default: false,
})

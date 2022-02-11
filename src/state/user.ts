import { atom, selector } from 'recoil'

/* record if user choose to remember me checkbox */
export const isRememberState = atom<boolean>({
  key: 'isRemember',
  default: false,
})

export const tokenState = atom<string | null>({
  key: 'token',
  default: null,
})

export const isAuthState = selector({
  key: 'isAuthState',
  get: ({ get }) => {
    const token = get(tokenState)
    return !!token
  }
})
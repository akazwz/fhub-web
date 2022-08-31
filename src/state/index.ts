import { atom } from 'recoil'

export const isMiniState = atom<boolean>({
	key: 'isMini',
	default: false,
})
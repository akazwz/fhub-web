import { atom } from 'recoil'

export const prefixDirState = atom<string>({
	key: 'prefixDir',
	default: '/',
})

export const shouldGetFileListState = atom<number>({
	key: 'shouldGetFileListState',
	default: 0,
})
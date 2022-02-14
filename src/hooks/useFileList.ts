import { useRecoilState } from 'recoil'
import { shouldGetFileListState } from '../state/file'

export const useFileList = () => {
  const [shouldGetFileList, setShouldGetFileList] = useRecoilState(shouldGetFileListState)

  const refresh = () => {
    setShouldGetFileList(shouldGetFileList + 1)
  }

  return {
    refresh
  }
}
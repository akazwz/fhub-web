import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Button, HStack, IconButton, Text } from '@chakra-ui/react'
import { FolderPlus, Refresh, UploadOne } from '@icon-park/react'
import { GetUploadToken, IUploadFile, UploadFileToServerApi } from '../../src/api/file'
import { useAuth } from '../../src/hooks/useAuth'
import { UploadStatus, useQiniuUpload } from '../../src/hooks/useQiniuUpload'
import { useHashFile } from '../../src/hooks/useHashFile'
import { useRecoilValue } from 'recoil'
import { prefixDirState } from '../../src/state/file'

export const FileOptionBar = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [chosenFile, setChosenFile] = useState<File | null>(null)
  const [uptoken, setUptoken] = useState<string | null>(null)

  const prefix = useRecoilValue(prefixDirState)

  const handleFileInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    /* single file */
    const file = event.target.files[0]
    setChosenFile(file)
  }

  const { token, isAuthLoading } = useAuth()
  const { startUpload, uploadState, uploadError, Qkey } = useQiniuUpload(chosenFile, uptoken)
  const { isHashLoading, isHashError, hash } = useHashFile(chosenFile)

  useEffect(() => {
    if (!hash) return
    /* 获取上传凭证 */
    if (!token) return
    GetUploadToken(token).then((res) => {
      if (res.status !== 200) {
        alert('get upload token error')
        return
      }
      res.json().then((dataRes) => {
        const { data } = dataRes
        const { token } = data
        setUptoken(token)
      })
    })
  }, [hash, token])

  /*useEffect(() => {
    if (!chosenFile) return
    if (!hash) return
    if (!uptoken) return
    /!* 开始上传 *!/
    startUpload()
  }, [chosenFile, hash, uptoken])
*/
  useEffect(() => {
    if (!Qkey) return
    if (!hash) return
    if (!token) return
    if (!chosenFile) return

    /* 文件信息保存到服务器 */
    UploadFileToServerApi(token, {
      cid: '',
      file: true,
      filename: chosenFile.name,
      prefix_dir: prefix,
      qkey: Qkey,
      sha256: hash,
      size: chosenFile.size,
    }).then((res) => {
      if (res.status !== 201) {
        alert('error')
      }
      res.json().then((resData) => {
        const {data} = resData
        console.log(data)
      })
    })
  }, [Qkey, chosenFile, hash, prefix, token])

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <HStack
      p={3}
      spacing={7}
      display={{ base: 'none', md: 'flex' }}
    >
      <Button
        leftIcon={<UploadOne/>}
        colorScheme={'blue'}
        onClick={handleUploadClick}
      >
        Upload
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileInputOnChange}
        hidden
      />
      <Button
        leftIcon={<FolderPlus/>}
      >
        New Folder
      </Button>
      <IconButton
        aria-label={''}
        icon={<Refresh/>}
        rounded="full"
      />
      <Text>
        {hash}
      </Text>
      <Button
        disabled={!chosenFile || !uptoken}
        onClick={startUpload}
      >
        Start
      </Button>
    </HStack>
  )
}
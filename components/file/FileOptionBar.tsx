import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Button, HStack, IconButton } from '@chakra-ui/react'
import { FolderPlus, Refresh, UploadOne } from '@icon-park/react'
import { useFileHashCode } from 'use-hashcode'
import { GetUploadToken, UploadFileToServerApi } from '../../src/api/file'
import { useAuth } from '../../src/hooks/useAuth'
import { useQiniuUpload } from '../../src/hooks/useQiniuUpload'
import { useRecoilValue } from 'recoil'
import { prefixDirState } from '../../src/state/file'

export const FileOptionBar = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [chosenFile, setChosenFile] = useState<File | null>(null)
  const [uptoken, setUptoken] = useState<string | null>(null)

  const prefix = useRecoilValue(prefixDirState)

  const handleFileInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    /* 单个文件 */
    const file = event.target.files[0]
    setChosenFile(file)
  }

  const { token } = useAuth()
  const { startUpload, Qkey } = useQiniuUpload(chosenFile, uptoken)

  const { sha256 } = useFileHashCode(chosenFile)

  useEffect(() => {
    if (!sha256) return
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
  }, [sha256, token])

  useEffect(() => {
    if (!Qkey) return
    if (!sha256) return
    if (!token) return
    if (!chosenFile) return

    /* 文件信息保存到服务器 */
    UploadFileToServerApi(token, {
      cid: '',
      file: true,
      filename: chosenFile.name,
      prefix_dir: prefix,
      qkey: Qkey,
      sha256: sha256,
      size: chosenFile.size,
    }).then((res) => {
      if (res.status !== 201) {
        alert('error')
        return
      }
      alert('success')
    })
  }, [Qkey, chosenFile, sha256, prefix, token])

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
      <Button
        disabled={!chosenFile || !uptoken || !sha256}
        onClick={startUpload}
      >
        Start
      </Button>
    </HStack>
  )
}
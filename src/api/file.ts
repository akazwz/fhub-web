const baseUrl = 'https://gin-akazwz.koyeb.app'

export interface IUploadFile {
  file: boolean,
  filename: string,
  prefix_dir: string,
  size: number,
  sha256: string,
  qkey: string,
  cid: string,
}

export interface ICreateFolder {
  folder_name: string,
  prefix_dir: string,
}

/* 获取上传凭证 */
export const GetUploadToken = (token: string) => {
  return fetch(`${baseUrl}/v1/file/uptoken`, {
    method: 'GET',
    headers: {
      token: token
    },
  })
}

/* 保存文件信息 */
export const UploadFileToServerApi = (token: string, file: IUploadFile) => {
  return fetch(`${baseUrl}/v1/file`, {
    method: 'POST',
    headers: {
      token: token
    },
    body: JSON.stringify(file)
  })
}

/* 新建文件夹 */
export const CreateFolderApi = (token: string, folder: ICreateFolder) => {
  return fetch(`${baseUrl}/v1/file/folder`, {
    method: 'POST',
    headers: {
      token: token
    },
    body: JSON.stringify(folder)
  })
}

/* 获取文件列表 */
export const GetFileList = (token: string, prefixDir: string) => {
  return fetch(`${baseUrl}/v1/file?prefix_dir=${prefixDir}`, {
    method: 'GET',
    headers: {
      token: token
    },
  })
}
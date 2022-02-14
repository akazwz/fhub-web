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

export const GetUploadToken = (token: string) => {
  return fetch(`${baseUrl}/v1/file/uptoken`, {
    method: 'GET',
    headers: {
      token: token
    },
  })
}

export const UploadFileToServerApi = (token: string, file: IUploadFile) => {
  return fetch(`${baseUrl}/v1/file`, {
    method: 'POST',
    headers: {
      token: token
    },
    body: JSON.stringify(file)
  })
}
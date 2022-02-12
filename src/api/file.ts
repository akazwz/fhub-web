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

export const UploadFileToServerApi = (token: string, file: IUploadFile) => {
  return fetch(`${baseUrl}/v1/user/profile`, {
    method: 'POST',
    headers: {
      token: token
    },
    body: JSON.stringify(file)
  })
}
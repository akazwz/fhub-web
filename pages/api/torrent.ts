import { NextApiRequest, NextApiResponse } from 'next'
import WebTorrent from 'webtorrent'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await handleTorrent(req, res)
      return
    default:
      res.status(404).json({ msg: '404 not found' })
  }
}

const handleTorrent = (req: NextApiRequest, res: NextApiResponse) => {
  const client = new WebTorrent()
  const torrentId = 'magnet:?xt=urn:btih:7fcc9392e6be13bb5f9fac067ef949a92704b4c0'
  const t = client.add(torrentId)
  if (!t) {
    res.status(400).json({ msg: 'none' })
    return
  }
  res.status(200).json({
    hash: t.infoHash,
    uri: t.magnetURI,
    files: t.files
  })
}
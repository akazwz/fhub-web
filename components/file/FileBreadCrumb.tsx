import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink, Text,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { useRecoilState } from 'recoil'
import { prefixDirState } from '../../src/state/file'

export const FileBreadCrumb = () => {
  const [prefix, setPrefix] = useRecoilState(prefixDirState)
  const folders = prefix.trim().split('/')

  return (
    <Breadcrumb
      separator={folders.length === 2 ? <></> : <ChevronRightIcon color="gray.500"/>}
      fontWeight="medium"
      fontSize="md"
    >
      {folders.map((folder, index) => {
        if (folder === '0') folder = '文件'
        return (
          <BreadcrumbItem
            key={folders.slice(0, index + 1).toString()}
            onClick={() => {
              const folder = folders.slice(0, index + 1).join('/') + '/'
              setPrefix(folder)
            }}
          >
            <BreadcrumbLink
              _hover={{
                textDecoration: 'none'
              }}
            >
              <Box fontSize="lg" fontWeight="600" lineHeight="1.4" whiteSpace="nowrap">
                {folder}
              </Box>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}
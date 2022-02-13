import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { useRecoilValue } from 'recoil'
import { prefixDirState } from '../../src/state/file'

export const FileBreadCrumb = () => {
  const prefix = useRecoilValue(prefixDirState)
  const folders = prefix.split('/')
  return (
    <Breadcrumb
      separator={<ChevronRightIcon color="gray.500"/>}
      fontWeight="medium"
      fontSize="md"
      p="3"
    >
      {folders.map((folder, index) => {
        if (folder === '0') folder = 'Root'
        return (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink>
              {folder}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}
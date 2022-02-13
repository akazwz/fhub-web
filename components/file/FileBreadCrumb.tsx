import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export const FileBreadCrumb = () => {
  return (
    <Breadcrumb
      separator={<ChevronRightIcon color="gray.500"/>}
      fontWeight="medium"
      fontSize="md"
      p="3"
    >
      <BreadcrumbItem>
        <BreadcrumbLink>
          Root
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>
          Folder
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
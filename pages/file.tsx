import { NextPage } from 'next'
import {
  Grid,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Layout } from '../components/layout'
import FileCard, { ICloudFile } from '../components/file/FileCard'

const File: NextPage = () => {
  const files: ICloudFile[] = [
    { file: true, fileName: 'test.txt', fileSize: 3004 },
    { file: true, fileName: 'test.doc', fileSize: 30040 },
    { file: true, fileName: 'test.mp4', fileSize: 324234 },
    { file: true, fileName: 'test.png', fileSize: 2342 },
    { file: false, fileName: 'test', fileSize: 3004 },
  ]

  return (
    <Layout>
      <Breadcrumb
        separator={<ChevronRightIcon color="gray.500"/>}
        fontWeight="medium"
        fontSize="md"
        ml="3"
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
      <Grid
        templateColumns={'repeat(auto-fill, minmax(100px, 1fr))'}
        autoRows={'minmax(100px, auto)'}
        gap="3"
        padding="3"
      >
        {files.map((file, index) => (
          <FileCard key={index} fileName={file.fileName} fileSize={file.fileSize} file={file.file}/>
        ))}
      </Grid>
    </Layout>
  )
}

export default File
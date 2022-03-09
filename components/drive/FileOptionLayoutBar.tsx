import { useState } from 'react'
import {
  Box,
  Menu,
  Text,
  Button,
  HStack,
  Spacer,
  Tooltip,
  Checkbox,
  MenuList,
  IconButton,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuOptionGroup,
  useColorModeValue,
} from '@chakra-ui/react'
import { Check, SortTwo, AllApplication, HamburgerButton } from '@icon-park/react'

const FileOptionLayoutBar = () => {
  const [sortBy, setSortBy] = useState<string>('updatedAt')
  const [sort, setSort] = useState<string>('down')
  const [viewLayout, setViewLayout] = useState<string>('list')

  let sortByName
  switch (sortBy) {
    case 'name':
      sortByName = '名称'
      break
    case 'createdAt':
      sortByName = '创建时间'
      break
    case 'updatedAt':
      sortByName = '修改时间'
      break
    case 'size':
      sortByName = '文件大小'
      break
  }

  return (
    <HStack
      h="28px"
      pl="40px"
      pr="40px"
    >
      <Checkbox/>
      <Text
        fontSize="12px"
        lineHeight="1.6"
        fontWeight="500"
        whiteSpace="nowrap"
      >
        共37项
      </Text>
      <Spacer/>
      <HStack>
        <Box>
          <Menu>
            <MenuButton
              as={Button}
              aria-label="Options"
              rounded="md"
              fontSize="12"
              fontWeight="300"
              lineHeight="1.6"
              variant="ghost"
              size="xs"
              leftIcon={<SortTwo/>}
            >
              按{sortByName}排序
            </MenuButton>
            <MenuList
              display="flex"
              flexDirection="column"
              alignContent="flex-start"
              minW="167px"
              bg={useColorModeValue('white', 'rgb(49, 49, 54)')}
              border="none"
              pl="5px"
              pr="5px"
            >
              <MenuOptionGroup defaultValue={sortBy} value={sortBy} onChange={(value) => {
                if (typeof value === 'string') {
                  setSortBy(value)
                }
              }}>
                <MenuItemOption icon={<Check fill="rgb(97, 122, 250)" size="1rem"/>} value="name" rounded="md"
                                fontSize="14">名称</MenuItemOption>
                <MenuItemOption icon={<Check fill="rgb(97, 122, 250)" size="1rem"/>} value="createdAt" rounded="md"
                                fontSize="14">创建时间</MenuItemOption>
                <MenuItemOption icon={<Check fill="rgb(97, 122, 250)" size="1rem"/>} value="updatedAt" rounded="md"
                                fontSize="14">修改时间</MenuItemOption>
                <MenuItemOption icon={<Check fill="rgb(97, 122, 250)" size="1rem"/>} value="size" rounded="md"
                                fontSize="14">文件大小</MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider color={useColorModeValue('', 'rgba(132, 133, 141, 0.12)')} ml="4px" mr="4px"/>
              <MenuOptionGroup defaultValue={sort} value={sort} onChange={(value) => {
                if (typeof value === 'string') {
                  setSort(value)
                }
              }}>
                <MenuItemOption icon={<Check fill="rgb(97, 122, 250)" size="1rem"/>} value="up" rounded="md"
                                fontSize="14">升序</MenuItemOption>
                <MenuItemOption icon={<Check fill="rgb(97, 122, 250)" size="1rem"/>} value="down" rounded="md"
                                fontSize="14">降序</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Box>
        <Tooltip
          label="切换视图"
          placement="top"
          bgColor={'rgba(132,133,141, 0.36)'}
          color={'rgba(255,255,255)'}
          rounded="lg"
          p={1}
        >
          <IconButton
            aria-label={'layout'}
            rounded="md"
            size="xs"
            variant="ghost"
            icon={viewLayout === 'list' ? <AllApplication size="1rem"/> : <HamburgerButton size="1rem"/>}
            ml="12px"
            onClick={() => {
              if (viewLayout === 'list') {
                setViewLayout('grid')
              } else {
                setViewLayout('list')
              }
            }}
          />
        </Tooltip>
      </HStack>
    </HStack>
  )
}

export default FileOptionLayoutBar
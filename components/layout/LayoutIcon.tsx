import { createIcon } from '@chakra-ui/react'

export const LayoutIcon = createIcon({
  viewBox: '0 0 16 42',
  path: [
    <path
      key={'1'}
      d="M8 4L8 20L8 38"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
    </path>,
  ],
  defaultProps: {
    fill: 'none',
    width: '16',
    height: '42',
    stroke: 'rgba(132,133,141,0.24)',
  }
})

export const LayoutIconLeft = createIcon({
  viewBox: '0 0 16 42',
  path: [
    <path
      key={'1'}
      d="M8 4L4 20L8 38"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
    </path>,
  ],
  defaultProps: {
    fill: 'none',
    width: '16',
    height: '42',
    stroke: 'rgba(132,133,141,0.24)',
  }
})

export const LayoutIconRight = createIcon({
  viewBox: '0 0 16 42',
  path: [
    <path
      key={'1'}
      d="M8 4L12 20L8 38"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
    </path>,
  ],
  defaultProps: {
    fill: 'none',
    width: '16',
    height: '42',
    stroke: 'rgba(132,133,141,0.24)',
  }
})

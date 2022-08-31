import { PropsWithChildren } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react'

export type NextChakraLinkProps = PropsWithChildren<NextLinkProps & Omit<ChakraLinkProps, 'as'>>

export const NextChakraLink = ({
	href,
	as,
	replace,
	scroll,
	shallow,
	prefetch,
	children,
	...chakraProps
}: NextChakraLinkProps) => {
	return (
		<NextLink
			passHref={true}
			href={href}
			as={as}
			replace={replace}
			scroll={scroll}
			shallow={shallow}
			prefetch={prefetch}
		>
			<ChakraLink
				_hover={{
					textDecoration: 'none',
				}}
				_focus={{
					boxShadow: 'none',
				}}
				_focusVisible={{
					boxShadow: 'outline',
				}}
				{...chakraProps}
			>
				{children}
			</ChakraLink>
		</NextLink>
	)
}
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Container } from './styles'
import { MenuSideBarItemProps } from './types'
import { useMatch } from 'react-router'

const MenuSideBarItem: FC<MenuSideBarItemProps> = ({
  borderColor,
  href,
  children,
}) => {
  const active = Boolean(useMatch(href))
  return (
    <Link to={href}>
      <Container active={active} borderColor={borderColor}>
        {children}
      </Container>
    </Link>
  )
}

export default MenuSideBarItem

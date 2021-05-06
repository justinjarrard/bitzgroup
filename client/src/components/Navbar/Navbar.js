import { useState } from 'react'
import {
  Collapse,
  Navbar as NavigationBar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(true)

  const toggleNavbar = () => setCollapsed(!collapsed)

  return (
    <NavigationBar color='faded' light>
      <NavbarBrand href='/' className='mr-auto'>Bitz Group</NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} className='mr-2' />
      <Collapse isOpen={!collapsed} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink>
              <Link to='/Home' className='navLink'>Home</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to='/Profile' className='navLink'>Profile</Link>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </NavigationBar>
  )
}

export default Navbar

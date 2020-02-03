import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class NavHeader extends Component {

    state = {
        isOpen: false
    };
    toggle = this.toggle.bind(this);

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">
                <img src="https://cdn.rd.gt/assets/images/global/redgate-logo--white.svg?v=1" width="128" className="d-inline-block align-top" alt="" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/">Hello</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            World
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem ><Link to="/users">Users</Link></DropdownItem>
                            <DropdownItem><Link to="/github">GitHubRender</Link></DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}

export default NavHeader;
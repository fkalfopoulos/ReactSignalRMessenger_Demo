import React, { Component } from 'react';
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
import '../'

class AppHeader extends Component {

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
                <img src="https://cdn.rd.gt/assets/images/global/redgate-logo--white.svg?v=1" width="128" className="App-logo" alt="" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="App-header" navbar>
                    <NavItem>
                        <NavLink href="/">Hello</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            World
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem href="https://localhost:44362/api/users">For U</DropdownItem>
                            <DropdownItem>For Us</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}

export default AppHeader;
import React from "react";
import {Navbar, Nav, NavDropdown, Form, Button, FormControl, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


function NavigationBar(props){
	const {title} = props;
  return (
    <Navbar bg="light" expand="lg">
					<Navbar.Brand href="#home">{title}</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#link">Link</Nav.Link>
							{/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
							</NavDropdown> */}
						</Nav>
						<Form inline>
							<Button variant="success">Show Chart</Button>
							<Button variant="outline-success">Github</Button>
						</Form>
					</Navbar.Collapse>
				</Navbar>
  )
}

export default NavigationBar;


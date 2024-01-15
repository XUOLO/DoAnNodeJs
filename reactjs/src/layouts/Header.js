import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
 
  Button,
} from "reactstrap";
 // import { ReactComponent as LogoWhite } from "../assets/images/logos/materialprowhite.svg";
 
const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  // const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate()

  // const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const Logout = () => {
    localStorage.clear();

    navigate('/logout')
   };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar color="primary" dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          {/* <Logo /> */}
        </div>
        {/* <NavbarBrand href="/">
          <LogoWhite className=" d-lg-none" />
        </NavbarBrand> */}
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/starter" className="nav-link">
              Home
            </Link>
          </NavItem>
          
          <NavItem>
          <p onClick={Logout} type='button' className='nav-link'>Logout</p>
          </NavItem>
          
        </Nav>
       
      </Collapse>
    </Navbar>
  );
};

export default Header;

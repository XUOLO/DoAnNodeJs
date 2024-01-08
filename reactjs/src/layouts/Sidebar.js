import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/user4.jpg";
import probg from "../assets/images/bg/download.jpg";
  const auth = localStorage.getItem('user')

 

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img src={user1} alt="user" width="50" className="rounded-circle" />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
       </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
         
            <NavItem  className="sidenav-bg">
              <Link
                to={"/starter"}
                className={
                  location.pathname === "/starter"
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className="bi bi-speedometer2"></i>
                <span className="ms-3 d-inline-block">Dashboard</span>
              </Link>
            </NavItem>
            <NavItem  className="sidenav-bg">
              <Link
                to={"/table"}
                className={
                  location.pathname === "/table"
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className="bi bi-layout-split"></i>
                <span className="ms-3 d-inline-block">Table</span>
              </Link>
            </NavItem>
            
       
          
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;

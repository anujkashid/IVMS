import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { IoIosNotificationsOutline, IoIosLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import "../App.css";
import axios from "axios";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  const [visitData, setVisitData] = useState([]); 
  const [inactiveCount, setInactiveCount] = useState(0); 

  const adminname=localStorage.getItem("admin_name");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        console.log(data);
        setVisitData(data);
        const count = data.filter((visit) => visit.Visit_accept === "pending" || visit.visit_cancelled==="cancelled").length;
        setInactiveCount(count);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  return (
    <Navbar expand="sm" className=" px-3" style={{ marginBottom: 0 ,background:"grey"}}>
      {/* Align the toggle button to the right */}
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="ms-auto"
        style={{ borderColor: "white", color: "white" }}
      />
      <Navbar.Collapse id="basic-navbar-nav">
         <h3 className="text-white fs-4 ms-5">
            {adminname}
            </h3>
    
        <Nav className="ms-auto d-flex align-items-center">
          <Link to="/head/calender" className="text-decoration-none">
          <SlCalender size={24} className="text-white me-4"/>
          </Link>
          
          {/* Notifications Icon with Badge */}
          <Nav.Link href="/head/notification" className="position-relative">
            <IoIosNotificationsOutline
              className="me-4 text-white fw-bold"
              size={30}
            />
            {inactiveCount > 0 && (
              <span
                className="position-absolute translate-middle badge rounded-pill bg-primary text-white"
                style={{ top: "15px", right: "5px"  }}
              >
                {inactiveCount}
              </span>
            )}
          </Nav.Link>
          {/* User Icon */}
          {/* <Nav.Link href="#">
            <FaRegUser className="me-4 text-white fw-bold" size={24} />
          </Nav.Link> */}
          <Nav.Link href="/">
            <IoIosLogOut className="me-4 text-white fw-bold" size={27} />
            </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderComponent;

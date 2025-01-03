import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Dropdown,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut, IoIosNotificationsOutline } from "react-icons/io";
import { useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";
import logo from "../Images/sumago-logo.png";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ColHeader = () => {
  const location = useLocation(); // Get the current path
  const [visitData, setVisitData] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const collegename = localStorage.getItem("CollegeName");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((response) => {
        const today = new Date().toISOString().split("T")[0];
        const filteredData = response.data.userData.filter(
          (visit) =>
            visit.college_name === collegename &&
            visit.Date_of_visit >= today &&
            visit.notification_status === "unseen" &&
            (visit.Visit_accept === "accept" ||
              visit.Visit_accept === "reject" ||
              visit.Visit_accept === "pending")
        );
        setVisitData(filteredData);
        setNotificationCount(filteredData.length);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, [collegename]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{ background: " rgba(91, 91, 91, 0.8)" }}
      fixed="top"
      variant="dark"
    >
      {/* Brand */}
      <Navbar.Brand className="fs-5 ms-4 d-flex align-items-center">
        <img
          src={logo}
          alt="Logo"
          className="me-3"
          style={{ width: "70px", height: "70px" }}
        />
        <div>
          <span
            className="text-white fw-bold d-block fs-4"
            style={{ fontFamily: "Times New Roman" }}
          >
            Sumago Infotech
          </span>
          <span
            className="text-white fw-bold fs-4"
            style={{ fontFamily: "Times New Roman" }}
          >
            Private Limited
          </span>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mx-auto">
          {/* Links */}
          <Nav.Link
            href="/home"
            className={`fs-5 me-2 nav-link-hover ${
              location.pathname === "/home" ? "text-info fw-bold" : "text-white"
            }`}
          >
            Home
          </Nav.Link>
          <Nav.Link
            href="/collegetotalvisit"
            className={`fs-5 me-2 nav-link-hover ${
              location.pathname === "/collegetotalvisit"
                ? "text-info fw-bold"
                : "text-white"
            }`}
          >
            Schedule Visit
          </Nav.Link>
          <Nav.Link
            href="/feedback"
            className={`fs-5 me-2 nav-link-hover ${
              location.pathname === "/feedback" ? "text-info fw-bold" : "text-white"
            }`}
          >
            Feedback
          </Nav.Link>
          <Nav.Link
            href="/gallery"
            className={`fs-5 me-2 nav-link-hover ${
              location.pathname === "/gallery" ? "text-info fw-bold" : "text-white"
            }`}
          >
            Gallery
          </Nav.Link>
          <Nav.Link
            href="/agenda"
            className={`fs-5 me-2 nav-link-hover ${
              location.pathname === "/agenda" ? "text-info fw-bold" : "text-white"
            }`}
          >
            Agenda
          </Nav.Link>
          <Nav.Link
            href="/pendingfees"
            className={`fs-5 me-2 nav-link-hover ${
              location.pathname === "/pendingfees"
                ? "text-info fw-bold"
                : "text-white"
            }`}
          >
            Pending Fees
          </Nav.Link>
        </Nav>

        <Nav className="ms-auto d-flex align-items-center">
          {/* Notifications */}
          <Nav.Link href="/notifications" className="position-relative">
            <IoIosNotificationsOutline
              className="me-3 text-white fw-bold notification-icon nav-link-hover"
              size={35}
            />
            {notificationCount > 0 && (
              <span
                className="position-absolute translate-middle badge rounded-pill bg-info text-white"
                style={{ top: "10px", right: "10px" }}
              >
                {notificationCount}
              </span>
            )}
          </Nav.Link>

          {/* Profile */}
          <Dropdown className="me-3">
            <Dropdown.Toggle
              variant="link"
              id="profile-dropdown"
              className="text-white p-0 border-0"
            >
              <FaRegUser size={30} className="me-1 text-white nav-link-hover"/>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{background:"rgba(25,25,25,0.8)"}} >
              <Dropdown.Item href="/profile" className="nav-link-hover text-white">View Profile</Dropdown.Item>
              <Dropdown.Item href="/update_profile" className="nav-link-hover text-white">Update Profile</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Logout */}
          <Nav.Link href="/" >
            <IoIosLogOut size={30} className="me-4 text-white nav-link-hover" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ColHeader;

import React, { useState } from "react";
import "../App.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Col, Nav, Row } from "react-bootstrap";
import { Offcanvas, Button } from "react-bootstrap";
import { BsBarChartLineFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import sumago from "../Images/sumago-logo.png";
import { IoIosArrowDropdown } from "react-icons/io";
import { FaUserPlus } from 'react-icons/fa';
import { MdAppRegistration } from 'react-icons/md';
import { AiOutlineCalendar } from 'react-icons/ai'; 
import { FaMoneyBillWave } from 'react-icons/fa'; 
import { MdReport } from 'react-icons/md';
import { FaRegHandshake } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaGraduationCap } from 'react-icons/fa'; 
import { MdLocationOn } from 'react-icons/md';
import { FaMapPin } from 'react-icons/fa';
import { TbReport } from "react-icons/tb";
import { TbMessageUser } from "react-icons/tb";
import { LuCalendarCheck } from "react-icons/lu";
import { PiImageSquare } from "react-icons/pi";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineFeedback } from "react-icons/md";


const Sidebar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <style>
        {`
        .sidebar {
          position: fixed;
          background-color:rgb(65, 56, 56);
          height: 100vh;
          width: 270px;
          z-index: 1045; 
          overflow-y:auto;
          overflow-x:hidden;
        }
        .nav-link {
          color: white;
          font-size: 20px;
        }
        .nav-link:hover {
          background-color: #e2e6ea; 
          color: #007bff; 
        }
        `}
      </style>

      {/* Toggle Button */}
      <Button
        variant="dark"
        className="d-md-none"
        onClick={handleShow}
        style={{ position: "fixed", top: "10px", left: "20px", zIndex: "1050" }}
      >
        ☰
      </Button>

      {/* Sidebar for Larger Screens */}
      <div className="sidebar d-none d-md-block">
        <div
          className="mt-3 mb-3"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={sumago}
            alt="profile"
            style={{ width: "50px", height: "50px" }}
          />
          <h4
            className="text-danger fw-bold ms-2"
            style={{ fontFamily: "Times New Roman" }}
          >
            Sumago Infotech Private Limited
          </h4>
        </div>
        <Nav defaultActiveKey="/dashboard" className="flex-column">
          <Nav.Item>
            <Link to="/head/dashboard" className="nav-link p-2">
              <BsBarChartLineFill size={30} className="me-3 " /> Dashboard
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/college_registarion" className="nav-link p-2">
              <FaUserPlus size={30} className="me-2" /> College
              Registration
            </Link>
          </Nav.Item>
          <Nav.Item>
  <Row>
    <Col md={2}>
      <MdAppRegistration size={30} className="ms-2 mt-2 text-white" />
    </Col>
    <Col md={10}>
      <div className="">
        <Button
          variant="link"
          className="nav-link  p-2"
          style={{ fontSize: "20px", textDecoration: "none" }}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Master
          <IoIosArrowDropdown size={20} style={{marginLeft:"70px"}} />
        </Button>
        {showDropdown && (
          <div className="mt-2 d-flex flex-column text-white">
            <div>
              <FaMapMarkerAlt size={24} className=" me-2"></FaMapMarkerAlt>
            <Link
              to="/head/location"
              className="nav-link p-2"
              style={{ display: "inline-block" }}
            >
              Location
            </Link>
            </div>
                
            <div>
              <FaGraduationCap size={24} className=" me-2"/>   
            <Link
              to="/head/university"
              className="nav-link p-2"
              style={{ display: "inline-block" }}
            >
              University
            </Link>
            </div>
           
           <div>
           <MdLocationOn size={24} className=" me-2" />
           <Link
              to="/head/getstate"
              className="nav-link p-2"
              style={{ display: "inline-block" }}
            >
              State
            </Link>
          </div>

          <div>
            <FaMapPin size={24} className="me-2"/>
            <Link
              to="/head/district"
              className="nav-link p-2 "
              style={{ display: "inline-block" }}
            >
              District
            </Link>
          </div>
  
          <div>
            <FaMapPin size={24} className=" me-2"/>
            <Link
              to="/head/city"
              className="nav-link p-2"
              style={{ display: "inline-block" }}
            >
              City
            </Link>
          </div>
          </div>
        )}
      </div>
    </Col>
  </Row>
</Nav.Item>


          <Nav.Item>
            <Link to="/head/getagenda" className="nav-link p-2">
              <AiOutlineCalendar size={30} className="me-2" /> Agenda
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/getfees" className="nav-link p-2">
              <FaMoneyBillWave size={30} className="me-2" /> Fees
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/report" className="nav-link p-2">
            <TbReport size={30} className="me-2" /> Report
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/ivrequest" className="nav-link p-2">
              <TbMessageUser size={30} className="me-2" /> IV Requests
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link to="/head/feeverification" className="nav-link p-2">
              <GiConfirmed size={30} className="me-2" />Confirm Fees
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link to="/head/visitcomplete" className="nav-link p-2">
              <LuCalendarCheck size={30} className="me-2 " /> Visited Colleges
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link to="/head/media" className="nav-link p-2">
              <PiImageSquare size={30} className="me-2 " />Add Media 
            </Link>
          </Nav.Item>

          <Nav.Item>

            <Link to="/head/feedback" className="nav-link p-2">
              <MdOutlineFeedback size={30} className="me-2 " />Feedback
            </Link>
          </Nav.Item>
          

        </Nav>
      </div>

      {/* Offcanvas for Smaller Screens */}
      <style>
      {`
      .small_sidebar {
        position: fixed;
        background-color:rgb(56, 51, 56);
        height:;
        width: 270px;
        z-index: 1045; 
        overflow-y:auto;
        overflow-x:hidden;
      }
      
      `}
    </style>

      <Offcanvas show={show} onHide={handleClose} className="d-md-none small_sidebar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
          <div
            className="mt-4 ms-3"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={sumago}
              alt="profile"
              style={{ width: "50px", height: "50px" }}
            />
            <h4
              className="text-danger fw-bold ms-2"
              style={{ fontFamily: "Times New Roman" }}
            >
              Sumago Infotech Private Limited
            </h4>
          </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-block d-md-none">
          <Nav defaultActiveKey="/dashboard" className="flex-column">
          <Nav.Item>
            <Link to="/head/dashboard" className="nav-link p-2">
              <BsBarChartLineFill size={30} className="me-3 " /> Dashboard
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/college_registarion" className="nav-link p-2">
              <FaUserPlus size={30} className="me-3" /> College
              Registration
            </Link>
          </Nav.Item>
          <Nav.Item>
  <Row>
    <Col md={2}>
      <MdAppRegistration size={30} className=" mt-2 text-white" />
    </Col>
    <Col md={10}>
      <div className="">
        <Button
          variant="link"
          className="nav-link "
          style={{ fontSize: "20px", textDecoration: "none" }}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Master
          <IoIosArrowDropdown size={20} style={{marginLeft:"50px"}} />
        </Button>
        {showDropdown && (
          <div className="mt-2 d-flex flex-column text-white">
            <div>
              <FaMapMarkerAlt size={24} className=" me-2"></FaMapMarkerAlt>
            <Link
              to="/head/location"
              className="nav-link p-2"
              style={{ display: "inline-block" }}
            >
              Location
            </Link>
            </div>
                
            <div>
              <FaGraduationCap size={24} className=" me-2"/>   
            <Link
              to="/head/university"
              className="nav-link p-2"
              style={{ display: "inline-block" }}
            >
              University
            </Link>
            </div>
           
           <div>
           <MdLocationOn size={24} className=" me-2" />
           <Link
              to="/head/getstate"
              className="nav-link p-2"
              style={{ display: "inline-block" }}
            >
              State
            </Link>
          </div>

          <div>
            <FaMapPin size={24} className="me-2"/>
            <Link
              to="/head/district"
              className="nav-link p-2 "
              style={{ display: "inline-block" }}
            >
              District
            </Link>
          </div>
  
          <div>
            <FaMapPin size={24} className=" me-2"/>
            <Link
              to="/head/city"
              className="nav-link p-2"
              style={{ display: "inline-block" }}
            >
              City
            </Link>
          </div>
          </div>
        )}
      </div>
    </Col>
  </Row>
</Nav.Item>


          <Nav.Item>
            <Link to="/head/getagenda" className="nav-link p-2">
              <AiOutlineCalendar size={30} className="me-2" /> Agenda
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/getfees" className="nav-link p-2">
              <FaMoneyBillWave size={30} className="me-2" /> Fees
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/report" className="nav-link p-2">
            <TbReport size={30} className="me-2" /> Report
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/head/ivrequest" className="nav-link p-2">
              <TbMessageUser size={30} className="me-2" /> IV Requests
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link to="/head/feeverification" className="nav-link p-2">
              <GiConfirmed size={30} className="me-2" />Confirm Fees
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link to="/head/visitcomplete" className="nav-link p-2">
              <LuCalendarCheck size={30} className="me-2 " /> Visited Colleges
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link to="/head/media" className="nav-link p-2">
              <PiImageSquare size={30} className="me-2 " />Add Media 
            </Link>
          </Nav.Item>

          <Nav.Item>

            <Link to="/head/feedback" className="nav-link p-2">
              <MdOutlineFeedback size={30} className="me-2 " />Feedback
            </Link>
          </Nav.Item>
          

        </Nav>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// Icons:
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../App.css"
import { FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <Container fluid className="bg-dark text-white">
      <Row>
        {/* Contact Us Section */}
        <Col md={1}></Col>
        <Col sm={12} md={3} className=" mb-3 mt-3 ps-5">
          <h4 className=" text-primary mb-3">Contact Us</h4>
          <Row className="mb-2">
            <Col>
              <a
                href="mailto:info@sumagoinfotech.com"
                className=" mx-2 text-white text-decoration-none"
              >
                <MdOutlineEmail size={20} className="me-3 text-primary" />
                <span className="nav-link-hover">info@sumagoinfotech.com</span>
              </a>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <a
                href="tel:+918408084888"
                className=" mx-2 text-white text-decoration-none"
              >
                <FaPhoneAlt size={20} className="me-3 text-primary" />
                <span className="nav-link-hover">+91 8408084888</span>
              </a>
            </Col>
          </Row>
          <Row>
            <Col>
              <a
                href="tel:+917263084881"
                className=" mx-2 text-white text-decoration-none"
              >
                <FaPhoneAlt size={20} className="me-3 text-primary" />
                <span className="nav-link-hover">+91 7263084881</span>
              </a>
            </Col>
          </Row>

          <h4 className="mt-4 mb-3 ps-2 text-primary">Social Media</h4>
          <div className="ps-3">
          <a
        href="https://www.youtube.com/c/SumagoInfotechPvtLtd"
        target="_blank"
        rel="noopener noreferrer"
        title="YouTube"
        className="text-decoration-none me-3"
      >
        <FaYoutube size={30} color="#FF0000" />
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/sumago_infotech/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram"
        className="text-decoration-none me-3"
      >
        <FaInstagram size={30} color="#E4405F" />
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/company/sumago-infotech-pvt-ltd/?originalSubdomain=in"
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
        className="text-decoration-none"
      >
        <FaLinkedin size={30} color="#0A66C2" />
      </a>
          </div>
        </Col>

        {/* Quick Links Section */}
        <Col sm={12} md={3} className=" mb-3 mt-3 ">
          <h4 className=" mb-3 text-center text-primary">Quick Links</h4>
          <div className="d-flex flex-column " style={{marginLeft:"120px"}}>
            <Link to="/home" className="text-decoration-none text-white mb-2 nav-link-hover">
              <FaArrowRight className="me-2 text-primary"/>
              Home
            </Link>
            <Link to="/addvisit" className="text-decoration-none text-white mb-2 nav-link-hover">
            <FaArrowRight className="me-2 text-primary"/>
              Visit Schedule
            </Link>
            <Link to="/feedback" className="text-decoration-none text-white mb-2 nav-link-hover">
            <FaArrowRight className="me-2 text-primary"/>
              Feedback
            </Link>
            <Link to="/agenda" className="text-decoration-none text-white mb-2 nav-link-hover">
            <FaArrowRight className="me-2 text-primary"/>
              Agenda
            </Link>
            <Link to="/gallery" className="text-decoration-none text-white mb-2 nav-link-hover">
            <FaArrowRight className="me-2 text-primary"/>
              Gallery
            </Link>
            <Link to="/pendingfees" className="text-decoration-none text-white nav-link-hover">
            <FaArrowRight className="me-2 text-primary"/>
              Pending Fees
            </Link>
          </div>
        </Col>

        {/* Address Section */}
        <Col sm={12} md={4} className="text-center mb-3 mt-3">
          <h4 className="text-center mb-3 text-primary">Address</h4>
          <Row>
            <Col sm={6} className="mb-3">
              <h5 className="text-start">Corporate Office:</h5>
              <p className="text-start">
                <a href= "https://maps.app.goo.gl/EfoL8csq1A7HRiJv7" className="text-decoration-none nav-link-hover text-white" >
                  <FaLocationDot className="fs-5 me-2" />
                  The Avenue, Six Floor, Behind Prakash Petrol Pump, Govind Nagar, Nashik, Maharashtra, 422009.
                </a>
                
              </p>
              <div className="text-start">
              <a
                href="tel:+918408084888"
                className="text-white text-decoration-none"
              >
                <FaPhoneAlt size={20} className="me-2 text-primary" />
                <span className="nav-link-hover">+91 8408084888</span>
              </a>
              </div>
            </Col>
            <Col sm={6} className="mb-3">
              <h5 className="text-start">Pune Office:</h5>
              <p className="text-start">
                <a href="https://maps.app.goo.gl/6kYXy34MrjSvih8n7" className="text-decoration-none nav-link-hover text-white" >
                  <FaLocationDot className="fs-5 me-2" />
                  Third Floor, Kakade Center Port, University Rd, near E-Square, Shivajinagar, Pune, Maharashtra, 411016
                </a>
               
              </p>
              <div className="text-start">
              <a
                href="tel:+918408084888"
                className="text-white text-decoration-none"
              >
                <FaPhoneAlt size={20} className="me-2 text-primary" />
                <span className="nav-link-hover">+91 7263084881</span>
              </a>
              </div>
             
            </Col>
          </Row>
        </Col>
        <Col md={1}></Col>
      </Row>

      {/* Copyright Line */}
      <Row className="mt-0 text-center">
        <Col>
          <p className="my-3">
            &copy; {new Date().getFullYear()} Sumago Infotech private limited. All Rights Reserved.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;

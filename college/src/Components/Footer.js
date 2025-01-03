import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// Icons:
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
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
          <h4 className=" mb-3">Contact Us</h4>
          <Row className="mb-2">
            <Col>
              <a
                href="mailto:info@sumagoinfotech.com"
                className=" mx-2 text-white text-decoration-none"
              >
                <MdOutlineEmail size={20} className="me-3" />
                <span>info@sumagoinfotech.com</span>
              </a>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <a
                href="tel:+918408084888"
                className=" mx-2 text-white text-decoration-none"
              >
                <FaPhoneAlt size={20} className="me-3" />
                <span>+91 8408084888</span>
              </a>
            </Col>
          </Row>
          <Row>
            <Col>
              <a
                href="tel:+917263084881"
                className=" mx-2 text-white text-decoration-none"
              >
                <FaPhoneAlt size={20} className="me-3" />
                <span>+91 7263084881</span>
              </a>
            </Col>
          </Row>

          <h4 className="mt-4 mb-3 ps-2">Social Media</h4>
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
          <h4 className=" mb-3 text-center">Quick Links</h4>
          <div className="d-flex flex-column " style={{marginLeft:"120px"}}>
            <Link to="/home" className="text-decoration-none text-white mb-2 nav-link-hover">
              Home
            </Link>
            <Link to="/addvisit" className="text-decoration-none text-white mb-2 nav-link-hover">
              Visit Schedule
            </Link>
            <Link to="/feedback" className="text-decoration-none text-white mb-2 nav-link-hover">
              Feedback
            </Link>
            <Link to="/agenda" className="text-decoration-none text-white mb-2 nav-link-hover">
              Agenda
            </Link>
            <Link to="/gallery" className="text-decoration-none text-white mb-2 nav-link-hover">
              Gallery
            </Link>
            <Link to="/report" className="text-decoration-none text-white nav-link-hover">
              Report
            </Link>
          </div>
        </Col>

        {/* Address Section */}
        <Col sm={12} md={4} className="text-center mb-3 mt-3">
          <h4 className="text-center mb-3">Address</h4>
          <Row>
            <Col sm={6} className="mb-3">
              <h5 className="text-start">Corporate Office:</h5>
              <p className="text-start">
                <a href= "https://maps.app.goo.gl/EfoL8csq1A7HRiJv7" >
                  <FaLocationDot className="fs-5 me-2" />
                </a>
                The Avenue, Six Floor, Behind Prakash Petrol Pump, Govind Nagar, Nashik, Maharashtra 422009.
              </p>
            </Col>
            <Col sm={6} className="mb-3">
              <h5 className="text-start">Pune Office:</h5>
              <p className="text-start">
                <a href="https://maps.app.goo.gl/6kYXy34MrjSvih8n7">
                  <FaLocationDot className="fs-5 me-2" />
                </a>
                Third Floor, Kakade Center Port, University Rd, near E-Square, Premnagar, Shivajinagar, Pune, Maharashtra 411016
              </p>
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

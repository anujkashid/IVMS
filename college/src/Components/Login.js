import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Button, Alert, Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/sumago-logo.png";
import "../App.css";
import Typewriter from "typewriter-effect";

const Login = () => {
  const navigate = useNavigate();
  const [reg_college_username,SetCollegeName] = useState("");
  const [reg_password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [visitData, setVisitData] = useState();
  const [TotalVisita,setTotalVisita] = useState(100);

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError("");

    axios
      .post(
        "http://localhost:8000/loginauth",
        { reg_college_username, reg_password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const { token } = response.data.token;
        // console.log(response.data);
          localStorage.setItem("accessToken", token);
          localStorage.setItem("userid",response.data._id);
          localStorage.setItem("CollegeName",response.data.collage_name);
          localStorage.setItem("mousigned",response.data.mousigned);
          // console.log(response.data.mousigned)
          navigate("/home");
      })
      .catch((err) => {
        console.error("Login Error:", err);
        setServerError( "Invalid credentials. Please try again later.");
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);
        // total visit count
        const totalcount = data.length;
        setTotalVisita(100+totalcount);
  }) 
          .catch((err) => console.log(err));
      },[]);

  return (
    <div >
  
    {/* <Navbar collapseOnSelect expand="lg" fixed="top"  variant="dark">
  
    <Navbar.Brand className="fs-5 ms-4 d-flex align-items-center">
      <img
        src={logo}
        alt="Logo"
        className="me-3"
        style={{ width: "70px", height: "70px" }}
      />
      <div>
        <span
          className=" fw-bold d-block text-danger fs-3"
          style={{ fontFamily: "Times New Roman" }}
        >
          Sumago Infotech  Private Limited
        </span>
      </div>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ms-auto d-flex align-items-center">
   
        <Nav.Link href="/register">
        <Button className="me-3">
        REGISTER
        </Button>
        </Nav.Link>

       
        <Nav.Link href="/">
        <Button className="me-5">
        LOGIN
        </Button>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar> */}
    <Container fluid >
      <Row className="" >
        <Col md={7} className="text-center home-section1" >
       
        <div className="fs-1 fw-bold mt-4 text-white"  style={{paddingTop:"10vh"}}>
               WELCOME TO SUMAGO INFOTECH
        </div>
        
        <div className="text-container">
  <p className="">INDUSTRIAL VISIT MANAGEMENT SYSTEM</p>
</div>
        
        <div className="mt-3 text-center mx-5">
          <p className="text-white fs-5 " style={{justifyContent:"justify"}}>A single platform for managing all stakeholder collaboration which aims to bridge the gap between academia and industry, gain valuable insights and build strong industrial relationships.</p>
        </div>
        {/* <Card  className=" shadow shadow-md mx-auto bg-secondary rounded-4"
              style={{
                width: "12rem",
                height: "12rem",
                marginTop: "15vh",
                background: "linear-gradient(#b0e0e6, #4682b4)",
              }}
         >
        <Card.Title className="p-2 fs-1 fw-bold text-primary">
        {TotalVisita}+
        </Card.Title>
        <Card.Text className="text-dark fs-3 fw-bold mt-3">
            Total Visits
      </Card.Text>
</Card> */}


<div className="text-white" style={{ marginTop: "15vh"}}>
<Typewriter
  onInit={(typewriter) => {
    typewriter
      .typeString(
        `<span class="fs-1"><span class="fw-bold">${TotalVisita}</span>+ <span class="fs-5">Completed Visits Until Now</span></span>`
      )
      .pauseFor(1000)
      .deleteAll()
      .typeString( `<span class="fs-1"><span class="fw-bold">${TotalVisita}</span>+ <span class="fs-5">Completed Visits Until Now</span></span>`)
      .start();
  }}
/>
</div>
        </Col>
          <Col md={5} className="d-flex justify-content-center align-items-center back-color1">
           
          <Card className="border border-primary shadow shadow-md " style={{height:"28rem", width:"25rem"}}>
            <Card.Body>
              <h3 className="text-center text-primary fs-2">Login</h3>
              {serverError && <Alert variant="danger">{serverError}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="mb-3 mt-3 text-center">
                  <Form.Label className="">Username:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={reg_college_username}
                    onChange={(e) => SetCollegeName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3 text-center">
                  <Form.Label>Password:</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={reg_password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                   <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ms-2"
                  >
                    {showPassword ? (
                      <><FaEyeSlash size={24} className="me-1 text-primary" /></>
                    ) : (
                      <><FaEye size={24} className="me-1 text-primary" /></>
                    )}
                  </Button>

                  </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 fs-5">
                  Login
                </Button>

              <div className="mt-3 text-center">
              <Link to="/forget" className=""><span className="">Forgot Password?</span></Link>
              </div>
              <div className="text-center mt-2">
                  <p>Dont have an account?  <Link to="/register" className=""><span className="ms-1  ">Register</span></Link></p>
              </div>
              </Form>
            </Card.Body>
          </Card>
          </Col>
      </Row>
    </Container>
    </div>
  );

};


export default Login;
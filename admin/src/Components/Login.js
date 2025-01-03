import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Col, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
// import { toast } from "react-toastify"; // For notifications

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError("");

    axios
      .post(
        "http://localhost:8000/adminlogin",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const { token } = response.data.token;
        console.log(response.data);
          localStorage.setItem("accessToken", token);
        //   localStorage.setItem("userid",response.data.id);

          localStorage.setItem("admin_name", response.data.admin_name)
          navigate("/head/dashboard");
      })
      .catch((err) => {
        console.error("Login Error:", err);
        setServerError( "Invalid credentials. Please try again later.");
      });
  };

  return (
    <Col
      md={12}
      lg={12}
      className="d-flex justify-content-center align-items-center mt-5 mb-5"
    >
      <Card className="shadow p-5" style={{ width: "35rem" }}>
        <Card.Body>
          <Card.Title className="text-center">
            <h1>Login</h1>
            {serverError && <Alert variant="danger">{serverError}</Alert>}
          </Card.Title>
          <Card.Text>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-5" controlId="formBasicEmail">
                <Form.Label>
                  <b>Username:</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
               
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  <b>Password:</b>
                </Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.admin_password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Show Password"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </Form.Group>

              <div className="text-center mb-4">
                <Button
                  className="mt-3 px-4 py-2"
                  variant="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </Form>
          </Card.Text>
          {/* <Card.Link href="#">Forgot Password</Card.Link>
          <Card.Link className="ms-5">
            <Link to='/error'>Don’t have an account? Get Started</Link>
          </Card.Link> */}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Login;

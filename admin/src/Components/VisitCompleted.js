import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const VisitCompleted = () => {
  const [visitData, setVisitData] = useState([]);
  const [college_name, setCollegeName] = useState("");
  const [Date_of_visit, setDateOfVisit] = useState("");
  const [Visit_status, setVisitStatus] = useState("");
  const [id, setId] = useState("");
  const [collegeData, setCollegeData] = useState([]);
  const [datedata, setDateData] = useState([]);

  const handleClear = () => {
    setCollegeName("");
    setDateOfVisit("");
    setVisitStatus("");
    setDateData([]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);
        const filteredCollege = [...new Set(data.map((item) => item.college_name))];
        setCollegeData(filteredCollege);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (college_name) {
      const today = new Date();
      const pastWeek = new Date(today);
      pastWeek.setDate(today.getDate() - 7);

      const filteredDate = visitData
        .filter(
          (item) =>
            item.college_name === college_name &&
            new Date(item.Date_of_visit) <= today &&
            new Date(item.Date_of_visit) >= pastWeek &&
            item.Visit_accept === "accept"
        )
        .map((item) => ({ date: item.Date_of_visit, id: item._id }));

      setDateData(filteredDate);
    } else {
      setDateData([]);
    }
  }, [college_name, visitData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userdata = { college_name, Date_of_visit, Visit_status };

    axios
      .put(`http://localhost:8000/updatevisit/${id}`, userdata)
      .then(() => {
        handleClear();
      })
      .catch((err) => console.log(err));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString("default", { month: "short" })}-${d.getFullYear()}`;
  };

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col md={4} className="mx-auto">
          <h2 className="text-center">Visit Completed Status</h2>
          <Form className="border border-dark p-4 mt-4" onSubmit={handleSubmit}>
            <Form.Group controlId="collegeDropdown" className="mb-3 text-start">
              <Form.Label className="fw-bold ms-3">College</Form.Label>
              <Form.Select
                aria-label="Select College"
                value={college_name}
                onChange={(e) => setCollegeName(e.target.value)}
                className="mx-auto py-2 dropdown-width"
              >
                <option value="">-- Select College --</option>
                {collegeData.map((college, index) => (
                  <option key={index} value={college}>
                    {college}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="dateDropdown" className="mb-3 text-start">
              <Form.Label className="fw-bold ms-3">Date</Form.Label>
              <Form.Select
               aria-label="Select Date"
                value={Date_of_visit}
                onChange={(e) => {
                  const selectedDate = datedata.find((item) => item.date === e.target.value);
                  setDateOfVisit(e.target.value);
                  setId(selectedDate?.id || "");
                }}
                className="mx-auto py-2 dropdown-width"
                disabled={!college_name}
              >
                <option value="">-- Select Date of Visit --</option>
                {datedata.map((item, index) => (
                  <option key={index} value={item.date}>
                    {formatDate(item.date)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="text-start mb-3">
              <Form.Label className="fw-bold ms-3">Visit Status</Form.Label>
              <Form.Check
                type="radio"
                label="Completed"
                name="Visit_status"
                value="completed"
                className="me-2 ms-2 text-dark"
                checked={Visit_status === "completed"}
                onChange={(e) => setVisitStatus(e.target.value)}
                inline
              />
              <Form.Check
                type="radio"
                label="Incomplete"
                name="Visit_status"
                value="incompleted"
                checked={Visit_status === "incompleted"}
                onChange={(e) => setVisitStatus(e.target.value)}
                inline
              />
            </Form.Group>

            <Row className="text-center mt-4">
              <Col>
                <Button type="submit" className="btn btn-primary">
                  Submit
                </Button>
                <Button type="button" className="btn btn-danger ms-5" onClick={handleClear}>
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default VisitCompleted;

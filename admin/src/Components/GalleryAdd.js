import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const GalleryAdd = () => {
  const [visitData, setVisitData] = useState([]);
  const [college_name, setCollegeName] = useState("");
  const [Date_of_visit, setDateOfVisit] = useState("");
  const [galleryimage, setGalleryImage] = useState([]);
  const [collegeData, setColleData] = useState([]);
  const [datedata, setDateData] = useState([]);

  const handleClear = () => {
    setCollegeName("");
    setDateOfVisit("");
    setGalleryImage([]);
    setDateData([]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);
        const filteredCollege = [
          ...new Set(data.map((item) => item.college_name)),
        ];
        setColleData(filteredCollege);
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
            item.Visit_status === "completed"
        )
        .map((item) => ({ date: item.Date_of_visit, id: item._id }));

      setDateData(filteredDate);
    } else {
      setDateData([]);
    }
  }, [college_name, visitData]);

  const handleFileChange = (e) => {
    const selectedFiles = [...e.target.files];
    if (selectedFiles.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    setGalleryImage(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("college_name", college_name);
    formdata.append("Date_of_visit", Date_of_visit); // Send raw date value

    galleryimage.forEach((file) => {
      formdata.append("galleryimage", file);
    });

    axios
      .post(`http://localhost:8000/addgallery`, formdata)
      .then(() => {
        handleClear();
      })
      .catch((err) => console.log(err));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString("default", {
      month: "short",
    })}-${d.getFullYear()}`;
  };

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col md={4} className="mx-auto">
          <h2 className="text-center">Media Files Add</h2>
          <Form className="border border-dark p-2 mt-4" onSubmit={handleSubmit}>
            <Row className="mb-3 text-start">
              <Form.Group controlId="collegeDropdown" className="mt-3">
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
            </Row>

            <Row className="mb-3 text-start">
              <Form.Group controlId="dateDropdown" className="">
                <Form.Label className="fw-bold ms-3">Date</Form.Label>
                <Form.Select
                 aria-label="Select Date"
                  value={Date_of_visit}
                  onChange={(e) => setDateOfVisit(e.target.value)}
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
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <Form.Label className="fw-bold ms-3">Add Images</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleFileChange}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="text-center mt-4">
              <Col>
                <Button type="submit" className="btn btn-primary">
                  Submit
                </Button>
                <Button
                  type="button"
                  className="btn btn-danger ms-5"
                  onClick={handleClear}
                >
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

export default GalleryAdd;

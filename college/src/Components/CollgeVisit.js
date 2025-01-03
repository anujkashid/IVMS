import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ColHeader from "./Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import schedulevisit from "../Images/scedulevisit.jpg";
import { IoMdArrowRoundBack } from "react-icons/io";

const ColLogin = () => {
  const [number_of_students, setNumberofStudent] = useState("");
  const [Date_of_visit, setStartDate] = useState(new Date());
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [number_of_faculty, setNumberOffaculty] = useState("");
  const [purpose, setPurpose] = useState("");
  const [visting_location, setVisitingLocation] = useState("");
  const [student_details, setStudentDetails] = useState(null);
  const [faculty_details, setFacultyDetails] = useState(null);
  const [comment, setComment] = useState("");
  const[locationData,setLocationData]=useState([]);
  const[visitData,setVisitData]=useState([]);
  const college_name =localStorage.getItem("CollegeName");
  const mousigned=localStorage.getItem("mousigned");
  const navigate=useNavigate();
  
  console.log("mou",mousigned);
  

  useEffect(()=>{
      axios.get("http://localhost:8000/getlocation")
      .then((res)=>{
        const data=res.data.data;
        const stateData=data.filter((state)=> state.location_status === "active")
         setLocationData(stateData);
      })
  },[])

  useEffect(()=>{
    axios.get("http://localhost:8000/getvisit")
    .then((res)=>{
       setVisitData(res.data.userData);
    })
},[])

  const handleClear = () => {
    setNumberofStudent("");
    setStartDate(new Date());
    setStartTime("");
    setEndTime("");
    setNumberOffaculty("");
    setPurpose("");
    setVisitingLocation("");
    setStudentDetails(null);
    setFacultyDetails(null);
    setComment("");
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const startDateTime = new Date(Date_of_visit);
    startDateTime.setHours(start_time.getHours(), start_time.getMinutes(), 0, 0);
    
    const endDateTime = new Date(Date_of_visit);
    endDateTime.setHours(end_time.getHours(), end_time.getMinutes(), 0, 0);
    
    const isTimeConflict = visitData.some((visit) => {
        const existingStartTime = new Date(visit.start_time);
        existingStartTime.setSeconds(0, 0);
    
        const existingEndTime = new Date(existingStartTime);
        existingEndTime.setHours(existingStartTime.getHours() + 1);
        existingEndTime.setHours(existingEndTime.getHours()+1);
        return (
            (startDateTime < existingEndTime && endDateTime > existingStartTime) && 
            visit.visting_location === visting_location
        );
    });
    
    if (isTimeConflict) {
        alert("Schedule is busy.");
        return;
    }
    

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("college_name", college_name);
    formData.append("number_of_students", number_of_students);
    formData.append("Date_of_visit", Date_of_visit.toISOString().split("T")[0]);
    formData.append("start_time", startDateTime.toISOString());
    formData.append("end_time", endDateTime.toISOString());
    formData.append("number_of_faculty", number_of_faculty);
    formData.append("purpose", purpose);
    formData.append("visting_location", visting_location);
    formData.append("student_details", student_details);
    formData.append("faculty_details", faculty_details);
    formData.append("comment", comment);
    formData.append("mousigned", mousigned);

    // Send the data to the backend
    axios
        .post("http://localhost:8000/addvisit", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            console.log(res.data);
            alert("Visit successfully added!");
            navigate("/collegetotalvisit")
            handleClear(); // Clear the form
        })
        .catch((err) => {
            console.error("Error:", err);
            alert("Failed to add visit. Please try again.");
        });
};

  return (
    <>
      <ColHeader />
    
      <Container fluid className="mb-1" style={{paddingTop:'15vh'}}>
      <div className="d-flex justify-content-end mt-3 me-5">
          <Link to="/collegetotalvisit">
          <Button className="btn btn-info mb-2"><span className="text-white"><IoMdArrowRoundBack size={24}></IoMdArrowRoundBack></span></Button>
        </Link>
        </div>
        <Row>
          <Col md={5}>
             <img src={schedulevisit} style={{height:"700px", width:"750px"}}/>
          </Col>
          <Col md={1}>

          </Col>
          <Col md={6} className="">
            <Container className=" p-4 d-flex justify-content-center">
              <Form className="w-100 rounded-5 shadow shadow-md p-4" onSubmit={handleSubmit} >
              <h3 className="text-center mb-4 text-primary">Add Visit</h3>
                <Row className="mb-3">
                  <Col md={5} className="text-center">
                    <Form.Label className="mb-1">Number of Students:</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={number_of_students}
                      placeholder="Enter Number of students"
                      onChange={(e) => setNumberofStudent(e.target.value)}
                      className="ms-2"
                    />
                  </Col>
                  <Col md={1}></Col>
                  <Col md={5} className="text-center">
                    <Form.Label className="mb-1">Number of Faculty:</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={number_of_faculty}
                      placeholder="Enter Number of Faculty"
                      onChange={(e) => setNumberOffaculty(e.target.value)}
                      className="ms-2"
                    />
                  </Col>
                </Row>

                <Row>
  <Col md={4} className="text-center">
    <Form.Label className="mb-2 d-block">Date of Visit:</Form.Label>
    <DatePicker
      selected={Date_of_visit}
      onChange={(date) => setStartDate(date)}
      className="form-control mx-auto"
      dateFormat="dd/MM/yyyy"
      placeholderText="Select a date"
      required
      minDate={new Date()}
    />
  </Col>
  <Col md={4} className="text-center">
    <Form.Label className="mb-2 d-block">Start Time:</Form.Label>
    <DatePicker
    selected={start_time}
    onChange={(time) => {
      setStartTime(time);
      const endTime = new Date(time);
      endTime.setHours(time.getHours() + 2);
      setEndTime(endTime);
    }}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={60}
    timeCaption="Time"
    dateFormat="hh:mm aa"
    className="form-control w-100"
    placeholderText="Select Start Time"
    required
    minTime={new Date().setHours(9, 0, 0, 0)} // 9:00 AM
    maxTime={new Date().setHours(15, 0, 0, 0)} // 3:00 PM
  />
  </Col>
  <Col md={4} className="text-center">
    <Form.Label className="mb-2 d-block">End Time:</Form.Label>
    <DatePicker
      selected={end_time}
      onChange={(time) => setEndTime(time)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={120}
      timeCaption="Time"
      dateFormat="hh:mm aa"
      className="form-control w-100"
      placeholderText="Select End Time"
      required
      minTime={start_time || new Date().setHours(0, 0, 0, 0)}
      maxTime={new Date().setHours(23, 30, 0, 0)}
    />
  </Col>
</Row>


                <Form.Group className="mb-3 text-center" controlId="formGroupLocation">
                  <Form.Label className="mt-3">Visiting Location:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="w-100 mt-2"
                    value={visting_location}
                    onChange={(e) => setVisitingLocation(e.target.value)}
                    required
                  >
                    <option value="">Select City</option>
                    {locationData.map((item, index) => {
                    return (
                      <option key={item._id} value={item.location_city}>
                        {item.location_city}
                      </option>
                    );
                  })}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 text-center" controlId="formGroupPurpose">
                  <Form.Label className="mt-2">Purpose of Visit:</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={purpose}
                    placeholder="Enter Purpose"
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-100"
                  />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3 text-center">
                  <Form.Label>Student Details:</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    onChange={(e) => setStudentDetails(e.target.files[0])}
                    accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3 text-center">
                  <Form.Label>Faculty Details:</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    onChange={(e) => setFacultyDetails(e.target.files[0])}
                    accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group className="text-center" controlId="formGroupDescription">
                      <Form.Label>Any Comments:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Any comments"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-100"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-center mt-4">
                  <Button variant="info" className="me-4" type="submit">
                    Submit
                  </Button>
                  <Button variant="danger" onClick={handleClear}>
                    Clear
                  </Button>
                </div>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>

    </>
  );
};

export default ColLogin;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import ColHeader from "./Navbar";
import { setDate } from "date-fns";
import { useNavigate } from "react-router-dom";
import pendingfee from "../Images/pendingFees.jpg";

const PendingFee = () => {
  const [visitData, setVisitData] = useState([]);
  const [datedata, setDateData] = useState([]);
  const [selectedFee, setSelectedFee] = useState("");
  const collegename = localStorage.getItem("CollegeName");
  const [fees_status, setFeesStatus] = useState("");
  const [id, setId] = useState("");
  const [transaction_id,setTransactionId]=useState("");
  const navigate=useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((response) => {
        const filteredData = response.data.userData.filter(
          (visit) =>
            visit.college_name === collegename &&
            visit.fees !== 0 &&
            visit.fees_status === "unpaid"
        );
        setVisitData(filteredData);

        const today = new Date(); 
        today.setHours(0, 0, 0, 0); 
        
        const datevisitdata = filteredData
          .filter((item) => {
            const visitDate = new Date(item.Date_of_visit); 
            visitDate.setHours(0, 0, 0, 0); 
            return visitDate >= today;
          })
          .map((item) => ({
            date: item.Date_of_visit,
            fees: item.fees,
            id: item._id,
          }));
        
        setDateData(datevisitdata);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, [collegename]);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString('default', { month: 'short' })}-${d.getFullYear()}`;
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const selectedItem = datedata.find((item) => item.date === selectedDate);
    if (selectedItem) {
      setSelectedFee(selectedItem.fees);
      setId(selectedItem.id); // Correctly set ID
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const userdata = { fees_status,transaction_id };

    axios
      .put(`http://localhost:8000/updatevisit/${id}`, userdata)
      .then(() => {
        alert("Fee status updated successfully!");
        navigate("/pendingvisit")
        setId("");
        setFeesStatus("");
        setDate("");
        localStorage.removeItem(collegename);
        setSelectedFee("");
      })
      .catch((err) => {
        console.error("Error updating fee status:", err);
        alert("Error updating fee status. Please try again.");
      });
  };

  return (
    <Container fluid  style={{paddingTop:'15vh'}} >
      <Row>
        <ColHeader />
        <Col md={6} className="ms-5">
           <img src={pendingfee}  style={{height:"670px", width:"700px"}}/>
        </Col>
        <Col md={1}>
          
        </Col>
        <Col md={4} className="mt-4">
       
          <Form className="p-4 mt-5 shadow shadow-md rounded-5" onSubmit={handleSubmit}>
            <Row className="mb-3">
            <h3 className="text-center text-primary mb-4">Pay Fees</h3>
              <Col>
                <Form.Group className="text-center">
                  <Form.Label className="text-dark ">College Name:</Form.Label>
                  <Form.Control
                    placeholder="Enter name"
                    type="text"
                    value={collegename}
                    readOnly
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="mb-2 text-center">
                  <Form.Label className="text-dark">Date of Visit:</Form.Label>
                  <Form.Select aria-label="Select Date" onChange={handleDateChange}>
                    <option value="">Select Date</option>
                    {datedata.map((dateItem, idx) => (
                      <option key={idx} value={dateItem.date}>
                        {formatDate(dateItem.date)}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2 text-center">
                  <Form.Label className="text-dark">Fees:</Form.Label>
                  <Form.Control type="text" value={selectedFee} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="text-center">
                  <Form.Label className="text-dark">Transaction Id:</Form.Label>
                  <Form.Control
                    placeholder="Enter transaction id"
                    type="text"
                    value={transaction_id}
                     onChange={(e)=> setTransactionId(e.target.value)}
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3 text-center">
              <Form.Label>Fees Paid Status:</Form.Label>
              <Form.Select
                value={fees_status}
                onChange={(e) => setFeesStatus(e.target.value)}
              >
                <option value="">Select here...</option>
                <option value="paid">Paid</option>
              </Form.Select>
            </Row>
   
            <div className="text-center">
            <Button variant="info" type="submit" className="mt-3">
              Submit
            </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PendingFee;

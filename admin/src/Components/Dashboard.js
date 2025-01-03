import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container, Card } from "react-bootstrap";

const Dashboard = () => {
  const [visitData, setVisitData] = useState([]);
  const [totalvisits, setTotalVisita] = useState(0);
  const [currentWeekvisits, setCurrentWeekVisits] = useState(0);
  const [currentMonthvisits, setCurrentMonthVisits] = useState(0);
  const [collegeData, setCollegeData] = useState([]);
  const [totalColleges, setTotalColleges] = useState(0);
  const [mousigned, setMousigned] = useState(0);
  const [noMousigned, setNomousigned] = useState(0);
  const [lastcolleges, setLastCollges] = useState([]);
  const [totalUpcomingvisitsCount,setUpcomingVisitsCount]=useState(0);
  const [cancelledvisitcount,setCancelledVisitCount]=useState(0);

  useEffect(() => {
    axios.get("http://localhost:8000/get_registration").then((res) => {
      setCollegeData(res.data.data);
      const data = res.data.data;

      // total colleges
      const totalcollegecount = data.length;
      setTotalColleges(totalcollegecount);

      //  count of mou signed
      const filterdmoudata = data.filter(
        (visit) => visit.reg_mou_sign === "Yes"
      );
      setMousigned(filterdmoudata.length);

      // count of non mou signed
      const filterdnonmoudata = data.filter(
        (visit) => visit.reg_mou_sign === "No"
      );
      setNomousigned(filterdnonmoudata.length);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);

        // cancelled visit count
         const canceledcount=data.filter((visit)=>
         visit.visit_cancelled === "cancelled" 
         )

         setCancelledVisitCount(canceledcount.length);

        // total visit count
        const totalcount = data.length;
        setTotalVisita(totalcount);

        const now = new Date();

        // current week visit count
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        const currentWeekVisits = data.filter((visit) => {
          const visitDate = new Date(visit.Date_of_visit);
          return visitDate >= startOfWeek && visitDate <= endOfWeek;
        });
        setCurrentWeekVisits(currentWeekVisits.length);

        //  current month counts
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        startOfMonth.setHours(0, 0, 0, 0);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        const currentMonthVisits = data.filter((visit) => {
          const visitDate = new Date(visit.Date_of_visit);
          return visitDate >= startOfMonth && visitDate <= endOfMonth;
        });

        setCurrentMonthVisits(currentMonthVisits.length);

        // last 5 visited Colleges
        const lastFiveColleges = [
          ...new Set(data.map((visit) => visit.college_name)),
        ].slice(-5);

        setLastCollges(lastFiveColleges);
      
        // count of upcoming visits
        const upcomingVisits = data.filter((visit) => {
          const visitDate = new Date(visit.Date_of_visit);
          return visitDate >= new Date();
        });
        setUpcomingVisitsCount(upcomingVisits.length);
      })
      .catch((err) => console.log(err));

    

  }, []);

  return (
    <Container className="mt-5 ms-2" fluid>
      <Row className="g-4">

        {/* Card 0 */}
        <Col lg={3} md={4}>
          <Card
            className="h-100 shadow-md"
            style={{
              backgroundColor: "rgba(0, 123, 255, 0.5)",
              borderRadius: "10px",
            }}
          >
            <Card.Body>
              <Card.Title className="fs-3 text-center mt-2">
                {totalUpcomingvisitsCount}
              </Card.Title>
              <Card.Text className="text-dark fs-5 fw-bold mt-3">
                Count Of Upcoming Visits
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center border border-0">
              <Card.Link href="/head/upcomingVisits">
                <Button className="btn btn-primary">Details</Button>
              </Card.Link>
            </Card.Footer>
          </Card>
        </Col>

        {/* card 1 */}
        <Col lg={3} md={4}>
          <Card
            className="h-100 shadow-md"
            style={{
              backgroundColor: "rgba(220, 53, 69, 0.5)",
              borderRadius: "10px",
            }}
          >
            <Card.Body>
              <Card.Title className="fs-3 text-center mt-2">
                {totalvisits}
              </Card.Title>
              <Card.Text className="text-dark fs-5 fw-bold mt-3">
                Count Of Total Visits
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center border border-0">
              <Card.Link href="/head/totalvisits">
                <Button className="btn btn-primary">Details</Button>
              </Card.Link>
            </Card.Footer>
          </Card>
        </Col>

        {/* card 2 */}
        <Col lg={3} md={4}>
          <Card
            className="h-100 shadow-md"
            style={{
              backgroundColor: "rgba(40, 167, 69, 0.5)",
              borderRadius: "10px",
            }}
          >
            <Card.Body>
              <Card.Title className="fs-3 text-center mt-2">
                {currentWeekvisits}
              </Card.Title>
              <Card.Text className="text-dark fs-5 fw-bold mt-3">
                Current Week Visits
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center border border-0">
              <Card.Link href="/head/currentweekvisits">
                <Button className="btn btn-primary">Details</Button>
              </Card.Link>
            </Card.Footer>
          </Card>
        </Col>

        {/* card 3 */}
        <Col lg={3} md={4}>
          <Card
            className="h-100 shadow-md"
            style={{
              backgroundColor: "rgba(255, 193, 7, 0.5)",
              borderRadius: "10px",
            }}
          >
            <Card.Body>
              <Card.Title className="fs-3 text-center mt-2">
                {currentMonthvisits}
              </Card.Title>
              <Card.Text className="text-dark fs-5 fw-bold mt-3">
                Current Month Visits
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center border border-0">
              <Card.Link href="/head/currentmonthvisists">
                <Button className="btn btn-primary">Details</Button>
              </Card.Link>
            </Card.Footer>
          </Card>
        </Col>


        {/* card 4 */}
        <Col lg={3} md={4}>
          <Card
            className="h-100 shadow-md"
            style={{
              backgroundColor: "rgba(0, 123, 255, 0.5)",
              borderRadius: "10px",
            }}
          >
            <Card.Body>
              <Card.Title className="fs-3 text-center mt-2 mb-3">
                {totalColleges}
              </Card.Title>
              <Card.Text className="text-dark fs-5 fw-bold">
                Count Of All Colleges Register
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center border border-0">
              <Card.Link href="/head/totalcollege">
                <Button className="btn btn-primary">Details</Button>
              </Card.Link>
            </Card.Footer>
          </Card>
        </Col>

        {/* card 5  */}
        <Col md={4} lg={3}>
          <Card
            className="h-100 shadow-md"
            style={{
              backgroundColor: "rgba(220, 53, 69, 0.5)",
              borderRadius: "10px",
            }}
          >
            <Card.Body>
              <Card.Title className="fs-3 text-center mt-2">
                {mousigned}
              </Card.Title>
              <Card.Text className="text-dark fs-5 fw-bold mt-3">
                Count Of MOU Signed Colleges
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center border border-0">
              <Card.Link href="/head/mousigned">
                <Button className="btn btn-primary">Details</Button>
              </Card.Link>
            </Card.Footer>
          </Card>
        </Col>

        {/* card 6 */}
        <Col md={4} lg={3}>
          <Card
            className="h-100 shadow-md"
            style={{
              backgroundColor: "rgba(40, 167, 69, 0.5)",
              borderRadius: "10px",
            }}
          >
            <Card.Body>
              <Card.Title className="fs-3 text-center mt-2">
                {noMousigned}
              </Card.Title>
              <Card.Text className="text-dark fs-5 fw-bold mt-3">
                Count Of Non-MOU Signed  Colleges
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center border border-0">
              <Card.Link href="/head/nonmousigned">
                <Button className="btn btn-primary">Details</Button>
              </Card.Link>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={4} lg={3}>
          <Card
            className="h-100 shadow-md"
            style={{
              
              backgroundColor: "rgba(255, 193, 7, 0.5)",
              borderRadius: "10px",
            }}
          >
            <Card.Body>
              <Card.Title className="fs-3 text-center mt-2">
                {cancelledvisitcount}
              </Card.Title>
              <Card.Text className="text-dark fs-5 fw-bold mt-3">
                Count Of Cancel Visit
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center border border-0">
              <Card.Link href="/head/cancelledvisit">
                <Button className="btn btn-primary">Details</Button>
              </Card.Link>
            </Card.Footer>
          </Card>
        </Col>

        {/* card 7 */}
        <Col md={4} lg={3}>
          <Card
            className="h-100 shadow-md "
            style={{
              backgroundColor: "rgba(0, 123, 255, 0.5)",
              borderRadius: "10px",
            }}
          >
            <Card.Body>
              <Card.Title className="fs-4 text-center">
                Last 5 Visited Colleges
              </Card.Title>
              <Card.Text className="text-dark">
                {lastcolleges.map((item, index) => {
                  return (
                    <ul key={index}>
                      <li>{item}</li>
                    </ul>
                  );
                })}
              </Card.Text>
            </Card.Body>
            {/* <Card.Footer className="text-center border border-0">
              <Card.Link href="">
                <Button className="btn btn-success">Details</Button>
              </Card.Link>
            </Card.Footer> */}
          </Card>
        </Col>

       
      </Row>
    </Container>
  );
};

export default Dashboard;

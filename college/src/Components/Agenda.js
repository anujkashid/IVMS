import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ColHeader from "./Navbar";
import agenda from "../Images/Agenda.jpg";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

const Agenda = () => {
  const [agendaData, setAgendaData] = useState([]);
  const scrollRef = useRef(null);

  // Fetch agenda data
  useEffect(() => {
    axios
      .get("http://localhost:8000/get_agenda")
      .then((res) => {
        const data = res.data.data;
        const activeAgenda = data.filter((a) => a.agenda_status === "active");
        setAgendaData(activeAgenda);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Manual scroll functionality
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const scrollAmount = 400; // Adjust to match the card size

      if (direction === "left") {
        scrollContainer.scrollLeft -= scrollAmount;
      } else if (direction === "right") {
        scrollContainer.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <>
      <ColHeader />
      <Container fluid className="h-100 vh-100" style={{ paddingTop: "15vh" }}>
        <Row>
          <Col md={6}>
            <img
              src={agenda}
              alt="Agenda"
              className="mt-4 ms-4 rounded-2"
              style={{ height: "540px", width: "700px" }}
            />
          </Col>
          <Col md={6}>
            <h2 className="text-center text-primary mt-4">Agenda</h2>
            <div className="d-flex align-items-center">
              {/* Scroll Left Button */}
              <Button
                variant="info"
                className="me-4"
                onClick={() => handleScroll("left")}
              >
              {<IoMdArrowRoundBack size={24} className="text-white"/>}
              </Button>
              {/* Scrollable Container */}
              <div
                className="overflow-hidden"
                ref={scrollRef}
                style={{
                  display: "flex",
                  gap: "1rem",
                  overflowX: "auto",
                  scrollBehavior: "smooth",
                  width: "700px", // Width to fit 2 cards
                  whiteSpace: "nowrap",
                }}
              >
                {agendaData.length > 0 ? (
                  agendaData.map((agenda, index) => (
                    <Card
                      className="shadow shadow-md rounded-5 mt-5"
                      key={index}
                      style={{
                        width: "16rem", // Fixed width for each card
                        flex: "0 0 auto", // Prevent shrinking of cards
                      }}
                    >
                      <Card.Body>
                        <Card.Title className="fs-3 text-primary text-center">
                          {agenda.agenda_title}
                        </Card.Title>
                        <Card.Text className="text-center">
                          <p className="fs-4 fe-bold">
                            {index + 1}
                            <br />
                          </p>
                          <p>
                            <b>Agenda Description</b> <br />
                            {agenda.agenda_description} <br />
                          </p>
                          <p>
                            <b>Agenda Duration</b> <br /> {agenda.agenda_time}{" "}
                            <br />
                          </p>
                          {/* <p className="pb-1">
                            <b>Agenda Status</b> <br /> {agenda.agenda_status}
                          </p> */}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <div>No agenda data available</div>
                )}
              </div>
              {/* Scroll Right Button */}
              <Button
                variant="info"
                className="ms-2"
                onClick={() => handleScroll("right")}
              >
              <IoMdArrowRoundForward size={24} className="text-white" />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Agenda;
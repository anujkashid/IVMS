import React, { useState, useEffect } from "react";
import { Col, Modal, Button } from "react-bootstrap";
import Calendar from "react-calendar"; // Make sure to install react-calendar
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Calender = () => {
  const [bookedData, setBookedData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  };

  // Format time as hh:mm AM/PM
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(time).toLocaleString("en-US", options);
  };

  // Fetch booked slots
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getvisit");
        const data = response.data.userData;

        // Structure booked data as { date: [{start_time, end_time, visiting_location}, ...] }
        const bookings = data.reduce((acc, visit) => {
          const visitDate = formatDate(visit.start_time);
          if (!acc[visitDate]) acc[visitDate] = [];
          acc[visitDate].push({
            start_time: formatTime(visit.start_time),
            end_time: formatTime(visit.end_time),
            visiting_location: visit.visting_location,
          });
          return acc;
        }, {});
        setBookedData(bookings);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
  }, []);

  // Handle date click on calendar
  const handleDateClick = (date) => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
    setBookedSlots(bookedData[formattedDate] || []);
    setShowModal(true);
  };

  // Add class to tiles with booked slots
  const tileClassName = ({ date, view }) => {
    const formattedDate = formatDate(date);
    if (view === "month" && bookedData[formattedDate]) {
      return "booked-slot";
    }
    return null;
  };

  const closeModal = () => setShowModal(false);

  const navigate=useNavigate();
  const handleNavigate=()=>{
    navigate("/head/totalvisits")
 }

  return (
    <div>
      <Col md={6} xs={12} className="mt-4 mx-auto">
        <h2 className="text-center ms-0 ms-md-5 mt-4 mb-3 ">
          Booked Slots
        </h2>
        <div className="d-flex justify-content-center mb-3">
          <Calendar onClickDay={handleDateClick} tileClassName={tileClassName} />
        </div>
        {/* Modal */}
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Booked Slots on {selectedDate}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {bookedSlots.length > 0 ? (
              <ul>
                {bookedSlots.map((slot, index) => (
                  <li key={index}>
                    {slot.start_time} - {slot.end_time}
                    &nbsp; at {slot.visiting_location}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No booked slots for this date.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
          <Button className="btn btn-primary px-3 py-2 me-3" onClick={handleNavigate}>
                    View All Visits
                  </Button>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </div>
  );
};

export default Calender;

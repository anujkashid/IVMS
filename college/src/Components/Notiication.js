import React, { useEffect, useState } from "react";
import axios from "axios";
import ColHeader from "./Navbar";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const Notification = () => {
  const [visitData, setVisitData] = useState([]);
  const collegename = localStorage.getItem("CollegeName");
  const navigate = useNavigate();

  // Fetch visit data
  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((response) => {
        const today = new Date().toISOString().split("T")[0];
        const filteredData = response.data.userData.filter(
          (visit) =>
            visit.college_name === collegename &&
            visit.Date_of_visit >= today &&
            visit.notification_status !== "seen"
        );
        setVisitData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, [collegename]);

  const handleSeen = (id) => {
    const fetchData = { notification_status: "seen" };
    axios
      .put(`http://localhost:8000/updatevisit/${id}`, fetchData)
      .then(() => {
        setVisitData((prevState) =>
          prevState.map((visit) =>
            visit._id === id ? { ...visit, notification_status: "seen" } : visit
          )
        );
      })
      .catch((err) => {
        console.error("Error updating notification status:", err);
      });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString('default', { month: 'short' })}-${d.getFullYear()}`;
  };

  const handleReschedule=(id)=>
{
        localStorage.setItem("rejectresceduleid",id);
        navigate("/rejectrescedulevisit")
  }

  return (
    <div style={{paddingTop:'15vh'}}>
      <ColHeader />
      <div className="container mt-4">
        <h3 className="text-center mb-3 text-primary">Notifications</h3>
        <div className="d-flex justify-content-end">
          <Link className="text-decoration-none mb-2" to="/home">
            <IoMdClose className="text-dark" size={30} />
          </Link>
        </div>
        {visitData.length === 0 ? (
          <p>No notifications to display.</p>
        ) : (
          visitData.map((visit) => {
            const visitDate = new Date(visit.Date_of_visit)
              .toISOString()
              .split("T")[0];
            return (
              <div
                key={visit.id}
                className="alert alert-primary d-flex justify-content-between align-items-center"
              >
                <div>
                  {visit.Visit_accept === "accept" ? (
                    <p>
                      Your visit on <strong>{visitDate}</strong> has been
                      accepted.
                    </p>
                  ) : visit.Visit_accept === "reject" ? (
                    <p>
                      Your visit on <strong>{visitDate}</strong> has been
                      rejected.
                      <br />
                      Reason: <strong>{visit.reason}</strong>
                    </p>
                  ) : (
                    <p>Pending status for your visit on {visitDate}.</p>
                  )}
                </div>

                {/* Display Reschedule Button */}
                <div className="d-flex justify-content-end">
                  {visit.Visit_accept === "reject" &&
                    visit.fees_received === "complete" && (
                      <button
                        className="btn btn-info btn-md me-4 "
                        onClick={() => handleReschedule(visit._id)}
                      >
                        Reschedule
                      </button>
                    )}

                  <button
                    className="btn btn-success btn-md"
                    onClick={() => handleSeen(visit._id)}
                    disabled={
                      visit.Visit_accept !== "accept" &&
                      visit.Visit_accept !== "reject"
                    }
                  >
                    Seen
                  </button>
                </div>
              </div>
            );
          })
        )}

        {visitData.map((visit, item) =>
          visit.mousigned === "No" && visit.fees_status === "unpaid" ? (
            <div
              key={item}
              className="alert alert-primary d-flex justify-content-between align-items-center"
            >
              Pay fees {visit.fees} to confirm visit on{" "}
              {formatDate(visit.Date_of_visit)}.
              <Button
                className="ms-5 px-2 py-1 mt-2 btn btn-danger"
                onClick={() => navigate("/pendingfees")}
              >
                Pay Now
              </Button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Notification;

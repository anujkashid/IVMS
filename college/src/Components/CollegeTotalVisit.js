import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // For exporting CSV
import jsPDF from "jspdf"; // For exporting PDF
import "jspdf-autotable";
import * as XLSX from "xlsx"; // For exporting Excel
import { Table, Button, Container, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import ColHeader from "./Navbar";
import { MdDelete } from "react-icons/md";


const CollegeTotalVisit = () => {
 const [ivcount, setIvcount] = useState([]);
   const collegename = localStorage.getItem("CollegeName");
   const [collegeData, setCollegeData] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const visitsPerPage = 10; // Number of rows per page
 
   useEffect(() => {
    axios.get("http://localhost:8000/getvisit")
      .then((res) => {
        setCollegeData(res.data.userData);
        const data = res.data.userData;
        console.log("data", data)

        // total IV
        const totalIV = data.filter(
          (TIV) => TIV.college_name === collegename && TIV.Visit_status==="incomplete"
        );
        setIvcount(totalIV);
      })
  },[]);
  
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString('default', { month: 'short' })}-${d.getFullYear()}`;
  };

  // Pagination logic
  const indexOfLastVisit = currentPage * visitsPerPage;
  const indexOfFirstVisit = indexOfLastVisit - visitsPerPage;
  const currentVisits = ivcount.slice(indexOfFirstVisit, indexOfLastVisit);

  const totalPages = Math.ceil(ivcount.length / visitsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  
  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "College name",
     "Number Of Student",
     "Number of faculty",
     "Date of visit",
     "Visiting Location",
     "Visit Status"
    ];
    const tableRows = [];

    ivcount.forEach((university) => {
        tableRows.push([
        university.college_name,
        university.number_of_students,
        university.number_of_faculty,
        formatDate(university.Date_of_visit),
        university.visting_location,
        university.Visit_status
        ]);
      });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("university_data.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(ivcount);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "university Data");
    XLSX.writeFile(workbook, "university_data.xlsx");
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Format to 'HH:mm'
  };

  const handleUpdate=(id)=>
  {
   localStorage.setItem("cancelvisitid",id);
  }
  return (
    <div>
    <ColHeader />
    <Container>
    <div style={{paddingTop:'15vh'}}>
      <h2 className="my-4 text-center text-primary">Scheduled Visits</h2>
      <div className="mb-4 d-flex justify-content-start gap-2">
  <Button variant="info" onClick={exportPDF}>
    Export PDF
  </Button>
  <Button variant="info" onClick={exportExcel}>
    Export Excel
  </Button>
  <CSVLink data={ivcount} filename="visit_data.csv">
    <Button variant="info">Export CSV</Button>
  </CSVLink>
</div>

<div className="d-flex justify-content-end me-3 mb-3">
  <Link to="/addvisit">
    <Button className="btn btn-info py-2 px-3">Add</Button>
  </Link>
</div>

      <Table striped bordered hover responsive>
                <thead className="thead-dark">
                  <tr className="text-center">
                    <th>Sr.</th>
                    <th>Number of student</th>
                    <th>Number of faculty</th>
                    <th>Date of visit</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Visiting Location</th>
                    <th>Visit Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {currentVisits.map((IV, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{IV.number_of_students}</td>
                      <td>{IV.number_of_faculty}</td>
                      <td>{formatDate(IV.Date_of_visit)}</td>
                      <td>{formatTime(IV.start_time)}</td>
                      <td>{formatTime(IV.end_time)}</td>
                      <td>{IV.visting_location}</td>
                      <td>{IV.Visit_accept}</td>
                      <td><Button variant="danger" href="/visitcancelled" onClick={()=> handleUpdate(IV._id)}><MdDelete size={24}/></Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>

               {/* Pagination */}
        {totalPages > 1 && (
            <Pagination className="justify-content-end">
              <Pagination.Prev disabled={currentPage === 1} onClick={handlePrevPage} />
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
              />
            </Pagination>
          )}
             </div>
    </Container>
 
    </div>
 
  );
};

export default CollegeTotalVisit;

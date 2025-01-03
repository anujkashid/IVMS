import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import ColHeader from "./Navbar";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [visitDates, setVisitDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const collegename = localStorage.getItem("CollegeName");

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString("default", { month: "short" })}-${d.getFullYear()}`;
  };

  // Fetch gallery data
  useEffect(() => {
    axios
      .get("http://localhost:8000/getgallery")
      .then((res) => {
        const data = res.data.userData;

        // Filter gallery data by college name
        const collegeGallery = data.filter(
          (item) => item.college_name === collegename
        );
        setGalleryData(collegeGallery);

        // Get unique visit dates
        const uniqueDates = [
          ...new Set(collegeGallery.map((item) => item.Date_of_visit)),
        ];
        setVisitDates(uniqueDates);
      })
      .catch((err) => console.log(err));
  }, [collegename]);

  // Filter images based on the selected date
  const filteredImages = selectedDate
    ? galleryData.filter(
        (item) => new Date(item.Date_of_visit).toISOString() === selectedDate
      )
    : galleryData;

  // Collect all images from the filtered data
  const allImages = filteredImages.flatMap((item) => item.galleryimage);

  // Function to download all images as a zip file
  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const imageFolder = zip.folder("Gallery_Images");

    const imagePromises = allImages.map((image) =>
      axios
        .get(`http://localhost:8000/images/${image}`, { responseType: "blob" })
        .then((response) => {
          imageFolder.file(image, response.data);
        })
    );

    await Promise.all(imagePromises);
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "Gallery_Images.zip");
    });
  };

  return (
    <>
      <ColHeader />
      <Container fluid style={{ paddingTop: "18vh" }}>
        <h2 className="text-center mb-4 text-primary">Gallery</h2>
        <Row>
          {/* Left Side: Date Selection */}
          <Col md={3} className="border-end border-info shadow-md vh-100">
            <Card className="border border-0" style={{ minHeight: "25rem" }}>
              <Card.Body>
                <Form.Group controlId="visitDateDropdown" className="mb-4 text-center">
                  <Form.Label className="mb-2 ">Sort By Date:</Form.Label>
                  <Form.Select
                    aria-label="Select Date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option value="">-- Show All Dates --</option>
                    {visitDates.map((date, index) => (
                      <option key={index} value={new Date(date).toISOString()}>
                        {formatDate(date)}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                {allImages.length > 0 && (
                 <div className="text-center mt-3">
                 <Button
                    variant="info"
                    className=""
                    onClick={handleDownloadAll}
                  >
                    Download All
                  </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Right Side: Gallery */}
          <Col md={9}>
            <Card className="border border-0">
              <Card.Body>
                {allImages.length > 0 ? (
                  <Row>
                    {allImages.map((image, index) => (
                      <Col
                        key={index}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className="mb-4"
                      >
                        <Card className="h-100 shadow-sm">
                          <a
                            href={`http://localhost:8000/images/${image}`}
                            download={`Gallery_Item_${index + 1}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Card.Img
                              variant="top"
                              src={`http://localhost:8000/images/${image}`}
                              alt={`Gallery Item ${index + 1}`}
                              style={{
                                height: "200px",
                                objectFit: "cover",
                              }}
                              onError={(e) => (e.target.src = "/fallback-image.jpg")}
                            />
                          </a>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p className="text-center">No images available to display.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Gallery;

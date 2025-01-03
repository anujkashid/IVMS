import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

const College_registration = () => {
  const [collage_name, setCollage_name] = useState("");
  const [reg_state, setReg_state] = useState("");
  const [reg_district, setReg_district] = useState("");
  const [reg_city, setReg_city] = useState("");
  const [reg_university_name, setReg_university_name] = useState("");
  const [reg_principal_name, setReg_principal_name] = useState("");
  const [reg_contact_person, setReg_contact_person] = useState("");
  const [reg_contact_person_contact1, setReg_contact_person_contact1] =useState("");
  const [reg_contact_person_contact2, setReg_contact_person_contact2] =useState("");
  const [reg_college_email_id, setReg_college_email_id] = useState("");
  const [reg_college_username, setReg_college_username] = useState("");
  const [reg_password, setReg_password] = useState("");
  const [reg_confirm_password, setReg_confirm_password] = useState("");
  const [reg_visit_location, setReg_visit_location] = useState("");
  const [reg_mou_sign, setReg_mou_sign] = useState("");
  const [reg_status, setstatus] = useState("");
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);
  const [city, setCity] = useState([]);
  const [university, setUniversity] = useState([]);
  const navigate=useNavigate();
  const [errors, setErrors] = useState({});

   // Validation function
   const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!collage_name) {
      isValid = false;
      errors["collage_name"] = "College name is required";
    } else if (!/^[a-zA-Z]+$/.test(collage_name)) {
      isValid = false;
      errors["collage_name"] = "College name is invalid";
    }
    if (!reg_state.trim()) {
      isValid = false;
      errors["reg_state"] = "State is required.";
    }
  
    if (!reg_district.trim()) {
      isValid = false;
      errors["reg_district"] = "District is required.";
    }
  
    if (!reg_city.trim()) {
      isValid = false;
      errors["reg_city"] = "City is required.";
    }
  
    if (!reg_university_name.trim()) {
      isValid = false;
      errors["reg_university_name"] = "University is required.";
    }
    if (!reg_principal_name.trim()) {
      isValid = false;
      errors["reg_principal_name"] = "Principal name is required.";
    }

    if (!reg_college_email_id) {
      isValid = false;
      errors["reg_college_email_id"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(reg_college_email_id)) {
      isValid = false;
      errors["reg_college_email_id"] = "Email is invalid";
    }

    if (!reg_college_username.trim()) {
      isValid = false;
      errors["reg_college_username"] = "Username is required.";
    }

    if (!reg_password.trim()) {
      isValid = false;
      errors["reg_password"] = "Password is required.";
    }

    if (!/^[a-zA-Z]+$/.test(reg_contact_person)) {
      isValid = false;
      errors["reg_contact_person"] = "First name must contain only letters";
    }

    if (!reg_contact_person_contact1) {
      isValid = false;
      errors["reg_contact_person_contact1"] = "Mobile number is required";
    } else if (!/^\d{10}$/.test(reg_contact_person_contact1)) {
      isValid = false;
      errors["reg_contact_person_contact1"] = "Enter a valid 10-digit mobile number";
    }

    if (!reg_mou_sign.trim()) {
      isValid = false;
      errors["reg_mou_sign"] = "MoU status is required.";
    }
    

    setErrors(errors);
    return isValid;
  };
  const handleSubmit = async (e) => {
     e.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    const userdata = {
      collage_name,
      reg_state,
      reg_district,
      reg_city,
      reg_university_name,
      reg_principal_name,
      reg_contact_person,
      reg_contact_person_contact1,
      reg_contact_person_contact2,
      reg_college_email_id,
      reg_college_username,
      reg_password,
      reg_confirm_password,
      reg_visit_location,
      reg_mou_sign,
      reg_status,
    };

    try{
    axios
      .post("http://localhost:8000/add_registration", userdata)
      .then((res) => {
        navigate('/')
        console.log("hiiiiiiii",res.data.data);
        handleClear();
      })}

      catch (err){ 
        console.error("Error while registration", err);
      }
  };


  const handleClear = () => {
    setCollage_name("");
    setReg_state("");
    setReg_district("");
    setReg_city("");
    setReg_university_name("");
    setReg_principal_name("");
    setReg_contact_person("");
    setReg_contact_person_contact1("");
    setReg_contact_person_contact2("");
    setReg_college_email_id("");
    setReg_college_username("");
    setReg_password("");
    setReg_confirm_password("");
    setReg_visit_location("");
    setReg_mou_sign("");
    setstatus("");
  };

  // Get State
  useEffect(() => {
    axios
      .get("http://localhost:8000/getstate")
      .then((res) => {
        const data = res.data.data;
        const activestate = data.filter( 
          (a) =>  a.state_status === "active"
      )
        setState(activestate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // Get District
  useEffect(() => {
    axios
      .get("http://localhost:8000/getdistrict")
      .then((res) => {
        const data = res.data.data;
        const activedistrict = data.filter( 
          (a) =>  a.district_status === "active"
      )
        setDistrict(activedistrict);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter Districts When State Changes
  useEffect(() => {
    console.log(reg_state)
    if (reg_state) {
      
      const filtered = district.filter(
        (district) => district.district_state === reg_state
      );
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts([]); // Reset if no state is selected
    }
  }, [reg_state, district]);


  // Get City
  useEffect(() => {
    axios
      .get("http://localhost:8000/getcity")
      .then((res) => {
        const data = res.data.data;
        const activecity = data.filter( 
          (a) =>  a.city_status === "active"
      )
        setCity(activecity);
    
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter City When District Changes
  useEffect(() => {
    console.log(reg_district)
    if (reg_district) {
      
      const filtered = city.filter(
        (city) => city.city_district === reg_district
      );
      setFilteredCity(filtered);
    } else {
      setFilteredCity([]); // Reset if no state is selected
    }
  }, [reg_district, city]);

  //   Get University
  useEffect(() => {
    axios
      .get("http://localhost:8000/getuniversity")
      .then((res) => {
        const data = res.data.data;
        const activeuniversity = data.filter( 
          (a) =>  a.university_status === "active"
      )
        setUniversity(activeuniversity);
       
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
     <div>
     
      {/* Form  */}
      <Container
      >
        <Row>
          <Col xs={10} className="mx-auto h-100  p-2 bg-white mt-4 rounded-2 border border-dark"style={{ maxWidth: "600px" }}  >
         <h2 className="text-center text-dark fs-3 mb-3">Registration Form</h2>
        <Form className=" p-4 ">
          {/* College Name */}
          <Form.Group className="mb-3 text-start" controlId="formGroupCollege">
            <Form.Label className="fw-bold ms-3">College Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={collage_name}
              onChange={(e) => setCollage_name(e.target.value)}
              placeholder="Enter College Name"
            />

            {errors.collage_name && <p className="text-danger">{errors.collage_name}</p>}
          </Form.Group>

          {/* State */}
          <Form.Group className="mb-3 text-start" controlId="formGroupState">
            <Form.Label className="fw-bold ms-3" >State</Form.Label>
            <Form.Select
              required
              value={reg_state}
              onChange={(e) => setReg_state(e.target.value)}
            >
              <option value="">Select State</option>
              {state.map((item) => (
                <option key={item._id} value={item.state_name}>
                  {item.state_name}
                </option>
              ))}
            </Form.Select>
            {errors.reg_state && <p className="text-danger">{errors.reg_state}</p>}
          </Form.Group>

          {/* District */}
          <Form.Group className="mb-3 text-start" controlId="formGroupDistrict">
            <Form.Label className="fw-bold ms-3">District</Form.Label>
            <Form.Select
              required
              value={reg_district}
              onChange={(e) => setReg_district(e.target.value)}
            >
              <option value="">Select District</option>
              {filteredDistricts.map((item) => (
                <option key={item._id} value={item.district_name}>
                  {item.district_name}
                </option>
              ))}
            </Form.Select>
            {errors.reg_district && <p className="text-danger">{errors.reg_district}</p>}
          </Form.Group>

          {/* City */}
          <Form.Group className="mb-3 text-start" controlId="formGroupCity">
            <Form.Label className="fw-bold ms-3">City</Form.Label>
            <Form.Select
              required
              value={reg_city}
              onChange={(e) => setReg_city(e.target.value)}
            >
              <option value="">Select City</option>
              {filteredCity.map((item) => (
                <option key={item._id} value={item.city_name}>
                  {item.city_name}
                </option>
              ))}
            </Form.Select>
            {errors.reg_city && <p className="text-danger">{errors.reg_city}</p>}
          </Form.Group>

          {/* University Name */}
           <Form.Group className="mb-3 text-start" controlId="formGroupCity">
            <Form.Label className="fw-bold ms-3">Univesity Name</Form.Label>
            <Form.Select
              required
              value={reg_university_name}
              onChange={(e) => setReg_university_name(e.target.value)}
            >
              <option value="">Select University</option>
              {university.map((item) => (
                <option key={item._id} value={item.university_name}>
                  {item.university_name}
                </option>
              ))}
            </Form.Select>
            {errors.reg_university_name && <p className="text-danger">{errors.reg_university_name}</p>}

          </Form.Group>

          {/* Principal Name */}
          <Form.Group className="mb-3 text-start" controlId="formGroupPrincipalName">
            <Form.Label className="fw-bold ms-3">Principal Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={reg_principal_name}
              onChange={(e) => setReg_principal_name(e.target.value)}
              placeholder="Enter Principal Name"
            />
            {errors.reg_principal_name && <p className="text-danger">{errors.reg_principal_name}</p>}
          </Form.Group>

          {/* Contact Person */}
          <Form.Group className="mb-3 text-start" controlId="formGroupContactPerson">
            <Form.Label className="fw-bold ms-3">Contact Person</Form.Label>
            <Form.Control
              required
              type="text"
              value={reg_contact_person}
              onChange={(e) => setReg_contact_person(e.target.value)}
              placeholder="Enter Contact Person Name"
            />
            {errors.reg_contact_person && <p className="text-danger">{errors.reg_contact_person}</p>}

          </Form.Group>
          <Row>
            <Col>
              {/* Contact Person Contact 1 */}
              <Form.Group className="mb-3 text-start" controlId="formGroupContact1">
                <Form.Label className="fw-bold ms-3">Contact Person Contact 1</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  value={reg_contact_person_contact1}
                  onChange={(e) =>
                    setReg_contact_person_contact1(e.target.value)
                  }
                  pattern="^\d{10}$"
                  placeholder="Enter 10-digit Contact Number"
                />
                {errors.reg_contact_person_contact1 && <p className="text-danger">{errors.reg_contact_person_contact1}</p>}
              </Form.Group>
            </Col>
            <Col>
              {/* Contact Person Contact 2 */}
              <Form.Group className="mb-3 text-start" controlId="formGroupContact2">
                <Form.Label className="fw-bold ms-3">Contact Person Contact 2</Form.Label>
                <Form.Control
                  type="tel"
                  value={reg_contact_person_contact2}
                  onChange={(e) =>
                    setReg_contact_person_contact2(e.target.value)
                  }
                  pattern="^\d{10}$"
                  placeholder="Enter 10-digit Contact Number (Optional)"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Email ID */}
          <Form.Group className="mb-3 text-start" controlId="formGroupEmail">
            <Form.Label className="fw-bold ms-3">Email ID</Form.Label>
            <Form.Control
              required
              type="email"
              value={reg_college_email_id}
              onChange={(e) => setReg_college_email_id(e.target.value)}
              placeholder="Enter Email ID"
            />
            {errors.reg_college_email_id && <p className="text-danger">{errors.reg_college_email_id}</p>}
          </Form.Group>

          {/* Username */}
          <Form.Group className="mb-3 text-start" controlId="formGroupUsername">
            <Form.Label className="fw-bold ms-3">Username</Form.Label>
            <Form.Control
              required
              type="text"
              value={reg_college_username}
              onChange={(e) => setReg_college_username(e.target.value)}
              placeholder="Enter Username"
            />
            {errors.reg_college_username && <p className="text-danger">{errors.reg_college_username}</p>}

          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3 text-start" controlId="formGroupPassword">
            <Form.Label className="fw-bold ms-3">Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={reg_password}
              onChange={(e) => setReg_password(e.target.value)}
              minLength={8}
              placeholder="Enter Password"
            />
            {errors.reg_password && <p className="text-danger">{errors.reg_password}</p>}

          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-3 text-start" controlId="formGroupConfirmPassword">
            <Form.Label className="fw-bold ms-3">Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={reg_confirm_password}
              onChange={(e) => setReg_confirm_password(e.target.value)}
              isInvalid={reg_password !== reg_confirm_password}
              placeholder="Confirm Password"
            />
            <Form.Control.Feedback type="invalid">
              Passwords do not match.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 text-start" controlId="formGroupMOU">  
        <Form.Label className="fw-bold ms-3">MOU Signed</Form.Label>  
        <Form.Select  
          required  
          value={reg_mou_sign}  
          onChange={(e) => setReg_mou_sign(e.target.value)}  
        >  
          <option value="">Select</option>  
          <option value="Yes">Yes</option>  
          <option value="No">No</option>  
        </Form.Select> 
        {errors.reg_mou_sign && <p className="text-danger">{errors.reg_mou_sign}</p>}

      </Form.Group>  


          {/* Submit Button */}
          <div className="text-center">
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button type="submit"  variant="danger" className="ms-5" onClick={handleClear}>
            Clear
          </Button>
          </div>
        </Form>
        </Col>
        </Row>
      </Container>
      </div>
    </>
  );
};

export default College_registration;
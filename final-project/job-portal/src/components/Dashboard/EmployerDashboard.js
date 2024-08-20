import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaHome,
  FaUser,
  FaPlus,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import JobListings from "./JobListings";

function EmployerDashboard() {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const userProfile =
      JSON.parse(localStorage.getItem("employerRegistrationData")) || [];
    const currentUser = userProfile.find((user) => user.email === auth.email);

    if (currentUser) {
      setCompanyName(currentUser.companyName || "Company");
    }
  }, []);

  const handleApplicationsClick = (jobId) => {
    navigate(`/applications/${jobId}`);
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="mb-4 w-100">
        <Container fluid>
          <Navbar.Brand href="#home" className="text-white">
            <FaHome style={{ fontSize: "24px" }} />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link className="text-white" onClick={() => navigate("/")}>
              <FaHome /> Home
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => navigate("/company-profile")}
            >
              <FaUser /> Company Profile
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => navigate("/post-job")}
            >
              <FaPlus /> Post Job
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => handleApplicationsClick(1)}
            >
              <FaFileAlt /> Applications
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => navigate("/logout")}
            >
              <FaSignOutAlt /> Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container fluid>
        <h1 className="mb-4">Welcome, {companyName}</h1>
        <JobListings />
      </Container>
    </>
  );
}

export default EmployerDashboard;

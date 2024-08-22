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
      {/* Navbar */}
      <Navbar
        bg="primary" // Set the background color to match homepage color
        variant="dark"
        className="mb-4 w-100"
        style={{
          borderBottom: "2px solid #0056b3", // Optional: add a bottom border to match the theme
          padding: "0.5rem 1rem",
        }}
      >
        <Container fluid>
          <Navbar.Brand
            href="#home"
            className="text-white"
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            <FaHome style={{ fontSize: "1.5rem", marginRight: "0.5rem" }} />
            Employer's Dashboard
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link
              className="text-white"
              onClick={() => navigate("/")}
              style={{
                fontSize: "1.1rem",
              }}
            >
              <FaHome style={{ marginRight: "0.5rem" }} />
              Home
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => navigate("/company-profile")}
              style={{
                fontSize: "1.1rem",
              }}
            >
              <FaUser style={{ marginRight: "0.5rem" }} />
              Company Profile
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => navigate("/post-job")}
              style={{
                fontSize: "1.1rem",
              }}
            >
              <FaPlus style={{ marginRight: "0.5rem" }} />
              Post Job
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => handleApplicationsClick(1)}
              style={{
                fontSize: "1.1rem",
              }}
            >
              <FaFileAlt style={{ marginRight: "0.5rem" }} />
              Applications
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => {
                localStorage.removeItem("auth");
                navigate("/login/employer");
              }}
              style={{
                fontSize: "1.1rem",
              }}
            >
              <FaSignOutAlt style={{ marginRight: "0.5rem" }} />
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container fluid style={{ padding: "2rem 1rem" }}>
        <h2
          className="mb-4"
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Welcome, {companyName}!
        </h2>
        <JobListings />
      </Container>
    </>
  );
}

export default EmployerDashboard;

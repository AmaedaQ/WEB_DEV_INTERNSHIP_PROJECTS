import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faHistory,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import AllJobs from "./AllJobs";

function JobSeekerDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData && authData.role === "job_seeker") {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const currentUser = users.find((user) => user.email === authData.email);
      if (currentUser) {
        setUserName(currentUser.name);
      } else {
        navigate("/login/job-seeker");
      }
    } else {
      navigate("/login/job-seeker");
    }
  }, [navigate]);

  return (
    <Container fluid>
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Navbar.Brand href="#home" className="text-white">
          <Nav.Link
            className="text-white"
            onClick={() => navigate("/dashboard/job-seeker")}
          >
            <FontAwesomeIcon icon={faHome} className="me-2" /> Dashboard
          </Nav.Link>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link className="text-white" onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faHome} className="me-2" /> Home
          </Nav.Link>

          <Nav.Link className="text-white" onClick={() => navigate("/profile")}>
            <FontAwesomeIcon icon={faUser} className="me-2" /> Profile
          </Nav.Link>
          <Nav.Link
            className="text-white"
            onClick={() => navigate("/application-history")}
          >
            <FontAwesomeIcon icon={faHistory} className="me-2" /> Application
            History
          </Nav.Link>
          <Nav.Link
            className="text-white"
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login/job-seeker");
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <Row className="mb-4">
          <Col md={8}>
            <h1 className="text-primary" style={{ fontSize: "2rem" }}>
              Welcome, {userName || "Job Seeker"}!
            </h1>
          </Col>
          <Col md={4}>
            {/* Optional Search Bar */}
            {/* <SearchBar /> */}
          </Col>
        </Row>
        <AllJobs />
      </Container>
    </Container>
  );
}

export default JobSeekerDashboard;

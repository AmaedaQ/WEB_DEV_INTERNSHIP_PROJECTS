import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Badge,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve current user from local storage
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth) {
      // Fetch jobs from local storage
      const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
      // Filter jobs based on the current user's email
      const userJobs = storedJobs.filter((job) => job.postedBy === auth.email);
      setJobs(userJobs);
    } else {
      setError("Unable to retrieve user data.");
    }
  }, []);

  const handleEdit = (jobId) => {
    // Redirect to the PostJob form with job details
    navigate(`/post-job?id=${jobId}`);
  };

  const handleDelete = (jobId) => {
    const updatedJobs = jobs.filter((job) => job.id !== jobId);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const handleViewApplications = (jobId) => {
    // Redirect to the JobApplications component with jobId
    navigate(`/applications/${jobId}`);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Your Job Listings</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Col md={6} key={job.id} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{job.jobTitle}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Salary : {job.salary}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Description:</strong> {job.description}
                  </Card.Text>
                  <div className="mb-2">
                    <Badge bg="info" className="me-2">
                      {job.jobType}
                    </Badge>
                    <Badge bg="secondary">{job.experienceLevel}</Badge>
                  </div>
                  <div className="mb-2">
                    <Badge bg="primary" className="me-2">
                      {job.category}
                    </Badge>
                  </div>
                  <div className="mb-2">
                    <strong>Location :</strong> {job.location}
                  </div>
                  <div className="mb-2">
                    <strong>Requirements:</strong> {job.requirements}
                  </div>
                  <div className="mb-2">
                    <strong>Last Date to Apply:</strong> {job.lastDateToApply}
                  </div>

                  <div className="mb-2">
                    <strong>Posted On:</strong>{" "}
                    {new Date(job.timestamp).toLocaleString()}
                  </div>
                  <div className="d-flex">
                    <Button
                      variant="outline-primary"
                      onClick={() => handleEdit(job.id)}
                      className="me-2"
                      style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(job.id)}
                      className="me-2"
                      style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outline-info"
                      onClick={() => handleViewApplications(job.id)}
                      style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                    >
                      View Applications
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No jobs posted yet.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default JobListings;

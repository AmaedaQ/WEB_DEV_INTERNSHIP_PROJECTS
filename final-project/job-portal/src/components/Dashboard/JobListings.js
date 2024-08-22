import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Badge,
  Alert,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth) {
      const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
      const userJobs = storedJobs.filter((job) => job.postedBy === auth.email);
      setJobs(userJobs);
    } else {
      setError("Unable to retrieve user data.");
    }
  }, []);

  const handleEdit = (jobId) => navigate(`/post-job?id=${jobId}`);
  const handleDelete = (jobId) => {
    const updatedJobs = jobs.filter((job) => job.id !== jobId);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };
  const handleViewApplications = (jobId) => navigate(`/applications/${jobId}`);
  const handleShowModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <Container className="mt-5">
      <h2
        className="mb-4 text-center"
        style={{ color: "#333", fontWeight: "bold" }}
      >
        Your Job Listings
      </h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Col md={6} lg={4} key={job.id} className="mb-4">
              <Card
                className="shadow-sm rounded text-center"
                style={{
                  border: "1px solid #dee2e6",
                  borderRadius: "10px",
                  height: "100%", // Ensure all cards stretch to the same height
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Card.Body
                  style={{
                    flex: "1", // Ensures the card body grows to fill the card
                  }}
                >
                  <Card.Title
                    style={{ fontSize: "1.25rem", fontWeight: "bold" }}
                  >
                    {job.jobTitle}
                  </Card.Title>
                  <div className="mb-2 text-center">
                    <Badge bg="info" className="me-2">
                      {job.jobType}
                    </Badge>
                    <Badge bg="secondary">{job.experienceLevel}</Badge>
                  </div>
                  <div className="mb-2 text-center">
                    <Badge bg="primary" className="me-2">
                      {job.category}
                    </Badge>
                  </div>
                  <Card.Subtitle
                    className="mb-2 text-muted"
                    style={{ fontSize: "1rem" }}
                  >
                    Salary: {job.salary}
                  </Card.Subtitle>
                  <Card.Text
                    className="mt-2 mb-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <strong>Location:</strong> {job.location}
                  </Card.Text>
                </Card.Body>
                <Card.Footer
                  className="text-center"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex flex-column flex-md-row gap-2 justify-content-center">
                    <Button
                      variant="outline-primary"
                      onClick={() => handleShowModal(job)}
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "4px",
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => handleEdit(job.id)}
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "4px",
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(job.id)}
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "4px",
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outline-info"
                      onClick={() => handleViewApplications(job.id)}
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "4px",
                      }}
                    >
                      View Applications
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p
              className="text-center"
              style={{ fontSize: "1.2rem", color: "#666" }}
            >
              No jobs posted yet.
            </p>
          </Col>
        )}
      </Row>

      {selectedJob && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedJob.jobTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Job Type:</strong> {selectedJob.jobType}
            </p>
            <p>
              <strong>Experience Level:</strong> {selectedJob.experienceLevel}
            </p>
            <p>
              <strong>Category:</strong> {selectedJob.category}
            </p>
            <p>
              <strong>Salary:</strong> {selectedJob.salary}
            </p>
            <p>
              <strong>Location:</strong> {selectedJob.location}
            </p>
            <p>
              <strong>Description:</strong> {selectedJob.description}
            </p>
            <p>
              <strong>Requirements:</strong> {selectedJob.requirements}
            </p>
            <p>
              <strong>Last Date to Apply:</strong> {selectedJob.lastDateToApply}
            </p>
            <p>
              <strong>Posted On:</strong>{" "}
              {new Date(selectedJob.timestamp).toLocaleDateString()}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseModal}
              style={{ fontSize: "0.85rem" }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default JobListings;

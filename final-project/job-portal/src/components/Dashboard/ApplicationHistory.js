import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Alert } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

function ApplicationHistory() {
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("applications")) || [];
      setApplications(data);
    } catch (err) {
      setError("Failed to load applications.");
    }
  }, []);

  const handleShowModal = (jobId) => {
    try {
      const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
      const job = jobs.find((j) => j.id === jobId);
      const application = applications.find((app) => app.jobId === jobId);
      if (job) {
        setSelectedJob(job);
        setSelectedMessage(application.message || "No message from employer");
        setShowModal(true);
      } else {
        setError("Job details not found.");
      }
    } catch (err) {
      setError("Failed to load job details.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMessage("");
    setError(""); // Clear error message on modal close
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <h2 className="mb-4">Application History</h2>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Applied On</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No applications found.
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app.id}>
                <td>{app.jobTitle}</td>
                <td>{new Date(app.appliedAt).toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      app.status === "Accepted"
                        ? "bg-success"
                        : app.status === "Rejected"
                        ? "bg-danger"
                        : app.status === "Under Review"
                        ? "bg-warning"
                        : "bg-secondary"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleShowModal(app.jobId)}
                    size="sm"
                  >
                    <FaInfoCircle /> View Details
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {selectedJob && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Application Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{selectedJob.title}</h4>
            <h5>Message from Employer</h5>
            <p>{selectedMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default ApplicationHistory;

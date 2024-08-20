import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

function JobApplications() {
  const { jobId } = useParams(); // Get jobId from URL parameters
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const fetchApplications = () => {
      const jobApplications =
        JSON.parse(localStorage.getItem("jobApplications")) || [];
      const jobApp = jobApplications.find(
        (app) => app.jobId === parseInt(jobId)
      );

      if (jobApp) {
        setApplications(jobApp.applications);
      } else {
        setError("No applications found for this job.");
      }

      setLoading(false);
    };

    fetchApplications();
  }, [jobId]);

  const handleStatusChange = (applicationId, newStatus) => {
    const updatedApplications = applications.map((app) =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    );
    const updatedJobApplications = JSON.parse(
      localStorage.getItem("jobApplications")
    ).map((jobApp) =>
      jobApp.jobId === parseInt(jobId)
        ? { ...jobApp, applications: updatedApplications }
        : jobApp
    );
    localStorage.setItem(
      "jobApplications",
      JSON.stringify(updatedJobApplications)
    );
    setApplications(updatedApplications);
  };

  const handleResumeClick = (resumeFileName) => {
    setResumeUrl(resumeFileName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setResumeUrl("");
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container className="mt-5">
      <h2 className="my-4">Applications for Job ID {jobId}</h2>
      {applications.length === 0 ? (
        <Alert variant="info">No applications for this job yet.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Cover Letter</th>
              <th>Resume</th>
              <th>Applied At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.applicantName}</td>
                <td>{app.applicantEmail}</td>
                <td>{app.coverLetter}</td>
                <td>
                  <Button
                    variant="link"
                    onClick={() => handleResumeClick(app.resume)}
                    style={{ fontSize: "0.8rem" }} // Smaller font size
                  >
                    View Resume
                  </Button>
                </td>
                <td>{new Date(app.appliedAt).toLocaleString()}</td>
                <td>{app.status}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      onClick={() => handleStatusChange(app.id, "Under Review")}
                      variant="warning"
                      style={{ fontSize: "0.8rem" }} // Smaller font size
                    >
                      Under Review
                    </Button>
                    <Button
                      onClick={() => handleStatusChange(app.id, "Accepted")}
                      variant="success"
                      style={{ fontSize: "0.8rem" }} // Smaller font size
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleStatusChange(app.id, "Rejected")}
                      variant="danger"
                      style={{ fontSize: "0.8rem" }} // Smaller font size
                    >
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Resume</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resumeUrl ? (
            <iframe
              src={`path/to/resumes/${resumeUrl}`}
              width="100%"
              height="500px"
              title="Resume"
            />
          ) : (
            <p>No resume available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            style={{ fontSize: "0.8rem" }} // Smaller font size
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default JobApplications;

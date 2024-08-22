import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Alert,
  Spinner,
  Form,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

function JobApplications() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const [messageModal, setMessageModal] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [message, setMessage] = useState("");

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

    // Notify job seekers about the status change
    updateJobSeekerStatus(applicationId, newStatus);
  };

  const updateJobSeekerStatus = (applicationId, newStatus) => {
    const applications = JSON.parse(localStorage.getItem("applications")) || [];
    const updatedApplications = applications.map((app) =>
      app.jobId === parseInt(jobId) && app.id === applicationId
        ? { ...app, status: newStatus }
        : app
    );
    localStorage.setItem("applications", JSON.stringify(updatedApplications));
  };

  const handleResumeClick = (resumeFileName) => {
    setResumeUrl(resumeFileName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setResumeUrl("");
  };

  const handleSendMessage = () => {
    const jobApplications =
      JSON.parse(localStorage.getItem("jobApplications")) || [];
    const updatedApplications = jobApplications.map((jobApp) => ({
      ...jobApp,
      applications: jobApp.applications.map((app) =>
        app.id === selectedAppId ? { ...app, message: message } : app
      ),
    }));
    localStorage.setItem(
      "jobApplications",
      JSON.stringify(updatedApplications)
    );

    // Also update the job applications on the job seeker side
    updateJobSeekerMessage(selectedAppId, message);

    setMessageModal(false);
    setMessage("");
  };

  const updateJobSeekerMessage = (applicationId, newMessage) => {
    const applications = JSON.parse(localStorage.getItem("applications")) || [];
    const updatedApplications = applications.map((app) =>
      app.jobId === parseInt(jobId) && app.id === applicationId
        ? { ...app, message: newMessage }
        : app
    );
    localStorage.setItem("applications", JSON.stringify(updatedApplications));
  };

  const openMessageModal = (applicationId) => {
    setSelectedAppId(applicationId);
    setMessageModal(true);
  };

  const closeMessageModal = () => {
    setMessageModal(false);
    setMessage("");
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
                    style={{ fontSize: "0.8rem" }}
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
                      style={{ fontSize: "0.8rem" }}
                    >
                      Under Review
                    </Button>
                    <Button
                      onClick={() => handleStatusChange(app.id, "Accepted")}
                      variant="success"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleStatusChange(app.id, "Rejected")}
                      variant="danger"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => openMessageModal(app.id)}
                      variant="primary"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Send Message
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
            style={{ fontSize: "0.8rem" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={messageModal} onHide={closeMessageModal}>
        <Modal.Header closeButton>
          <Modal.Title>Send Message to Applicant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeMessageModal}
            style={{ fontSize: "0.8rem" }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSendMessage}
            style={{ fontSize: "0.8rem" }}
          >
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default JobApplications;

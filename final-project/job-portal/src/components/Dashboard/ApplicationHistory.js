import React, { useState, useEffect } from "react";
import { Container, Table, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ApplicationHistory() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = () => {
      try {
        const storedApplications =
          JSON.parse(localStorage.getItem("applications")) || [];
        setApplications(storedApplications);
      } catch (err) {
        setError("Failed to load application history.");
      }
    };

    fetchApplications();
  }, []);

  const handleViewDetails = (jobId) => {
    navigate(`/apply/${jobId}`); // Redirect to the application details page if available
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container>
      <h2>Application History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Cover Letter</th>
            <th>Resume</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((app, index) => (
              <tr key={index}>
                <td>{app.jobTitle}</td>
                <td>{app.coverLetter}</td>
                <td>{app.resume}</td>
                <td>{app.status}</td>
                <td>
                  <Button onClick={() => handleViewDetails(app.jobId)}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No applications found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default ApplicationHistory;

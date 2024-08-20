import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function ApplyForm() {
  const { jobId } = useParams(); // Get jobId from URL parameters
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [resume, setResume] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [status] = useState("Submitted");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setResumeFileName(e.target.files[0]?.name || ""); // Update resume file name
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!name || !email || !coverLetter || !resumeFileName) {
      setError("All fields are required.");
      return;
    }

    // Prepare application data
    const application = {
      jobId: parseInt(jobId),
      coverLetter,
      resume: resumeFileName,
      status,
      applicantName: name,
      applicantEmail: email,
      appliedAt: new Date().toISOString(),
    };

    // Retrieve existing applications from localStorage
    const jobApplications =
      JSON.parse(localStorage.getItem("jobApplications")) || [];

    // Check if job already exists in applications
    const existingJobApp = jobApplications.find(
      (app) => app.jobId === parseInt(jobId)
    );
    if (existingJobApp) {
      existingJobApp.applications.push(application);
    } else {
      jobApplications.push({
        jobId: parseInt(jobId),
        applications: [application],
      });
    }

    // Save updated applications back to localStorage
    localStorage.setItem("jobApplications", JSON.stringify(jobApplications));

    // Redirect to application history or success page
    navigate("/application-history");
  };

  return (
    <Container style={{ maxWidth: "600px", marginTop: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#007bff" }}>
        Apply for Job ID {jobId}
      </h2>
      {error && (
        <Alert variant="danger" style={{ marginBottom: "20px" }}>
          {error}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" style={{ marginBottom: "15px" }}>
          <Form.Label style={{ fontWeight: "bold" }}>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            style={{ borderRadius: "0.25rem" }}
          />
        </Form.Group>
        <Form.Group controlId="email" style={{ marginBottom: "15px" }}>
          <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{ borderRadius: "0.25rem" }}
          />
        </Form.Group>
        <Form.Group controlId="coverLetter" style={{ marginBottom: "15px" }}>
          <Form.Label style={{ fontWeight: "bold" }}>Cover Letter</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Write your cover letter"
            required
            style={{ borderRadius: "0.25rem" }}
          />
        </Form.Group>
        <Form.Group controlId="resume" style={{ marginBottom: "15px" }}>
          <Form.Label style={{ fontWeight: "bold" }}>Resume</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
            style={{ borderRadius: "0.25rem" }}
          />
          {resumeFileName && (
            <Form.Text
              className="text-muted"
              style={{ display: "block", marginTop: "5px" }}
            >
              Selected file: {resumeFileName}
            </Form.Text>
          )}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        >
          Apply
        </Button>
      </Form>
    </Container>
  );
}

export default ApplyForm;

import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function ApplyForm() {
  const { jobId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [status] = useState("Submitted");
  const [error, setError] = useState("");
  const [jobTitle, setJobTitle] = useState(""); // State to hold job title
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch job details from localStorage and set jobTitle
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const job = jobs.find((j) => j.id === parseInt(jobId));
    if (job) {
      setJobTitle(job.jobTitle); // Set the job title from localStorage
    }
  }, [jobId]);

  const handleFileChange = (e) => {
    setResumeFileName(e.target.files[0]?.name || "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !coverLetter || !resumeFileName) {
      setError("All fields are required.");
      return;
    }

    const application = {
      jobId: parseInt(jobId),
      jobTitle, // Include jobTitle in application data
      coverLetter,
      resume: resumeFileName,
      status,
      applicantName: name,
      applicantEmail: email,
      appliedAt: new Date().toISOString(),
    };

    const jobApplications =
      JSON.parse(localStorage.getItem("jobApplications")) || [];
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

    localStorage.setItem("jobApplications", JSON.stringify(jobApplications));

    const seekerApplications =
      JSON.parse(localStorage.getItem("applications")) || [];
    seekerApplications.push(application);
    localStorage.setItem("applications", JSON.stringify(seekerApplications));

    navigate("/application-history");
  };

  return (
    <Container style={{ maxWidth: "600px", marginTop: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#007bff" }}>
        Apply for {jobTitle} (Job ID: {jobId})
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
